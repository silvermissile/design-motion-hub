# design-motion-hub

个人前端展示、动效与设计资产的**统一真相源（Single Source of Truth）**。  
采用与 `lieflat-charts` 一致的 `SKILL.md` + `open-design.json` 便携包标准，同时赋能：
- **OpenDesign**（原型、HTML、Deck、插件市场）
- **OpenMotion**（HyperFrames 视频创作、Design Studio）
- **本地编码 Agent**（Antigravity / Codex / Claude Code / Cursor 等）

---

## 目录结构

```text
design-motion-hub/
├── packages/                    # 自研 / 精编便携插件包（直接可用）
│   ├── motion-recipes-kit/      # 零依赖 WebGL Shader / Canvas / 文字 / 交互动效库
│   └── motion-spec-craft/       # 定量动效预算与品味红线规范
├── adapters/                    # 外部纯源码仓（无 SKILL.md）的外挂适配器（Phase 2）
├── registry/
│   ├── sources.json             # 自研包 + 第三方收藏公开仓库的统一注册表
│   └── custom-marketplace.json  # OpenDesign marketplace.v1 格式市场索引
├── synced/                      # [gitignored] sync-sources.mjs 拉取的第三方缓存目录
└── scripts/
    ├── sync-sources.mjs         # 按 update 策略（latest/pinned）同步外部仓库
    └── install-to-hosts.mjs     # 挂载到 OpenDesign / 宿主 .agents/skills/ / OpenMotion
```

## 快速开始

### 1. 校验与挂载到本地 Agent Skills / OpenDesign

```bash
# 查看挂载预览（dry-run）
node scripts/install-to-hosts.mjs --dry-run

# 挂载到 ~/.agents/skills/ 与 OpenDesign 数据目录 (~/.od/plugins)
node scripts/install-to-hosts.mjs --target all

# 如已安装 OpenDesign CLI，可直接校验包规范
node ~/github/open-design/apps/daemon/bin/od.mjs plugin validate ./packages/motion-recipes-kit
node ~/github/open-design/apps/daemon/bin/od.mjs plugin validate ./packages/motion-spec-craft
```

### 2. 同步注册表中的第三方公开仓库

```bash
node scripts/sync-sources.mjs --dry-run
node scripts/sync-sources.mjs
```

## 许可与署名

仓库原创结构与自研文档遵循 [Apache-2.0](LICENSE)。第三方移植效果与外部收藏仓库保留各自原许可与署名，详见 [NOTICE.md](NOTICE.md) 及各插件包内的 `NOTICE.md`。
