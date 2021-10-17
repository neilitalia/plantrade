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
    .then((res) =>{
    return res
  }).catch((err)=>{
    return err.response
  })
  return res
}

export const RemoveItemFromUserCart = async (data) => {
  const res = await Client.delete('/cartlisting/remove', {data})
  .then((res) =>{
    return res
  }).catch((err)=>{
    return err.response
  })
  return res
}

export const IncrementCartItem = async (data) => {
  const res = await Client.put('/cartlisting/increment',data)
    .then((res) =>{
    return res
  }).catch((err)=>{
    return err.response
  })
  return res
}

export const DecrementCartItem = async (data) => {
  const res = await Client.put('/cartlisting/decrement',data)
    .then((res) =>{
    return res
  }).catch((err)=>{
    return err.response
  })
  return res
}