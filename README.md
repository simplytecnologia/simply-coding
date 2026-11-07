# Simply Coding

Plugin do Claude Code que reduz o gasto de tokens. Reúne Caveman, Ponytail, sete skills de Matt Pocock e o AIOX.

## Instalar

```
/plugin marketplace add simplytecnologia/simply-coding
/plugin install simply-coding@simply-coding
```

Pronto. Caveman e Ponytail passam a valer em toda sessão nova, e o AIOX entra sozinho nos projetos.

## AIOX automático

Ao abrir um projeto com Git, o plugin copia o AIOX para a pasta na primeira sessão. Ele nunca sobrescreve arquivos existentes. Os arquivos novos aparecem no Git como alterações do projeto.

- **Pasta sem Git:** nada é instalado. Para instalar mesmo assim, rode `/simply-coding:instalar-aiox`.
- **Para recusar em um projeto:** apague `.aiox-core`, se existir, e crie um arquivo vazio `.simply-coding-sem-aiox`.

## O que vem incluído

- `caveman`, `caveman-compress`, `ponytail`
- `diagnosing-bugs`, `domain-modeling`, `codebase-design`, `grilling`, `grill-me`, `wait-what`, `writing-for-agents`
- AIOX 5.4.1: agentes, tarefas, regras e constituição

Se você já usa o plugin Ponytail ou Caveman, desinstale-o para não duplicar skills.

Créditos e licenças em [NOTICE.md](NOTICE.md).
