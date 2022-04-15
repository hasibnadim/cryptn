import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string
}

var articleCache: any = null
async function getArticles() {
  if (!articleCache) {
    let article = await fetch(
      `https://newsapi.org/v2/top-headlines?country=us&apiKey=${process.env.NEWSAPIKEY}`
    )
    articleCache = await article.json()

    setTimeout(() => {
      articleCache = null
    }, 1000 * 20)
  }
  
  return articleCache
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | any>
) {
  if (req.method === 'GET') {
    res.status(200).json(await getArticles())
  } else {
    res.status(500).json({ err: 'Method not allowed' })
  }
}
