import React from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import {LoginPage} from "../pages/LoginPage/LoginPage";
import RegistrationPage from "../pages/RegistrationPage/RegistrationPage";
import HomePage from "../pages/HomePage/HomePage";
import TodoPage from "../pages/TodoPage/TodoPage";
import "./index.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage/>} exact/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/register" element={<RegistrationPage/>}/>
        <Route path="/todolist" element={<TodoPage/>}/>
      </Routes>
    </Router>
  );
}

export default App;
