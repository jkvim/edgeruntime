import { kv } from "@vercel/kv";
import { NextApiRequest, NextApiResponse } from "next";
import {isBefore, isToday, startOfDay} from 'date-fns';
import { nanoid } from "nanoid";
import { API_KEY_PREFIX } from "@/constants/api";
import { LOCAL_IP } from "@/constants/env";

type IPCount = {
  key: string;
  count: number;
  date: number;
};

function serializeResult(result: IPCount | null) {
  if (!result || !result.count) return null

  return {
    key: result.key,
    count: Number(result.count),
    date: result.date ? Number(result.date) : Date.now(),
  } 
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {
    let ip = req.headers['x-forwarded-for'] as string || req.connection.remoteAddress;

    if (ip?.substring(0, 7) === "::ffff:") {
      ip = ip?.slice(7)
    }

    console.log('[ip]', `${ip}`)

    if (!ip) {
      return res.status(400).json({error: 'Bad request'});
    }

    const result: IPCount | null = serializeResult(await kv.hgetall(`ip:${ip}`))
    console.log('[result]', result);

    if (result) {
      if (isToday(result.date) && result.count > 3) {
        return res.status(429).json({error: 'Over limit of 3 keys per day, please try again tomorrow'});
      }
      return await generateNewKey(ip, res, result);
    } else {
      return await generateNewKey(ip, res, result);
    }
  }
}

async function generateNewKey(ip: string, res: NextApiResponse, result: IPCount | null) {
  let newKey = nanoid()
  let keyExists = await kv.get(`${API_KEY_PREFIX}${newKey}`);

  // delete old key, avoid delete local ip
  if (result && ip !== LOCAL_IP) {
    await kv.del(`${API_KEY_PREFIX}${result.key}`);
  }

  while (keyExists) {
    newKey = nanoid();
    keyExists = await kv.get(`${API_KEY_PREFIX}${newKey}`);
  }

  // reset count if last request was more than 24 hours ago, and count is more than 3
  if (result && result.count > 3 && isBefore(new Date(result.date), startOfDay(new Date()))) {
    result.count = 0;
    result.date = Date.now();
  }

  console.log('[newKey]', newKey);

  await kv.hset(`ip:${ip}`, {
    key: newKey,
    count: result ? result.count + 1 : 1,
    date: result ? result.date : Date.now(),
  });

  await kv.hset(`${API_KEY_PREFIX}${newKey}`, {key: newKey, ip, date: Date.now(), count: 0});


  return res.status(200).json({ key: newKey });
}
