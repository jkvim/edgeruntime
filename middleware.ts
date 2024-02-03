import { kv } from '@vercel/kv';
import { isToday, isBefore, startOfDay } from 'date-fns';
import { NextResponse, type NextRequest } from 'next/server';
import { API_KEY_PREFIX, API_MAX_LIMIT } from './constants/api';
import { serializeToken } from './pages/api/helper';
import { Token } from './types/types';
import { GPT_KEY } from './constants/env';

export async function middleware(request: NextRequest) {
  if (request.method === 'POST') {
    const apiKey = request.headers.get('x-api-key') as string;

    request.headers.forEach((value, key) => {
      console.log(`[request header] ${key}: ${value}`);
    })

    if (!apiKey) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const body = await request.json();
    console.log('[request body]', body);

    if (!body.content) {
      return NextResponse.json(
        { error: 'Content can not be empty' },
        { status: 400 },
      );
    }

    const token: Token | null = await kv.hgetall(`${API_KEY_PREFIX}${apiKey}`);

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    console.log('[token]', token);

    const { count = 0, date } = serializeToken(token);
    // if the date is today and the count is over the limit, return an error
    if (
      date &&
      isToday(date) &&
      count >= API_MAX_LIMIT &&
      token.key !== GPT_KEY
    ) {
      return NextResponse.json(
        { error: 'Over limit of 20 requests per day, please try again tomorrow' },
        { status: 429 },
      );
    }

    // if the date is before today, reset the count
    if (
      date &&
      isBefore(new Date(date), startOfDay(new Date())) &&
      token.key !== GPT_KEY
    ) {
      console.log('reset count of api key');
      await kv.hset(`${API_KEY_PREFIX}${token.key}`, {
        ...token,
        count: 0,
        date: Date.now(),
      });
    }
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/api/mind-map/:id',
    '/api/mobile/:id',
    '/api/html/:id',
    '/api/diagram/:id',
    '/api/slide/:id',
    '/api/code/:id',
  ],
};
