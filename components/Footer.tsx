import Link from 'next/link'
import React from 'react'
import { useStateValue } from '../service/Store'

export default function Footer() {
  const [{ siteName }] = useStateValue()
  return (
    <footer className="w-full bg-blue-50 px-2 pb-1 text-xs text-gray-400 dark:bg-gray-800 dark:text-gray-300">
      <Link href={'/about'}>
        <a className="text-sm hover:text-blue-600">{siteName}</a>
      </Link>
      <Link href={'/about'}>
        <a className="pl-3 text-xs hover:underline hover:text-blue-600">Terms and Condition</a>
      </Link>
      <Link href={'/about'}>
        <a className="pl-3 text-xs hover:underline hover:text-blue-600">Privacy policy</a>
      </Link>
      <Link href={'/about'}>
        <a className="pl-3 text-xs hover:underline hover:text-blue-600">Cookies policy</a>
      </Link>
      <Link href={'/about'}>
        <a className="pl-3 text-xs hover:underline hover:text-blue-600">Community guidelines</a>
      </Link>
      <Link href={'/support'}>
        <a className="pl-3 text-xs hover:underline hover:text-blue-600">Support</a>
      </Link>
    </footer>
  )
}
