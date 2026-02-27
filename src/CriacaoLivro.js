import { useContext, useState } from "react"
import styled from "styled-components"
import { FaAngleDown } from "react-icons/fa";
import { FaAngleUp } from "react-icons/fa";
import { postLivros } from "./api";
import { useNavigate } from "react-router-dom";
export default function CriacaoLivro(){
    const navigate=useNavigate()
    const [titulo,setTitulo]=useState('')
    const [paginas,setPaginas]=useState('')
    const [preco,setPreco]=useState('')
    const [estoque,setEstoque]=useState('')

    const [tema,setTema]=useState('Tema')
    const [escolhendo,setEscolhendo]=useState(false)
    function criar(){
        postLivros({titulo,paginas,preco,estoque,tema}).then(res=>{
            navigate('/livros')
        }).catch(err=>{
            
        })
    }
    function escolherTema(novoTema){
        setTema(novoTema)
        setEscolhendo(false)
    }
    return (
        <Tela>
            <Input nome={'Título'} valor={titulo} mudanca={setTitulo} />
            <Input nome={'Páginas'} valor={paginas} mudanca={setPaginas} />
            <Input nome={'Preço'} valor={preco} mudanca={setPreco} />
            <Input nome={'Estoque'} valor={estoque} mudanca={setEstoque} />
            {escolhendo?
            <Telona>
                <article>
                    <Tema escolher={escolherTema} nome={'Fantasia'}/>
                    <Tema escolher={escolherTema} nome={'Romance'}/>
                    <Tema escolher={escolherTema} nome={'Suspense'}/>
                    <Tema escolher={escolherTema} nome={'Tecnologia'}/>
                    <Tema escolher={escolherTema} nome={'História'}/>
                </article>
                <FaAngleUp style={{margin:'5px -5px 0 0'}} onClick={()=>setEscolhendo(false)}  />
            </Telona>:
            <Telinha  onClick={()=>setEscolhendo(true)} >
                <p>{tema}</p>
                <FaAngleDown />
            </Telinha>}
            <section>
                <Botao onClick={()=>navigate('/livros')}>
                    Cancelar
                </Botao>
                <Botao onClick={criar}>
                    Criar
                </Botao>
            </section>
        </Tela>
    )
}
function Tema({nome,escolher}){
    return <p onClick={()=>escolher(nome)}>{nome}</p>
}
function Input({nome,valor,mudanca}){
    return <input
        value={valor}
        placeholder={`${nome}...`}
        onChange={e=>mudanca(e.target.value)}
        />
}
const Telinha=styled.div`
display:flex;
width:300px;background:white;
height:40px;border-radius:10px;
align-items:center;
padding:10px;
cursor:pointer;
justify-content:space-between;
p{color:black}
`
const Telona=styled.div`
display:flex;
cursor:pointer;
padding:5px 0 5px 0;
width:300px;background:white;
border-radius:10px;
justify-content:center;
article{margin-left:-10px;width:calc(100% - 30px)}
p{
margin:0;border-radius:10px;
color:black;padding:5px;cursor:pointer;
}
p:hover{background:#0000b5;color:white}
`
const Tela=styled.div`
padding:20px;
flex-direction:column;
height:calc(100% - 60px);
width:100%;
align-items:center;
h6{margin:0;font-size:18px;color:yellow;}
section{display:flex;position:absolute;bottom:20px}
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