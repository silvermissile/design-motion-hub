# design-motion-hub

个人前端展示、动效与设计资产的**统一真相源（Single Source of Truth）**。  
GitHub 仓库：<https://github.com/silvermissile/design-motion-hub>

采用与 `lieflat-charts` 一致的 `SKILL.md` + `open-design.json` 便携包标准，同时赋能：
- **OpenDesign**（原型、HTML、Deck、插件市场）
- **OpenMotion**（HyperFrames 视频创作、Design Studio）
- **本地编码 Agent**（Antigravity / Codex / Claude Code / Cursor 等）

---

## 目录结构

```text
design-motion-hub/
├── packages/                        # 自研 / 精编便携插件包
│   ├── motion-recipes-kit/          # 84 个零依赖特效 + 双模时钟 shaderbg.js
│   ├── motion-spec-craft/           # MOTION-SPEC 定量动效预算与品味红线
│   └── svg-animations-kit/          # SVG SMIL / CSS 矢量与路径动效指南
├── adapters/                        # 无 SKILL.md 外部纯源码仓的外挂适配器
│   └── paper-shaders/               # 同步 paper-design/shaders (30 WebGL2 shaders)
├── manifests/                       # 为自带 SKILL.md 的外部仓注入的 open-design.json Sidecar
│   ├── img2threejs.json
│   ├── lanshu-animated-architecture-diagram.json
│   └── text-to-lottie.json
├── registry/
│   ├── sources.json                 # 自研包 + 第三方公开仓的统一注册表 (update: latest/pinned)
│   └── custom-marketplace.json      # OpenDesign marketplace.v1 市场索引
├── synced/                          # [gitignored] sync-sources.mjs 拉取的第三方缓存目录
└── scripts/
    ├── sync-sources.mjs             # 按 update 策略同步外部仓库（支持 sparse-checkout 子目录）
    └── install-to-hosts.mjs         # 挂载到 OpenDesign / 宿主 .agents/skills/ / OpenMotion
```

## 已注册资产清单（8 个插件，均通过 `od plugin validate`）

| ID | 类型 | 来源 | 更新策略 |
| :--- | :--- | :--- | :--- |
| `motion-recipes-kit` | 自研精编包 | `packages/motion-recipes-kit` | 本地维护 |
| `motion-spec-craft` | 自研规范包 | `packages/motion-spec-craft` | 本地维护 |
| `svg-animations-kit` | 自研精编包 | `packages/svg-animations-kit` | 本地维护 |
| `lieflat-charts` | 外部标准仓 | `github:silvermissile/lieflat-charts@main` | `latest` |
| `paper-shaders` | 外挂适配器 | `github:paper-design/shaders@main/packages/shaders/src` | `latest` |
| `lanshu-animated-architecture-diagram` | 外部仓 + Sidecar | `github:cclank/lanshu-animated-architecture-diagram@main` | `latest` |
| `img2threejs` | 外部仓 + Sidecar | `github:img2threejs/img2threejs@main` | `latest` |
| `text-to-lottie` | 外部子目录 + Sidecar | `github:diffusionstudio/lottie@main/skills/text-to-lottie` | `latest` |

---

## 快速开始

### 1. 同步第三方公开仓并挂载到本机

```bash
# 1. 拉取或更新所有外部收藏仓库与适配器源码
node scripts/sync-sources.mjs

# 2. 一键安装到 OpenDesign (~/.od/plugins) 并软链到 ~/.agents/skills/
node scripts/install-to-hosts.mjs --target all

# 可选：注入本地 OpenMotion Design Studio catalog
node scripts/install-to-hosts.mjs --target openmotion --openmotion-dir ~/github/openmotion
```

### 2. 通过 OpenDesign Marketplace 原生接入

```bash
od marketplace add https://raw.githubusercontent.com/silvermissile/design-motion-hub/main/registry/custom-marketplace.json --trust trusted
od marketplace plugins design-motion-hub
```

### 3. 校验所有已安装插件

```bash
for dir in ~/.od/plugins/*; do
  node ~/github/open-design/apps/daemon/bin/od.mjs plugin validate "$dir" --json
done
```

## 许可与署名

仓库原创结构与自研文档遵循 [Apache-2.0](LICENSE)。第三方移植效果与外部收藏仓库保留各自原许可与署名，详见 [NOTICE.md](NOTICE.md) 及各包内 `NOTICE.md`。
