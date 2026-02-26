import axios from "axios"

const baseURL='http://localhost:4000'
const api = axios.create({baseURL})

export const getLivros = async () => {
  return api.get(`/livros`)
}
export const getPedidos = async () => {
  return api.get(`/pedidos`)
}