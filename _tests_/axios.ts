import Axios from 'axios'

const http = Axios.create({
  baseURL: 'http://localhost:3001',
})

http.interceptors.response.use((response) => response.data)

export default http
