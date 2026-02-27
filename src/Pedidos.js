import { useEffect, useState } from "react"
import styled from "styled-components"
import { getPedidos } from "./api"
import { Oval } from 'react-loader-spinner';
export default function Pedidos(){
    const [pedidos,setPedidos]=useState([])
    const [erro,setErro]=useState('')
    const [loading,setLoading]=useState(false)
    function buscarPedidos(){
        setLoading(true)
        getPedidos().then(res=>{
            const {data}=res
            setPedidos(data)
            setLoading(false)
        }).catch(err=>{
            setErro('Servidor fora do ar')
            setLoading(false)
        })
    }
    useEffect(buscarPedidos,[])
    return(
        <Tela>
            {loading?<Oval height={100} width={100} color="#ffffff" wrapperStyle={{marginTop:'20px'}}visible={true} ariaLabel="oval-loading"/>:<></>}
            {erro?<h6>{erro}</h6>:<></>}
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
h6{margin:0;font-size:18px;color:yellow;}
`