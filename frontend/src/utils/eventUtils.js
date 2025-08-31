// Função para registrar um novo evento
export const registrarEvento = (eventos, setEventos, tipo, valor, atleta, origem) => {
  const novoEvento = {
    tipo,             // Ex: 'ponto', 'vantagem', 'punição'
    valor,            // Ex: 2, 1, -1
    atleta,           // 'A' ou 'B'
    origem,           // 'Juiz' ou 'VAR'
    timestamp: new Date().toLocaleTimeString()
  };

  setEventos([...eventos, novoEvento]);
};

// Função para exportar o histórico de eventos como JSON
export const exportarEventosParaJson = (eventos) => {
  const blob = new Blob([JSON.stringify(eventos, null, 2)], { type: "application/json" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "historico_eventos.json";
  link.click();
};

// Função exemplo: Limpar todos os eventos (reset do histórico)
export const limparHistoricoEventos = (setEventos) => {
  setEventos([]);
};
