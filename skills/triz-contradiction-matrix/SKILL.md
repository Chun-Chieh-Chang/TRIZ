---
name: triz-contradiction-matrix
description: "TRIZ 39 工程參數與技術矛盾矩陣（Contradiction Matrix）求解器。用於將複雜工程衝突標準化為參數對，自動查表定位 Altshuller 推薦的發明原理，消除工程折衷與妥協。"
metadata:
  type: procedural
---

# TRIZ 技術矛盾矩陣 (Contradiction Matrix)

技術矛盾矩陣是 TRIZ 中最著名的演算法工具，專門用來解決「當試圖改善系統特徵 A 時，特徵 B 卻隨之惡化」的衝突問題。

---

## 求解工作流程 (Instructions)

### Step 1: 建立技術矛盾模型 (Formulate Contradiction)
將工程挑戰明確表述為條件句：
- **如果我們採取措施 [改善手段]**：
  - **正面效果**：改善了參數 A（欲改善參數，Improving Parameter）。
  - **負面效果**：導致了參數 B 惡化（惡化參數，Worsening Parameter）。

### Step 2: 映射到 39 個標準工程參數
- 從 1~39 號標準參數中，挑選與參數 A、B 最貼近的項目：
  - 例如：降低無人機機身重量 → #1 運動物體重量
  - 但導致抗風強度不足 → #14 強度

### Step 3: 查詢矛盾矩陣推薦原理
- 在矛盾矩陣中定位 `(欲改善參數 A, 惡化參數 B)` 交叉點。
- 提取推薦的 2~4 個發明原理序號（如 #1, #8, #15, #40）。

### Step 4: 類比生成創新方案
- 依序檢視每個推薦原理及其子條款，發想具體實現方式。
- 若推薦原理未產出理想方案，可反向檢查 `(欲改善參數 B, 惡化參數 A)`，或擴大相鄰參數檢索。

---

## 深入參考文獻

- 39 個工程參數定義與高頻衝突矩陣對照表：[39-parameters-matrix.md](references/39-parameters-matrix.md)
