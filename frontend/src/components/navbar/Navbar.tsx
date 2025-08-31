// import React from 'react';
import { FaMoon, FaSun } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

import { Link } from 'react-router-dom';
import './Navbar.css';
import '../../App.css';

interface NavbarProps {
  darkMode: boolean;
  setDarkMode: (darkMode: boolean) => void;
  nome: string;
  setNome: (nome: string) => void;
}

function Navbar({ darkMode, setDarkMode, nome, setNome }: NavbarProps) {
    
    const toggleTheme = () => {
        document.body.classList.toggle('dark-mode');
        const temaAtual = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
        localStorage.setItem('tema', temaAtual);
        setDarkMode(!darkMode)
    };
    
    const navigate = useNavigate();
    
    const handleLogout = () => {
        navigate('/');
        setNome('');
    };
    
    return (
        <nav className="navbar">
        
        <div className="user-info">
        Olá, {nome ? nome : 'Visitante'} 👋
        </div>
        
        <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/placar">Placar</Link></li>
        <li><Link to="/var">VAR</Link></li>
        <li><Link to="/historico">Histórico</Link></li>
        </ul>
        
        <button  className="btn-dark-light" onClick={toggleTheme}>
        {darkMode ? <FaSun /> : <FaMoon />}
        </button>
        
        
        <button className="logout" onClick={handleLogout}>Logout</button>
        
        
        </nav>
    );
}

export default Navbar;
