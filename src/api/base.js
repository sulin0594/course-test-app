import axios from "axios"

const serverUrl = 'http://localhost:6001'

const client = axios.create({
  baseURL: serverUrl,
  timeout: 30000,
  headers: { 'Content-Type': 'application/json' }
});

export { client }