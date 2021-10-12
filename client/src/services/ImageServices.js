import axios from 'axios'
import Client from './api'

export const GetUploadUrl = async (data) => {
  const res = await Client.post('/image/url', data)
  return res
}

export const UploadToBucket = async (url, data) => {
  const res = axios.put(url, data, {
    header: {
      "Content-Type": data.type
    }
  })
  return res
}