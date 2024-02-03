import { kv } from '@vercel/kv';
import { NextApiRequest, NextApiResponse } from 'next';
import { HTML_KEY_PREFIX } from '@/constants/api';
 
export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  if (request.method === 'GET') {
    const record = await kv.hgetall(`${HTML_KEY_PREFIX}${request.query.id}`);
    console.log('record', record)
    return response.status(200).json(record);
  }
}
