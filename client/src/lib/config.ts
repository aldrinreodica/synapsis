const environment = process.env.NEXT_PUBLIC_NODE_ENV || ''

const config = {
  development: {
    NODE_ENV: environment,
    API_URL: process.env.NEXT_PUBLIC_API_URL || '',
  },
}

export const { NODE_ENV, API_URL } = config[environment as keyof typeof config]
