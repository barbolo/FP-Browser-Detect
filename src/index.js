import React from 'react';
import ReactDOM from 'react-dom';
import VConsole from 'vconsole';
import './index.css';
import App from "./App";
import { HashRouter  } from "react-router-dom";

var vConsole = new VConsole();

ReactDOM.render(
  <React.StrictMode>
      {/*<BrowserRouter basename={"FP-Browser-Detect"}>*/}
      <HashRouter >
          <App />
      </HashRouter >,
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
