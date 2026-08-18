# 🚀 Galaxian 項目完整設置指南

**生成日期**：2025-08-18  
**項目狀態**：✅ 架構完成，待初始化依賴

---

## 📋 已完成的設置項目

### ✅ 1. Claude Code 架構
- [x] **CLAUDE.md** - 項目文檔與快速參考
- [x] **子代理** - `game-dev.md` 和 `deploy-engineer.md`
- [x] **自定義命令** - `/start-feature` 和 `/game-verify`
- [x] **技能包** - Cloudflare 部署技能
- [x] **自動化 Hook** - `post-tool-use.json`（自動格式化）

### ✅ 2. 項目配置檔案
- [x] `package.json` - 依賴與 npm 指令
- [x] `tsconfig.json` - TypeScript 嚴格模式配置
- [x] `vite.config.ts` - 構建工具配置
- [x] `vitest.config.ts` - 測試框架配置
- [x] `wrangler.toml` - Cloudflare Pages 配置
- [x] `.eslintrc.json` - ESLint 規則
- [x] `.prettierrc.json` - 代碼格式化規則
- [x] `.gitignore` - Git 忽略規則

### ✅ 3. CI/CD 自動化
- [x] `.github/workflows/deploy.yml` - GitHub Actions 工作流
  - 自動 Lint & Test
  - 生產構建與部署
  - PR 預覽部署
  - 安全掃描

### ✅ 4. 遊戲引擎骨架
- [x] `src/index.html` - 遊戲 UI 與控制
- [x] `src/index.ts` - 主入口與 UI 管理
- [x] `src/game/GameEngine.ts` - 核心遊戲循環
- [x] `src/game/constants.ts` - 遊戲常數
- [x] `src/__tests__/setup.ts` - 測試環境配置

### ✅ 5. 文檔
- [x] `README.md` - 項目總覽與使用指南
- [x] `CLAUDE.md` - 開發工作流與最佳實踐
- [x] `SETUP_GUIDE.md` - 本指南

---

## 🔧 立即開始（3 步驟）

### Step 1：安裝依賴

```bash
cd /Users/lz/zbot-games-galaxian
npm install
```

**預期輸出**：
```
added XXX packages in XXs
```

### Step 2：驗證環境

```bash
npm run build
```

**預期結果**：
- ✅ TypeScript 編譯成功
- ✅ `dist/` 目錄生成
- ✅ 無編譯錯誤

### Step 3：啟動開發伺服器

```bash
npm run dev
```

**預期結果**：
- ✅ Vite 開發伺服器啟動
- ✅ 瀏覽器自動開啟 `http://localhost:5173`
- ✅ 看到 Galaxian 遊戲 UI

---

## 📌 必須配置的項目

### ⚠️ 1. Cloudflare 認證

**編輯** `wrangler.toml`：
```toml
account_id = "YOUR_CLOUDFLARE_ACCOUNT_ID"  # ← 改這裡
project_name = "zbot-games-galaxian"
```

**獲取 Account ID**：
```bash
wrangler whoami
# 或從 Cloudflare Dashboard 獲取
```

### ⚠️ 2. GitHub Secrets 設定（部署所需）

進入 GitHub Repository Settings → Secrets and variables → Actions：

| 密鑰名稱 | 說明 |
|---------|------|
| `CLOUDFLARE_API_TOKEN` | Cloudflare API 令牌 |
| `CLOUDFLARE_ACCOUNT_ID` | Cloudflare 帳戶 ID |

