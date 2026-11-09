---
name: quality-gates
description: Mechanical lint quality gates for JavaScript/TypeScript projects (file-size ceiling, no direct console, no DB client in UI). Use when the session-start notice says the gates are missing or a touched file is over budget, when a Stop hook reports lint errors, when closing a story, or when the user asks to install lint gates, split big files or clear lint warnings.
---

# Quality gates

Three phases from the vibe-coding-toolkit (MIT, pinned copy). Each phase runs the prompt in `prompts/` next to this file, with these overrides:

- Source files: `assets/` next to this file, never a URL. Copy the `.cjs` files byte for byte.
- `MAX_LINES=350`, `BATCH_SIZE=3`, `RULE_ID=quality/max-lines`.
- Lint, test, typecheck and build commands: read them from `package.json`. Missing typecheck means `none`.
- Package manager: from the lockfile (`package-lock.json` npm, `pnpm-lock.yaml` pnpm, `yarn.lock` yarn, `bun.lockb`/`bun.lock` bun).

Only JS/TS projects with a `package.json`. Anything else: say the gates do not apply and stop.

## When each phase runs (no user command needed)

| Moment | Phase | Ask first? |
|---|---|---|
| Session-start notice says gates are missing, and the task changes JS/TS code | **Install** — `prompts/08-eslint-quality-gates-install.md`. Before the first code edit of the task. | No. Tell the user in one line what was added. Stop and ask only if ESLint ≤ 8 is installed or `npm i` fails. |
| You are about to edit a file that `quality/max-lines` reports (it is over budget) | **Split** — `prompts/09-file-size-refactor.md`, only for that file, in its own commit, before the feature change. | No. If there is no natural seam, say so and leave it. |
| The Stop hook blocks with lint errors | Fix the errors in the files you changed. Do not raise limits, add ignores or `eslint-disable` to pass. | No. |
| A story closes (`/close-story`, or the user says the feature is done) and lint still shows warnings | **Burndown** — `prompts/02-eslint-warning-burndown.md`. | **Yes**: its decision gate needs the user's answer. Offer once per session. |
| User asks to "split big files" or "clear warnings" | Split or Burndown, full batch. | Per the prompt. |

Never run Split or Burndown on files outside the current task without the user's yes; they move code between files.

## Verify

After Install: `node verify.mjs` prints three `: ok` lines, then delete `verify.mjs`. After any phase: rerun lint and report the real count, never a remembered one.

## Opt out

An empty `.simply-coding-sem-quality-gates` file in the project root turns off the notice and the Stop hook.
