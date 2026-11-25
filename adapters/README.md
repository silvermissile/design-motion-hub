# Adapters（外挂适配器目录 — Phase 2 预留）

用于托管**上游原仓没有 `SKILL.md` 的第三方纯技术库**（如 `paper-design/shaders`），避免修改原仓导致升级冲突。

每个适配器目录应包含：
- `SKILL.md`：你编写的 Agent 调用方法与边界约束
- `open-design.json`：OpenDesign 插件清单
- `upstream/`：`[gitignored 或按需同步]` 由 `scripts/sync-sources.mjs` 从远端仓库拉取的原始源码
