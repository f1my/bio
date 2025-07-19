import Redis from 'ioredis';

const redis = new Redis(process.env.REDIS_URL);

export default async function handler(request, response) {
  try {
    if (request.method === 'POST') {
      const { slug } = request.body;
      if (!slug) {
        return response.status(400).json({ error: 'Slug is required' });
      }
      await redis.incr(slug);
      return response.status(200).json({ message: 'Counter incremented' });
    } else if (request.method === 'GET') {
      const { slug: querySlug } = request.query;
      const slug = querySlug || 'views'; // Use 'views' as default slug for GET requests
      const count = await redis.get(slug);
      return response.status(200).json({ count: parseInt(count || 0, 10) });
    } else {
      return response.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Redis error:', error);
    return response.status(500).json({ error: 'Internal Server Error', details: error.message, fullError: JSON.stringify(error) });
  }
}
