import React, { FC } from 'react';

import "./App.scss"
import {connect} from "react-redux";


import {  Todo, DispatchType} from "./interfaces/Todo"
import {addTodo, deleteTodo, toggleComplete} from "./actions";




const App: FC = (props ) => {

  return (
      <div className="todo-app">
         <h1 className="main-title">Todo with Redux</h1>
        <ConnectedAddTodo />
        <ConnectedTodoList />
      </div>
  );
};

export default App


type TodoListProps = {
  todos: any[]
  deleteTodo(id:string):any
  toggleComplete(id:string):any
}

const TodoList: FC<TodoListProps> =(props)=>{


  let todos = props.todos


  const activeTodos: Todo[] = []
  const completeTodos: Todo[] = []
  for (let todo of todos){
    if (todo.isComplete === true){
      completeTodos.push(todo)
    } else{
      activeTodos.push(todo)
    }
  }

  return (
    <div className="todo-list">
      <ul className="active-todo" >
        <h2>Todos</h2>
        <h4>Active todo</h4>
        { activeTodos.map(todo=>(
          <li key={todo.id}>
            <span onClick={(e)=>props.toggleComplete(todo.id)}> {todo.title}</span>
            <i className="fal fa-trash" onClick={(e)=>props.deleteTodo(todo.id)} />
          </li>
        )) }
      </ul>
      <ul className="complete-todo active-todo ">
        <h4>Complete todo</h4>
        { completeTodos.map(todo=>(
          <li key={todo.id}>
            <span onClick={(e)=>props.toggleComplete(todo.id)}> {todo.title}</span>
            <i className="fal fa-trash" onClick={(e)=>props.deleteTodo(todo.id)} />
          </li>
        )) }
      </ul>
    </div>
  );
};

function mapToStateProps(state: Todo[]) : { todos: Todo[] }  {
  return { todos: state }
}

let ConnectedTodoList = connect(mapToStateProps, { toggleComplete, deleteTodo  })(TodoList)


type AddTodoProps = {
  addTodo(todo: Todo):any
}

const AddTodo: FC<AddTodoProps> =(props)=>{
  const input = React.useRef<HTMLInputElement>(null)

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    if(input.current!.value){
      props.addTodo({ id: Math.random().toString(), title: input.current!.value, isComplete: false })
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

let ConnectedAddTodo = connect(mapToStateProps, { addTodo })(AddTodo)

