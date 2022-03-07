import React, { useEffect, useState } from 'react'
import AddIcon from '@mui/icons-material/Add'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import IconButton from '@mui/material/IconButton'
interface todo {
  id: number
  inProgress: Boolean
  text: String
}
const Todos = () => {
  const [todoInput, setTodoInput] = useState('')
  const [todoList, setTodoList] = useState<todo[]>([])
  const addTodo = (e: any) => {
    e.preventDefault()
    var newTodo = [
      {
        id: todoList.length + 1,
        inProgress: false,
        text: todoInput,
      },
      ...todoList,
    ]
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
  const inProgress = (id: number) => {
    let targetedTodo: todo = todoList[id - 1]
    targetedTodo = {
      id: targetedTodo.id,
      inProgress: !targetedTodo.inProgress,
      text: targetedTodo.text,
    }
    todoList[id - 1] = targetedTodo
    localStorage.setItem('todos', JSON.stringify(todoList))
    setTodoList([...todoList])
  }
  const deleteIt = (id: number) => {
    if (confirm('Are you sure to delete the todo?')) removeTodo(id)
  }
  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem('todos') || '[]')
    setTodoList(todos)
  }, [])

  return (
    <div className="mx-auto flex w-full flex-col items-center p-2 lg:w-3/5">
      <div className=" w-full p-2">
        {todoList.map((t, key) => (
          <p
            key={key}
            className="my-2 flex cursor-pointer items-center justify-between rounded-md  p-1 shadow hover:shadow-lg"
          >
            <span className="inline-block w-32">
              <IconButton
                onClick={() => complated(t.id)}
                title="Comoplate"
                className="text-green-700"
              >
                <CheckCircleOutlineIcon />
              </IconButton>
              <IconButton
                onClick={() => inProgress(t.id)}
                title="In progress"
                className="text-blue-400"
              >
                {t.inProgress ? (
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
              className="delete_btn invisible text-red-400 opacity-0"
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
          className="w-full bg-transparent p-1 px-5 outline-none md:text-xl"
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
