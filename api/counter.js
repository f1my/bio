export default async function handler(request, response) {
  try {
    return response.status(200).json({ message: 'API is working!' });
  } catch (error) {
    console.error('Error in API:', error);
    return response.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
}
