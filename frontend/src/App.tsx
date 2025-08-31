// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'


import { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';

// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import Navbar from './components/navbar/Navbar';

import Login from './pages/login/Login';
import RegisterComplete from './pages/login/RegisterComplete';
// import MainPage from './pages/mainPage/MainPage';
import Placar from './pages/PlacarF/Placar';

import './App.css'

function App() {
  // const [count, setCount] = useState(0)
  
  // Criamos um estado chamado darkMode (começa como false) e usamos setDarkMode para atualizar esse valor quando o usuário clicar no botão
  const [nome, setNome] = useState(() => {
    return localStorage.getItem('nomeUsuario') || '';
  });
  const [darkMode, setDarkMode] = useState(() => {
    const temaSalvo = localStorage.getItem('darkMode');
    return temaSalvo ? JSON.parse(temaSalvo) : false;
  });
  
  //limpar dados salvos
  const limparLocalStorage = () => {
    localStorage.clear();
    window.location.reload();
  };
  
  useEffect(() => {
    localStorage.setItem('nomeUsuario', nome);
  }, [nome]);
  
  useEffect(() => {
    const temaSalvo = localStorage.getItem('tema');
    if (temaSalvo === 'dark') {
      document.body.classList.add('dark-mode');
    }
  }, []);
  
  // useEffect(() => {
    //   localStorage.setItem('count', JSON.stringify(count));
  // }, [count]);

  return (
    <>
    
    {/* // Aqui estamos usando o operador ternário para alternar a classe CSS da div com base no estado darkMode (true = tema escuro, false = tema claro) */}
    {/* <div className={`${darkMode}  ? 'app dark' : 'app light'} btn-dark-light`}> */}
    <div className="app">
    
    <Routes>
    <Route path="/" element={<Login nome={nome} setNome={setNome} darkMode={darkMode} setDarkMode={setDarkMode} />} />

    <Route path="/registerComplete" 
    element={
      <>
      <RegisterComplete nome={nome} darkMode={darkMode} setDarkMode={setDarkMode}/>
      </>
    } />

    <Route path="/placar"
    element={
      <>
      
      <Navbar nome={nome} setNome={setNome} darkMode={darkMode} setDarkMode={setDarkMode} />
      <Header nome={nome} setNome={setNome} />
      <Placar />
      <Footer />
      <button onClick={limparLocalStorage}>Resetar valores</button>
      </>
    }
    />
    </Routes>
    
    
    
    </div>
    </>
  )
}

export default App
