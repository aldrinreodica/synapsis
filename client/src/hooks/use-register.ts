'use client'

import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

interface ISignUp {
  username: string
  email: string
  password: string
}

export const useRegister = () => {
  return useMutation({
    mutationFn: async (data: ISignUp) => {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/signup`,
        data
      )
      return res.data
    },
  })
}
