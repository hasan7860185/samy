import { Handler } from '@netlify/functions';
import { MongoClient } from 'mongodb';

const { MONGODB_URI } = process.env;

const handler: Handler = async (event) => {
  const { userId } = event.queryStringParameters || {};

  if (!userId) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Missing userId parameter' })
    };
  }

  try {
    const client = await MongoClient.connect(MONGODB_URI as string);
    const db = client.db('real-estate-db');
    
    // Get data for user
    const data = await db.collection('user-data').findOne({ userId });
    
    await client.close();

    if (!data) {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: 'No data found for user' })
    };
    }

    return {
      statusCode: 200,
      body: JSON.stringify(data)
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error fetching data' })
    };
  }
};

export { handler };