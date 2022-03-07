import React from 'react'
import AccountBalanceIcon from '@mui/icons-material/AccountBalance'
import FitbitIcon from '@mui/icons-material/Fitbit'
import { useRouter } from 'next/router'

const Wallet = () => {
  const router = useRouter()
  const { pathname, query } = router
  return (
    <>
      <h1>
        <button
          className={
            'm-1 rounded-md p-1 text-sm shadow hover:bg-yellow-100 dark:hover:bg-slate-800 ' +
            ((query.wallet === 'bank' || query.wallet === undefined) &&
              'bg-yellow-100 dark:bg-slate-800')
          }
          onClick={() =>
            router.replace({
              pathname,
              query: { ...query, wallet: 'bank' },
            })
          }
        >
          <AccountBalanceIcon /> <span>Bank Wallet</span>
        </button>
        <button
          className={
            'm-1 rounded-md p-1 text-sm shadow hover:bg-yellow-100 dark:hover:bg-slate-800 ' +
            (query.wallet === 'crypto' && 'bg-yellow-100 dark:bg-slate-800')
          }
          onClick={() =>
            router.replace({
              pathname,
              query: { ...query, wallet: 'crypto' },
            })
          }
        >
          <FitbitIcon /> <span>Crypto Wallet</span>
        </button>
      </h1>

      <>
        {(query.wallet === 'bank' || query.wallet === undefined) && <BankW />}
        {query.wallet === 'crypto' && <CryptoW />}
      </>
      <p className="text-red-300">Its demo. Coming Soon ...</p>
    </>
  )
}

export default Wallet
const BankW = () => {
  return (
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
}
const CryptoW = () => {
  return (
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
}
