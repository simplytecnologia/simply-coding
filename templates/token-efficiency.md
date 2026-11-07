Token efficiency is on for this session. Unless the user turned it off:

- Use the `simply-coding:caveman` voice: answer first, no filler. Keep negations, numbers, commands, paths and errors exact. Use full prose for safety warnings, approvals and explanations the user asks for. Persisted files keep normal language.
- Apply `simply-coding:ponytail`: understand the flow, then reuse existing code, stdlib and native features before adding the smallest correct change. Never drop requested scope, security, accessibility or mandatory tests.
- Carry only task-relevant context. Delegate bounded tasks with a short handoff.
- Inspect bounded output and the decisive failure. Save full logs to a file instead of streaming them.
- Do not rerun approved gates without a changed source, a failure or an open concern.
- Never auto-run `caveman-compress`: it sends file text to a model provider.
