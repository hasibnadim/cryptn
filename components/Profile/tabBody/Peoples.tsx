import { CableRounded } from '@mui/icons-material'
import Link from 'next/link'
import React from 'react'
import { useStateValue } from '../../../service/Store'

const Peoples = () => {
  const [{ user }] = useStateValue()
  return (
    <div className=''>
      {[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map((v, key) => (
        <div className="m-1 flex lg:inline-flex p-1 hover:shadow lg:w-72" key={key}>
          <img
            src={user.photoUrl}
            alt={user.name}
            className="mx-1 h-14 w-14 rounded-3xl border border-green-600 text-xs"
          />
          <p className="">
            <Link href={'/profile/'+user.uid}>
            <a>{user.name}</a></Link>
            <button className="follow_btn">
              <CableRounded fontSize="small" />
              <span>Follow</span>
            </button>
          </p>
        </div>
      ))}
    </div>
  )
}

export default Peoples
