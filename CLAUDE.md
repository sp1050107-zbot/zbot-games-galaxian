# 🎮 Galaxian - 經典街機復刻遊戲

**專案代碼**：`zbot-games-galaxian`  
**Repository**：[sp1050107-zbot/zbot-games-galaxian](https://github.com/sp1050107-zbot/zbot-games-galaxian)

---

## 📋 技術堆疊

| 元件 | 技術 |
|------|------|
| **前端引擎** | HTML5 Canvas + TypeScript/Vanilla JS |
| **核心遊戲系統** | Canvas 2D 渲染、事件驅動 AI、碰撞檢測 |
| **部署平台** | Cloudflare Pages / Workers |
| **自動化** | GitHub Actions CI/CD + Wrangler CLI |
| **開發工具** | Prettier (Format) + ESLint (Lint) |

---

## 🚀 常用指令

```bash
# 開發啟動（本地測試伺服器）
npm run dev

# 格式化代碼
npm run format

# Lint 檢查
npm run lint

# 單元測試
npm run test

# 生產建置
npm run build

# 部署至 Cloudflare Pages（本地預覽）
npm run preview

# 部署至 Cloudflare
npm run deploy
```

---

## 🌿 Git Worktree 工作流規範

**核心原則**：每個功能分支獨立 worktree，避免污染主工作區

### 快速開始新功能
```bash
/start-feature my-cool-feature
# 自動執行：
# 1. git worktree add -b feature/my-cool-feature .worktrees/feature-my-cool-feature main
# 2. cd .worktrees/feature-my-cool-feature
```

### 完成功能並整合
```bash
git checkout main
git merge feature/my-cool-feature
git worktree remove .worktrees/feature-my-cool-feature
```

---

## 💡 開發原則

- **TDD First**：先寫測試，再實現邏輯
- **Do Not Babysit**：使用 Subagent 隔離長流程，不頻繁檢查
- **遊戲驗證**：每次提交前執行 `/game-verify` 確保完整性
- **自動化優先**：GitHub Actions、Prettier、ESLint 自動執行

---

## 📁 關鍵檔案結構

```
zbot-games-galaxian/
├── CLAUDE.md                    # 本檔案
├── .claude/
│   ├── agents/
│   │   ├── game-dev.md         # 遊戲邏輯開發子代理
│   │   └── deploy-engineer.md  # 部署工程子代理
│   ├── commands/
│   │   ├── start-feature.md    # 啟動新分支
│   │   └── game-verify.md      # 遊戲完整性檢查
│   ├── skills/
│   │   └── cloudflare-deploy/SKILL.md  # CF 部署技能
│   └── hooks/
│       └── post-tool-use.json  # 自動格式化 Hook
├── .github/
│   └── workflows/deploy.yml    # CI/CD 自動部署
├── src/
│   ├── game/
│   │   ├── entities/          # 玩家、敵人、子彈
│   │   ├── systems/           # 碰撞、AI、渲染
│   │   └── constants.ts       # 遊戲常數
│   └── index.ts
├── tests/
│   └── game.test.ts
├── wrangler.toml              # Cloudflare Workers 配置
├── package.json
└── tsconfig.json
```

---

## 🎯 常見任務

| 任務 | 指令 |
|------|------|
| 新建功能分支 | `/start-feature <name>` |
| 驗證遊戲 | `/game-verify` |
| 部署至 CF | `/cloudflare-deploy --preview` |
| 代碼審查 | `/code-review --level medium` |

---

## 📞 子代理

- **game-dev**：遊戲核心邏輯（戰機、敵人 AI、碰撞）
- **deploy-engineer**：Cloudflare 部署 & GitHub Actions 除錯
