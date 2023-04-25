import React from 'react';
import './App.css';
import { Routes, Route } from "react-router-dom";
import NotFound404 from "./Pages/NotFound404/NotFound404";
import Main from "./Pages/Main/Main";
import Room from "./Pages/Room/Room";

function App() {
  return (
    <Routes>
      <Route path='/room/:id' element={<Room />}/>
      <Route path='/' element={<Main />}/>
      <Route element={<NotFound404 />}/>
    </Routes>
  );
}

export default App;
