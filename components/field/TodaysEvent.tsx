import Link from 'next/link'
import React from 'react'
import style from './style.module.css'
const TodaysEvent = () => {
  const getDate = () => {
    let dateObj = new Date()
    let monthName = [
      'Jan',
      'Fab',
      'Mar',
      'April',
      'May',
      'Jun',
      'July',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ]
    let dayName = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ]
    return `${dateObj.getDate()} ${monthName[dateObj.getMonth()]}, ${
      dayName[dateObj.getDay()]
    }`
  }
  return (
    <div className="rounded-b-lg  shadow ">
      <p className=" p-2 py-3  lg:text-xl relative">
        <label htmlFor="explore">
          <span className="cursor-pointer hover:text-blue-800">
            {getDate()}{' '}
          </span>
        </label>
        {/* <button className="rounded-lg border border-blue-400 px-3 text-sm hover:bg-blue-400">
          Go Today
        </button> */}
        <input
          type="date"
          id="explore"
          className=" invisible left-0 absolute bg-transparent text-sm outline-none"
        />
      </p>
      {[].map((_,key) => (
        <div className={style.todays_event_block} key={key}>
          <p className={style.title}>
            title, Lorem ipsum dolor sit amet adipisicing elit.
          </p>
          <p className={style.body}>
            Body: Lorem, ipsum dolor sit amet consectetur adipisicing elit.
            Perspiciatis aperiam, accusantium, omnis nisi quia nihil, delectus
            sit ullam iusto cumque repellat explicabo commodi eum quo? Iure
            obcaecati nostrum perferendis voluptas!
            <Link href={'/'}>
              <a className="px-2 text-xs text-blue-900 dark:text-blue-200">
                Read More
              </a>
            </Link>
          </p>
        </div>
      ))}
      {(<p className='p-3 text-gray-500'>
        No Historical Event Found today.
      </p>)}
    </div>
  )
}

export default TodaysEvent
