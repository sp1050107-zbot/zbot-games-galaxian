# 📝 /start-feature - 新增功能分支

**功能**：自動建立並切換至 Git Worktree，隔離開發環境

---

## 📖 使用方式

```bash
/start-feature <feature-name>
```

**例子**：
```bash
/start-feature add-power-ups
/start-feature fix-collision-detection
/start-feature improve-enemy-ai
```

---

## 🔄 執行流程

### Step 1：驗證輸入
```bash
# 確保 feature-name 符合規範
# ✅ 允許：add-power-ups, fix-bug, improve-ai
# ❌ 禁止：add_power_ups (用 - 代替 _), AddPowerUps (小寫)
```

### Step 2：建立 Worktree
```bash
# 從 main 分支建立新 worktree
git worktree add -b feature/<feature-name> .worktrees/feature-<feature-name> main

# 例子：
# git worktree add -b feature/add-power-ups .worktrees/feature-add-power-ups main
```

### Step 3：切換工作目錄
```bash
cd .worktrees/feature-<feature-name>
```

### Step 4：通知用戶
```
✅ 功能分支已建立！
   
   分支名稱：feature/add-power-ups
   工作目錄：.worktrees/feature-add-power-ups
   
   開發完成後，執行：
   git checkout main
   git merge feature/add-power-ups
   git worktree remove .worktrees/feature-add-power-ups
```

---

## ✅ 完成後的整合流程

```bash
# 1. 切換回主分支
git checkout main

# 2. 檢查分支狀態
git status

# 3. 合併功能分支
git merge feature/add-power-ups

# 4. 刪除 Worktree
git worktree remove .worktrees/feature-add-power-ups

# 5. 刪除本地分支
git branch -d feature/add-power-ups

# 6. 推送至遠端
git push origin main
```

---

## 🛡️ 錯誤處理

### ❌ Worktree 已存在
```
Error: '.worktrees/feature-add-power-ups' already exists
```

**解決**：
```bash
# 移除舊 Worktree
git worktree remove .worktrees/feature-add-power-ups -f

# 重新建立
/start-feature add-power-ups
```

### ❌ 分支已存在
```
Error: 'feature/add-power-ups' already exists
```

**解決**：
```bash
# 刪除舊分支
git branch -D feature/add-power-ups

# 重新建立
/start-feature add-power-ups
```

### ❌ 主分支有未提交更改
```
Error: working tree 'main' has uncommitted changes
```

**解決**：
```bash
# 提交或隱藏更改
git stash
git checkout main
git stash pop

# 重新執行
/start-feature add-power-ups
```

---

## 🎯 最佳實踐

1. **命名規範**：使用 kebab-case (feature-name)
2. **單一職責**：每個分支只做一個功能
3. **提交頻率**：每完成子功能就提交一次
4. **驗證前合併**：執行 `/game-verify` 確保品質
5. **不留廢棄分支**：完成後立即刪除 Worktree

---

## 📋 檢查清單

- [ ] 分支名稱符合 kebab-case 規範
- [ ] Worktree 成功建立
- [ ] 工作目錄已切換
- [ ] 開發完成後執行 `/game-verify`
- [ ] 測試通過後提交
- [ ] 合併前檢查衝突
- [ ] 刪除 Worktree 和本地分支

---

## 🔗 相關命令

- `/game-verify` - 驗證遊戲完整性
- `/code-review` - 代碼審查
- `git worktree list` - 列出所有 Worktree
- `git worktree prune` - 清理損壞的 Worktree
