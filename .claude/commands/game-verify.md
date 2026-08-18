# ✅ /game-verify - 遊戲完整性檢查

**功能**：執行 Lint、測試、構建、邏輯驗證的完整檢查流程

---

## 📖 使用方式

```bash
/game-verify
# 或指定檢查項目
/game-verify --only lint,test
/game-verify --skip build
```

---

## 🔄 完整驗證流程

### 1️⃣ **代碼格式檢查** (Prettier)
```bash
npm run format -- --check
```
**驗證**：代碼風格一致性（縮進、引號、分號等）

**失敗原因**：
- 未按 Prettier 規則格式化
- Tab 與空格混用

**修復**：
```bash
npm run format
```

---

### 2️⃣ **Lint 檢查** (ESLint)
```bash
npm run lint
```
**驗證**：
- ✅ 無 TypeScript 錯誤（`any` 類型）
- ✅ 無未使用變數
- ✅ 無全局污染
- ✅ 無死代碼

**失敗範例**：
```typescript
// ❌ 未使用變數
const unused = 42;

// ❌ any 類型
const data: any = {};

// ❌ 全局變數
window.playerScore = 0;
```

**修復**：
```bash
npm run lint -- --fix
```

---

### 3️⃣ **單元測試** (Jest/Vitest)
```bash
npm run test -- --coverage
```
**驗證**：
- ✅ 所有測試通過 (Exit Code 0)
- ✅ 分支覆蓋率 ≥ 80%
- ✅ 沒有 Flaky 測試

**檢查項目**：
- 碰撞檢測演算法
- AI 敵人移動邏輯
- 分數計算系統
- 邊界檢查

**報告**：
```
coverage/
├── lcov-report/
│   └── index.html  # 視覺化覆蓋率
└── coverage-final.json
```

**訪問**：
```bash
open coverage/lcov-report/index.html
```

---

### 4️⃣ **生產構建** (Build)
```bash
npm run build
```
**驗證**：
- ✅ TypeScript 編譯成功（無型態錯誤）
- ✅ Bundle 大小合理 (< 500KB 壓縮後)
- ✅ Source Map 生成
- ✅ 產物輸出至 `dist/`

**檢查產物**：
```bash
ls -lh dist/
# 應包含：
# - index.html (~5KB)
# - game.js (~200KB)
# - styles.css (~20KB)
```

**分析 Bundle 大小**：
```bash
npm run build -- --report
# 或使用外部工具
npm install -g webpack-bundle-analyzer
```

---

### 5️⃣ **遊戲邏輯檢查** (Custom Validation)

#### 🎮 檔案存在性檢查
```
✅ src/game/entities/Player.ts
✅ src/game/entities/Enemy.ts
✅ src/game/systems/CollisionSystem.ts
✅ src/game/systems/AISystem.ts
✅ src/game/constants.ts
```

#### 🎮 常數定義檢查
```typescript
// constants.ts 中必須定義：
export const CANVAS_WIDTH = 800;
export const CANVAS_HEIGHT = 600;
export const PLAYER_SPEED = 5;
export const ENEMY_SPEED = 2;
export const BULLET_SPEED = 7;
// ... 等等
```

#### 🎮 導出檢查
```typescript
// game.ts 必須導出：
export class GameEngine {
  start(): void {}
  update(): void {}
  render(): void {}
  pause(): void {}
  resume(): void {}
}
```

#### 🎮 TypeScript 嚴格模式
```bash
# tsconfig.json 應包含
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true
  }
}
```

---

## 📊 檢查清單

| 項目 | 命令 | 預期結果 |
|------|------|---------|
| 格式 | `npm run format -- --check` | Exit 0 |
| Lint | `npm run lint` | 0 errors |
| 測試 | `npm run test` | ✅ 全部通過 |
| 覆蓋 | `npm run test -- --coverage` | ≥ 80% |
| 構建 | `npm run build` | Exit 0 |
| 邏輯 | 檔案 & 常數檢查 | ✅ 全部存在 |

---

## 🚀 完整執行

```bash
# 方式 1：單一命令執行
/game-verify

# 方式 2：分步驟執行
npm run format
npm run lint
npm run test
npm run build
```

**預期輸出**：
```
✅ Prettier: Code formatted correctly
✅ ESLint: 0 errors, 0 warnings  
✅ Jest: All 45 tests passed (Coverage: 85%)
✅ Build: Successfully built (game.js: 198KB)
✅ Game Logic: All validations passed

🎮 Game is ready for deployment!
```

---

## ❌ 常見失敗與修復

### 失敗 1：測試覆蓋率不足
```
✗ Coverage below 80%
  - CollisionSystem.ts: 65%
  - AISystem.ts: 72%
```

**修復**：
```bash
# 1. 查看覆蓋率報告
npm run test -- --coverage

# 2. 檢查未覆蓋的代碼
open coverage/lcov-report/

# 3. 補充測試
# src/game/systems/__tests__/CollisionSystem.test.ts
```

### 失敗 2：TypeScript 型態錯誤
```
src/game/entities/Player.ts:42:15
error TS7053: Element implicitly has an 'any' type
```

**修復**：
```typescript
// ❌ 錯誤
const position = getPlayerPosition();

// ✅ 正確
interface Position { x: number; y: number; }
const position: Position = getPlayerPosition();
```

### 失敗 3：ESLint 禁用警告
```
eslint(no-unused-vars): 'unusedVar' is assigned a value but never used
```

**修復**：
```bash
npm run lint -- --fix
# 自動移除未使用變數
```

### 失敗 4：Build 大小超出限制
```
✗ Bundle size exceeds 500KB
  game.js: 650KB
```

**修復**：
```bash
# 1. 分析 Bundle
npm run build -- --report

# 2. 移除未使用的依賴
npm prune

# 3. 考慮 Tree Shaking 或代碼分割
```

---

## 🔗 相關命令

- `/start-feature` - 建立功能分支
- `/code-review` - 代碼審查
- `/cloudflare-deploy --preview` - 本地部署預覽
- `npm run dev` - 開發伺服器
