import { useLocation, useNavigate } from "react-router-dom"
import styled from "styled-components"

export default function Menu(){
    const navigate=useNavigate()
    const {pathname}=useLocation()
    return(
        <Tela>
            <Holder>
                <Botao atual={pathname=='/'||pathname=='/cadastro'} onClick={()=>navigate('/')}>Usuario</Botao>
                <Botao atual={pathname=='/livros'} onClick={()=>navigate('/livros')}>Livros</Botao>
                <Botao atual={pathname=='/pedidos'} onClick={()=>navigate('/pedidos')}>Pedidos</Botao>
            </Holder>
        </Tela>
    )
}
const Tela=styled.div`
background:black;
height:60px;
width:100%;
display:flex;
justify-content:center;
align-items:center;
`
const Holder=styled.div`
width:100%;
display:flex;
justify-content:space-between;
max-width:470px;
`
const Botao=styled.div`
cursor:pointer;
display:flex;
width:100px;height:45px;
color:${props=>props.atual?'white':'black'};
background:${props=>props.atual?'transparent':'gray'};
border-radius:10px;
justify-content:center;
align-items:center;
margin:10px;
`
