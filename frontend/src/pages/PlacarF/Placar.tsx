import { useState, useEffect } from 'react';

import Atleta from '../../components/atleta/Atleta';
import Cronometro from '../../components/cronometro/Cronometro';
// import { registrarEvento, exportarEventosParaJson, limparHistoricoEventos } from '../../utils/eventUtils';



import './Placar.css'


function Placar() {
    
    //atletas
    
    const [nomeAtletaA, setNomeAtletaA] = useState(() => {
        return localStorage.getItem('nomeAtletaA') || '';
    });
    
    const [nomeAtletaB, setNomeAtletaB] = useState(() => {
        return localStorage.getItem('nomeAtletaB') || '';
    });
    
    const [nomeConfirmadoA, setNomeConfirmadoA] = useState(false);
    const [nomeConfirmadoB, setNomeConfirmadoB] = useState(false);
    
    const [nomeEditarA, setNomeEditarA] = useState(false);
    const [nomeEditarB, setNomeEditarB] = useState(false);
    
    const [pontosA, setPontosA] = useState(0);
    const [pontosB, setPontosB] = useState(0);
    const [vantagemA, setVantagemA] = useState(0);
    const [vantagemB, setVantagemB] = useState(0);
    const [punicaoA, setPunicaoA] = useState(0);
    const [punicaoB, setPunicaoB] = useState(0);
    
    const adicionarPontoA = (valor: number) => {
        setPontosA(pontosA + valor);
    };
    // const adicionarPonto = (valor, atleta, origem) => {
        //     if (atleta === 'A') setPontosA(pontosA + valor);
    //     if (atleta === 'B') setPontosB(pontosB + valor);
    //     registrarEvento(eventos, setEventos, 'ponto', valor, atleta, origem);
    // };
    
    const removerPontoA = (valor: number) => {
        if (pontosA - valor >= 0){
            setPontosA(pontosA - valor);
        }
    };
    
    const adicionarPontoB = (valor: number) => {
        setPontosB(pontosB + valor);
    };
    
    const removerPontoB = (valor: number) => {
        if (pontosB - valor >= 0){
            setPontosB(pontosB - valor);
        }
    };
    
    const adicionarVantagemA = (valor: number) => {
        setVantagemA(vantagemA + valor);
    };
    
    const removerVantagemA = (valor: number) => {
        if (vantagemA - valor >= 0){
            setVantagemA(vantagemA - valor);
        }
    };
    
    const adicionarVantagemB = (valor: number) => {
        setVantagemB(vantagemB + valor);
    };
    
    const removerVantagemB = (valor: number) => {
        if (vantagemB - valor >= 0){
            setVantagemB(vantagemB - valor);
        }
    };
    
    const adicionarPunicaoA = (valor: number) => {
        setPunicaoA(punicaoA + valor);
    };
    
    const removerPunicaoA = (valor: number) => {
        if (punicaoA - valor >= 0){
            setPunicaoA(punicaoA - valor);
        }
    };
    
    const adicionarPunicaoB = (valor: number) => {
        setPunicaoB(punicaoB + valor);
    };
    
    const removerPunicaoB = (valor: number) => {
        if (punicaoB - valor >= 0){
            setPunicaoB(punicaoB - valor);
        }
    };
    
    return (
        <div className="placar-page">
        <Cronometro />
        
        <div className="atletas-wrapper">
        {/* Atleta A */}
        <Atleta
        nome={nomeAtletaA}
        setNome={setNomeAtletaA}
        nomeConfirmado={nomeConfirmadoA}
        setNomeConfirmado={setNomeConfirmadoA}
        nomeEditar={nomeEditarA}
        setNomeEditar={setNomeEditarA}
        pontos={pontosA}
        adicionarPonto={adicionarPontoA}
        removerPonto={removerPontoA}
        vantagem={vantagemA}
        adicionarVantagem={adicionarVantagemA}
        removerVantagem={removerVantagemA}
        punicao={punicaoA}
        adicionarPunicao={adicionarPunicaoA}
        removerPunicao={removerPunicaoA}
        />
        
        {/* Atleta B */}
        <Atleta
        nome={nomeAtletaB}
        setNome={setNomeAtletaB}
        nomeConfirmado={nomeConfirmadoB}
        setNomeConfirmado={setNomeConfirmadoB}
        nomeEditar={nomeEditarB}
        setNomeEditar={setNomeEditarB}
        pontos={pontosB}
        adicionarPonto={adicionarPontoB}
        removerPonto={removerPontoB}
        vantagem={vantagemB}
        adicionarVantagem={adicionarVantagemB}
        removerVantagem={removerVantagemB}
        punicao={punicaoB}
        adicionarPunicao={adicionarPunicaoB}
        removerPunicao={removerPunicaoB}
        />
        </div>
        
        </div>
    );
    
}

export default Placar;