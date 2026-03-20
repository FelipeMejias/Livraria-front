import { useContext, useEffect, useState } from "react"
import styled from "styled-components"
import { FaAngleDown } from "react-icons/fa";
import { FaAngleUp } from "react-icons/fa";
import { postLivros } from "./api";
import { useNavigate } from "react-router-dom";
import MyContext from "./context";
export default function CriacaoLivro(){
    const {usuario}=useContext(MyContext)
    const navigate=useNavigate()
    const [titulo,setTitulo]=useState('')
    const [paginas,setPaginas]=useState('')
    const [preco,setPreco]=useState('')
    const [erro,setErro]=useState('')
    const [tema,setTema]=useState('Tema')
    const temas=['Fantasia','Romance','Suspense','Tecnologia','História']
    const [escolhendo,setEscolhendo]=useState(false)
    function criar(){
        postLivros({titulo,paginas,preco,tema},usuario).then(res=>{
            navigate('/livros')
        }).catch(err=>{
            setErro(err.response.data)
            console.log(err)
        })
    }
    function escolherTema(novoTema){
        setTema(novoTema)
        setEscolhendo(false)
    }
    useEffect(()=>{
        setErro('')
    },[titulo,paginas,preco,tema])
    return (
        <Tela>
            <Input nome={'Título'} valor={titulo} mudanca={setTitulo} />
            <Input nome={'Páginas'} valor={paginas} mudanca={setPaginas} />
            <Input nome={'Preço'} valor={preco} mudanca={setPreco} />
            {escolhendo?
            <Telona>
                <article>
                    {temas.map(t=><Tema escolher={escolherTema} nome={t}/>)}
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
            {erro?<h5>{erro}</h5>:<></>}
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
section{display:flex;margin-top:20px;}
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