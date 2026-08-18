# 🌍 三環境部署指南 (Dev/Stg/Prod)

**配置日期**：2025-08-18  
**狀態**：✅ GitHub Actions 已配置，待 staging 分支建立

---

## 📊 環境架構概覽

```
                   ┌─────────────┐
                   │   develop   │◄─── Feature Branches
                   │ (Dev Env)   │     (/start-feature)
                   └──────┬──────┘
                          │ git push
                          ▼
        ┌─────────────────────────────────────┐
        │  GitHub Actions CI/CD Pipeline      │
        │  ├─ Lint & Test                     │
        │  ├─ Build                           │
        │  └─ Deploy to Cloudflare            │
        └─────────────────────────────────────┘
         │                    │                    │
         ▼                    ▼                    ▼
    ┌─────────┐         ┌──────────┐        ┌──────────┐
    │  Dev    │         │   Stg    │        │   Prod   │
    │ Env     │         │  Env     │        │   Env    │
    │ Pages   │         │  Pages   │        │  Pages   │
    └─────────┘         └──────────┘        └──────────┘
         │                    │                    │
         ▼                    ▼                    ▼
    dev.*.  ◄─ staging.*.  ◄─ zbot-games-
    pages       pages         galaxian.pages
```

---

## 🔧 分支配置

### main 分支 (Production)
- **用途**：生產環境，穩定版本
- **部署目標**：`zbot-games-galaxian-prod.pages.dev`
- **Wrangler 項目**：`zbot-games-galaxian-prod`
- **觸發條件**：
  - `git push origin main`
  - PR 合併到 main
- **審批要求**：✅ Code Review 必需

### staging 分支 (Staging)
- **用途**：測試環境，完整功能驗收
- **部署目標**：`zbot-games-galaxian-stg.pages.dev`
- **Wrangler 項目**：`zbot-games-galaxian-stg`
- **觸發條件**：
  - `git push origin staging`
  - 來自 develop 的 PR
- **審批要求**：⏳ 團隊測試通過

### develop 分支 (Development)
- **用途**：開發環境，持續整合
- **部署目標**：`zbot-games-galaxian-dev.pages.dev`
- **Wrangler 項目**：`zbot-games-galaxian-dev`
- **觸發條件**：
  - `git push origin develop`
  - 功能分支合併
- **審批要求**：無，自動部署

---

## 📋 初始設置清單

### 1️⃣ GitHub 分支保護設置

進入 Repository Settings → Branches：

| 分支 | 規則 |
|------|------|
| **main** | ✅ 要求代碼審查、✅ 要求狀態檢查通過 |
| **staging** | ✅ 要求狀態檢查通過 |
| **develop** | ❌ 無保護（允許直接推送） |

### 2️⃣ 建立 Staging 分支

```bash
# 在本地建立 staging 分支（來自 develop）
git fetch origin
git checkout -b staging origin/develop

# 推送到遠端
git push -u origin staging
```

### 3️⃣ 設置 Cloudflare Projects

在 Cloudflare Dashboard 建立三個項目：

| 項目名稱 | 帳戶 ID | 環境 |
|---------|--------|------|
| `zbot-games-galaxian-dev` | 21a0246272ef2a34fb908aabdbf60516 | Development |
| `zbot-games-galaxian-stg` | 21a0246272ef2a34fb908aabdbf60516 | Staging |
| `zbot-games-galaxian-prod` | 21a0246272ef2a34fb908aabdbf60516 | Production |

### 4️⃣ 配置 GitHub Environments

進入 Repository Settings → Environments：

```
Development (develop)
  Environment secrets: None required
  Deployment protection rules: None

Staging (staging)
  Environment secrets: None required
  Deployment protection rules: ✅ 需要審批

Production (main)
  Environment secrets: None required
  Deployment protection rules: ✅ 需要審批 + 要求特定分支
```

### 5️⃣ GitHub Secrets

確認已設置以下 Secrets（Settings → Secrets and variables → Actions）：

| 密鑰名稱 | 說明 | 狀態 |
|---------|------|------|
| `CLOUDFLARE_API_TOKEN` | Cloudflare API 令牌 | ✅ 已設置 |
| `CLOUDFLARE_ACCOUNT_ID` | Cloudflare 帳戶 ID | ✅ 已設置 |

---

## 🚀 部署工作流

### 開發流程（Dev 環境）

```bash
# 1. 切換到 develop 分支
git checkout develop

# 2. 建立功能分支
/start-feature add-new-feature

# 3. 開發並測試
npm run dev
npm run test

# 4. 代碼品質檢查
/game-verify

# 5. 提交並推送
git add .
git commit -m "feat: add new feature"
git push origin feature/add-new-feature

# 6. 合併回 develop
git checkout develop
git merge feature/add-new-feature
git push origin develop

# ➜ GitHub Actions 自動部署到 Dev
# ✅ https://zbot-games-galaxian-dev.pages.dev
```

