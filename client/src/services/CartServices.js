import Client from './api'

export const GetUserCartsList = async (userId) => {
  const res = await Client.get(`/users/cartslist/${userId}`)
  return res
}

export const GetUserCartItems = async (userId) => {
  const res = await Client.get(`/users/cartsitems/${userId}`)
  return res
}

export const AddItemToUserCart = async (data) => {
  const res = await Client.post('/cartlisting/add', data)
  return res
}

export const RemoveItemFromUserCart = async (data) => {
  const res = await Client.delete('/cartlisting/remove', {data})
  return res
}