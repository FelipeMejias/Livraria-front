import { useEffect, useState } from "react"
import styled from "styled-components"
import { getLivros } from "./api"
import { Oval } from 'react-loader-spinner';
import CriacaoLivro from "./CriacaoLivro";
import { useNavigate } from "react-router-dom";
export default function Livros(){
    const navigate=useNavigate()
    const [livros,setLivros]=useState([])
    const [erro,setErro]=useState('')
    const [loading,setLoading]=useState(false)
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
            <Botao onClick={()=>navigate('/livros/criar')}>Novo Item</Botao>
            {livros.map(livro=><Livro>
                <p>{livro.titulo}</p>
                <p>{livro.autor}</p>
                <p>{livro.tema}</p>
                <p>{livro.paginas}</p>
                <p>{livro.preco.toFixed(2)}</p>
            </Livro>)}
        </Tela>
    )
}
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
`
const Livro=styled.div`
flex-direction:column;
background:white;
border-radius:10px;
padding:20px;
width:450px;
p{margin:0;}

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