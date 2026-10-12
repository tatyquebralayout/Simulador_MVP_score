# Simulador MVP Score

[![Testes · Tests](https://github.com/tatyquebralayout/Simulador_MVP_score/actions/workflows/testes.yml/badge.svg)](https://github.com/tatyquebralayout/Simulador_MVP_score/actions/workflows/testes.yml)

**Calcula um score de interação a partir de 12 variáveis de engajamento, sentimento, influência e timing.**
*Calculates an interaction score from 12 variables covering engagement, sentiment, influence and timing.*

### [▶ Abrir o simulador · Open the simulator](https://tatyquebralayout.github.io/Simulador_MVP_score/)

## 🇧🇷 Português

Você ajusta as variáveis e o simulador mostra o resultado final na hora. Cada grupo tem um peso fixo no cálculo.

| Grupo | Variáveis |
|---|---|
| Engajamento | volume, velocidade de engajamento, qualidade |
| Sentimento | polaridade, intensidade, contexto |
| Influência | alcance, credibilidade, histórico |
| Timing | momento, velocidade, oportunidade |

**Como rodar:** é HTML e JavaScript puro. Abra o `index.html` no navegador.

## 🇺🇸 English

Adjust the variables and the simulator shows the final result instantly. Each group has a fixed weight in the calculation.

| Group | Variables |
|---|---|
| Engagement | volume, engagement speed, quality |
| Sentiment | polarity, intensity, context |
| Influence | reach, credibility, track record |
| Timing | moment, speed, opportunity |

**How to run:** plain HTML and JavaScript. Open `index.html` in a browser.

## Como rodar os testes · Running tests

O cálculo do score fica em [`js/score.js`](js/score.js), e os testes em [`test/score.test.js`](test/score.test.js). Eles usam o executor de testes que já vem no Node.js, então não é preciso instalar nada. Os testes rodam no GitHub Actions a cada push e pull request na `master`.

*The score calculation lives in [`js/score.js`](js/score.js) and the tests in [`test/score.test.js`](test/score.test.js). They use Node.js's built-in test runner, so there is nothing to install. They run on GitHub Actions on every push and pull request to `master`.*

```bash
node --test   # ou · or: npm test  (Node.js 20+)
```
