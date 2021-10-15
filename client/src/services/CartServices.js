import Client from './api'

export const GetUserCartItems = async (userId) => {
  const res = await Client.get(`/users/cartsitems/${userId}`)
  return res
}