---
name: triz-innovation-algorithm
description: "TRIZ ARIZ-85C 創新演算法與物質-場分析（Su-Field）。用於解決最複雜、無現成模式的非標準工程難題，追求最終理想解 (IFR) 與 76 種標準解法的精確應用。"
metadata:
  type: procedural
---

# ARIZ 創新演算法與物質-場分析 (ARIZ & Su-Field)

當一般 40 發明原理與矛盾矩陣無法直接攻克極端工程瓶頸時，ARIZ（發明問題解決演算法）提供了一套嚴密的、數學級別的邏輯推進流程，直搗系統核心矛盾並定義最終理想解 (IFR)。

---

## 核心流程 (Instructions)

### Step 1: 建立微型問題與邊界 (Mini-Problem)
1. 在不推翻現有系統的前提下，界定衝突發生的核心對偶（Tool vs Target）。
2. 明確操作區域 (Operational Zone, OZ) 與操作時間段 (Operational Time, OT)。

### Step 2: 物質-場分析建模 (Su-Field Modeling)
1. 繪製 `S1 (受動體) - S2 (工具) - F (場)` 模型。
2. 判斷模型缺陷：是「有害效應」、「作用不足」還是「檢測困難」？
3. 查閱 76 種標準解法（如引入 S3 屏障、鐵磁場轉換、引入示蹤劑等）。

### Step 3: 定義最終理想解 (IFR)
- **標準 IFR 公式**：「在操作時間內，系統內原有的物質或環境資源 X，在無需引入任何額外外部複雜機構的情況下，能夠自行完成所需功能並消除有害影響。」

### Step 4: 構建物理矛盾並分離求解
1. 將問題推至物理極限：要求操作區在同一時間或不同條件下同時呈現 `P` 與 `非 P`。
2. 應用空間分離、時間分離或條件分離達成突破。

---

## 深入參考文獻

- ARIZ-85C 九大階段標準指引：[ariz-85c-workflow.md](references/ariz-85c-workflow.md)
- 物質-場分析與 76 種標準解法：[su-field-analysis.md](references/su-field-analysis.md)
