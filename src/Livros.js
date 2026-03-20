import { useContext, useEffect, useState } from "react"
import styled from "styled-components"
import { deleteLivro, getLivros, postPedido } from "./api"
import { Oval } from 'react-loader-spinner';
import CriacaoLivro from "./CriacaoLivro";
import { useNavigate } from "react-router-dom";
import MyContext from "./context";
export default function Livros(){
    const {usuario}=useContext(MyContext)
    const navigate=useNavigate()
    if(!usuario)navigate('/')
    const [livros,setLivros]=useState([])
    const [erro,setErro]=useState('')
    const [loading,setLoading]=useState(false)
    function comprar(livroId){
        console.log(usuario.id,livroId)
        postPedido(usuario.id,livroId).then(res=>{
            
            navigate('/pedidos')
        }).catch(err=>{
            setErro('Servidor fora do ar')
        })
    }
    function excluir(livroId){
        deleteLivro(livroId,usuario).then(res=>{
            buscarLivros()
        }).catch(err=>{
            setErro('Servidor fora do ar')
        })
    }
    function buscarLivros(){
        setLoading(true)
        getLivros().then(res=>{
            const {data}=res
            setLivros(data)
            setLoading(false)
        }).catch(err=>{
            setErro('Servidor fora do ar')
            setLoading(false)
        })
    }
    useEffect(buscarLivros,[])
    
    return(
        <Tela>
            {loading?<Oval height={100} width={100} color="#ffffff" wrapperStyle={{marginTop:'20px'}}visible={true} ariaLabel="oval-loading"/>:<></>}
            {erro?<h6>{erro}</h6>:<></>}
            {usuario.tipo=='Admin'?
            <Botao onClick={()=>navigate('/livros/criar')}>
                Novo Livro
            </Botao>:<></>}
            {livros.map(livro=>{
                return <Livro>
                <p>{livro.titulo}</p>
                <p>{livro.tema}</p>
                <p>{livro.paginas} páginas</p>
                <h2>R$ {livro.preco.toFixed(2)}</h2>
                {usuario.tipo=='Admin'?
                <BotaoCanto style={{background:'gray'}} onClick={()=>{excluir(livro.id)}}>
                    Excluir
                </BotaoCanto>:
                <BotaoCanto onClick={()=>{comprar(livro.id)}}>
                    Comprar
                </BotaoCanto>}
            </Livro>})}
        </Tela>
    )
}
const BotaoCanto=styled.div`
background:green;cursor:pointer;
position:absolute;color:white;
top:10px;right:10px;
border-radius:10px;
padding:10px;
p{margin:0;}
`
const Botao=styled.div`
display:flex;cursor:pointer;
align-items:center;
justify-content:center;
min-height:50px;
width:120px;
margin-top:10px;
background:#0000b5;
border-radius:10px;
color:white;
position:sticky;top:10px;
z-index:5;
`
const Livro=styled.div`
max-width:95%;
position:relative;
flex-direction:column;
background:white;
border-radius:10px;
padding:20px;
width:450px;
p{margin:0px 0 5px 0;}
h2{
    margin:0;color:green;
    font-size:18px;
    position:absolute;right:15px;
    bottom:15px;
    }
margin-top:10px;
`
const Tela=styled.div`
position:relative;
flex-direction:column;
height:calc(100% - 60px);
width:100%;
align-items:center;
h6{margin:0;font-size:18px;color:yellow;}
overflow:auto;
`