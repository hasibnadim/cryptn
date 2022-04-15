import Head from 'next/head'
import React, { ReactElement} from 'react'
import { useStateValue } from '../service/Store'
import WebLayout from '../components/WebLayout'
import Form from '../components/todos/From'
import List from '../components/todos/List'
import { useTodos } from '../hooks/Todos'
import { DocumentData, DocumentReference } from 'firebase/firestore'

export interface todo {
  id: number
  inProcess: Boolean
  text: String
  ref?:DocumentReference<DocumentData>
}
const Todos = () => {
  const [{ user }] = useStateValue()
  const { todos,status, addTodo, complateTodo, toggleAction } = useTodos(user)


  return (
    <div className="todo_container mx-auto py-3 px-1">
      <Head>
        <title>Todos {user.name ? `| ${user.name}` : ''}</title>
      </Head>
      
      <Form onAdd={addTodo} />
      <div className="">
      {status&& <p className="text-right text-sm">{status}</p>}
        {todos.length === 0 && (
          <p className="py-4 text-center text-lg">WOW, Now I am free.😎</p>
        )}
        <List
          todoList={todos}
          onDone={(id: number) => complateTodo(id)}
          toggleAction={(id: number) => toggleAction(id)}
        />
      </div>
      
    </div>
  )
}
Todos.getLayout = function getLayout(page: ReactElement) {
  return <WebLayout>{page}</WebLayout>
}
export default Todos
