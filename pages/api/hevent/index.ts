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
      // get list for the date
      res.status(200).json({ name: 'John Doe' })
      break
    case 'POST':
      // add new by admin
      break
    case 'PUT':
      // add new req by user
      break
    default:
      break
  }
  res.status(200).json({ name: 'John Doe' })
}