**取得 API Token**：
1. 訪問 [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Account → API Tokens
3. Create Token → Pages: Edit (選擇權限)
4. 複製令牌到 GitHub Secrets

### ⚠️ 3. 首次 Git 提交

```bash
# 初始化 Git 並推送
git init
git add .
git commit -m "feat: initial Galaxian project setup"
git branch -M main
git remote add origin https://github.com/sp1050107-zbot/zbot-games-galaxian.git
git push -u origin main
```

---

## 🎯 下一步開發任務

### Phase 1：遊戲核心邏輯（Week 1）
- [ ] 實現 `Player` 實體類（移動、射擊）
- [ ] 實現 `Enemy` 實體類（陣列形成）
- [ ] 實現 `CollisionSystem`（碰撞檢測）
- [ ] 實現 `AISystem`（敵人 AI & 俯衝攻擊）
- [ ] 實現 `ScoreSystem`（分數管理）

**建議用** `/start-feature` 命令隔離開發：
```bash
/start-feature add-player-entity
/start-feature add-enemy-entity
/start-feature add-collision-detection
# ... 等等
```

### Phase 2：遊戲循環整合（Week 2）
- [ ] 整合所有實體到 `GameEngine`
- [ ] 實現完整的遊戲循環
- [ ] 添加音效與視覺效果
- [ ] 實現難度等級系統

### Phase 3：測試與優化（Week 3）
- [ ] 達成 ≥ 80% 測試覆蓋率
- [ ] 性能優化（60 FPS 目標）
- [ ] 遊戲平衡調整
- [ ] 執行 `/code-review --level high`

### Phase 4：部署與上線（Week 4）
- [ ] 本地完整測試
- [ ] 執行 `/cloudflare-deploy --preview`
- [ ] GitHub Actions 自動部署驗證
- [ ] 上線至 https://zbot-games-galaxian.pages.dev

---

## 💡 關鍵工作流命令

### 日常開發
```bash
# 新增功能
/start-feature feature-name

# 驗證代碼品質
/game-verify

# 代碼審查
/code-review --level medium
```

### 部署相關
```bash
# 本地預覽（模擬 Cloudflare 環境）
/cloudflare-deploy --preview

# 完整部署（推送到 main 即可自動執行）
git push origin main
```

### 檢查項目狀態
```bash
# 列出所有 worktree
git worktree list

# 查看工作流運行狀態
# 訪問 https://github.com/sp1050107-zbot/zbot-games-galaxian/actions
```

---

## 📊 項目架構速查表

| 層級 | 元件 | 說明 |
|------|------|------|
| **表現層** | `src/index.html` | 遊戲 UI 與按鈕 |
| **業務層** | `src/game/GameEngine.ts` | 遊戲循環與狀態 |
| **實體層** | `src/game/entities/*.ts` | 玩家、敵人、子彈 |
| **系統層** | `src/game/systems/*.ts` | 碰撞、AI、分數 |
| **配置層** | `src/game/constants.ts` | 所有常數定義 |
| **測試層** | `src/__tests__/*.test.ts` | 單元測試 |
| **構建層** | `vite.config.ts` | 構建配置 |
| **部署層** | `wrangler.toml` | Cloudflare 配置 |
| **自動化層** | `.github/workflows/` | CI/CD 工作流 |

---

## 🛡️ 最佳實踐清單

- ✅ 使用 Git Worktree 隔離功能開發
- ✅ 每次提交前執行 `/game-verify`
- ✅ 遵守 TypeScript 嚴格類型
- ✅ 編寫單元測試（≥ 80% 覆蓋率）
- ✅ 使用 Prettier 自動格式化
- ✅ 使用 ESLint 保證代碼品質
- ✅ 撰寫清晰的 Commit 信息
- ✅ 不在 main 分支直接編輯
- ✅ 執行本地測試後再推送
- ✅ GitHub Actions 自動部署驗證

---

## 📞 需要幫助？

### 查看相關文檔
- **開發工作流**：`CLAUDE.md`
- **遊戲邏輯**：`.claude/agents/game-dev.md`
- **部署問題**：`.claude/agents/deploy-engineer.md`
- **技能使用**：`.claude/skills/cloudflare-deploy/SKILL.md`
- **驗證檢查清單**：`.claude/commands/game-verify.md`

### 常用快捷命令
```bash
# 從項目根目錄執行
/start-feature <name>          # 新增功能分支
/game-verify                   # 完整驗證
/cloudflare-deploy --preview   # 本地預覽
npm run dev                    # 開發伺服器
npm run test                   # 執行測試
npm run lint                   # 代碼檢查
npm run format                 # 自動格式化
```

---

## 🎯 初次設置檢查清單

- [ ] 執行 `npm install`
- [ ] 執行 `npm run build` 確保無錯誤
- [ ] 編輯 `wrangler.toml` 設定 Cloudflare Account ID
- [ ] 在 GitHub 設定 Secrets（`CLOUDFLARE_API_TOKEN` 等）
- [ ] 執行 `npm run dev` 驗證開發環境
- [ ] 本地執行 `npm run test` 檢查測試配置
- [ ] Git 初始化並推送至 GitHub
- [ ] 在 GitHub Actions 確認首次 Workflow 運行
- [ ] 造訪 Cloudflare Dashboard 驗證部署

---

**恭喜！🎉 你的 Galaxian 項目架構已完全設置！**

立即開始開發吧！使用 `/start-feature` 建立第一個功能分支。

---

*文檔最後更新：2025-08-18*
