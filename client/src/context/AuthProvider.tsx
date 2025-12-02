'use client'

import { IUser } from '@/types/tasks'
import { useRouter } from 'next/navigation'
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from 'react'

interface AuthProviderType {
  user: IUser | null
  setUser: Dispatch<SetStateAction<IUser | null>>
  token: string | null
  setToken: Dispatch<SetStateAction<string | null>>
  logout: () => void
  isAuthenticated: boolean
}

export const AuthContext = createContext<AuthProviderType | undefined>(
  undefined
)

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter()
  const [user, setUser] = useState<IUser | null>(null)
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
    router.push('/')
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
