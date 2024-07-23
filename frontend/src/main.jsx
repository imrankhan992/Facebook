import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "./styles/icons/icons.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom"
import { createStore } from "redux"
import { Provider } from "react-redux"
import { composeWithDevTools } from "@redux-devtools/extension"
import rootReducer from "./reducers";
import { Toaster } from "./components/ui/sonner";
const store = createStore(rootReducer, composeWithDevTools())

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
      <Toaster   />
    </Router>
  </Provider>,
  document.getElementById("root")
);
