import { useEffect, useState } from "react"
import styled from "styled-components"
import { getLivros } from "./api"

export default function Livros(){
    const [livros,setLivros]=useState([])
    function buscarLivros(){
        getLivros().then(res=>{
            const {data}=res
            setLivros(data)
        })
    }
    useEffect(buscarLivros,[])
    return(
        <Tela>
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
const Livro=styled.div`
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
background:gray;
height:calc(100% - 60px);
width:100%;
align-items:center;
`