
import React, { useState } from 'react'

const Field = ({News}:any):JSX.Element => {
  const [article, setArticle] = useState(News.status=='ok'&&News.articles)
  return (
    <div className=' max-w-4xl mx-auto'>
      {article?.map((a:any,key:number)=>(
        <div key={key} className="article_block">
         <a href={a.url} target="_blank"><img title='READ MORE' className='w-full rounded-t-lg' src={a.urlToImage} /></a> 
          <div>
        <h2 className='text-sm text-slate-400 mx-1'>{`${a.author} | ${a.source.name} | ${a.publishedAt}`}</h2>
          <h3 className='p-2 text-lg font-semibold'>{a.title}</h3>
          <p className='p-2'>{a.description + a.content}</p>
          </div>
        </div>
      ))}
      </div>
  )
}

export default Field