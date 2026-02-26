import { useEffect, useState } from "react"
import styled from "styled-components"
import { getPedidos } from "./api"

export default function Pedidos(){
    const [pedidos,setPedidos]=useState([])
    function buscarPedidos(){
        getPedidos().then(res=>{
            const {data}=res
            setPedidos(data)
        })
    }
    useEffect(buscarPedidos,[])
    return(
        <Tela>
            {pedidos.map(pedido=>{
            const {usuario,livro,status}=pedido
            return (
                <Pedido>
                    <p>{usuario.username}</p>
                    <p>{livro.titulo}</p>
                    <p>{livro.preco.toFixed(2)}</p>
                    <p>{status}</p>
                </Pedido>
            )})}
        </Tela>
    )
}
const Pedido=styled.div`
flex-direction:column;
background:white;
border-radius:10px;
padding:20px;
width:400px;
p{margin:0;}
margin-top:10px;
`
const Tela=styled.div`
flex-direction:column;
height:calc(100% - 60px);
width:100%;
align-items:center;
`