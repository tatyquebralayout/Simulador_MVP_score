// js/score.js
// Cálculo do score de interação, usado pela página e pelos testes.
// Interaction score calculation, shared by the page and the tests.

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

// No navegador, a função acima fica global para o js/main.js.
// No Node, ela é exportada para os testes.
// In the browser the function above is global for js/main.js; in Node it is exported for the tests.
if (typeof module !== 'undefined' && module.exports) {
module.exports = { calcularScoreInteracao };
}
