import { topicPostsQuery } from './../../utils/queries';
import { NextApiRequest, NextApiResponse } from 'next';
import { client } from '../../utils/client';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    const { topic } = req.query;
    const query = topicPostsQuery(topic);
    
    const data = await client.fetch(query);
    res.status(200).json(data);
  }
}
