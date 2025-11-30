'use client'

import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from 'react'

interface User {
  _id: string
  username: string
  email: string
  role: 'user' | 'admin' | 'superadmin'
  createdAt: string
  updatedAt: string
}

interface AuthProviderType {
  user: User | null
  setUser: Dispatch<SetStateAction<User | null>>
  token: string | null
  setToken: Dispatch<SetStateAction<string | null>>
  logout: () => void
  isAuthenticated: boolean
}

export const AuthContext = createContext<AuthProviderType | undefined>(
  undefined
)

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    const storedToken = localStorage.getItem('token')

    if (storedUser) setUser(JSON.parse(storedUser as string))
    if (storedToken) setToken(storedToken)
  }, [])

  const logout = () => {
    setUser(null)
    setToken(null)
    localStorage.removeItem('user')
    localStorage.removeItem('token')
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        token,
        setToken,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
