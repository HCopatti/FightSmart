
import { useState, useEffect } from 'react';
import VarControl from '../../pages/var/VarControl';


interface AtletaProps{
  nome: string;
  setNome: (nome: string) => void;
  nomeConfirmado: boolean;
  setNomeConfirmado: (nomeConfirmado: boolean) => void;
  nomeEditar: boolean;
  setNomeEditar: (nomeEditar: boolean) => void;

  // pontos
  pontos: number;
  adicionarPonto: (valor: number) => void;
  removerPonto: (valor: number) => void;

  // vantagem
  vantagem: number;
  adicionarVantagem: (valor: number) => void;
  removerVantagem: (valor: number) => void;

  // punição
  punicao: number;
  adicionarPunicao: (valor: number) => void;
  removerPunicao: (valor: number) => void;
}


function Atleta({
  nome,
  setNome,
  nomeConfirmado,
  setNomeConfirmado,
  nomeEditar,
  setNomeEditar,
  pontos,
  adicionarPonto,
  removerPonto,
  vantagem,
  adicionarVantagem,
  removerVantagem,
  punicao,
  adicionarPunicao,
  removerPunicao
} : AtletaProps) {
  
  
  
  const [modoVAR, setModoVAR] = useState(false);


  return (
    <div className="atleta-card">
    {(!nomeConfirmado || nomeEditar) && (
      <div>
      <input
      type="text"
      placeholder="Nome do Atleta"
      value={nome}
      onChange={(e) => setNome(e.target.value)}
      />
      <button onClick={() => {
        setNomeConfirmado(true); 
        setNomeEditar(false);}}>↩︎</button>
        </div>
      )}
      
      {/* {nomeConfirmado && <h3>{nome}</h3>} */}
      <div className="nome-container">
      <h3>{nome ? nome : 'Sem Nome'}</h3>
      {nomeConfirmado && !nomeEditar && (
        <>
        <button onClick={() => setNomeEditar(true)} className="btnEdit">✏️ Editar Nome</button>
        </>
      )}
      </div>
      
      <div className="placar-container">
      <div className="placar-item pontos">
      <h4>{pontos}</h4>
      <p>Pontos</p>
      <div className="botoes-pontos-container">
      
      <div className="adicionar">
      <div className="botoes-container">
      <button onClick={() => adicionarPonto(2)}>+2</button>
      <button onClick={() => adicionarPonto(3)}>+3</button>
      <button onClick={() => adicionarPonto(4)}>+4</button>
      </div>
      
      </div>
      <div className="remover">
      <div className="botoes-container">
      <button onClick={() => removerPonto(2)}>-2</button>
      <button onClick={() => removerPonto(3)}>-3</button>
      <button onClick={() => removerPonto(4)}>-4</button>
      </div>
      
      </div>
      
      
      </div>
      </div>
      
      <div className="placar-item vantagens">
      <h4>{vantagem}</h4>
      <p>Vantagens</p>
      <div className="botoes-container">
      <button onClick={() => adicionarVantagem(1)}>+</button>   
      <button onClick={() => removerVantagem(1)}>-</button>   
      </div>
      </div>
      
      <div className="placar-item punicoes"> 
      <h4>{punicao}</h4>
      <p>Punições</p>
      <div className="botoes-container">
      <button onClick={() => adicionarPunicao(1)}>+</button>   
      <button onClick={() => removerPunicao(1)}>-</button>   
      </div>
      </div>
      </div>
      
      
      
      <VarControl modoVAR={modoVAR} setModoVAR={setModoVAR} />
      
      </div>
    );
  }
  
  export default Atleta;
  