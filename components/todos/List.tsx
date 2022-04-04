import React from 'react'
import { DocumentData } from 'firebase/firestore'

import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import ConstructionIcon from '@mui/icons-material/Construction';
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';
import IconButton from '@mui/material/IconButton'

import { todo } from '../../pages/todos'
interface props {
  todoList: todo[] | DocumentData[]
  onDone: Function
  toggleAction: Function
}
const List = ({ todoList, onDone, toggleAction }: props) => {
  return (
    <>
      {todoList.map((t, key) => (
        <p
          key={key}
          className="my-2 flex cursor-pointer items-center justify-between rounded-md  shadow hover:shadow-lg md:p-1"
        >
          <span className="inline-block w-18">
            <IconButton
              onClick={() => toggleAction(t.id)}
              title="In progress"
              color="primary"
            >
              {t.inProcess == true ? (
                <ConstructionIcon />
              ) : (
                <KeyboardArrowUpOutlinedIcon />
              )}
            </IconButton>
          </span>
          <span className="todo_text inline-block w-full overflow-hidden">
            {t.text}
          </span>
          <IconButton
            onClick={() => onDone(t.id)}
            color="success"
            title="Comoplate"
          >
            <CheckCircleOutlineIcon />
          </IconButton>
        </p>
      ))}
    </>
  )
}

export default List
