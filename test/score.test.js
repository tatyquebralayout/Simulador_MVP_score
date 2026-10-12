// Testes do cálculo do score · Score calculation tests
// Rodar · Run: node --test
const { test, describe } = require('node:test');
const assert = require('node:assert/strict');
const { calcularScoreInteracao } = require('../js/score.js');

const ORDEM = [
  'volume', 'velocidadeEngajamento', 'qualidade',
  'polaridade', 'intensidade', 'contexto',
  'alcance', 'credibilidade', 'historico',
  'momento', 'velocidadeTiming', 'oportunidade',
];

// Peso final de cada variável = peso dentro do grupo × peso do grupo.
// Final weight of each variable = weight within its group × group weight.
const PESOS = {
  volume: 0.4 * 0.3, velocidadeEngajamento: 0.3 * 0.3, qualidade: 0.3 * 0.3,
  polaridade: 0.5 * 0.3, intensidade: 0.3 * 0.3, contexto: 0.2 * 0.3,
  alcance: 0.4 * 0.2, credibilidade: 0.3 * 0.2, historico: 0.3 * 0.2,
  momento: 0.4 * 0.2, velocidadeTiming: 0.3 * 0.2, oportunidade: 0.3 * 0.2,
};

const score = (valores) => calcularScoreInteracao(...ORDEM.map((k) => valores[k] ?? 0));
const todos = (v) => calcularScoreInteracao(...ORDEM.map(() => v));
const perto = (atual, esperado, msg) =>
  assert.ok(Math.abs(atual - esperado) < 1e-9, `${msg ?? ''} esperado ${esperado}, veio ${atual}`);

describe('casos normais · normal cases', () => {
  test('tudo em 5 dá 5 · all 5 gives 5', () => perto(todos(5), 5));
  test('tudo em 7,5 dá 7,5 · all 7.5 gives 7.5', () => perto(todos(7.5), 7.5));

  test('valor inicial da página (5.0) bate com o cálculo · page default matches', () => {
    assert.equal(todos(5).toFixed(1), '5.0');
  });

  test('exemplo misto, calculado à mão · mixed example, hand-computed', () => {
    const v = {
      volume: 8, velocidadeEngajamento: 6, qualidade: 7,
      polaridade: 9, intensidade: 5, contexto: 4,
      alcance: 3, credibilidade: 8, historico: 6,
      momento: 7, velocidadeTiming: 5, oportunidade: 2,
    };
    // engajamento 3,2+1,8+2,1=7,1 · sentimento 4,5+1,5+0,8=6,8
    // influência 1,2+2,4+1,8=5,4 · timing 2,8+1,5+0,6=4,9
    // final 7,1×0,3 + 6,8×0,3 + 5,4×0,2 + 4,9×0,2 = 6,23
    perto(score(v), 6.23);
    assert.equal(score(v).toFixed(1), '6.2');
  });

  test('cada variável tem o peso esperado · each variable has the expected weight', () => {
    for (const k of ORDEM) perto(score({ [k]: 1 }), PESOS[k], k);
  });

  test('os 12 pesos somam 1 · the 12 weights add up to 1', () => {
    perto(Object.values(PESOS).reduce((a, b) => a + b, 0), 1);
    perto(todos(1), 1);
  });

  test('o grupo pesa o que diz o README · groups weigh 30/30/20/20', () => {
    const grupo = (ks) => score(Object.fromEntries(ks.map((k) => [k, 1])));
    perto(grupo(['volume', 'velocidadeEngajamento', 'qualidade']), 0.3);
    perto(grupo(['polaridade', 'intensidade', 'contexto']), 0.3);
    perto(grupo(['alcance', 'credibilidade', 'historico']), 0.2);
    perto(grupo(['momento', 'velocidadeTiming', 'oportunidade']), 0.2);
  });

  test('é linear: dobrar as entradas dobra o score · linear', () => {
    const v = { volume: 2, polaridade: 3, alcance: 1.5, oportunidade: 4 };
    const dobro = Object.fromEntries(Object.entries(v).map(([k, x]) => [k, x * 2]));
    perto(score(dobro), 2 * score(v));
  });

  test('subir uma variável nunca baixa o score · monotonic', () => {
    for (const k of ORDEM) assert.ok(score({ [k]: 6 }) > score({ [k]: 5 }), k);
  });
});

describe('casos de borda · edge cases', () => {
  test('tudo zero dá zero · all zeros give zero', () => assert.equal(todos(0), 0));
  test('máximo da escala (10) dá 10 · scale max (10) gives 10', () => perto(todos(10), 10));
  test('valores grandes não estouram · large values do not overflow', () => perto(todos(1e6), 1e6, 'grande'));
  test('aceita decimais (step 0.1) · accepts decimals', () => perto(todos(0.1), 0.1));
  test('aceita negativos, como polaridade negativa · accepts negatives', () => {
    perto(score({ polaridade: -10 }), -1.5);
    perto(todos(-5), -5);
  });
  test('sempre devolve um número · always returns a number', () => {
    assert.equal(typeof todos(3), 'number');
  });
});

describe('entradas inválidas · invalid input', () => {
  // A página lê os campos com parseFloat; campo vazio vira NaN e o resultado mostra "NaN".
  // The page reads fields with parseFloat; an empty field becomes NaN and the result shows "NaN".
  test('campo vazio (NaN) faz o score virar NaN · empty field gives NaN', () => {
    assert.ok(Number.isNaN(score({ volume: parseFloat('') })));
    assert.equal(score({ volume: NaN }).toFixed(1), 'NaN');
  });
  test('variável faltando (undefined) dá NaN · missing variable gives NaN', () => {
    assert.ok(Number.isNaN(calcularScoreInteracao(1, 2, 3)));
  });
  test('texto não numérico dá NaN · non-numeric text gives NaN', () => {
    assert.ok(Number.isNaN(score({ qualidade: parseFloat('abc') })));
  });
  test('Infinity se propaga · Infinity propagates', () => {
    assert.equal(score({ alcance: Infinity }), Infinity);
  });
  test('texto numérico vira número · numeric strings are coerced', () => {
    perto(calcularScoreInteracao(...ORDEM.map(() => '5')), 5);
  });
});
