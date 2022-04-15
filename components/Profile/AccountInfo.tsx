import React from 'react'

interface Props {
  user: { photoUrl: string; name: string; email: string }
}
const AccountInfo = ({ user }: Props) => {
  return (
    <div className="flex min-w-max items-center p-4 text-center shadow md:flex-col md:shadow-none">
      <img src={user.photoUrl} className="rounded-full md:w-40" />
      <div className="px-4 text-center md:px-0">
        <p className="w-max text-2xl lg:text-3xl">{user.name}</p>
        <p className="text-sm lg:text-base">{user.email}</p>
        <div className="flex items-center justify-between">
          <p className="flex flex-col">
            <span className="text-blue-700 dark:text-blue-300">34K</span>
            <span className="text-xs text-gray-600 dark:text-gray-400 lg:text-sm">
              followers
            </span>
          </p>
          <p className="flex flex-col">
            <span className="text-blue-700 dark:text-blue-300">34</span>
            <span className="text-xs text-gray-600 dark:text-gray-400 lg:text-sm">
              following
            </span>
          </p>

        </div>
      </div>
    </div>
  )
}

export default AccountInfo
