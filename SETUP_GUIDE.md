# 🚀 Galaxian 項目完整設置指南

**最後更新**：2025-08-18  
**項目狀態**：⚡ 核心系統開發中 - Player✅ Bullet✅ Enemy✅ Collision✅ Score✅ 整合中...

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

### ✅ 4. 遊戲引擎與核心系統
- [x] `src/index.html` - 遊戲 UI 與控制
- [x] `src/index.ts` - 主入口與 UI 管理
- [x] `src/game/GameEngine.ts` - 核心遊戲循環與渲染
- [x] `src/game/constants.ts` - 遊戲常數與配置
- [x] `src/__tests__/setup.ts` - 測試環境配置

### ✅ 5. 遊戲實體系統
- [x] `src/game/entities/Player.ts` - 玩家戰機（移動、射擊、邊界檢查）
- [x] `src/game/entities/Bullet.ts` - 子彈實體（速度、碰撞盒、自動清理）
- [x] `src/game/entities/Enemy.ts` - 敵人實體（陣列形成、俯衝、渲染）

### ✅ 6. 遊戲系統
- [x] `src/game/systems/CollisionSystem.ts` - AABB 碰撞檢測
- [x] `src/game/systems/ScoreSystem.ts` - 分數計算與最高分存儲

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

## 🎯 開發進度與下一步任務

### ✅ Phase 1：遊戲核心邏輯（進行中）
- [x] 實現 `Player` 實體類（移動、射擊）✓
- [x] 實現 `Bullet` 實體類（速度、碰撞）✓
- [x] 實現 `Enemy` 實體類（陣列形成、俯衝）✓
- [x] 實現 `CollisionSystem`（碰撞檢測）✓
- [x] 實現 `ScoreSystem`（分數管理）✓
- [ ] 整合所有實體到 `GameEngine`（當前進行中）
- [ ] 實現 `AISystem`（敵人 AI & 俯衝攻擊）
- [ ] 測試所有碰撞與交互

### ⏳ Phase 2：遊戲完成度提升
- [ ] 完整遊戲循環（敵人波次、遊戲結束判定）
- [ ] 遊戲狀態（菜單、暫停、遊戲結束）
- [ ] 視覺效果（爆炸、屏幕搖晃）
- [ ] 音效反饋（發射、爆炸、得分）
- [ ] 難度等級系統

### ⏳ Phase 3：測試與優化
- [ ] 單元測試（≥ 80% 覆蓋率）
- [ ] 性能優化（確保 60 FPS）
- [ ] 遊戲平衡調整
- [ ] 代碼審查 (`/code-review --level high`)

### ⏳ Phase 4：部署與上線
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

## ✅ 當前開發檢查清單

### 環境設置
- [x] 執行 `npm install`
- [x] 執行 `npm run build` 確保無錯誤
- [x] 編輯 `wrangler.toml` 設定 Cloudflare Account ID
- [x] 在 GitHub 設定 Secrets（`CLOUDFLARE_API_TOKEN` 等）
- [x] 執行 `npm run dev` 驗證開發環境
- [x] Git 初始化並推送至 GitHub
- [x] Cloudflare Pages 部署成功

### 遊戲開發進度
- [x] Player 實體 - 完成並可在瀏覽器中看到
- [x] 鍵盤控制 - ← → 方向鍵移動正常工作
- [x] Bullet 系統 - 實現完成
- [x] Enemy 系統 - 實現完成
- [x] Collision 系統 - 實現完成
- [x] Score 系統 - 實現完成
- [ ] GameEngine 集成 - 正在進行
- [ ] 敵人 AI 系統 - 待實現
- [ ] 遊戲狀態管理 - 待實現

### 部署驗證
- [x] 本地開發伺服器正常運行（http://localhost:3001）
- [x] Cloudflare Pages 部署（https://zbot-games-galaxian.pages.dev）
- [x] GitHub Actions CI/CD 配置完成

---

## 🚀 立即開始玩遊戲

訪問 **https://zbot-games-galaxian.pages.dev** 查看當前進度！

或本地開發：
```bash
npm run dev
```

---

## 📊 開發統計

| 項目 | 狀態 | 說明 |
|------|------|------|
| 核心引擎 | ✅ 95% | GameEngine 框架完成，待系統集成 |
| 實體系統 | ✅ 100% | Player、Bullet、Enemy 全部完成 |
| 碰撞檢測 | ✅ 100% | CollisionSystem 完成 |
| 分數系統 | ✅ 100% | ScoreSystem 完成 |
| AI 系統 | ⏳ 0% | 待實現敵人行為 |
| 遊戲狀態 | ⏳ 20% | 基礎框架完成，待完善菜單/暫停 |
| 視覺效果 | ⏳ 10% | 基礎渲染完成，待特效 |
| 音效 | ⏳ 0% | 待添加 |
| 測試覆蓋 | ⏳ 30% | 待編寫單元測試 |

**總體進度**：🟢 **45%** - 核心系統已完成，整合測試中

---

*文檔最後更新：2025-08-18*

**🎮 遊戲開發進行中... 敬請期待完整版本！**
