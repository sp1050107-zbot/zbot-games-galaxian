# 🚀 Cloudflare Deploy Skill

**用途**：部署遊戲至 Cloudflare Pages，包括本地預覽、預發佈、生產部署  
**代理**：`deploy-engineer`

---

## 📖 快速使用

```bash
/cloudflare-deploy                    # 預設：生產部署
/cloudflare-deploy --preview          # 本地預覽
/cloudflare-deploy --preview-branch   # PR 預覽分支
/cloudflare-deploy --verify           # 驗證配置
```

---

## 🔄 執行流程

### 步驟 1：驗證前置條件

#### ✅ 環境檢查
```bash
# 1. Node.js 版本 ≥ 18
node --version

# 2. npm 依賴安裝
npm ci

# 3. Cloudflare CLI (Wrangler)
wrangler --version

# 4. 認證狀態
wrangler whoami
```

**失敗排查**：
```bash
# 重新認證
wrangler login

# 或使用 API Token
export CLOUDFLARE_API_TOKEN="your-token"
export CLOUDFLARE_ACCOUNT_ID="your-account-id"
```

---

### 步驟 2：構建應用

```bash
npm run build
```

**驗證產物**：
```bash
ls -lh dist/
# dist/
# ├── index.html        (~5KB)
# ├── game.js           (~200KB)
# ├── styles.css        (~20KB)
# └── assets/           (sprites, sounds)
```

**排查構建失敗**：
```bash
# 1. 檢查 TypeScript 錯誤
npm run build 2>&1 | grep -A5 "error TS"

# 2. 清除快取
rm -rf dist node_modules/.vite

# 3. 重新構建
npm run build
```

---

### 步驟 3：本地預覽（可選）

```bash
npm run preview
# 或
wrangler pages dev dist
```

**訪問**：http://localhost:8788

**驗證**：
- [ ] 遊戲畫面正常渲染
- [ ] Canvas 正常初始化
- [ ] 控制輸入有效
- [ ] 主控台無錯誤

**檢查主控台**：
```bash
# 打開 DevTools (F12)
# 檢查 Console 標籤是否有紅色錯誤
```

---

### 步驟 4：部署至 Cloudflare Pages

#### 模式 A：自動部署（GitHub Actions）
```bash
git push origin main
# GitHub Actions 自動執行部署流程
# 監控：https://github.com/sp1050107-zbot/zbot-games-galaxian/actions
```

#### 模式 B：手動部署
```bash
wrangler pages deploy dist
```

**預期輸出**：
```
✨ Successfully deployed your pages project
📎 https://zbot-games-galaxian.pages.dev
```

---

### 步驟 5：驗證部署

```bash
# 1. 檢查 HTTP 狀態
curl -I https://zbot-games-galaxian.pages.dev
# 應返回 200 OK

# 2. 檢查內容
curl https://zbot-games-galaxian.pages.dev | head -20

# 3. 測試資源加載
curl -I https://zbot-games-galaxian.pages.dev/game.js
# 應返回 200 OK，Content-Type: application/javascript
```

---

## 🛡️ Cloudflare 配置檔案 (wrangler.toml)

```toml
# 基本配置
name = "zbot-games-galaxian"
account_id = "YOUR_ACCOUNT_ID"
compatibility_date = "2025-01-01"

# 構建配置
[build]
command = "npm run build"
cwd = "."

# 部署目錄
[[site]]
bucket = "./dist"

# 開發環境
[env.development]
name = "zbot-games-galaxian-dev"

# 預發佈環境
[env.preview]
name = "zbot-games-galaxian-preview"

# 生產環境
[env.production]
name = "zbot-games-galaxian"
routes = [
  { pattern = "*.zbot-games-galaxian.pages.dev", zone_id = "" }
]

# 環境變數
[env.production.vars]
ENVIRONMENT = "production"
API_URL = "https://api.prod.example.com"

# 快取策略
[[env.production.routes]]
pattern = "zbot-games-galaxian.pages.dev/*"
zone_name = "example.com"
custom_domain = true

# HTML 無快取
[[routes]]
pattern = "*.html"
cache_control = "no-cache, no-store, must-revalidate"

# JS/CSS 長期快取（1年，使用版本化檔名）
[[routes]]
pattern = "*.js"
cache_control = "public, max-age=31536000, immutable"

[[routes]]
pattern = "*.css"
cache_control = "public, max-age=31536000, immutable"
```

