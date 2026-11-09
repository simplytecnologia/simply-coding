<div align="center">

# ⚡ Simply Coding

**Um método para desenvolver software com IA: processo definido para a qualidade, hábitos enxutos para a eficiência.**

Um plugin do Claude Code, também disponível para Codex, Gemini CLI e Grok Build, que reúne seis projetos de código aberto em uma só instalação.

[![Licença: MIT](https://img.shields.io/badge/licen%C3%A7a-MIT-blue.svg)](LICENSE)
![Plugin do Claude Code](https://img.shields.io/badge/Claude%20Code-plugin-8A2BE2)
![Versão](https://img.shields.io/badge/vers%C3%A3o-0.1.0-green)

[English](README.md) · **Português (Brasil)**

</div>

---

## 👋 Introdução

A IA escreve código rápido, mas sem um processo ela pula requisitos, declara pronto sem prova e enche o projeto de código que ninguém pediu. O Simply Coding dá ao seu agente um método de trabalho: um processo guiado por histórias que segura a qualidade, mais hábitos que mantêm respostas, mudanças e contexto enxutos. Uma instalação, sem configuração.

## 📦 O que vem dentro

| Componente | Papel | O que faz por você |
|---|---|---|
| 🏗️ **[AIOX](https://github.com/SynkraAI/aiox-core)** | Qualidade | Agentes, histórias e gates de qualidade: planejar → construir → revisar |
| ✅ **[verification-before-completion](https://github.com/obra/superpowers)** | Qualidade | Nada de "pronto" sem prova recente: testes, build, diff |
| 📏 **[Quality gates](https://github.com/soumatheusgomes/vibe-coding-toolkit)** | Qualidade | JS/TS: regras de lint para tamanho de arquivo, logs e acesso a dados, instaladas e cobradas automaticamente |
| 🧰 **[Skills de Matt Pocock](https://github.com/mattpocock/skills)** | Qualidade | Depurar, projetar, modelar o domínio e fazer perguntas melhores |
| 🪨 **[Caveman](https://github.com/JuliusBrussee/caveman)** | Eficiência | Respostas curtas e diretas, sem perder nenhum fato técnico |
| 🐴 **[Ponytail](https://github.com/DietrichGebert/ponytail)** | Eficiência | A solução mais simples que funciona, com menos código para escrever e revisar |

Além disso, o plugin acrescenta regras de sessão enxuta a toda sessão, limita quatro regras do AIOX para que só carreguem quando forem úteis e sugere o [graphify](https://github.com/Graphify-Labs/graphify) e o [rtk](https://github.com/rtk-ai/rtk) quando valem a pena.

## 🚀 Como usar

**1. Instale dentro do Claude Code:**

```
/plugin marketplace add simplytecnologia/simply-coding
```

```
/plugin install simply-coding@simply-coding
```

**2. Abra um projeto.** Só isso.

Caveman e Ponytail valem em toda sessão nova. Em projetos com Git, o AIOX é copiado para a pasta na primeira abertura.

### 🧭 Comece aqui

Descreva o que você quer com suas palavras e siga o ciclo:

**Automático em projetos JS/TS:** antes da primeira mudança de código, o Claude instala os quality gates e mede a linha de base. Arquivos com mais de 350 linhas são divididos antes de serem editados, e o Claude não consegue encerrar enquanto os arquivos que ele mudou tiverem erros de lint. Quando uma história fecha com avisos sobrando, o Claude oferece zerá-los.

| Etapa | Comando | O que acontece |
|---|---|---|
| 1. Planejar | `/AIOX:agents:pm` | Transforma a ideia em requisitos (PRD) |
| 2. Histórias | `/AIOX:agents:sm` | Divide o plano em histórias pequenas com critérios de aceite |
| 3. Construir | `/develop-story` | Implementa uma história e roda os testes |
| 4. Revisar | `/review-story` | Gate de QA: PASS, CONCERNS ou FAIL |
| 5. Fechar | `/close-story` | Finaliza a história aprovada no QA |

Correção pequena? Pule o ciclo e peça direto. Bug difícil? Peça ao Claude para diagnosticar.

> [!NOTE]
> Os arquivos novos do AIOX aparecem como alterações no Git. Revise antes de fazer commit. Arquivos existentes nunca são sobrescritos.

### 🧪 Testar como um usuário real (sob demanda)

Um testador caixa-preta: lê o repositório para saber o que testar, depois usa o app só pelo navegador (Chromium isolado), como um usuário faria. Só roda quando você chama, não grava nada no projeto e não corrige nada: entrega um relatório.

| Comando | Escopo |
|---|---|
| `/simply-coding:teste-geral` | O app inteiro |
| `/simply-coding:teste-diff` | Só o que mudou desde o último teste |
| `/simply-coding:teste tela de clientes` | A tela ou o fluxo que você indicar |

O relatório sai em `report.md` e `report.html`, em `~/.simply-coding/qa/<projeto>/runs/`, com achados por severidade, passos de reprodução, screenshots, tempos medidos e a correção sugerida com arquivo e linha.

- **Alvo:** `localhost` ou um ambiente que você confirmar que não é produção. Produção é recusada.
- **Login:** o navegador abre visível e você mesmo digita usuário e senha. O testador não vê nem guarda a senha, e a sessão some quando o navegador fecha.
- **Requisito:** Node.js. O navegador vem do [playwright-cli](https://github.com/microsoft/playwright-cli), baixado no primeiro uso.

<details>
<summary><b>Opções e casos especiais</b></summary>

| Quero... | Faça isto |
|---|---|
| Instalar o AIOX em uma pasta sem Git | Rode `/simply-coding:instalar-aiox` |
| Deixar o AIOX fora de um projeto | Apague `.aiox-core`, se existir, e crie um arquivo vazio `.simply-coding-sem-aiox` |
| Evitar skills duplicadas | Desinstale plugins avulsos de Caveman ou Ponytail |
| Ler repositórios grandes com menos tokens (opcional) | Instale o [graphify](https://github.com/Graphify-Labs/graphify) (`pipx install graphifyy && graphify install`, exige Python 3.10+) e rode `/graphify .` uma vez. O Claude sugere sozinho em repositórios Git com 50+ arquivos de código/docs; crie um `.simply-coding-sem-graphify` vazio para parar |
| Desligar os quality gates em um projeto | Crie um arquivo vazio `.simply-coding-sem-quality-gates` |
| Reduzir a saída de comandos: testes, builds, git (opcional) | Instale o [rtk](https://github.com/rtk-ai/rtk) (`winget install rtk-ai.rtk` ou `brew install rtk`, depois `rtk init -g`). O Claude sugere sozinho enquanto não estiver instalado; crie um `.simply-coding-sem-rtk` vazio para parar |

A CLI `aiox` e os hooks do AIOX não estão incluídos.

</details>

## 🤖 Outras IAs

Rode um comando dentro da pasta do projeto. É preciso ter o [Node.js](https://nodejs.org).

| Ferramenta | Comando |
|---|---|
| **Codex** | `npx github:simplytecnologia/simply-coding codex` |
| **Gemini CLI** | `npx github:simplytecnologia/simply-coding gemini` |
| **Grok Build** | `npx github:simplytecnologia/simply-coding grok` |

O comando copia as skills e o AIOX e acrescenta as regras de economia ao `AGENTS.md` (Codex, Grok) ou ao `GEMINI.md` (Gemini). Arquivos existentes nunca são sobrescritos. Rode uma vez por projeto e reinicie a ferramenta em seguida.

> [!NOTE]
> O suporte a Codex, Gemini CLI e Grok Build é novo. Só a instalação dos arquivos foi testada, não sessões dentro dessas ferramentas. Fora do Claude Code, a automação do AIOX é parcial.

## 📈 Resultados esperados

- ✅ **Processo definido:** toda mudança passa por história, implementação e gate de QA.
- ✅ **Gates mecânicos:** erros de lint bloqueiam o "pronto" em projetos JS/TS, sem depender de julgamento.
- ✅ **Prova antes do "pronto":** testes e builds são rodados, não presumidos.
- ✅ **Respostas mais curtas:** menos enrolação, com comandos, caminhos e erros mantidos exatos.
- ✅ **Mudanças menores:** código existente e recursos nativos vêm antes de código novo.
- ✅ **Contexto mais leve:** skills e regras limitadas carregam quando são necessárias.
- ✅ **Mesmo nível de segurança:** escopo pedido, segurança, acessibilidade e testes continuam valendo.

> [!IMPORTANT]
> A qualidade e a economia deste plugin ainda não foram medidas, então não publicamos percentual. O resultado depende do seu projeto e do seu jeito de trabalhar.

## 🙏 Créditos e licença

O Simply Coding usa licença MIT. Os projetos incluídos mantêm as próprias licenças, e não há afiliação com nenhum deles. Veja [NOTICE.md](NOTICE.md).
