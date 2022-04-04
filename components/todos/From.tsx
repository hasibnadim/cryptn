import React, { useState } from 'react'
import AddIcon from '@mui/icons-material/Add'
interface props {
  onAdd: Function
}
const Form = ({ onAdd }: props) => {
  const [todoInput, setTodoInput] = useState('')

  function addTodo(e: any) {
    e.preventDefault()
    onAdd(todoInput)
    setTodoInput('')
  }

  return (
    <form
      onSubmit={addTodo}
      className=" flex h-max w-full items-center justify-center overflow-hidden rounded-lg border-2 border-blue-600"
    >
      <input
        type="text"
        name="todo"
        autoComplete="off"
        autoCorrect="true"
        className="w-full bg-transparent p-1 px-3 outline-none md:text-xl"
        id="todo"
        value={todoInput}
        required
        onChange={(e) => setTodoInput(e.target.value)}
        placeholder="What you want to do?"
      />
      <button
        className="flex items-center justify-center bg-blue-600 p-1 text-white md:p-2"
        type="submit"
      >
        <AddIcon />
      </button>
    </form>
  )
}

export default Form
