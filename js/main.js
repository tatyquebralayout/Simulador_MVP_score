// js/main.js

function calcularScoreInteracao(volume, velocidadeEngajamento, qualidade, 
    polaridade, intensidade, contexto, 
    alcance, credibilidade, historico, 
    momento, velocidadeTiming, oportunidade) {
// Componentes de Engajamento
const pesoVolume = 0.4;
const pesoVelocidadeEngajamento = 0.3;
const pesoQualidade = 0.3;
const engajamento = (volume * pesoVolume) + 
(velocidadeEngajamento * pesoVelocidadeEngajamento) + 
(qualidade * pesoQualidade);

// Componentes de Sentimento
const pesoPolaridade = 0.5;
const pesoIntensidade = 0.3;
const pesoContexto = 0.2;
const sentimento = (polaridade * pesoPolaridade) + 
(intensidade * pesoIntensidade) + 
(contexto * pesoContexto);

// Componentes de Influência
const pesoAlcance = 0.4;
const pesoCredibilidade = 0.3;
const pesoHistorico = 0.3;
const influencia = (alcance * pesoAlcance) + 
(credibilidade * pesoCredibilidade) + 
(historico * pesoHistorico);

// Componentes de Timing
const pesoMomento = 0.4;
const pesoVelocidadeTiming = 0.3;
const pesoOportunidade = 0.3;
const timing = (momento * pesoMomento) + 
(velocidadeTiming * pesoVelocidadeTiming) + 
(oportunidade * pesoOportunidade);

// Cálculo final do Score de Interação
const scoreFinal = (engajamento * 0.3) + 
(sentimento * 0.3) + 
(influencia * 0.2) + 
(timing * 0.2);

return scoreFinal;
}

function calcularScore() {
// Captura os valores dos elementos de entrada na interface
const volume = parseFloat(document.getElementById('volume').value);
const velocidadeEngajamento = parseFloat(document.getElementById('velocidade_engajamento').value);
const qualidade = parseFloat(document.getElementById('qualidade').value);
const polaridade = parseFloat(document.getElementById('polaridade').value);
const intensidade = parseFloat(document.getElementById('intensidade').value);
const contexto = parseFloat(document.getElementById('contexto').value);
const alcance = parseFloat(document.getElementById('alcance').value);
const credibilidade = parseFloat(document.getElementById('credibilidade').value);
const historico = parseFloat(document.getElementById('historico').value);
const momento = parseFloat(document.getElementById('momento').value);
const velocidadeTiming = parseFloat(document.getElementById('velocidade_timing').value);
const oportunidade = parseFloat(document.getElementById('oportunidade').value);

// Calcula o score
const scoreFinal = calcularScoreInteracao(volume, velocidadeEngajamento, qualidade, 
                  polaridade, intensidade, contexto, 
                  alcance, credibilidade, historico, 
                  momento, velocidadeTiming, oportunidade);

// Atualiza o valor na interface
document.getElementById('finalScore').textContent = scoreFinal.toFixed(1);
}

// Adicionando um EventListener ao botão de calcular score
document.getElementById('calcularScoreButton').addEventListener('click', calcularScore);

// Função para carregar um arquivo JSON
function carregarArquivoJson(event) {
const file = event.target.files[0];
if (file) {
const reader = new FileReader();
reader.onload = function(e) {
const jsonData = JSON.parse(e.target.result);
preencherCampos(jsonData);
};
reader.readAsText(file);
}
}

// Função para preencher os campos com os dados do JSON
function preencherCampos(data) {
document.getElementById('volume').value = data.volume;
document.getElementById('velocidade_engajamento').value = data.velocidade_engajamento;
document.getElementById('qualidade').value = data.qualidade;
document.getElementById('polaridade').value = data.polaridade;
document.getElementById('intensidade').value = data.intensidade;
document.getElementById('contexto').value = data.contexto;
document.getElementById('alcance').value = data.alcance;
document.getElementById('credibilidade').value = data.credibilidade;
document.getElementById('historico').value = data.historico;
document.getElementById('momento').value = data.momento;
document.getElementById('velocidade_timing').value = data.velocidade_timing;
document.getElementById('oportunidade').value = data.oportunidade;
}

// Função para baixar o relatório em formato JSON
function baixarRelatorio() {
const data = {
volume: document.getElementById('volume').value,
velocidade_engajamento: document.getElementById('velocidade_engajamento').value,
qualidade: document.getElementById('qualidade').value,
polaridade: document.getElementById('polaridade').value,
intensidade: document.getElementById('intensidade').value,
contexto: document.getElementById('contexto').value,
alcance: document.getElementById('alcance').value,
credibilidade: document.getElementById('credibilidade').value,
historico: document.getElementById('historico').value,
momento: document.getElementById('momento').value,
velocidade_timing: document.getElementById('velocidade_timing').value,
oportunidade: document.getElementById('oportunidade').value,
score_final: document.getElementById('finalScore').textContent
};
const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data));
const downloadAnchorNode = document.createElement('a');
downloadAnchorNode.setAttribute("href", dataStr);
downloadAnchorNode.setAttribute("download", "relatorio_score.json");
document.body.appendChild(downloadAnchorNode);
downloadAnchorNode.click();
downloadAnchorNode.remove();
}

// Adicionando EventListener para carregar o arquivo JSON
document.getElementById('inputJsonFile').addEventListener('change', carregarArquivoJson);

// Adicionando EventListener para baixar o relatório
document.getElementById('baixarRelatorioButton').addEventListener('click', baixarRelatorio);
