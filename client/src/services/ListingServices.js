import Client from './api'

export const GetAllListings = async () => {
  const res = await Client.get('/listings/all')
  return res
}
