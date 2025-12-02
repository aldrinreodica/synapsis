import { createUser } from '@/services/users'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useUserMutation = (action: string) => {
  const queryClient = useQueryClient()
  switch (action) {
    case 'create':
      return useMutation({
        mutationKey: ['user', 'create'],
        mutationFn: createUser,
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['users'] })
        },
      })
    default:
      break
  }
}
