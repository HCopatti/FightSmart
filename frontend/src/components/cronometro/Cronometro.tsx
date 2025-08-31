import { useState, useEffect } from 'react';

import './Cronometro.css';



function Cronometro() {
    const temposPorCategoria = {
        "teste": 15,
        "Infantil (4–6)": 120,
        "Infantil (7–9)": 180,
        "Infantil (10–12)": 240,
        "Juvenil (13–15)": 300,
        "Juvenil (16–17)": 300,
        "Adulto - Branca": 300,
        "Adulto - Azul": 360,
        "Adulto - Roxa": 420,
        "Adulto - Marrom": 480,
        "Adulto - Preta": 600,
        "Master 1 – Branca/Azul": 300,
        "Master 1 – Roxa/Marrom/Preta": 360,
        "Master 2 +": 300,
    } as const; // 'as const' faz o TS inferir tipos literais
    
    type Categoria = keyof typeof temposPorCategoria;
    
    
    const [tempo, setTempo] = useState(0);
    const [ativo, setAtivo] = useState(false);
    const [categoriaSelecionada, setCategoriaSelecionada] = useState<Categoria | null>(null);
    const [isRunning, setIsRunning] = useState(false);
    
    const alternarCronometro = () => {
        setAtivo(!ativo);
    };
    
    const resetarCronometro = () => {
        if (categoriaSelecionada) {
            setTempo(temposPorCategoria[categoriaSelecionada]);
        }
        setAtivo(false);
    };
    
    useEffect(() => {
        let intervalo: number | null = null;
        
        if (ativo && tempo > 0) {
            intervalo = window.setInterval(() => {
                setTempo((prev) => prev - 1);
            }, 1000);
        } else if (tempo === 0 && ativo) {
            if(intervalo) clearInterval(intervalo);
            setAtivo(false);
            // alert('⏰ Tempo Esgotado!');
            setIsRunning(false);
            tocarBeep();
            setTimeout(() => {
                for(var i = 0; i <= 2; i++){
                    tocarBeep();
                }
            }, 1000);
        }
        
        return () => {
            if(intervalo) clearInterval(intervalo);
        }
    }, [ativo, tempo]);
    
    const handleCategoriaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        // const target = e.target as HTMLSelectElement;
        const categoria = e.target.value;
        setCategoriaSelecionada(categoria as Categoria);
        if(categoria != ""){
            setTempo(temposPorCategoria[categoriaSelecionada as keyof typeof temposPorCategoria]);
        }
        else{
            setTempo(0);
        }
        setAtivo(false);
    };
    
    const formatarTempo = (tempo: number) => {
        const minutos = Math.floor(tempo / 60);
        const segundos = tempo % 60;
        return `${String(minutos).padStart(2, '0')}:${String(segundos).padStart(2, '0')}`;
    };
    
    
    const tocarBeep_10 = () => {
        const beep_10 = new Audio(process.env.PUBLIC_URL + '/sounds/beep_10.mp3');
        beep_10.play().catch((error) => {
            console.log('Erro ao tentar tocar o áudio:', error);
        });
    };
    
    const tocarBeep = () => {
        const beep = new Audio(process.env.PUBLIC_URL + '/sounds/beep.mp3');
        beep.play().catch((error) => {
            console.log('Erro ao tentar tocar o áudio:', error);
        });
    };
    
    useEffect(() => {
        let beepInterval: number | null = null;
                
        // Quando chegar nos últimos 10 segundos
        if (tempo === 10 ) {
            tocarBeep_10();
        }
        
        
        return () => {
            if (beepInterval !== null) clearInterval(beepInterval);
        }
    }, [tempo, isRunning]);
    
    
    return (
        <div className="cronometro-container">
        
        <select value={categoriaSelecionada ?? ""} onChange={handleCategoriaChange}>
        <option value="">Selecione a Categoria</option>
        {Object.keys(temposPorCategoria).map((categoria) => (
            <option key={categoria} value={categoria}>
            {categoria}
            </option>
        ))}
        </select>
        
        <div className='cronometro-tempo-container'>
        <h1
        className={`cronometro-tempo ${
            tempo === 0
            ? "alerta-final"
            : tempo <= 10 && tempo > 0
            ? "warning-time"
            : ""
        }`}
        >
        {formatarTempo(tempo)}
        </h1>
        
        </div>
        
        <div style={{ position: 'relative', maxWidth: '15%', width: '29vh' }}>
        <button onClick={alternarCronometro} disabled={!categoriaSelecionada}>
        {ativo ? '⏸︎ Pausar' : '▶︎ Iniciar'}
        </button>
        <button onClick={resetarCronometro} disabled={!categoriaSelecionada}>
        ⏮︎ Resetar
        </button>
        {/*<button onClick={tocarBeep_10}>
            ⏮︎ ouvir beep
            </button>*/}
            </div>
            </div>
        );
    }
    
    export default Cronometro;
    