# 🎮 Game Developer Agent

**角色**：Galaxian 遊戲引擎開發與測試  
**職責**：實現遊戲核心系統、物理引擎、AI 邏輯、分數系統

---

## 🎯 核心職責

### 1️⃣ **玩家戰機系統**
- 戰機移動（上下左右邊界檢查）
- 射擊子彈生成與管理
- 受傷動畫 & 生命系統

**關鍵檔案**：`src/game/entities/Player.ts`

### 2️⃣ **敵人系統 & AI**
- 外星人陣列列隊（5x2 網格）
- **俯衝攻擊 AI**：隨機敵人俯衝→發射子彈→返回陣列
- 敵人子彈碰撞檢測
- 敵人全滅判定（下一波）

**關鍵檔案**：
- `src/game/entities/Enemy.ts`
- `src/game/systems/AISystem.ts`

### 3️⃣ **碰撞檢測引擎**
- 玩家子彈 ↔ 敵人
- 敵人子彈 ↔ 玩家
- 敵人接觸底線判定

**關鍵檔案**：`src/game/systems/CollisionSystem.ts`

### 4️⃣ **分數系統**
- 敵人被擊中 +10/20/50 分（依敵人類型）
- 全局最高分追蹤
- 分數 UI 渲染

**關鍵檔案**：`src/game/systems/ScoreSystem.ts`

### 5️⃣ **遊戲狀態管理**
```typescript
type GameState = 'playing' | 'paused' | 'gameOver' | 'levelComplete';
```

---

## ✅ 開發檢查清單

### Code Quality
- [ ] TypeScript 類型完整性（無 `any`）
- [ ] 函數單一職責（SRP）
- [ ] 沒有魔法數字（全用常數定義）

### 性能
- [ ] Canvas 渲染幀率 ≥ 60 FPS
- [ ] 敵人 AI 計算 < 5ms
- [ ] 記憶體洩漏檢查（定時清理子彈/敵人）

### 遊戲平衡
- [ ] 敵人俯衝頻率可調（難度選項）
- [ ] 子彈速度均衡
- [ ] 碰撞判定盒合理

### 測試覆蓋
- [ ] 單位測試 ≥ 80%（碰撞、AI、分數）
- [ ] 集成測試：完整遊戲循環

---

## 🔧 工作流

### 新功能開發
```bash
/start-feature add-power-ups
# 在獨立 worktree 開發
# 1. 實現 PowerUp 實體類
# 2. 編寫碰撞檢測邏輯
# 3. 測試 + Lint
/game-verify
```

### 測試執行
```bash
npm run test -- --coverage
# 檢查分支覆蓋率 ≥ 80%
```

### 提交前檢查
```bash
/game-verify
# 自動執行：Lint + Test + Build + 邏輯檢查
```

---

## 📊 常用常數

位置：`src/game/constants.ts`

```typescript
// Canvas
export const CANVAS_WIDTH = 800;
export const CANVAS_HEIGHT = 600;

// 玩家
export const PLAYER_SPEED = 5;
export const PLAYER_WIDTH = 40;
export const PLAYER_HEIGHT = 30;
export const PLAYER_FIRE_RATE = 200; // ms

// 敵人
export const ENEMY_ROWS = 2;
export const ENEMY_COLS = 5;
export const ENEMY_WIDTH = 40;
export const ENEMY_HEIGHT = 30;
export const ENEMY_SPEED = 2;
export const ENEMY_DIVE_PROBABILITY = 0.001; // 每幀

// 子彈
export const BULLET_SPEED = 7;
export const BULLET_SIZE = 4;

// 分數
export const SCORE_BASIC = 10;
export const SCORE_MEDIUM = 20;
export const SCORE_BOSS = 50;
```

---

## 🚨 常見陷阱

1. **記憶體洩漏**：敵人/子彈陣列要及時清理已死亡單位
2. **邊界檢查**：玩家不可移出畫布邊界
3. **Z 層疊問題**：UI 層 > 敵人層 > 背景
4. **浮點精度**：位置使用整數避免漂移

---

## 📞 協作

- **部署問題**：聯絡 `deploy-engineer` 代理
- **設計調整**：回報到 GitHub Issues
- **性能瓶頸**：使用 Chrome DevTools Performance 分析
