import { NextPage } from 'next'
import { useRouter } from 'next/router'
import React from 'react'

const User:NextPage = () => {
    const router=useRouter()
    const {user}=router.query
  return (
    <div>{user}</div>
  )
}

export default User