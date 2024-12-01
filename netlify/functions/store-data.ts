import { Handler } from '@netlify/functions';
import { MongoClient } from 'mongodb';

const { MONGODB_URI } = process.env;

const handler: Handler = async (event) => {
  if (!event.body) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Missing request body' })
    };
  }

  try {
    const client = await MongoClient.connect(MONGODB_URI as string);
    const db = client.db('real-estate-db');
    
    const { userId, data } = JSON.parse(event.body);
    
    // Store data with userId as key
    await db.collection('user-data').updateOne(
      { userId },
      { $set: { ...data, updatedAt: new Date() } },
      { upsert: true }
    );

    await client.close();

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Data stored successfully' })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error storing data' })
    };
  }
};

export { handler };