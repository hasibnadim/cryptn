import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import style from './style.module.css'
const Tabtitle = () => {
  const router = useRouter()
  const { pathname, query } = router
  const activeClass = (tab: string) => {
    if (tab === query.tab) return style.active_Link
    else if (tab === 'wallet' && query.tab===undefined) return style.active_Link
    else return ''
  }
  return (
    <div className={style.tab_title_block + ' dark:border-gray-700'}>
      <Link
        href={{
          pathname,
          query: { ...query, tab: 'wallet' },
        }}
      >
        <a className={activeClass('wallet')}>Wallet</a>
      </Link>
      <Link
        href={{
          pathname,
          query: { ...query, tab: 'messages' },
        }}
      >
        <a className={activeClass('messages')}>Messages</a>
      </Link>
      <Link
        href={{
          pathname,
          query: { ...query, tab: 'peoples' },
        }}
      >
        <a className={activeClass('peoples')}>Peoples</a>
      </Link>
    </div>
  )
}

export default Tabtitle
