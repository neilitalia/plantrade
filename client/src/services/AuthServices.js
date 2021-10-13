import Client from './api'

export const Login = async (data) => {
  const res = await Client.post('/auth/login', data)
  return res
}

export const RegisterUser = async (data) => {
  const res = await Client.post('/auth/register', data)
  return res
}