// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case 'GET':
      // get one h event by slug
      break
    case 'POST':
    // sent review/ by user

    case 'PUT':
      // sent report by user
      break

    default:
      break
  }
  res.status(200).json({ name: 'John Doe' })
}
