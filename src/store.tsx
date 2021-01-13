import React, {FC} from "react"
import { createStore} from "redux";


// model
import {DispatchType,  Todo} from "./interfaces/Todo"

const initialState = [{id: "preload state", title: "wake up at 6 am", isComplete: false}]

function todoReducer(state: Todo[] = initialState, action: DispatchType ): Todo[] {
  let updatedTodos = [...state]
  switch (action.type) {
    case "ADD_TODO":
      if(action.payload.todo){
        return [...state, action.payload.todo]
      }

    case "DELETE_TODO":
      return updatedTodos.filter(item=>item.id !== action.payload.id)

    case "TOGGLE_TODO":
      let findTodoIndex = updatedTodos.findIndex(item=>item.id === action.payload.id)
      if(updatedTodos[findTodoIndex]){
        updatedTodos[findTodoIndex].isComplete = !updatedTodos[findTodoIndex].isComplete
      }else{
        updatedTodos[findTodoIndex].isComplete = true
      }
      return updatedTodos

    default:
      return state
  }
}

export default  createStore(todoReducer)









