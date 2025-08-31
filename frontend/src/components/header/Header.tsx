

interface HeaderProps {
  nome: string;
  setNome: (nome: string) => void;
}

function Header({ nome, setNome }: HeaderProps)  {
    
    
    
    const toggleTheme = () => {
        document.body.classList.toggle('dark-mode');
        const temaAtual = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
        localStorage.setItem('tema', temaAtual);
    };
    
    return (
        <>
        
        {/* Campo para o usuário digitar o nome */}
        <input
        type="text"
        placeholder="Digite seu nome"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        />
        
        {/* Saudação personalizada */}
        
        {nome && <h2>🔝 Bem-vindo {nome ? nome : 'Visitante'} ao site do Hebert!</h2>}
        
        <br />
        
        <button className="btn-dark-light" onClick={toggleTheme}>
        Mudar para Tema {document.body.classList.contains('dark-mode') ? 'Claro' : 'Escuro'}
        </button>
        
        </>
    );
}

export default Header;
