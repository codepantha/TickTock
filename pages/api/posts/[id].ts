import { postDetailQuery } from './../../../utils/queries';
import { NextApiRequest, NextApiResponse } from 'next';
import { client } from '../../../utils/client';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    const { id } = req.query;
    const query = postDetailQuery(id);

    const data = await client.fetch(query);

    return res.status(200).json(data[0]);
  }
}
