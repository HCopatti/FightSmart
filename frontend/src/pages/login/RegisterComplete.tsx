import { useState, useEffect } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
// import './Login.css'; // cria esse depois para estilizar
import { FaMoon, FaSun, FaArrowLeft } from 'react-icons/fa';
import { GiBlackBelt } from 'react-icons/gi';
import { PiUserCircleFill, PiUserCircleGearFill } from "react-icons/pi";
import './RegisterComplete.css'; 
import { ScrollPicker } from "../../components/scrollPicker/ScrollPicker";
import { IMaskInput } from "react-imask";
import * as React from "react";





// import TextField from "@mui/material/TextField";
// import Autocomplete from "@mui/material/Autocomplete";

// Arrays de dias, meses e anos
const days = Array.from({ length: 31 }, (_, i) => String(i + 1).padStart(2, "0"));
const monthNames = [
    "Jan", "Fev", "Mar", "Abr", "Mai", "Jun", 
    "Jul", "Ago", "Set", "Out", "Nov", "Dez"
];
const months = Array.from({ length: 12 }, (_, i) => monthNames[i]);
const currentYear = new Date().getFullYear();
const years = Array.from({ length: 100 }, (_, i) => String((currentYear-4) - i));




interface RegisterCompleteProps{
    nome: string;
    darkMode: boolean;
    setDarkMode: (darkMode: boolean) => void;
}

