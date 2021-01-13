///<reference types="webpack-env" />

import React from "react"
import {render} from "react-dom"

import App from "./App";


import { StoreProvider } from "./store"


render(
  <StoreProvider>
    <App/>
  </StoreProvider>,
  document.getElementById("root")
)



if (module.hot) {
  module.hot.accept()
  // module.hot.dispose(()=>{
  //  render(<App/>, document.getElementById("root") )
  // })
}