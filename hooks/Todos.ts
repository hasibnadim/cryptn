import {
  addDoc,
  deleteDoc,
  DocumentData,
  getDocs,
  query,
  setDoc,
  where,
} from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { todo } from '../pages/todos'
import { todoCollection } from '../service/firebasedb'
import { userType } from '../service/Store'

export const useTodos = (user: userType) => {
  const [todos, setTodos] = useState<todo[] | DocumentData[]>([])
  const [status, setStatus] = useState('')

  async function getFirestoreTodo() {
    setStatus('Todo Loading ...')
    let q = query(todoCollection, where('uid', '==', user.uid))
    return await getDocs(q)
  }
  function sortByProcc(todos: todo[] | DocumentData[]) {
    let procceing = todos.filter((v) => v.inProcess == true)
    let notProcceing = todos.filter((v) => v.inProcess == false)
    return [...procceing, ...notProcceing]
  }

  useEffect(() => {
    if (!user.loading) {
      setStatus('')
      const localTodos: todo[] = JSON.parse(
        localStorage.getItem('todos') || '[]'
      )
      if (user.isLogin) {
        // user logged in load remote todo and try to sync
        const remoteTodos = getFirestoreTodo()
        remoteTodos.then(async (data) => {
          setStatus('')
          var tmpDone = 0

          var tmpTodo: DocumentData[] = data.docs.map((v) => ({
            ...v.data(),
            ref: v.ref,
          }))

          if (localTodos.length > 0) {
            if (confirm('Do you want sync local todos with your account?')) {
              for (let etodo of localTodos) {
                try {
                  var doc = await addDoc(todoCollection, {
                    ...etodo,
                    uid: user.uid,
                  })
                  tmpDone += 1
                  tmpTodo.push({ ...etodo, uid: user.uid, ref: doc })
                } catch (error) {
                  //
                }
              }
              localStorage.removeItem('todos')
              setStatus(
                `${tmpDone} Todo(s) added.${
                  localTodos.length - tmpDone > 0
                    ? `${localTodos.length - tmpDone} Todo(s) adding failed!`
                    : ''
                }`
              )
              setTimeout(() => {
                setStatus('')
              }, 2000)
            }
          }

          setTodos(sortByProcc([...tmpTodo].sort((a, b) => a.id - b.id)))
        })
      } else {
        // user not logged in load local todo
        setTodos([...localTodos])
      }
    } else setStatus('Todo Loading ...')
  }, [user.loading, user.isLogin])

  const saveTodo = (todos: todo[] | DocumentData[]) => {
    if (user.isLogin) {
      // user logged in save at firestore
      setTodos(sortByProcc(todos))
    } else {
      //user not logged in save localstoreage
      let tempTodo = sortByProcc(todos)
      setTodos(tempTodo)
      localStorage.setItem('todos', JSON.stringify(tempTodo))
    }
  }
  const addTodo = (text: string) => {
    let newTodo = {
      id: Date.now(),
      uid: user.uid,
      inProcess: false,
      text: text,
    }
    let rebuildTodo = [...todos, newTodo]
    if (user.isLogin) {
      setStatus('Adding new Todo ...')
      addDoc(todoCollection, newTodo)
        .then((nt) => {
          setStatus('')
          saveTodo([...todos, { ...newTodo, ref: nt }])
        })
        .catch((v) => {
          setStatus('New Todo add failed!')
          setTimeout(() => {
            setStatus('')
          }, 2000)
        })
    } else saveTodo(rebuildTodo)
  }

  const complateTodo = async (id: number) => {
    if (confirm('Are you sure the TODO is complated?')) {
      let rebuildTodo = todos.filter((v) => v.id != id)
      if (user.isLogin) {
        let targetTodo = todos.filter((v) => v.id == id)
        setStatus('Todo deleteing')
        deleteDoc(targetTodo[0].ref)
          .then(() => {
            setStatus('Todo deleted.')
            saveTodo(rebuildTodo)
            setTimeout(() => {
              setStatus('')
            }, 2000)
          })
          .catch(() => {
            setStatus('Todo deleteing failed!')
            setTimeout(() => {
              setStatus('')
            }, 2000)
          })
      } else {
        saveTodo(rebuildTodo)
      }
    }
  }

  const toggleAction = (id: number) => {
    let rebuildTodo = todos.map((v) => ({
      ...v,
      inProcess: v.id === id ? !v.inProcess : v.inProcess,
    }))
    if (user.isLogin) {
      setStatus('Todo staging ...')
      let targetTodo = todos.filter((v) => v.id === id)
      setDoc(targetTodo[0].ref, {
        ...targetTodo[0],
        inProcess: !targetTodo[0].inProcess,
      })
        .then(() => {
          setStatus('')
          saveTodo(rebuildTodo)
        })
        .catch(() => {
          setStatus('Todo staging failed!')
          setTimeout(() => {
            setStatus('')
          }, 2000)
        })
    } else saveTodo(rebuildTodo)
  }

  return { todos, status, addTodo, complateTodo, toggleAction }
}
