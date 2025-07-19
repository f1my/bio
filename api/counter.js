import { kv } from '@vercel/kv';

export default async function handler(request, response) {
  try {
    const count = await kv.incr('views');
    response.setHeader('Access-Control-Allow-Origin', '*');
    return response.status(200).json({ count });
  } catch (error) {
    return response.status(500).json({ error: error.message });
  }
}
