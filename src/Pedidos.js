import { useEffect, useState } from "react"
import styled from "styled-components"
import { deletePedido, getPedidos, putPedido } from "./api"
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
    function alterarPedido(id){
        setLoading(true)
        putPedido(id).then(res=>{
            buscarPedidos()
            setLoading(false)
        }).catch(err=>{
            setErro('Servidor fora do ar')
            setLoading(false)
        })
    }
    function excluirPedido(id){
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
            const {usuario,livro,status,id}=pedido
            return (
                <Pedido>
                    <Status cor={
                        status=='Pago'?'red'
                        :status=='Em entrega'?'orange':
                        'green'
                    }
                    ><p>{status}</p></Status>
                    <p>{usuario.username}</p>
                    <p>{livro.titulo}</p>
                    <p>{livro.preco.toFixed(2)}</p>
                    <section>
                        <Botao onClick={()=>deletePedido(id)}>Excluir</Botao>
                        {status!='Finalizado'?
                            <Botao onClick={()=>putPedido(id)}>Alterar status: {status=='Pago'?'Em entrega':'Finalizado'}</Botao>
                        :<></>}
                    </section>
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
`
const Status=styled.div`
background:${p=>p.cor};
position:absolute;
top:10px;right:10px;
border-radius:10px;
padding:10px;
p{margin:0;}
`
const Pedido=styled.div`
position:relative;
flex-direction:column;
background:white;
border-radius:10px;
padding:20px;
width:450px;
p{margin:0;}
margin-top:10px;
section{display:flex;margin-top:10px}
`
const Tela=styled.div`
flex-direction:column;
height:calc(100% - 60px);
width:100%;
align-items:center;
h6{margin:0;font-size:18px;color:yellow;}
`