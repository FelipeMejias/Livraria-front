import { useContext, useEffect, useState } from "react"
import styled from "styled-components"
import { deletePedido, getPedidos, putPedido } from "./api"
import { Oval } from 'react-loader-spinner';
import MyContext from "./context";
import { useNavigate } from "react-router-dom";
export default function Pedidos(){
    const {usuario}=useContext(MyContext)
    const navigate=useNavigate()
    if(!usuario)navigate('/')
    const [pedidos,setPedidos]=useState([])
    const [erro,setErro]=useState('')
    const [loading,setLoading]=useState(false)
    function buscarPedidos(){
        setLoading(true)
        getPedidos(usuario).then(res=>{
            const {data}=res
            console.log(data)
            setPedidos(data)
            setLoading(false)
        }).catch(err=>{
            setErro('Servidor fora do ar')
            setLoading(false)
        })
    }
    function alterarPedido(id){
        setLoading(true)
        putPedido(id,usuario).then(res=>{
            buscarPedidos()
            setLoading(false)
        }).catch(err=>{
            setErro('Servidor fora do ar')
            setLoading(false)
        })
    }
    function deletarPedido(id){
        setLoading(true)
        deletePedido(id).then(res=>{
            buscarPedidos()
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
            const {usuario:usuarioDoPedido,livro,status,id,data}=pedido
            return (
                <Pedido>
                    <Status cor={
                        status=='Encomendado'?'red'
                        :status=='Em entrega'?'orange':
                        'green'
                    }
                    ><p>{status}</p></Status>
                    {usuario.tipo=='Admin'?<p>{usuarioDoPedido.username}</p>:<></>}
                    <p>{livro.titulo}</p>
                    <p>{livro.preco.toFixed(2)}</p>
                    <p>{data}</p>
                    {usuario.tipo=='Admin' ?
                    <section>
                        <Botao onClick={()=>{deletarPedido(id)}}>Excluir</Botao>
                        {status!='Finalizado'?
                        <Botao onClick={()=>alterarPedido(id)}>
                            Alterar status para: {status=='Encomendado'?'Em entrega':'Finalizado'}
                        </Botao>
                        :<></>}
                    </section>:<></>}
                </Pedido>
            )})}
        </Tela>
    )
}
const Botao=styled.div`
display:flex;cursor:pointer;
align-items:center;
justify-content:center;
height:30px;
margin-right:10px;
padding:0 10px 0 10px;
background:gray;
border-radius:10px;
color:white;
white-space: nowrap
`
const Status=styled.div`
background:${p=>p.cor};
position:absolute;
top:10px;right:10px;
border-radius:10px;
padding:10px;
p{margin:0;color:white;}
`
const Pedido=styled.div`
max-width:95%;
position:relative;
flex-direction:column;
background:white;
border-radius:10px;
padding:20px;
width:450px;
p{margin:0;}
margin-top:10px;
section{display:flex;margin-top:10px;}
`
const Tela=styled.div`
flex-direction:column;
height:calc(100% - 60px);
width:100%;
align-items:center;
h6{margin:0;font-size:18px;color:yellow;}
overflow:auto;
`