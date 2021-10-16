import axios from 'axios'
import Client from './api'

export const GetUploadUrl = async () => {
  const res = await Client.get('/image/url')
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