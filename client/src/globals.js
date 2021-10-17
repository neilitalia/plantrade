export const API_BASE_URL = process.env.NODE_ENV === 'production'
  ? `${window.location.origin}/api`
  : 'http://localhost:3001/api'

export const AWS_BASE_URL = "https://plantrade.s3.us-east-2.amazonaws.com/"

export const IMAGE_PLACEHOLDER_URL = "https://images.unsplash.com/photo-1562619227-71c891fd2799?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2626&q=80"