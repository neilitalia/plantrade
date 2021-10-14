export const API_BASE_URL = process.env.NODE_ENV === 'production'
  ? `${window.location.origin}/api`
  : 'http://localhost:3001/api'

export const AWS_BASE_URL = "https://plantrade.s3.us-east-2.amazonaws.com/"