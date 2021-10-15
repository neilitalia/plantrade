import Client from './api'

export const GetAllListings = async () => {
  const res = await Client.get('/listings/all')
  return res
}

export const GetListingById = async (id) => {
  const res = await Client.get(`/listings/id/${id}`)
  return res
}

export const SearchForListings = async (data) => {
  const res = await Client.post('/listings/search', data)
  return res
}