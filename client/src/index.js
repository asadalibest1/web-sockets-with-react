import React from 'react';
// import Home from './Home';
import App from './ws';
// import LiveEditor from './App';
// import LiveEditor from './App1';
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

let pathname = window.location.pathname;

render(
  //   <Router>
  //     <Routes>
  //       <Route path="/" element={
  //         <Home />} />
  //       <Route path="/live-editor/:sessionId/:userId" element={
  //         <LiveEditor />
  // } />
  //     </Routes>
  //   </Router >
  // <LiveEditor pathname={pathname} />
  <App />
  ,
  document.getElementById("root")
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();


