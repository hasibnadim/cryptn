import Head from 'next/head'
import { useRouter } from 'next/router'

import React, { useEffect, useState } from 'react'
import Header from '../../components/Header'
import { useStateValue } from '../../service/Store'

const Profile = () => {
  const router = useRouter()
  const [{ user }] = useStateValue()
  const [walletType, setWalletType] = useState('Bank')

  useEffect(() => {
    if (!user.loading && !user.name) {
      router.push({
        pathname: '/login',
        query: { warningmsg: 'Your might login first.' },
      })
    }
  }, [user.name, user.loading])
  return (
    <div>
      <Head>
        <title>{user.name || 'Profile'}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      {user.loading && !user.name ? (
        <h1>Loading</h1>
      ) : (
        <div className="container mx-auto md:flex">
          <div className="flex items-center p-4 text-center shadow md:flex-col md:shadow-none min-w-max">
            <img src={user.photoUrl} className="rounded-full md:w-40" />
            <div className="px-4 md:px-0">
              <p className="w-max text-3xl">{user.name}</p>
              <p className="w-max">{user.email}</p>

              <button className="btn my-1 px-2 py-0 md:py-1" onClick={()=>setWalletType('Bank')}>
                Bank Wallet
              </button>
              <button className="btn my-1 px-2 py-0 md:py-1" onClick={()=>setWalletType('Crypto')}>
                Crypto Wallet
              </button>
            </div>
          </div>
          <div className="m-2 w-full  p-2 shadow-md">
           {walletType==="Bank"?<BankWallet />:<CryptoWallet />} 
          </div>
        </div>
      )}
    </div>
  )
}
export default Profile

const BankWallet = () => (
  <>
    <h1 className="text-center text-lg ">
      <span className="border-0 border-b border-green-900 px-3 py-1">
        Bank Wallet Account
      </span>
    </h1>
    <ul className="flex flex-wrap p-4 text-lg">
      <li className="balance_card">
        <span>Total Balance: </span>
        <span className="text-xl">450 BDT</span>
      </li>
      <li className="balance_card">
        <span>Last Spend:</span> <span className="text-xl">45 BDT</span>
      </li>
      <li className="balance_card">
        <span>Last Deposit:</span>
        <span className="text-xl">40 BDT</span>
      </li>
      <li className="balance_card">
        <span>Last 10 days revenue:</span>
        <span className="text-xl">50 BDT</span>
      </li>
    </ul>
  </>
)

const CryptoWallet = () => (
  <>
    <h1 className="text-center text-lg ">
      <span className="border-0 border-b border-green-900 px-3 py-1">
        Crypto Wallet Account
      </span>
    </h1>
    <ul className="flex flex-wrap p-4 text-lg">
      <li className="balance_card">
        <span>Total Balance: </span>
        <span className="text-xl">450 ETH</span>
      </li>
      <li className="balance_card">
        <span>Last Spend:</span> <span className="text-xl">45 ETH</span>
      </li>
      <li className="balance_card">
        <span>Last Deposit:</span>
        <span className="text-xl">40 ETH</span>
      </li>
      <li className="balance_card">
        <span>Last 10 days revenue:</span>
        <span className="text-xl">50 ETH</span>
      </li>
    </ul>
  </>
)
