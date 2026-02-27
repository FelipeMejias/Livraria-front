import './App.css';
import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import Livros from './Livros';
import Menu from './Menu';
import Pedidos from './Pedidos';
import Inicial from './Inicial';
import CriacaoLivro from './CriacaoLivro';
import MyContext from './context';
import Cadastro from './Cadastro';

function App() {
  const [usuario,setUsuario]=useState({})
  const valorContexto={
    usuario,setUsuario
  }
  return (
      <MyContext.Provider value={valorContexto}>
        <BrowserRouter>
          <Tela>
            <Menu/>
              <Routes>
                <Route path='/' element={<Inicial/>}/>
                <Route path='/cadastro' element={<Cadastro/>}/>
                <Route path='/livros' element={<Livros/>}/>
                <Route path='/livros/criar' element={<CriacaoLivro/>}/>
                <Route path='/pedidos' element={<Pedidos/>}/>
              </Routes>
          </Tela>
        </BrowserRouter>
      </MyContext.Provider>
  );
}

const Tela=styled.div`
background:#4c4747;
height:100vh;
width:100vw;
display:flex;
flex-direction:column;
align-items:center;
div{
  box-sizing:border-box;
  display:flex;
}
`

export default App;