---

## 🔍 常見錯誤排查

### ❌ 部署失敗：認證錯誤

```
Error: Unauthorized. Please check your Cloudflare API token
```

**解決**：
```bash
# 1. 檢查 API Token
echo $CLOUDFLARE_API_TOKEN | wc -c
# 應該 > 50 個字元

# 2. 重新設定
export CLOUDFLARE_API_TOKEN="your-new-token"
export CLOUDFLARE_ACCOUNT_ID="your-account-id"

# 3. 測試認證
wrangler whoami
```

---

### ❌ 404 頁面找不到

```
Error: 404 Page Not Found
```

**原因**：HTML 入口點配置錯誤

**排查**：
```bash
# 1. 檢查 dist 目錄
ls -la dist/ | grep index.html

# 2. 驗證 wrangler.toml
cat wrangler.toml | grep -A5 "site"

# 3. 檢查 Cloudflare Dashboard
# 瀏覽 Pages > zbot-games-galaxian > Settings > Build & Deployment
```

---

### ❌ 靜態資源 404（Canvas JS/CSS 加載失敗）

```
GET /game.js 404 Not Found
GET /styles.css 404 Not Found
```

**原因**：資源路徑錯誤或檔名對應問題

**排查**：
```bash
# 1. 檢查源代碼中的引用路徑
grep -r "game.js" src/
# 應為：./game.js 或 ./dist/game.js（相對路徑）

# 2. 驗證 dist 結構
tree dist/

# 3. 檢查 webpack/vite 配置
cat vite.config.ts | grep -A10 "build"
```

**修復**：
```typescript
// vite.config.ts
export default {
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    manifest: true,
    // 確保資源使用相對路徑
    base: '/',
  }
}
```

---

### ❌ 快取問題：舊版本仍在服務

```
新部署後，頁面仍顯示舊版本遊戲
```

**原因**：瀏覽器或 CDN 快取

**解決**：
```bash
# 1. Cloudflare 清除快取
# Cloudflare Dashboard > Caching > Purge Cache

# 2. 瀏覽器清除快取
# Chrome: Ctrl+Shift+Delete
# Safari: Cmd+Option+E

# 3. 使用硬刷新
# Ctrl+F5 (Windows) 或 Cmd+Shift+R (Mac)
```

---

### ❌ 構建超時

```
Error: Deployment timed out after 10 minutes
```

**原因**：依賴安裝或編譯過慢

**排查**：
```bash
# 1. 本地測試構建時間
time npm run build

# 2. 檢查 node_modules 大小
du -sh node_modules/

# 3. 移除無用依賴
npm prune
npm ci
```

---

## 📊 部署狀態檢查清單

| 項目 | 命令 | 預期結果 |
|------|------|---------|
| Node 版本 | `node --version` | v18+ |
| 依賴 | `npm ci` | Exit 0 |
| 構建 | `npm run build` | dist/ 存在 |
| 預覽 | `npm run preview` | http://localhost:8788 |
| 認證 | `wrangler whoami` | 顯示用戶信息 |
| 部署 | `wrangler pages deploy dist` | 200 OK |

---

## 🔗 相關資源

- [Cloudflare Pages 文檔](https://developers.cloudflare.com/pages/)
- [Wrangler CLI 參考](https://developers.cloudflare.com/workers/cli-wrangler/)
- [Pages GitHub 整合](https://developers.cloudflare.com/pages/platform/git-integration/)
- [緩存策略最佳實踐](https://developers.cloudflare.com/cache/)

---

## 📞 協作

- **部署問題**：聯絡 `deploy-engineer` 代理
- **遊戲 Bug**：聯絡 `game-dev` 代理
- **GitHub Actions 失敗**：檢查 `.github/workflows/deploy.yml`
