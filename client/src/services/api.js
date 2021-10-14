import Axios from 'axios'
import {API_BASE_URL} from '../globals'

const Client = Axios.create({ baseURL: API_BASE_URL })

Client.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers['authorization'] = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

export default Client
