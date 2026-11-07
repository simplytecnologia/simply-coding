<div align="center">

# ⚡ Simply Coding

**Spend fewer tokens. Keep the quality.**

A Claude Code plugin that bundles four open-source projects into one install.

[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
![Claude Code plugin](https://img.shields.io/badge/Claude%20Code-plugin-8A2BE2)
![Version](https://img.shields.io/badge/version-0.1.0-green)

**English** · [Português (Brasil)](README.pt-BR.md)

</div>

---

## 👋 Introduction

AI coding sessions get expensive quietly: long answers, oversized solutions, and instructions loaded when nobody needs them. Simply Coding fixes those habits with one install and no setup.

## 📦 What's inside

| Component | What it does for you |
|---|---|
| 🪨 **[Caveman](https://github.com/JuliusBrussee/caveman)** | Short, direct answers that keep every technical fact |
| 🐴 **[Ponytail](https://github.com/DietrichGebert/ponytail)** | The simplest solution that works, with less code to write and review |
| 🧰 **[Matt Pocock's skills](https://github.com/mattpocock/skills)** | Seven engineering skills for debugging, design, domain modeling and sharper questions |
| 🏗️ **[AIOX](https://github.com/SynkraAI/aiox-core)** | Agents, tasks and rules for story-driven development |

On top of these, the plugin adds token-saving rules to every session and limits three AIOX rules so they load only when relevant.

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

> [!NOTE]
> The new AIOX files show up as changes in Git. Review them before committing. Existing files are never overwritten.

<details>
<summary><b>Options and special cases</b></summary>

| I want to... | Do this |
|---|---|
| Install AIOX in a folder without Git | Run `/simply-coding:instalar-aiox` |
| Keep AIOX out of a project | Delete `.aiox-core` if present, then create an empty `.simply-coding-sem-aiox` file |
| Avoid duplicate skills | Uninstall any standalone Caveman or Ponytail plugin |

The `aiox` CLI and AIOX hooks are not included.

</details>

## 📈 Expected results

- ✅ **Shorter answers:** less filler, with commands, paths and errors kept exact.
- ✅ **Smaller changes:** existing code and native features come before new code.
- ✅ **Lighter context:** skills and scoped rules load when they are needed.
- ✅ **Same safety bar:** requested scope, security, accessibility and tests stay in place.

> [!IMPORTANT]
> Savings have not been measured for this plugin, so we publish no percentage. Results depend on your project and on how you work.

## 🙏 Credits and license

Simply Coding is MIT licensed. Bundled projects keep their own licenses, and it is not affiliated with any of them. See [NOTICE.md](NOTICE.md).
