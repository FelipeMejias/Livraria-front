import axios from "axios"

const baseURL='http://localhost:4000'
const api = axios.create({baseURL})

export const postLogin = async (usuario) => {
  return api.post(`/usuarios/login`,usuario)
}
export const postCadastro = async (usuario) => {
  return api.post(`/usuarios/cadastro`,usuario)
}

export const getLivros = async () => {
  return api.get(`/livros`)
}
export const postLivros = async (livro) => {
  return api.post(`/livros`,livro)
}


export const getPedidos = async () => {
  return api.get(`/pedidos`)
}
export const postPedido = async (idUsuario,idLivro) => {
  console.log(idUsuario,idLivro)
  return api.post(`/pedidos/${idUsuario}/${idLivro}`)
}
export const putPedido = async (id) => {
  return api.put(`/pedidos/${id}`)
}
export const deletePedido = async (id) => {
  return api.delete(`/pedidos/${id}`)
}