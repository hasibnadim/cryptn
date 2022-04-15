import CircularProgress from '@mui/material/CircularProgress'
import React, { useEffect, useState } from 'react'

const Field = () => {
  const [article, setArticle] = useState<any>([])
  const [isLoading, setLoading] = useState(false)
  useEffect(() => {
    setLoading(true)
    fetch('api/field/articles')
      .then((res) => res.json())
      .then((data) => {
        setArticle(data?.articles)
        setLoading(false)
      })
  }, [])

  return (
    <div className=" mx-auto max-w-4xl">
      {isLoading && (
        <div className="mt-20  flex flex-col items-center justify-center">
          <CircularProgress color="success" disableShrink />
          <span>Please Wait ...</span>
        </div>
      )}
      {!isLoading &&
        article?.map((a: any, key: number) => (
          <div key={key} className="article_block">
            <a href={a.url} target="_blank">
              <img
                title="READ MORE"
                className="w-full rounded-t-lg"
                src={a.urlToImage}
              />
            </a>
            <div>
              <h2 className="mx-1 text-sm text-slate-400">{`${a.author} | ${a.source?.name} | ${a.publishedAt}`}</h2>
              <h3 className="p-2 text-lg font-semibold">{a.title}</h3>
              <p className="p-2">{a.description + a.content}</p>
            </div>
          </div>
        ))}
    </div>
  )
}

export default Field