function RegisterComplete({ nome, darkMode, setDarkMode } : RegisterCompleteProps) {
    
    // const inputRef = useRef<HTMLInputElement>(null);
    const toggleTheme = () => {
        document.body.classList.toggle('dark-mode');
        const temaAtual = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
        localStorage.setItem('tema', temaAtual);
        setDarkMode(!darkMode)
    };
    
    const navigate = useNavigate();
    const location = useLocation();
    
    const { username, email, password } = location.state || {};
    
    // export default function Registro2() {
    const [isStudent, setIsStudent] = useState(false);
    const [isTeacher, setIsTeacher] = useState(false);
    
    const [open, setOpen] = useState(false); // controla se o dropdown está aberto
    
    // Campos User
    const [birthDate, setBirthDate] = useState({ day: "1", month: "01", year: "2000" });
    
    const [day, setDay] = React.useState("01");
    const [month, setMonth] = React.useState("01");
    const [year, setYear] = React.useState(String(currentYear));
    const [CurrentDateBirth, setCurrentDateBirth] = React.useState(String());
    
    useEffect(() => {
        setBirthDate({ day, month, year });
        setCurrentDateBirth(String(`Data selecionada: ${day}/${month}/${year}`));
    }, [day, month, year]);
    
    const actualYear = new Date().getFullYear();
    const age = actualYear - Number(year);
    
    var belts = ["Branca",
        "Cinza e Branco", "Cinza", "Cinza e Preto",
        "Amarela e Branco", "Amarela", "Amarela e Preto", 
        "Laranja e Branco", "Laranja", "Laranja e Preto", 
        "Verde e Branco", "Verde", "Verde e Preto", 
        "Azul", "Roxa", "Marrom", "Preta",
        "Vermelho e Preto", "Vermelho e Branco", "Vermelha"];
        
        // 1. Crie uma cópia completa do array original
        const beltsCopia = [...belts];
        const [beltsFiltrados, setBeltsFiltrados] = useState(belts);
        
        useEffect(() => {
            if (age > 4 && age < 7) {
                beltsCopia.splice(4, beltsCopia.length - 4); // mantém só as 3 primeiras
            }
            else if (age >= 7 && age < 10) {
                beltsCopia.splice(7, beltsCopia.length - 7); 
            }
            else if (age >= 10 && age < 13) {
                beltsCopia.splice(10, beltsCopia.length - 10);
            }
            else if (age >= 13 && age < 16) {
                beltsCopia.splice(13, beltsCopia.length - 13);
            }
            else if (age >= 16 && age < 18) {
                beltsCopia.splice(1, 12); // remove de Cinza até Verde e Preto
                beltsCopia.splice(2 + 1); //remove de Azul em diante
            }
            else if (age === 18) {
                beltsCopia.splice(1, 12); // remove de Cinza até Verde e Preto
                beltsCopia.splice(4);
            }
            else if (age > 18 && age < 51) {
                beltsCopia.splice(1, 12); // remove de Cinza até Verde e Preto
                beltsCopia.splice(5);
            }
            else if (age >= 51 && age < 57) {
                beltsCopia.splice(1, 12); // remove de Cinza até Verde e Preto
                beltsCopia.splice(6);
            }
            else if (age >= 57 && age < 67) {
                beltsCopia.splice(1, 12); // remove de Cinza até Verde e Preto
                beltsCopia.splice(7);
            }
            else if (age >= 67) {
                beltsCopia.splice(1, 12); // remove de Cinza até Verde e Preto
            }
            else{
                beltsCopia.splice(1); // nenhuma faixa
            }
            // belts = beltsCopia;
            setBeltsFiltrados(beltsCopia);
        }, [age]);
        
        
        const degrees = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        const degreesCopy = [...degrees];
        const degreesString = degrees.map(String);
        
        const [graduationBelt, setGraduationBelt] = useState("");
        const [degree, setDegree] = useState("");

        useEffect(() => {
            if (graduationBelt === "Preta") {
                degreesCopy.splice(6, degrees.length - 6); 
            }
        }, [graduationBelt]);

        const [phone, setPhone] = useState("");
        const [photo, setPhoto] = useState<File | null>(null);
        
        // Mapeamento de graus por faixa
        
        // Campos Aluno
        //   const [photoStudent, setPhotoStudent] = useState(null);
        
        // Campos Professor
        const [academyName, setAcademyName] = useState("");
        //   const [phoneTeacher, setPhoneTeacher] = useState("");
        
        
        //   const handleRegister = async (e) => {
        //     e.preventDefault(); // evita que o form recarregue a página
        
        //     try {
        //       const response = await fetch('http://localhost:5000/register', {
        //         method: 'POST',
        //         headers: { 'Content-Type': 'application/json' },
        //         body: JSON.stringify({
        //           username: usernameRegister,
        //           email: emailRegister,
        //           password: senhaRegister
        //         })
        //       });
        
        //       const data = await response.json();
        //       console.log("RESPOSTA DO BACKEND:", data); // log do backend
        
        //       if (data.error) {
        //         alert(data.error);
        //       } else {
            //         alert(data.message);
        //         setNome(usernameRegister);
        //         window.location.href = '/placar'; // navega para placar
        //       }
        //     } catch (err) {
        //       console.error("ERRO NO FETCH:", err);
        //       alert("Erro ao conectar com o backend");
        //     }
        //   };
        
        
        
        
        
        const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            
            // Prepara o objeto a ser enviado
            const dataToSend = {
                username,
                email,
                password,
                isStudent,
                isTeacher,
                birthDate, // O objeto de estado com day, month, year
                graduationBelt, 
                degree, 
                phone, 
                // photo, // Remoção da imagem, pois requer um upload de arquivo mais complexo
                // studentProfile: isStudent ? {} : null, // Removido, será criado no backend
                // teacherProfile: isTeacher ? { academyName } : null, // Removido, será criado no backend
                academyName: isTeacher ? academyName : undefined,
            };
            
            console.log("Dados sendo enviados:", dataToSend); // Adicione esta linha!
            
            try {
                const response = await fetch('http://localhost:5000/register', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(dataToSend)
                });
                
                // console.log("Dados para enviar ao backend:", data);
                // Aqui você faria o fetch/post para salvar no banco
                
                //////
                
                const data = await response.json();
                console.log("RESPOSTA DO BACKEND:", data); // log do backend
                if (data.error) {
                    alert(data.error);
                } else {
                    alert(data.message);
                    navigate('/mainPage'); // navega sem recarregar a página
                }
            } catch (err) {
                console.error("ERRO NO FETCH:", err);
                alert("Erro ao conectar com o backend");
            }
        };
        
        return (
            <div className="register2-wrapper bg-gradient-to-tl from-yellow-300 to-sky-400 flex flex-col items-center justify-center h-screen">
            
            
            {/* <button  className="btn-dark-light" onClick={toggleTheme}>
                {darkMode ? <FaSun /> : <FaMoon />}
                </button> */
            }
            
            {!isStudent && !isTeacher && (
                <div
                style={{animation: 'fadeIn 0.5s ease-in-out'}}>
                <button onClick={() => {
                    navigate('/');
                }}>
                { <FaArrowLeft />}
                </button>
                <h2 className="title text-4xl">Olá <span className="text-5xl font-bold uppercase" >{nome}</span>. Escolha seu perfil</h2>  
                </div>    
            )}
            
            <div className="forms-container overflow-auto" style={{height: 'auto',
                scrollbarWidth: 'none', // Firefox
                msOverflowStyle: 'none', // IE 10+
            }}>
            <form onSubmit={handleSubmit}>
            
            
            {(!isStudent && !isTeacher) && (
                <div className="flex flex-col space-x-4 justify-center items-center"
                style={{animation: 'fadeIn 0.5s ease-in-out'}}>
                <div className="flex space-x-4 justify-center items-center mt-20">
                <div className="flex space-x-4 justify-center items-center mt-20 text-blue-800 hover:text-black" onClick={() => { setIsStudent(true); setIsTeacher(false); }}>
                {/* Contêiner com gradiente para o efeito de fade */}
                <div className="relative w-64 h-48">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 "></div>
                <div className="absolute size-full flex items-center justify-center text-center text-white">
                { <PiUserCircleFill size={"8rem"} />} 
                </div>
                <div className="absolute inset-0 bg-green-300 opacity-0 transition-duration-300 duration-300 hover:opacity-30 z-12 cursor-pointer"></div>
                <span className="absolute text-4xl font-sans font-bold" style={{top:'0%', left:'50%', transform: 'translate(-50%, -150%)'}}>Aluno</span>
                </div>
                </div>
                
                <div className="flex space-x-4 justify-center items-center mt-20 text-blue-800 hover:text-black cursor-pointer" onClick={() => { setIsTeacher(true); setIsStudent(false); }}>
                {/* Contêiner com gradiente para o efeito de fade */}
                <div className="relative w-64 h-48">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 "></div>
                <div className="absolute size-full flex items-center justify-center text-center text-white">
                { <GiBlackBelt size={"8rem"} />}
                </div>
                <div className="absolute inset-0 bg-green-300 opacity-0 transition-duration-300 duration-300 hover:opacity-30 z-12 cursor-pointer"></div>
                <span className="absolute text-4xl font-sans font-bold" style={{top:'0%', left:'50%', transform: 'translate(-50%, -150%)'}}>Professor</span>
                </div>
                </div>
                </div>
                </div>
            )}
            
            
            {(isStudent || isTeacher) && (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', width: '100%', animation: 'fadeIn 0.5s ease-in-out' }}>
                
                
                <button onClick={() => {
                    setIsStudent(false);
                    setIsTeacher(false);
                }}
                style={{ borderRadius: '50%'}}>
                { <FaArrowLeft size={80} style={{color: 'white', padding: '10px 10px', cursor: 'pointer', fontSize: '20px', border: 'none', outline: 'none',}} />}
                </button>
                
                <div className="flex justify-center items-center mt-10">
                <span className="text-3xl font-medium text-gray-700 ">
                {isStudent && !isTeacher && "Concluir cadastro de Aluno"}
                {isTeacher && !isStudent && "Concluir cadastro de Professor"}
                </span>
                </div>
                <div className="flex justify-center items-center mt-10">
                <span className="text-3xl font-medium text-gray-700 ">
                teste{`${belts}`}
                </span>
                </div>
                <div className="flex justify-center items-center mt-10">
                <span className="text-3xl font-medium text-gray-700 ">
                teste2{`${degreesCopy}`}
                </span>
                </div>
                <div className="flex justify-center items-center mt-10">
                <span className="text-3xl font-medium text-gray-700 ">
                age: {`${age}`}
                </span>
                </div>
                <div className="flex justify-center items-center mt-10">
                <span className="text-3xl font-medium text-gray-700 ">
                {`${CurrentDateBirth}`}
                </span>
                </div>
                
                <div className="flex flex-col space-x-4 justify-center items-center mt-10">
                
                
                {/* <input
                    type="date"
                    value={birthDate}
                    onChange={(e) => setBirthDate(e.target.value)}
                    placeholder="Data de nascimento"
                    /> */}
                    
                    {/* <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="Telefone"
                        /> */}
                        <div className="flex space-x-4 justify-center items-center">
                        {/* Contêiner com gradiente para o efeito de fade */}
                        <div className="relative w-48 h-48 overflow-hidden
                            [mask-image:linear-gradient(to_bottom,transparent_0%,black_40%,black_80%,transparent_100%)]
                            [mask-repeat:no-repeat]
                            [mask-size:100%_100%]
                            [-webkit-mask-image:linear-gradient(to_bottom,transparent_0%,black_40%,black_80%,transparent_100%)]
                            [-webkit-mask-repeat:no-repeat]
                            [-webkit-mask-size:100%_100%]">
                        <ScrollPicker values={days} value={day} onChange={setDay} />
                        </div>
                        
                        <div className="relative w-48 h-48 overflow-hidden
                            [mask-image:linear-gradient(to_bottom,transparent_0%,black_40%,black_80%,transparent_100%)]
                            [mask-repeat:no-repeat]
                            [mask-size:100%_100%]
                            [-webkit-mask-image:linear-gradient(to_bottom,transparent_0%,black_40%,black_80%,transparent_100%)]
                            [-webkit-mask-repeat:no-repeat]
                            [-webkit-mask-size:100%_100%]">
                        <ScrollPicker values={months} value={month} onChange={setMonth} />
                        </div>
                        
                        <div className="relative w-48 h-48 overflow-hidden
                            [mask-image:linear-gradient(to_bottom,transparent_0%,black_40%,black_80%,transparent_100%)]
                            [mask-repeat:no-repeat]
                            [mask-size:100%_100%]
                            [-webkit-mask-image:linear-gradient(to_bottom,transparent_0%,black_40%,black_80%,transparent_100%)]
                            [-webkit-mask-repeat:no-repeat]
                            [-webkit-mask-size:100%_100%]">
                        <ScrollPicker values={years} value={year} onChange={setYear} />
                        </div>
                        </div>
                        
                        
                        <div className="flex space-x-4 justify-center items-center">
                        {/* Contêiner com gradiente para o efeito de fade */}
                        <div className="relative w-48 h-16">
                        <span className="text-3xl font-medium text-gray-700 " style={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}}> Dia  </span>
                        </div>
                        
                        <div className="relative w-48 h-16">
                        <span className="text-3xl font-medium text-gray-700 " style={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}}> Mês  </span>
                        </div>
                        
                        <div className="relative w-48 h-16">
                        <span className="text-3xl font-medium text-gray-700 " style={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}}> Ano  </span>
                        </div>
                        </div>
                        <div className="input-box relative mt-10">
                        <IMaskInput
                        mask="(00) 00000-0000"
                        value={phone}
                        onAccept={(value) => setPhone(value)}
                        required
                        className="input border p-2 rounded peer backdrop-brightness-125 focus:outline-none focus:ring-2 focus:ring-blue-500 w-72 text-black font-semibold"
                        style={{ background: 'transparent' }}
                        />
                        <label className={`absolute text-gray-500 transition-all
                            ${phone ? 'label-up' : ''}`} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', left: '55%', top: '50%', height: 'auto', transform: 'translate(-50%, -50%)', background: 'transparent', fontSize: '14px', fontWeight: '500', pointerEvents: 'none' }}>
                            {"Telefone".split("").map((char, i) => (
                                <span
                                key={i}
                                className="char inline-block transition-transform duration-300"
                                style={{
                                    transitionDelay: `${i * 50}ms`,
                                }}
                                >
                                {char}
                                </span>
                            ))}
                            </label>
                            </div>
                            
                            <div className="flex space-x-4 justify-center items-center">
                            <div className="relative w-48 h-48 overflow-hidden
                                    [mask-image:linear-gradient(to_bottom,transparent_0%,black_40%,black_80%,transparent_100%)]
                                    [mask-repeat:no-repeat]
                                    [mask-size:100%_100%]
                                    [-webkit-mask-image:linear-gradient(to_bottom,transparent_0%,black_40%,black_80%,transparent_100%)]
                                    [-webkit-mask-repeat:no-repeat]
                                    [-webkit-mask-size:100%_100%]">
                            <ScrollPicker values={beltsFiltrados} value={graduationBelt} onChange={(value) => setGraduationBelt(value)} />
                            </div>
                            
                            <div className="relative w-48 h-48 overflow-hidden
                                    [mask-image:linear-gradient(to_bottom,transparent_0%,black_40%,black_80%,transparent_100%)]
                                    [mask-repeat:no-repeat]
                                    [mask-size:100%_100%]
                                    [-webkit-mask-image:linear-gradient(to_bottom,transparent_0%,black_40%,black_80%,transparent_100%)]
                                    [-webkit-mask-repeat:no-repeat]
                                    [-webkit-mask-size:100%_100%]">
                            <ScrollPicker values={degreesString} value={degree} onChange={(value) => setDegree(value)} />
                            </div>
                            </div>
                            
                                
                                
                                
                                {/* Multimos arquivos:
                                    
                                    type="file"
                                    multiple
                                    onChange={(e) => {
                                    if (e.target.files) {
                                    setPhoto(Array.from(e.target.files));
                                    }
                                    }} */}
                                    
                                    <input
                                    type="file"
                                    onChange={(e) => {
                                        if (e.target.files && e.target.files.length > 0) {
                                            setPhoto(e.target.files[0]);
                                        }
                                    }}
                                    />
                                    {photo && (
                                        <div style={{ marginTop: "10px" }}>
                                        <p>Preview:</p>
                                        <img
                                        src={URL.createObjectURL(photo)}
                                        alt="Preview"
                                        style={{
                                            maxWidth: "200px",
                                            borderRadius: "10px",
                                            border: "1px solid #ccc",
                                        }}
                                        />
                                        </div>
                                    )}
                                    
                                    
                                    {/* MOSTRAR MULTIPLAS IMAGENS
                                        {photos.length > 0 && (
                                        <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
                                        {photos.map((file, index) => (
                                        <img
                                        key={index}
                                        src={URL.createObjectURL(file)}
                                        alt={`Preview ${index}`}
                                        style={{
                                        maxWidth: "100px",
                                        borderRadius: "10px",
                                        border: "1px solid #ccc",
                                        }}
                                        />
                                        ))}
                                        </div>
                                        )} */}
                                        
                                        
                                        {/* Campos do Aluno */}
                                        {isStudent && (
                                            <div>
                                            </div>
                                        )}
                                        
                                        {/* Campos do Professor */}
                                        {isTeacher && (
                                            <div>
                                            <h3>Informações do Professor</h3>
                                            <input
                                            type="text"
                                            value={academyName}
                                            onChange={(e) => setAcademyName(e.target.value)}
                                            placeholder="Nome da academia"
                                            />
                                            {/* <input
                                                type="tel"
                                                value={phone}
                                                onChange={(e) => setPhone(e.target.value)}
                                                placeholder="Telefone"
                                                />
                                                <input
                                                type="file"
                                                onChange={(e) => setPhoto(e.target.files[0])}
                                                /> */}
                                                </div>
                                            )}
                                            
                                            <button type="submit">Concluir Cadastro</button>
                                            </div>
                                            </div>
                                        )}
                                        </form>
                                        </div>
                                        </div>
                                    );
                                }
                                
                                export default RegisterComplete;
                                