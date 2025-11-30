import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { API_URL } from '@/lib/config'

export function useLogin() {
  return useMutation({
    mutationFn: async (data: { email: string; password: string }) => {
      const res = await axios.post(`${API_URL}/auth/signin`, data)
      return res.data
    },
  })
}
