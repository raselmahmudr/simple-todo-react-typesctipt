
import React, {FC} from "react"

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

export const Store = React.createContext<any>(initialState)


// * this Context Provider + useReducer State
export function StoreProvider(props: any) : JSX.Element {
  const [state, dispatch] = React.useReducer(todoReducer, initialState)

  return <Store.Provider value={{state, dispatch}}>{props.children}</Store.Provider>

}








