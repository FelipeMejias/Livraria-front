import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import Livros from './Livros';
import Menu from './Menu';

function App() {
  return (
        <BrowserRouter>
          <Tela>
            <Menu/>
              <Routes>
                <Route path='/' element={<Livros/>}/>
              </Routes>
          </Tela>
        </BrowserRouter>
  );
}

const Tela=styled.div`
background:gray;
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
