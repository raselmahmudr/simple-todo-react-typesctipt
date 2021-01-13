import {Todo, DispatchType} from "./interfaces/Todo";


export const addTodo=(todo: Todo): DispatchType=>{
  return {
    type: "ADD_TODO",
    payload: { todo: todo }
  }
}


export const deleteTodo=(todoId: string): DispatchType=>{
  return{
    type: "DELETE_TODO",
    payload: { id: todoId }
  }
}


export const toggleComplete=(todoId: string): DispatchType=>{
  return{
    type: "TOGGLE_TODO",
    payload: { id: todoId }
  }
}


