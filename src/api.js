import axios from "axios"

const baseURL='https://livraria-back-tc52.onrender.com'

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
export const postLivros = async (livro,usuario) => {
  return api.post(`/livros`,livro,{headers: {'admincode': usuario.codigo}})
}
export const deleteLivro = async (id,usuario) => {
  return api.delete(`/livros/${id}`,{headers: {'admincode': usuario.codigo}})
}


export const getPedidos = async (usuario) => {
  if(usuario.tipo=='Admin'){
    return api.get(`/pedidos`,{headers: {'admincode': usuario.codigo}})
  }else{
    return api.get(`/pedidos/${usuario.id}`)
  }
}
export const postPedido = async (idUsuario,idLivro) => {
  return api.post(`/pedidos/${idUsuario}/${idLivro}`)
}
export const putPedido = async (id,usuario) => {
  return api.put(`/pedidos/${id}`,{},{headers: {'admincode': usuario.codigo}})
}
export const deletePedido = async (id,usuario) => {
  return api.delete(`/pedidos/${id}`,{headers: {'admincode': usuario.codigo}})
}