import { useState } from 'react';
import type { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css'; 


interface LoginProps {
  nome: string;
  setNome: (nome: string) => void;
}

function Login({ setNome }: LoginProps) {
  
  
  const navigate = useNavigate();
  
  const [usernameRegister, setUsernameRegister] = useState('');
  const [emailRegister, setEmailRegister] = useState('');
  const [emailLogin, setEmailLogin] = useState('');
  const [senhaRegister, setSenhaRegister] = useState('');
  const [senhaLogin, setSenhaLogin] = useState('');
  
  
  var [registerActive, setRegisterActive] = useState(false);
  
  const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // evita que o form recarregue a página
    var registerData = {
      username: usernameRegister,
      email: emailRegister,
      password: senhaRegister
    }
    
    navigate('/registerComplete', { state: registerData }); // navega sem recarregar a página
    setNome(usernameRegister);
};

const handleLogin = (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  
  // Validação simples
  if (!emailLogin || !senhaLogin) {
    alert('Preencha todos os campos!2');
    return;
  }
  
  // Simula login
  fetch('http://localhost:5000/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: emailLogin,
      password: senhaLogin
    })
  })
  .then(res => res.json())
  .then(data => {
    if (data.error) {
      alert(data.error);
    } else {
      alert(data.message);
      setNome(data.user.username);
      // window.location.href = '/placar'; //navega para placar
    navigate('/mainPage'); // navega sem recarregar a página
    }
  });
};

// window.addEventListener('resize', () => {
//   if (window.innerWidth > 768) {
//     setRegisterActive(false);
//   }
// });

//recuperarSenha
// function getPerfil() {
//   const token = localStorage.getItem("token");

//   fetch("http://localhost:5000/perfil", {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json",
//       // ✅ Passo 3: mandar token no header
//       "Authorization": `Bearer ${token}`
//     }
//   })
//     .then(res => res.json())
//     .then(data => console.log(data))
//     .catch(err => console.error(err));
// }


window.addEventListener('load', () => {
  setRegisterActive(true);
});

return (
  <>
  
  <div className="register-wrapper">
  <div className="texts-login-container">
  <h2 className={`register-text ${registerActive ? 'h2-active' : ''}`} onClick={() => setRegisterActive(true)}>Criar Conta</h2>
  <h2 className={`login-text ${!registerActive ? 'h2-active' : ''}`} onClick={() => setRegisterActive(false)}>Entrar</h2>
  </div>
  <div className="forms-container">
  <div className={`register-container ${!registerActive ? 'register-active' : ''}`}>
  <form className="register-form" onSubmit={handleRegister}>
  <label>
  Nome de usuário
  <input
  type="text"
  value={usernameRegister}
  onChange={(e) => setUsernameRegister(e.target.value)}
  placeholder="Seu nome completo"
  />
  </label>
  <label>
  Email
  <input
  type="email"
  value={emailRegister}
  onChange={(e) => setEmailRegister(e.target.value)}
  placeholder="seu@email.com"
  />
  </label>
  <label>
  Senha
  <input
  type="password"
  value={senhaRegister}
  onChange={(e) => setSenhaRegister(e.target.value)}
  placeholder="******"
  />
  </label>
  <button type="submit">Criar Conta</button>
  </form>
  </div>
  <div className={`login-container ${registerActive ? 'register-active' : ''}`}>
  {/* <h2>Entrar / Criar Conta</h2> */}
  {/* <button onClick={handleLogin}>Entrar</button> */}
  <form className="login-form" onSubmit={handleLogin}>
  
  
  <label>
  Email
  <input
  type="email"
  value={emailLogin}
  onChange={(e) => setEmailLogin(e.target.value)}
  placeholder="seu@email.com"
  />
  </label>
  
  <label>
  Senha
  <input
  type="password"
  value={senhaLogin}
  onChange={(e) => setSenhaLogin(e.target.value)}
  placeholder="******"
  />
  </label>
  
  <button type="submit">Entrar</button>
  </form>
  </div>
  </div>
  </div>
  
  </>
);
}

export default Login;
