import { useState } from 'react';
import { Routes, Route } from 'react-router-dom'
import { Stack } from '@mui/material'
import './App.css'
import Home from './Pages/Home';
import MemorizedWords from './Pages/MemorizedWords';
import Quiz from './Pages/Quiz';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/memorized' element={<MemorizedWords />} />
      <Route path='/quiz' element={<Quiz />} />
    </Routes>
  )
}

export default App
