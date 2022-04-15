import React from 'react'
import AccountBalanceIcon from '@mui/icons-material/AccountBalance'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import BathroomOutlinedIcon from '@mui/icons-material/BathroomOutlined';
import AddCardOutlinedIcon from '@mui/icons-material/AddCardOutlined';
import AddBusinessOutlinedIcon from '@mui/icons-material/AddBusinessOutlined';
import style from '../style.module.css'
const Wallet = () => {
  return (
    <div>
      <ul className="flex flex-wrap  p-4 text-lg">
        <BCard type="total" balance="440 BDT" ago={40} />
        <BCard type="spend" balance="440 BDT" ago={40} />
        <BCard type="deposit" balance="440 BDT" ago={40} />
        <BCard type="revenue" balance="440 BDT" ago={40} />
      </ul>
    </div>
  )
}

export default Wallet

interface CardProps {
  balance: string
  ago: number
  type: 'total' | 'revenue' | 'spend' | 'deposit'
}
const BCard = ({ balance, ago, type }: CardProps) => {
  const getTitle = () => {
    switch (type) {
      case 'total':
        return 'Total Balance'
      case 'spend':
        return 'Spend'
      case 'revenue':
        return 'Revenue'
      case 'deposit':
        return 'Deposit'
      default:
        return ''
    }
  }
  return (
    <li className="mt-2 mb-5 md:mx-2 inline-block w-full bg-gray-200 dark:bg-slate-800 p-2 shadow md:w-72">
      <div className="flex justify-between px-3 lg:px-1">
        {type === 'total' && (
          <p className={style.balance_card +' bg-green-600 text-white'}>
            <AccountBalanceIcon />
          </p>
        )}
        {type === 'spend' && (
          <p className={style.balance_card +' bg-red-600 text-white'}>
            <BathroomOutlinedIcon />
          </p>
        )}
        {type === 'deposit' && (
          <p className={style.balance_card +' bg-orange-600 text-white'}>
            <AddCardOutlinedIcon />
          </p>
        )}
        {type === 'revenue' && (
          <p className={style.balance_card +' bg-blue-600 text-white'}>
            <AddBusinessOutlinedIcon />
          </p>
        )}
        <p className="flex flex-col text-right">
          <span className="text-xs text-gray-400">{getTitle()}</span>
          <span>{balance}</span>
        </p>
      </div>
      <div className="text-xs lg:text-sm text-gray-500">
        <CalendarTodayIcon fontSize="small" />
        <span className="px-2">Last {ago} days</span>
      </div>
    </li>
  )
}
