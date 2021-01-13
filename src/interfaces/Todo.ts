
export interface Todo {
  id: string
  title: string
  isComplete: boolean
}


type Payload = {
   todo?: Todo,
   id?: string
}

export interface DispatchType {
  type: string,
  payload: Payload
}