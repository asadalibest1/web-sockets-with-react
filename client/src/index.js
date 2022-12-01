import React from 'react';
import Home from './Home';
import LiveEditor from './App';
// import reportWebVitals from './reportWebVitals';



import { render } from "react-dom";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Routes,
  Link,
  useNavigate
} from "react-router-dom";

render(
  // <Router>
  //   <Routes>
  //     <Route path="/" element={
  //       <Home />
  //     } />
  //     <Route path="/live-editor/:sessionId/:userId" element={
  <LiveEditor />
  // } />
  //   </Routes>
  // </Router >
  ,
  document.getElementById("root")
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();


