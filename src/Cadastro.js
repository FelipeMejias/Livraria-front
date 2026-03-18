import { useContext, useEffect, useState } from "react"
import styled from "styled-components"
import { postCadastro, postLogin } from "./api"
import MyContext from "./context"
import { useNavigate } from "react-router-dom"

export default function Cadastro(){
    const navigate=useNavigate()
    const [username,setUsername]=useState('')
    const [senha,setSenha]=useState('')
    const [codigo,setCodigo]=useState('')
    const [tipo,setTipo]=useState('Usuário')
    const [erro,setErro]=useState('')
    function login(){
        postCadastro({username,senha,tipo,codigo}).then(res=>{
            navigate('/')
        }).catch(err=>{
            console.log(err)
            setErro(err.response.data)
        })
    }
    useEffect(()=>{
        setErro('')
    },[username,codigo])
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
            <section>
                <Botao style={{background:tipo=='Usuário'?'#0000a5':'transparent'}} onClick={()=>setTipo('Usuário')}>Usuário</Botao>
                <Botao style={{background:tipo=='Admin'?'#0000a5':'transparent'}} onClick={()=>setTipo('Admin')}>Admin</Botao>
            </section>
            {tipo=='Admin'?<input
            value={codigo}
            placeholder={`Código de acesso...`}
            onChange={e=>setCodigo(e.target.value)}
            />:<></>}
            {erro?<h5>{erro}</h5>:<></>}
            <article>
                <Botao onClick={login}>Cadastrar</Botao>
                <Botao style={{width:'280px'}} onClick={()=>navigate('/')}>Já é cadastrado? Ir para o login</Botao>
            </article>
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
section{display:flex;margin-bottom:20px;}
article{
margin-top:30px;display:flex;
flex-direction:column;
align-items:center;
}
h5{
margin:20px;
font-size:17px;font-weight:400;
color:yellow;
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