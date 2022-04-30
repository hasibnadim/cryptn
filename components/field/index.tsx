import { SearchRounded, Tune } from '@mui/icons-material'
import CircularProgress from '@mui/material/CircularProgress'
import React, { useEffect, useState } from 'react'
import {
  getCountryAndCodeList,
  getLanguageCodeList,
} from '../../service/functions'
import style from './style.module.css'

const Field = () => {
  const [article, setArticle] = useState<any>([])
  const [error, setError] = useState('')
  const [isLoading, setLoading] = useState(false)
  const [queryObj, setQueryObj] = useState<q>({
    query: '',
    country: '',
    category: '',
    lang: '',
  })
  useEffect(() => {
    setLoading(true)
    fetch(
      `api/field/articles?q=${queryObj.query}&&country=${queryObj.country}&&category=${queryObj.category}&&lang=${queryObj.lang}`
    )
      .then((res) => res.json())
      .then((data) => {
        setArticle(data?.articles)
        setError(data?.error)
        setLoading(false)
      })
  }, [queryObj.country, queryObj.category, queryObj.query, queryObj.lang])

  return (
    <div className=" mx-auto max-w-4xl">
      <SearchBox onSubmit={(v: q) => setQueryObj(v)} isLoading={isLoading} />
      {error}
      {isLoading ? (
        <div className="mt-20  flex flex-col items-center justify-center">
          <CircularProgress color="success" disableShrink />
          <span>Please Wait ...</span>
        </div>
      ) : article?.length ? (
        <>
          {article?.map((a: any, key: number) => (
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
        </>
      ) : (
        <h1 className="mx-auto p-5 text-lg">No article Found</h1>
      )}
    </div>
  )
}
export default Field

const SearchBox = ({
  onSubmit,
  isLoading,
}: {
  onSubmit: Function
  isLoading: Boolean
}) => {
  const [showFilterBlock, setShowFilterBlock] = useState(false)
  const [query, setQuery] = useState('')
  const [country, setCountry] = useState('')
  const [category, setCategory] = useState('')
  const [lang, setLang] = useState('en')

  const searchHandeler = (e: any) => {
    e.preventDefault()
    onSubmit({ query, country, category, lang })
  }
  return (
    <form
      className={`${style.searchBox} 
      dark:bg-slate-800 focus-within:dark:bg-slate-700 
      ${query && 'sticky'}`}
      onSubmit={searchHandeler}
    >
      <div className="flex items-center justify-between px-3">
        <span
          className="cursor-pointer"
          onClick={() => setShowFilterBlock((pv) => !pv)}
        >
          <Tune />
        </span>
        <input
          type="text"
          placeholder="Search . . ."
          onChange={(e) => setQuery(e.target.value)}
        />
        <p className="flex items-center">
          {isLoading && <CircularProgress color="success" size={16} />}

          <button type="submit" className="pl-2">
            <SearchRounded />
          </button>
        </p>
      </div>
      {showFilterBlock && (
        <div className={style.optionBlock}>
          <label>
            Country: 
            <select onChange={(e) => setCountry(e.target.value)}>
              <option value="">Any --</option>
              {getCountryAndCodeList().map((v, key) => (
                <option key={key} value={v.code} selected={country === v.code}>
                  {v.name}
                </option>
              ))}
            </select>
          </label>
          <label>
            Category: 
            <select onChange={(e) => setCategory(e.target.value)}>
              <option value="">Any --</option>
              <option value="general">General</option>
              <option value="health">Health</option>
              <option value="science">Science</option>
              <option value="technology">Technology</option>
              <option value="business">Business</option>
              <option value="entertainment">Entertainment</option>
              <option value="sports">Sports</option>
            </select>
          </label>
          <label>
            Language: 
            <select onChange={(e) => setLang(e.target.value)}>
              {getLanguageCodeList().map((v, key) => (
                <option value={v.code} key={key} selected={lang === v.code}>
                  {v.name}
                </option>
              ))}
            </select>
          </label>
        </div>
      )}
    </form>
  )
}
interface q {
  query: string
  country: string
  category: string
  lang: string
}
