import Axios from 'axios'

const BASE_URL = 'http://localhost:3001/api'
const Client = Axios.create({ baseURL: BASE_URL })

export default Client
