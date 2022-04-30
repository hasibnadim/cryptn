import type { NextApiRequest, NextApiResponse } from 'next'
const NewsAPI = require('newsapi')
const sha1 = require('sha1')
const newsapi = new NewsAPI(process.env.NEWSAPIKEY)
type Data = {
  name: string
}
interface articleQueryObj {
  q: string
  country: string
  category: string
  lang: string
}
interface extendReq extends NextApiRequest {
  query: { q: string; country: string; category: string; lang: string }
}

var articleCache: { [key: string]: { data: any; cacheTimer: number } } = {}
const cacheTime = 20*60
setTimeout(() => {
  var tmpC = Object.keys(articleCache)
  tmpC.map((cacheKey) => {
    if (articleCache[cacheKey].cacheTimer + cacheTime * 1000 > Date.now()) {
      delete articleCache[cacheKey]
    }
  })
}, cacheTime * 1000)
async function getArticles(query: articleQueryObj) {
  var key = sha1(
    query.q + query.category + query.country + (query.lang || 'en')
  )
  if (articleCache[key]) {
    return articleCache[key].data
  } else {
    console.log('reqs')
    return newsapi.v2
      .topHeadlines({
        q: query.q,
        category: query.category,
        language: query.lang || 'en',
        country: query.country,
      })
      .then((resp: any) => {
        articleCache[key] = { data: resp, cacheTimer: Date.now() }
        return resp
      })
      .catch((error: Error) => {
        return { error: error.message }
      })
  }
}

export default async function handler(
  req: extendReq,
  res: NextApiResponse<Data | any>
) {
  if (req.method === 'GET') {
    res.status(200).json(await getArticles(req.query))
  } else {
    res.status(500).json({ err: 'Method not allowed' })
  }
}
