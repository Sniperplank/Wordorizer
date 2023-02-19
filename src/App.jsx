import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Stack } from '@mui/material'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route exact path='/memorized' element={<Login />} />
        <Route exact path='/quiz' element={<Signup />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
