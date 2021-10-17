import Client from './api'

export const GetUserById = async (user_id) => {
  const res = await Client.get(`/users/id/${user_id}`)
  return res
}