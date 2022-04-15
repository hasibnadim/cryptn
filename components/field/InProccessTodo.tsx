import React from 'react'
import { useTodos } from '../../hooks/Todos'
import ConstructionIcon from '@mui/icons-material/Construction'
import { useStateValue } from '../../service/Store'
import style from './style.module.css'
import Link from 'next/link'
const InProccessTodo = () => {
  const [{ user }] = useStateValue()
  const { todos } = useTodos(user)
  return (
    <div className="rounded-b-lg  p-2 shadow">
      {todos.length !== 0 && <span>You need to complate:</span>}
      {todos.length === 0 && <span>No task in processing.</span>}

      <ul className={style.todo_list_ul}>
        {todos[0]?.inProcess && (
          <li>
            <span>
              <ConstructionIcon color="info" />
            </span>
            <span className="inline-block w-full overflow-hidden">
              {todos[0]?.text}
            </span>
          </li>
        )}
        {todos[1]?.inProcess && (
          <li>
            <span>
              <ConstructionIcon color="info" />
            </span>
            <span className="inline-block w-full overflow-hidden">
              {todos[1]?.text}
            </span>
          </li>
        )}
        {todos[2]?.inProcess && (
          <li>
            <span>
              <ConstructionIcon color="info" />
            </span>
            <span className="inline-block w-full overflow-hidden">
              {todos[2]?.text}
            </span>
          </li>
        )}
      </ul>
      <Link href={'/todos'}>
        <a className="text-xs text-blue-900 dark:text-blue-200">
          Go to at Todos
        </a>
      </Link>
    </div>
  )
}

export default (InProccessTodo)
