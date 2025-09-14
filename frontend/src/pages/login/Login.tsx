import { useState } from 'react';
import type { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import './Login.css'; 


interface LoginProps {
  nome: string;
  setNome: (nome: string) => void;
}

function Login({ setNome }: LoginProps) {
  
  
  const navigate = useNavigate();
  
  const [usernameRegister, setUsernameRegister] = useState('');
  const [emailRegister, setEmailRegister] = useState('');
  const [showPassword, setShowPassword] = useState(false);
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
  
  const handleForgotPassword = () => {
    //fazer no futuro
    
  }
  
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
    
    <div className="w-full h-screen flex items-center justify-center
    text-black font-medium 
    bg-gradient-to-r from-yellow-300 to-sky-400 
    bg-[length:200%_200%]
    animate-[gradient-slide_5s_linear_infinite_alternate]
  "
    >
    
    <div className="register2-wrapper 
    h-screen flex items-center justify-center
    text-black font-medium"
    >
    <div className="overflow-y-auto  h-auto w-auto max-w-full max-h-full w-1/4 h-1/2 overflow-hidden flex flex-col items-center justify-start 
 backdrop-brightness-125 bg-opacity-50 backdrop-blur-md backdrop-filter 
    backdrop-blur-sm backdrop-filter-sm backdrop-filter-md backdrop-filter-lg backdrop-filter-2xl 
    backdrop-filter-3xl text-black font-medium duration-300"                    
      style={{
        scrollbarWidth: 'none', // Firefox
        msOverflowStyle: 'none', // IE 10+
      }}>
    <div className="texts-login-container backdrop-brightness-125 bg-opacity-50 ">
    <h2 className={`register-text ${registerActive ? 'h2-active' : ''}`} onClick={() => setRegisterActive(true)}>Criar Conta</h2>
    <h2 className={`login-text ${!registerActive ? 'h2-active' : ''}`} onClick={() => setRegisterActive(false)}>Entrar</h2>
    </div>
    <div className="forms-container">
    <div className={`register-container transition-all duration-700 ease-in-out ${!registerActive ? 'register-active' : 'left: 110%;'}`}>
    <form className="register-form" onSubmit={handleRegister}>
    
    <div className="input-box relative mt-10">
    <input
    type="text"
    value={usernameRegister}
    onChange={(e) => setUsernameRegister(e.target.value)}
    className='input border p-2 rounded peer backdrop-brightness-125 focus:outline-none focus:ring-2 focus:ring-blue-500 w-72 text-black font-semibold inline'
    style={{ background: 'transparent' }}
    />
    
    <label className={`absolute text-gray-500 transition-all
    ${usernameRegister ? 'label-up' : ''}`} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', left: '55%', top: '50%', height: 'auto', transform: 'translate(-50%, -50%)', background: 'transparent', fontSize: '14px', fontWeight: '500', pointerEvents: 'none' }}>
      {"Seu nome completo".split("").map((char, i) => (
        <span
        key={i}
        className="char inline-block transition-transform duration-300"
        style={{
          transitionDelay: `${i * 50}ms`,
        }}
        >
        {char === " " ? "\u00A0" : char}
        </span>
      ))}
      </label>
      </div>
      
      <div className="input-box relative mt-10">
      <input
      type="email"
      value={emailRegister}
      onChange={(e) => setEmailRegister(e.target.value)}
      className='input border p-2 rounded peer backdrop-brightness-125 focus:outline-none focus:ring-2 focus:ring-blue-500 w-72 text-black font-semibold inline'
      style={{ background: 'transparent' }}
      />
      
      <label className={`absolute text-gray-500 transition-all
      ${emailRegister ? 'label-up' : ''}`} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', left: '55%', top: '50%', height: 'auto', transform: 'translate(-50%, -50%)', background: 'transparent', fontSize: '14px', fontWeight: '500', pointerEvents: 'none' }}>
        {"Email".split("").map((char, i) => (
          <span
          key={i}
          className="char inline-block transition-transform duration-300"
          style={{
            transitionDelay: `${i * 50}ms`,
          }}
          >
          {char === " " ? "\u00A0" : char}
          </span>
        ))}
        </label>
        </div>
        
        <div className='relative mt-10 flex items-center'>
        <div className="input-box relative flex items-center">
        <input
        type={showPassword ? "text" : "password"}
        value={senhaRegister}
        onChange={(e) => setSenhaRegister(e.target.value)}
        className='input border p-2 pr-12 rounded peer backdrop-brightness-125 focus:outline-none focus:ring-2 focus:ring-blue-500 w-72 text-black font-semibold inline'
        style={{ background: 'transparent' }}
        />
        <label className={`absolute text-gray-500 transition-all
        ${senhaRegister ? 'label-up' : ''}`} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', left: '55%', top: '50%', height: 'auto', transform: 'translate(-50%, -50%)', background: 'transparent', fontSize: '14px', fontWeight: '500', pointerEvents: 'none' }}>
          {"Senha".split("").map((char, i) => (
            <span
            key={i}
            className="char inline-block transition-transform duration-300"
            style={{
              transitionDelay: `${i * 50}ms`,
            }}
            >
            {char === " " ? "\u00A0" : char}
            </span>
          ))}
          </label>
          </div>
          <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-0 top-1/2 -translate-y-1/2 text-black font-semibold inline hover:text-gray-700"
          style={{ background: 'transparent' }}
          >
          {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
          </button>
          </div>
          <button type="submit">Criar Conta</button>
          </form>
          </div>
          <div className={`login-container transition-all duration-700 ease-in-out ${registerActive ? 'register-active' : 'left: 110%;'}`}>
          {/* <h2>Entrar / Criar Conta</h2> */}
          {/* <button onClick={handleLogin}>Entrar</button> */}
          <form className="login-form">
          
          <div className="input-box relative mt-10">
          <input
          type="email"
          value={emailLogin}
          onChange={(e) => setEmailLogin(e.target.value)}
          className='input border p-2 rounded peer backdrop-brightness-125 focus:outline-none focus:ring-2 focus:ring-blue-500 w-72 text-black font-semibold inline'
          style={{ background: 'transparent' }}
          />
          
          <label className={`absolute text-gray-500 transition-all
      ${emailLogin ? 'label-up' : ''}`} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', left: '55%', top: '50%', height: 'auto', transform: 'translate(-50%, -50%)', background: 'transparent', fontSize: '14px', fontWeight: '500', pointerEvents: 'none' }}>
            {"Email".split("").map((char, i) => (
              <span
              key={i}
              className="char inline-block transition-transform duration-300"
              style={{
                transitionDelay: `${i * 50}ms`,
              }}
              >
              {char === " " ? "\u00A0" : char}
              </span>
            ))}
            </label>
            </div> 
            
            
            <div className='relative mt-10 flex items-center'>
            <div className="input-box relative flex items-center">
            <input
            type={showPassword ? "text" : "password"}
            value={senhaLogin}
            onChange={(e) => setSenhaLogin(e.target.value)}
            className='input border p-2 pr-12 rounded peer backdrop-brightness-125 focus:outline-none focus:ring-2 focus:ring-blue-500 w-72 text-black font-semibold inline'
            style={{ background: 'transparent' }}
            />
            
            <label className={`absolute text-gray-500 transition-all
          ${senhaLogin ? 'label-up' : ''}`} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', left: '55%', top: '50%', height: 'auto', transform: 'translate(-50%, -50%)', background: 'transparent', fontSize: '14px', fontWeight: '500', pointerEvents: 'none' }}>
              {"Senha".split("").map((char, i) => (
                <span
                key={i}
                className="char inline-block transition-transform duration-300"
                style={{
                  transitionDelay: `${i * 50}ms`,
                }}
                >
                {char === " " ? "\u00A0" : char}
                </span>
              ))}
              </label>
              </div>
              <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-0 top-1/2 -translate-y-1/2 text-black font-semibold inline hover:text-gray-700"
              style={{ background: 'transparent' }}
              >
              {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
              </button>
              </div>
              
              
              
              <button type="submit" className='mt-8'
              onClick={() => handleLogin(event as unknown as FormEvent<HTMLFormElement>)}
              >Entrar</button>
              
              
              <span className="flex items-center justify-center mt-10 gap-4 font-medium text-gray-600 dark:text-gray-400">
              
              <span>
              <input type="checkbox" name="rememberMe" id="rememberMe" /> Lembrar senha.
              </span>
              {/* <span></span> */}
              <span>
              </span>
              <span>
              <button onClick={handleForgotPassword}>Esqueceu a senha?</button>
              </span>
              </span>
              
              </form>
              </div>
              </div>
              </div>
              </div>
              </div>
              
              </>
            );
          }
          
          export default Login;
          