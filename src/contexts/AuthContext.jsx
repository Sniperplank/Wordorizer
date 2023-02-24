import React, { createContext, useContext, useState } from 'react'

const AuthContext = createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))

    const value = {
        user, 
        setUser
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}
