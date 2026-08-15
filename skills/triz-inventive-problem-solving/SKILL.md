---
name: triz-inventive-problem-solving
description: "TRIZ 物理矛盾（Physical Contradictions）與四大分離原理求解法。用於解決同一參數面臨完全互斥要求（既要 P 又要 非 P）的底層物理衝突，實現零折衷極致創新。"
metadata:
  type: procedural
---

# TRIZ 物理矛盾與四大分離原理 (Physical Contradictions & Separation)

當技術系統無法藉由常規參數折衷，而是面臨「同一實體、同一參數必須同時呈現相反特性」的極端對立時，四大分離原理能精確瓦解物理矛盾。

---

## 求解工作流程 (Instructions)

### Step 1: 將技術矛盾轉化為物理矛盾
- 將表層的「參數 A 好 vs 參數 B 差」向下深挖為底層物理本質：
  - 例：為了支撐重載，支架必須**粗大**（P）；但為了減輕無人機總重，支架必須**細小/輕薄**（非 P）。

### Step 2: 依序檢驗四大分離維度
1. **空間分離 (Separation in Space)**：P 與 非 P 是否可以存在於系統的不同位置或區域？
2. **時間分離 (Separation in Time)**：P 與 非 P 是否可以在不同階段或時間點分別出現？
3. **條件分離 (Separation upon Condition)**：P 與 非 P 是否可以在不同溫度、壓力、電磁環境或狀態下動態切換？
4. **系統層級分離 (Separation in Scale / Subsystem)**：微觀零件是否可以為 P，而宏觀整體表現為 非 P？

### Step 3: 原理具體實施
- 應用選定的分離維度，將互斥特性在維度上解耦，達成「既滿足 P 又滿足 非 P」的理想方案。

---

## 深入參考文獻

- 四大分離原理詳解與經典物理矛盾案例庫：[separation-principles.md](references/separation-principles.md)