### 測試流程（Staging 環境）

```bash
# 1. 建立 PR：develop → staging
git checkout staging
git pull origin develop
git push origin staging

# 2. GitHub Actions 自動部署到 Staging
# ✅ https://zbot-games-galaxian-stg.pages.dev

# 3. 進行完整測試
# - 功能測試
# - 性能測試 (60 FPS)
# - 兼容性測試

# 4. 修復問題（如有）
/start-feature fix-staging-issue
git checkout staging
git merge feature/fix-staging-issue
git push origin staging
```

### 發佈流程（Production 環境）

```bash
# 1. 確保 staging 測試完成
# 2. 建立 PR：staging → main
git checkout main
git pull origin staging

# 3. 代碼審查與批准
# - 檢查測試覆蓋率 ≥ 80%
# - 審查所有變更
# - 驗證構建成功

# 4. 合併到 main
git merge staging
git push origin main

# ➜ GitHub Actions 自動部署到 Production
# ✅ https://zbot-games-galaxian-prod.pages.dev
```

---

## 📊 GitHub Actions 工作流

### 自動觸發規則

| 事件 | 分支 | 動作 |
|------|------|------|
| Push | develop | Lint → Test → Build → Deploy Dev |
| Push | staging | Lint → Test → Build → Deploy Stg |
| Push | main | Lint → Test → Build → Deploy Prod |
| PR Open | 任何 | Lint → Test (不部署) |

### 部署環境變數

在 GitHub Actions 中自動設置：

```yaml
# develop 分支
environment: development
project_name: zbot-games-galaxian-dev

# staging 分支
environment: staging
project_name: zbot-games-galaxian-stg

# main 分支
environment: production
project_name: zbot-games-galaxian
```

---

## ✅ 驗證部署

### 檢查 GitHub Actions

訪問：https://github.com/sp1050107-zbot/zbot-games-galaxian/actions

應該看到：
- ✅ 最新的 Workflow Run
- ✅ 所有 Jobs 通過（Lint & Test → Build & Deploy）
- ✅ 部署日期與環境標記

### 驗證 Cloudflare 部署

```bash
# 測試 Dev 環境
curl -I https://zbot-games-galaxian-dev.pages.dev

# 測試 Staging 環境
curl -I https://zbot-games-galaxian-stg.pages.dev

# 測試 Production 環境
curl -I https://zbot-games-galaxian-prod.pages.dev

# 所有應返回 200 OK
```

### 瀏覽器訪問

- **Dev**: https://zbot-games-galaxian-dev.pages.dev
- **Staging**: https://zbot-games-galaxian-stg.pages.dev
- **Production**: https://zbot-games-galaxian-prod.pages.dev

---

## 🔄 回滾流程

### 如果 Production 部署失敗

```bash
# 1. 立即檢查 Production 日誌
# GitHub Actions → 最新 Run → 查看錯誤

# 2. 還原到上一個穩定版本
git revert <bad-commit>
git push origin main
# ➜ GitHub Actions 自動重新部署

# 3. 或者手動回滾
git reset --hard <last-good-commit>
git push --force origin main
```

### 回滾到 Staging

```bash
# 1. 在 staging 分支修復問題
git checkout staging
/start-feature fix-staging-bug

# 2. 測試通過後重新推送
git push origin staging
# ➜ GitHub Actions 自動重新部署 Staging

# 3. 驗證修復後，再次推送到 main
```

---

## 📞 故障排除

### 部署卡住

**症狀**：GitHub Actions 卡在某個步驟

**解決**：
1. 檢查 Cloudflare API Token 是否有效
2. 驗證 Account ID 是否正確
3. 檢查 Cloudflare 帳戶配額是否充足
4. 手動重新執行 Workflow

### 部署失敗：Build 錯誤

**症狀**：`npm run build` 失敗

**解決**：
```bash
# 本地測試
npm ci
npm run build

# 查看具體錯誤
npm run build 2>&1 | tail -50
```

### 環境間流量不平衡

如果三個環境部署不均勻，檢查：
1. GitHub Secrets 在正確環境
2. Wrangler 項目名稱是否正確
3. 分支保護規則是否阻止某些推送

---

## 📋 最佳實踐

✅ 每個環境獨立測試  
✅ Production 始終通過代碼審查  
✅ Staging 完整功能測試後才推向 Production  
✅ Dev 自由實驗，但保持可部署狀態  
✅ 使用 Git Worktree 隔離功能開發  
✅ 清晰的 Commit 信息  
✅ 定期同步分支狀態  

---

**🎉 三環境部署已配置完成！**

現在您可以：
1. ✅ 在 develop 分支進行開發（自動部署到 Dev）
2. ✅ 測試後推送到 staging（自動部署到 Staging）
3. ✅ 驗收後推送到 main（自動部署到 Production）

🚀 開始部署您的 Galaxian 遊戲！

---

*部署指南最後更新：2025-08-18*
