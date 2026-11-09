<div align="center">

# ⚡ Simply Coding

**A method for building software with AI: a defined process for quality, lean habits for efficiency.**

A Claude Code plugin, also available for Codex, Gemini CLI and Grok Build, that bundles six open-source projects into one install.

[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
![Claude Code plugin](https://img.shields.io/badge/Claude%20Code-plugin-8A2BE2)
![Version](https://img.shields.io/badge/version-0.1.0-green)

**English** · [Português (Brasil)](README.pt-BR.md)

</div>

---

## 👋 Introduction

AI writes code fast, but without a process it skips requirements, declares work done without proof and grows the codebase with code nobody asked for. Simply Coding gives your agent a working method: a story-driven process that keeps quality in check, plus habits that keep answers, changes and context lean. One install, no setup.

## 📦 What's inside

| Component | Role | What it does for you |
|---|---|---|
| 🏗️ **[AIOX](https://github.com/SynkraAI/aiox-core)** | Quality | Agents, stories and quality gates: plan → build → review |
| ✅ **[verification-before-completion](https://github.com/obra/superpowers)** | Quality | No "done" without fresh proof: tests, build, diff |
| 📏 **[Quality gates](https://github.com/soumatheusgomes/vibe-coding-toolkit)** | Quality | JS/TS: lint rules for file size, logging and data access, installed and enforced automatically |
| 🧰 **[Matt Pocock's skills](https://github.com/mattpocock/skills)** | Quality | Debugging, design, domain modeling and sharper questions |
| 🪨 **[Caveman](https://github.com/JuliusBrussee/caveman)** | Efficiency | Short, direct answers that keep every technical fact |
| 🐴 **[Ponytail](https://github.com/DietrichGebert/ponytail)** | Efficiency | The simplest solution that works, with less code to write and review |

On top of these, the plugin adds lean-session rules to every session, scopes four AIOX rules so they load only when relevant, and suggests [graphify](https://github.com/Graphify-Labs/graphify) and [rtk](https://github.com/rtk-ai/rtk) when they would pay off.

## 🚀 How to use

**1. Install it inside Claude Code:**

```
/plugin marketplace add simplytecnologia/simply-coding
```

```
/plugin install simply-coding@simply-coding
```

**2. Open a project.** That's it.

Caveman and Ponytail apply to every new session. In a Git project, AIOX is copied into the folder the first time you open it.

### 🧭 Start here

Describe what you want in plain words, then follow the cycle:

**Automatic in JS/TS projects:** before the first code change, Claude installs the quality gates and measures the baseline. Files over 350 lines are split before they are edited, and Claude cannot finish while files it changed have lint errors. When a story closes with warnings left, Claude offers to clear them.

| Step | Command | What happens |
|---|---|---|
| 1. Plan | `/AIOX:agents:pm` | Turns your idea into requirements (PRD) |
| 2. Stories | `/AIOX:agents:sm` | Splits the plan into small stories with acceptance criteria |
| 3. Build | `/develop-story` | Implements one story and runs its tests |
| 4. Review | `/review-story` | QA gate: PASS, CONCERNS or FAIL |
| 5. Close | `/close-story` | Wraps up a story that passed QA |

Small fix? Skip the cycle and just ask. Hard bug? Ask Claude to diagnose it.

> [!NOTE]
> The new AIOX files show up as changes in Git. Review them before committing. Existing files are never overwritten.

### 🧪 Test like a real user (on demand)

A black-box tester: it reads the repository to learn what to test, then uses the app only through the browser (isolated Chromium), as a user would. It runs only when you call it, writes nothing to the project and fixes nothing: it delivers a report.

| Command | Scope |
|---|---|
| `/simply-coding:teste-geral` | The whole app |
| `/simply-coding:teste-diff` | Only what changed since the last test |
| `/simply-coding:teste customers screen` | The screen or flow you name |

The report is written as `report.md` and `report.html` under `~/.simply-coding/qa/<project>/runs/`, with findings by severity, reproduction steps, screenshots, measured times and a suggested fix with file and line.

- **Target:** `localhost` or an environment you confirm is not production. Production is refused.
- **Login:** the browser opens visible and you type user and password yourself. The tester never sees or stores the password, and the session is gone when the browser closes.
- **Requirement:** Node.js. The browser comes from [playwright-cli](https://github.com/microsoft/playwright-cli), downloaded on first use.

<details>
<summary><b>Options and special cases</b></summary>

| I want to... | Do this |
|---|---|
| Install AIOX in a folder without Git | Run `/simply-coding:instalar-aiox` |
| Keep AIOX out of a project | Delete `.aiox-core` if present, then create an empty `.simply-coding-sem-aiox` file |
| Avoid duplicate skills | Uninstall any standalone Caveman or Ponytail plugin |
| Read big repos with fewer tokens (optional) | Install [graphify](https://github.com/Graphify-Labs/graphify) (`pipx install graphifyy && graphify install`, needs Python 3.10+), then run `/graphify .` once. Claude suggests it by itself in Git repos with 50+ code/doc files; create an empty `.simply-coding-sem-graphify` to stop it |
| Turn off the quality gates in a project | Create an empty `.simply-coding-sem-quality-gates` file |
| Shrink shell output: tests, builds, git (optional) | Install [rtk](https://github.com/rtk-ai/rtk) (`winget install rtk-ai.rtk` or `brew install rtk`, then `rtk init -g`). Claude suggests it by itself while it is missing; create an empty `.simply-coding-sem-rtk` to stop it |

The `aiox` CLI and AIOX hooks are not included.

</details>

## 🤖 Other AI tools

Run one command inside your project folder. It requires [Node.js](https://nodejs.org).

| Tool | Command |
|---|---|
| **Codex** | `npx github:simplytecnologia/simply-coding codex` |
| **Gemini CLI** | `npx github:simplytecnologia/simply-coding gemini` |
| **Grok Build** | `npx github:simplytecnologia/simply-coding grok` |

The command copies the skills and AIOX, and adds the token-saving rules to `AGENTS.md` (Codex, Grok) or `GEMINI.md` (Gemini). Existing files are never overwritten. Run it once per project, and restart the tool afterwards.

> [!NOTE]
> Codex, Gemini CLI and Grok Build support is new. Only the file installation has been tested, not sessions inside those tools. AIOX automation is partial outside Claude Code.

## 📈 Expected results

- ✅ **Defined process:** every change goes through a story, implementation and a QA gate.
- ✅ **Mechanical gates:** lint errors block "done" in JS/TS projects, no judgment call.
- ✅ **Proof before "done":** tests and builds are run, not assumed.
- ✅ **Shorter answers:** less filler, with commands, paths and errors kept exact.
- ✅ **Smaller changes:** existing code and native features come before new code.
- ✅ **Lighter context:** skills and scoped rules load when they are needed.
- ✅ **Same safety bar:** requested scope, security, accessibility and tests stay in place.

> [!IMPORTANT]
> Quality and token savings have not been measured for this plugin, so we publish no percentage. Results depend on your project and on how you work.

## 🙏 Credits and license

Simply Coding is MIT licensed. Bundled projects keep their own licenses, and it is not affiliated with any of them. See [NOTICE.md](NOTICE.md).
