import React, { FC } from 'react';

import "./App.scss"


import {  Todo, DispatchType} from "./interfaces/Todo"


const App: FC = (props ) => {
  const [ todos, setTodo ] = React.useState<Todo[]>([])

  const addTodoHandle=(title:string): void =>{
    let newTodo:Todo = {
      id: Math.random().toString(),
      title,
      isComplete: false
    }
    setTodo(prevState=>[...prevState, newTodo ])
  }

  function deleteTodoHandle(id: string) :void{
    setTodo(todos.filter(item=> item.id !== id ))
  }
  function completeTodoHandle(id: string) :void{
    let copyTodo = [...todos]
    let findIndex = copyTodo.findIndex(t=>t.id === id)
    if (copyTodo[findIndex].isComplete){
      copyTodo[findIndex].isComplete = !todos[findIndex].isComplete
      setTodo( copyTodo )
    } else{
      copyTodo[findIndex].isComplete = true
      setTodo( copyTodo )
    }
  }

  return (
      <div className="todo-app">
         <h1 className="main-title">Todo with Local State</h1>
        <AddTodo onAddTodoHandler={addTodoHandle} />
        <TodoList onTodoComplete={completeTodoHandle} onDeleteTodo={deleteTodoHandle} todos={todos}/>
      </div>
  );
};

export default App


type TodoListProps = {
  todos: Todo[]
  onDeleteTodo(id: string):void
  onTodoComplete(id: string):void
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
            <span onClick={(e)=>props.onTodoComplete(todo.id)}> {todo.title}</span>
            <i className="fal fa-trash" onClick={(e)=>props.onDeleteTodo(todo.id)} />
          </li>
        )) }
      </ul>
      <ul className="complete-todo active-todo ">
        <h4>Complete todo</h4>
        { completeTodos.map(todo=>(
          <li key={todo.id}>
            <span onClick={(e)=>props.onTodoComplete(todo.id)}> {todo.title}</span>
            <i className="fal fa-trash" onClick={(e)=>props.onDeleteTodo(todo.id)} />
          </li>
        )) }
      </ul>
    </div>
  );
};


type AddTodoProps = {
  onAddTodoHandler(x:string):void
}


const AddTodo: FC<AddTodoProps> =(props)=>{
  const input = React.useRef<HTMLInputElement>(null)

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    if(input.current!.value){
      props.onAddTodoHandler(input.current!.value)
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

