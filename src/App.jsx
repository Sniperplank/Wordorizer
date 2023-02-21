import { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom'
import { Stack } from '@mui/material'
import './App.css'
import Home from './Pages/Home';
import MemorizedWords from './Pages/MemorizedWords';
import Quiz from './Pages/Quiz';
import { NavButton } from './StyledComponents/NavButton';

function App() {
  return (
    <Stack>
      <Stack direction='row' spacing={5} justifyContent='space-evenly' p={4}>
        <NavButton component={Link} to='/' variant='text'>All Words</NavButton>
        <NavButton component={Link} to='/memorized' variant='text'>Review</NavButton>
        <NavButton component={Link} to='/quiz' variant='text'>Quiz Me</NavButton>
      </Stack>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/memorized' element={<MemorizedWords />} />
        <Route path='/quiz' element={<Quiz />} />
      </Routes>
    </Stack>
  )
}

export default App
