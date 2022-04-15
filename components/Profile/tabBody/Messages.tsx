import { Sync } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import Link from 'next/link'
import React from 'react'
import { useStateValue } from '../../../service/Store'

const Messages = () => {
  const [{ user }] = useStateValue()
  return (
    <div className="">
      <p className="flex justify-end">
        <IconButton>
          <Sync color="primary" />
        </IconButton>
      </p>
      <div>
        {[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map((v,key) => (
          <Link href={'#'} key={key}>
            <a className="my-1 flex p-1 hover:shadow">
              <img
                src={user.photoUrl}
                alt={user.name}
                className="mx-1 h-14 w-14 rounded-full border border-green-700 text-xs"
              />
              <div>
                <p>{user.name}</p>
                <span className={`text-xs text-gray-600 lg:text-sm ${key===0 && 'font-bold'}`}>
                  HI, Bro, How are you, I am fine, so ...
                </span>
              </div>
            </a>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Messages
