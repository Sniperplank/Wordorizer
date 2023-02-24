import React from 'react'
import { useAuth } from '../contexts/AuthContext'

function Home() {
    const { user, setUser } = useAuth()

    return (
        <div>{user?.result.name}</div>
    )
}

export default Home