import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

interface ISignIn {
  email: string
  password: string
}

export const useLogin = () => {
  return useMutation({
    mutationFn: async (data: ISignIn) => {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/signin`,
        data
      )
      return res.data
    },
  })
}
