import React, { FC } from 'react';

import "./App.scss"


import {  Todo, DispatchType} from "./interfaces/Todo"



import {  Store } from "./store"

const App: FC = (props ) => {

  // * use hook to get context
  // const {state, dispatch} = React.useContext(Store)

  return (
      <div className="todo-app">
         <h1 className="main-title">Todo with Redux</h1>
         <AddTodo />
         <TodoList />
      </div>
  );
};

export default App



const TodoList: FC<{}> =(props)=>{

  const { state, dispatch} = React.useContext<{state: Todo[], dispatch(obj: DispatchType ):any }>(Store)

  const todos = state


  const activeTodos: Todo[] = []
  const completeTodos: Todo[] = []
  for (let todo of todos){
    if (todo.isComplete === true){
      completeTodos.push(todo)
    } else{
      activeTodos.push(todo)
    }
  }

  function toggleComplete(id:string){
    dispatch({
      type: "TOGGLE_TODO",
      payload: { id: id }
    })
  }
  function deleteTodo(id:string){
    dispatch({
      type: "DELETE_TODO",
      payload: { id: id }
    })
  }

  return (
    <div className="todo-list">
      <ul className="active-todo" >
        <h2>Todos</h2>
        <h4>Active todo</h4>
        { activeTodos.map(todo=>(
          <li key={todo.id}>
            <span onClick={(e)=>toggleComplete(todo.id)}> {todo.title}</span>
            <i className="fa fa-trash" onClick={(e)=>deleteTodo(todo.id)} />
          </li>
        )) }
      </ul>
      <ul className="complete-todo active-todo ">
        <h4>Complete todo</h4>
        { completeTodos.map(todo=>(
          <li key={todo.id}>
            <span onClick={(e)=>toggleComplete(todo.id)}> {todo.title}</span>
            <i className="fa fa-trash" onClick={(e)=>deleteTodo(todo.id)} />
          </li>
        )) }
      </ul>
    </div>
  );
};




const AddTodo: FC<{}> =(props)=>{
  const input = React.useRef<HTMLInputElement>(null)

  const { state, dispatch} = React.useContext<{state: Todo[], dispatch(obj: DispatchType ):any }>(Store)

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    if(input.current!.value){
      dispatch({
        type: "ADD_TODO",
        payload: {
          todo: { id: Math.random().toString(), title: input.current!.value, isComplete: false }
        }
      })
      input.current!.value = ""
    }
  }

  return (
    <div className="add-todo">
      <form onSubmit={handleSubmit}>
        <div className="form-control">
          <label htmlFor="title">Title</label>
          <input type="text" ref={input} id="title" />
        </div>
        <button type="submit">Add</button>
      </form>
    </div>
  );
};
