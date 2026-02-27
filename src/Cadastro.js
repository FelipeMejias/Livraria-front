import { useContext, useEffect, useState } from "react"
import styled from "styled-components"
import { postCadastro, postLogin } from "./api"
import MyContext from "./context"
import { useNavigate } from "react-router-dom"

export default function Cadastro(){
    const navigate=useNavigate()
    const [username,setUsername]=useState('')
    const [senha,setSenha]=useState('')
    
    function login(){
        postCadastro({username,senha}).then(res=>{
            navigate('/')
        }).catch(err=>{
            console.log(err)
        })
    }
    return(
        <Tela>
            <input
            value={username}
            placeholder={`Username...`}
            onChange={e=>setUsername(e.target.value)}
            />
            <input
            value={senha}
            placeholder={`Senha...`}
            onChange={e=>setSenha(e.target.value)}
            />
            <Botao onClick={login}>Cadastrar</Botao>
            <Botao style={{width:'280px'}} onClick={()=>navigate('/')}>Já é cadastrado? Ir para o login</Botao>
        </Tela>
    )
}

const Tela=styled.div`
padding:20px;
flex-direction:column;
height:calc(100% - 60px);
width:100%;
align-items:center;
input{margin-bottom:10px;
box-sizing:border-box;width:300px;
height:40px;border-radius:10px;
border:0;padding-left:10px;
}
`
const Botao=styled.div`
display:flex;cursor:pointer;
align-items:center;
justify-content:center;
height:50px;
width:120px;
margin:10px 5px 0 5px;
background:black;
border-radius:10px;
color:white;
`