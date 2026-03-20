import { useContext, useEffect, useState } from "react"
import styled from "styled-components"
import { postLogin } from "./api"
import MyContext from "./context"
import { useNavigate } from "react-router-dom"

export default function Inicial(){
    const navigate=useNavigate()
    const {setUsuario,usuario}=useContext(MyContext)
    const [username,setUsername]=useState('')
    const [senha,setSenha]=useState('')
    const [erro,setErro]=useState('')
    function login(){
        postLogin({username,senha}).then(res=>{
            setUsuario(res.data)
            navigate('/livros')
        }).catch(err=>{
            console.log(err.response.data)
            setErro(err.response.data)
        })
    }
    useEffect(()=>{
        setErro('')
    },[username,senha])
    return(
        usuario?
        <Tela>
            <h3>{usuario.username}</h3>
            <Botao style={{background:'brown'}} onClick={()=>setUsuario(false)}>LogOut</Botao>
        </Tela>:
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
            {erro?<h5>{erro}</h5>:<></>}
            <Botao onClick={login}>LogIn</Botao>
            <Botao style={{width:'280px'}} onClick={()=>navigate('/cadastro')}>Não possui cadastro? Cadastre-se</Botao>
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
h5{
margin:20px;
font-size:17px;font-weight:400;
color:yellow;
}
h3{
font-weight:400;
color:white;
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