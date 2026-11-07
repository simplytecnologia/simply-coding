<div align="center">

# ⚡ Simply Coding

**Gaste menos tokens. Mantenha a qualidade.**

Um plugin do Claude Code, também disponível para Codex, Gemini CLI e Grok Build, que reúne quatro projetos de código aberto em uma só instalação.

[![Licença: MIT](https://img.shields.io/badge/licen%C3%A7a-MIT-blue.svg)](LICENSE)
![Plugin do Claude Code](https://img.shields.io/badge/Claude%20Code-plugin-8A2BE2)
![Versão](https://img.shields.io/badge/vers%C3%A3o-0.1.0-green)

[English](README.md) · **Português (Brasil)**

</div>

---

## 👋 Introdução

Sessões de programação com IA ficam caras sem ninguém perceber: respostas longas, soluções maiores que o necessário e instruções carregadas à toa. O Simply Coding corrige esses hábitos com uma instalação, sem configuração.

## 📦 O que vem dentro

| Componente | O que faz por você |
|---|---|
| 🪨 **[Caveman](https://github.com/JuliusBrussee/caveman)** | Respostas curtas e diretas, sem perder nenhum fato técnico |
| 🐴 **[Ponytail](https://github.com/DietrichGebert/ponytail)** | A solução mais simples que funciona, com menos código para escrever e revisar |
| 🧰 **[Skills de Matt Pocock](https://github.com/mattpocock/skills)** | Sete skills de engenharia para depurar, projetar, modelar o domínio e fazer perguntas melhores |
| 🏗️ **[AIOX](https://github.com/SynkraAI/aiox-core)** | Agentes, tarefas e regras para desenvolvimento guiado por histórias |

Além disso, o plugin acrescenta regras de economia a toda sessão e limita três regras do AIOX para que só carreguem quando forem úteis.

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

> [!NOTE]
> Os arquivos novos do AIOX aparecem como alterações no Git. Revise antes de fazer commit. Arquivos existentes nunca são sobrescritos.

<details>
<summary><b>Opções e casos especiais</b></summary>

| Quero... | Faça isto |
|---|---|
| Instalar o AIOX em uma pasta sem Git | Rode `/simply-coding:instalar-aiox` |
| Deixar o AIOX fora de um projeto | Apague `.aiox-core`, se existir, e crie um arquivo vazio `.simply-coding-sem-aiox` |
| Evitar skills duplicadas | Desinstale plugins avulsos de Caveman ou Ponytail |

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

- ✅ **Respostas mais curtas:** menos enrolação, com comandos, caminhos e erros mantidos exatos.
- ✅ **Mudanças menores:** código existente e recursos nativos vêm antes de código novo.
- ✅ **Contexto mais leve:** skills e regras limitadas carregam quando são necessárias.
- ✅ **Mesmo nível de segurança:** escopo pedido, segurança, acessibilidade e testes continuam valendo.

> [!IMPORTANT]
> A economia deste plugin ainda não foi medida, então não publicamos percentual. O resultado depende do seu projeto e do seu jeito de trabalhar.

## 🙏 Créditos e licença

O Simply Coding usa licença MIT. Os projetos incluídos mantêm as próprias licenças, e não há afiliação com nenhum deles. Veja [NOTICE.md](NOTICE.md).
