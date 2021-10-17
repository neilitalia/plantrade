import Client from './api'

export const GetAllListings = async () => {
  const res = await Client.get('/listings/all')
  return res
}

export const GetListingById = async (id) => {
  const res = await Client.get(`/listings/id/${id}`)
  return res
}

export const GetListingsByUser = async (user_id) => {
  const res = await Client.get(`/listings/fromuser/${user_id}`)
  return res
}

export const SearchForListings = async (data) => {
  const res = await Client.post('/listings/search', data)
    .then((res) =>{
    return res
  }).catch((err)=>{
    return err.response
  })
  return res
}

export const SubmitNewListing = async (data) => {
  const res = await Client.post('/listings/new', data)
    .then((res) =>{
    return res
  }).catch((err)=>{
    return err.response
  })
  return res
}

export const DeleteListing = async (listing_id) => {
  const res = await Client.delete(`/listings/delete/${listing_id}`)
    .then((res) =>{
    return res
  }).catch((err)=>{
    return err.response
  })
  return res
}