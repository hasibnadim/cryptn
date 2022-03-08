import Head from 'next/head'
import React, { useEffect, useState } from 'react'
import AddIcon from '@mui/icons-material/Add'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import IconButton from '@mui/material/IconButton'
import { useStateValue } from '../service/Store'

interface todo {
  id: number
  inProcess: Boolean
  text: String
}
const Todos = () => {
  const [todoInput, setTodoInput] = useState('')
  const [todoList, setTodoList] = useState<todo[]>([])
  const [{ user }] = useStateValue()

  const addTodo = (e: any) => {
    e.preventDefault()
    var newTodo = [
      ...todoList,
      {
        id: Date.now(),
        inProcess: false,
        text: todoInput,
      },
    ]
    setTodoInput('')
    setTodoList(newTodo)
    localStorage.setItem('todos', JSON.stringify(newTodo))
  }
  const removeTodo = (id: number) => {
    let newTodo = todoList.filter((v) => v.id != id)
    localStorage.setItem('todos', JSON.stringify(newTodo || '[]'))
    setTodoList([...newTodo])
  }
  const complated = (id: number) => {
    removeTodo(id)
  }
  const inProcess = (id: number) => {
    let processing: any = []
    let newtodoList: any = []
    todoList.map((v) => {
      if (v.id === id) {
        if (v.inProcess === true)
          newtodoList.push({
            id: v.id,
            inProcess: !v.inProcess,
            text: v.text,
          })
        else
          processing.push({
            id: v.id,
            inProcess: !v.inProcess,
            text: v.text,
          })
      } else newtodoList.push(v)
    })

    localStorage.setItem(
      'todos',
      JSON.stringify([...processing, ...newtodoList])
    )
    setTodoList([...processing, ...newtodoList])
  }
  const deleteIt = (id: number) => {
    if (confirm('Are you sure to delete the todo?')) removeTodo(id)
  }
  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem('todos') || '[]')
    setTodoList(todos)
  }, [])

  return (
    <div className="todo_container mx-auto py-3 px-1">
      <Head>
        <title>Todos {user.name ? `| ${user.name}` : ''}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="">
        {todoList.length === 0 && (
          <p className="py-4 text-center text-lg">WOW, I am free now.😎</p>
        )}
        {todoList.map((t, key) => (
          <p
            key={key}
            className="my-2 flex cursor-pointer items-center justify-between rounded-md  shadow hover:shadow-lg md:p-1"
          >
            <span className="inline-block w-32">
              <IconButton
                onClick={() => complated(t.id)}
                color="success"
                title="Comoplate"
              >
                <CheckCircleOutlineIcon />
              </IconButton>

              <IconButton
                onClick={() => inProcess(t.id)}
                title="In progress"
                color="primary"
              >
                {t.inProcess == true ? (
                  <CheckCircleIcon />
                ) : (
                  <CheckCircleOutlineIcon />
                )}
              </IconButton>
            </span>
            <span className="todo_text inline-block w-full overflow-hidden">
              {t.text}
            </span>
            <IconButton
              onClick={() => deleteIt(t.id)}
              color="error"
              className="delete_btn invisible opacity-0"
            >
              <DeleteForeverIcon />
            </IconButton>
          </p>
        ))}
      </div>
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
    </div>
  )
}

export default Todos
