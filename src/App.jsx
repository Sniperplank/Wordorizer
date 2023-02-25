import { useEffect, useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom'
import { Stack } from '@mui/material'
import './App.css'
import Home from './Pages/Home';
import MemorizedWords from './Pages/MemorizedWords';
import Quiz from './Pages/Quiz';
import { NavButton } from './StyledComponents/NavButton';
import Signin from './Pages/Signin';
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from './contexts/AuthContext'

function App() {
  const { user, setUser } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const logout = () => {
    localStorage.clear()
    setUser(null)
    navigate('/')
  }

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem('profile')))
  }, [location])

  return (
    <Stack>
      <Stack direction='row' spacing={5} justifyContent='space-evenly' p={4}>
        <NavButton component={Link} to='/' variant='text'>All Words</NavButton>
        <NavButton component={Link} to='/memorized' variant='text'>Review</NavButton>
        <NavButton component={Link} to='/quiz' variant='text'>Quiz Me</NavButton>
        {
          user ? <NavButton onClick={logout} variant='text'>Sign Out</NavButton> :
            <NavButton component={Link} to='/signin' variant='text'>Sign in</NavButton>
        }
      </Stack>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/memorized' element={<MemorizedWords />} />
        <Route path='/quiz' element={<Quiz />} />
        <Route path='/signin' element={<Signin />} />
      </Routes>
    </Stack>
  )
}

export default App
