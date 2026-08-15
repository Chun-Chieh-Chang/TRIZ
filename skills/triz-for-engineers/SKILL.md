---
name: triz-for-engineers
description: "工程師實戰 TRIZ 指南（整合全書 495 頁體系）。包含工程系統功能分析 (Function Analysis)、元件修剪 (Trimming)、因果鏈根因分析 (RCA+) 以及工程矛盾的系統性排除。"
metadata:
  type: procedural
---

# 工程師 TRIZ 實戰手冊 (TRIZ for Engineers)

整合《TRIZ for Engineers》全書 495 頁架構精華，專為研發工程師、機構與電控設計師打造的端到端工程問題求解流程。

---

## 工程師標準解題流 (Instructions)

### Step 1: 建立系統功能模型 (Function Analysis)
1. 列出系統所有元件（Components）與超系統環境要素（Super-system elements）。
2. 用 `主體 -> 動作(物理動詞) -> 客體` 繪製功能關聯圖。
3. 標記過度功能、不足功能與有害功能（Harmful interactions）。

### Step 2: 執行因果鏈分析 (RCA+)
1. 從產品不良/故障現象（Target Disadvantage）出發，向下繪製因果網絡。
2. 識別「同時產生好處與壞處」的根本衝突節點（Root Conflicts）。

### Step 3: 系統修剪與簡化 (Trimming)
- 嘗試修剪產生有害功能或高成本的元件：
  - 規則 A：客體已被刪除？
  - 規則 B：客體自我服務？
  - 規則 C：功能轉移給其他元件或超系統？

### Step 4: 衝突求解與驗證
- 對未被修剪消除的衝突，調用技術矛盾矩陣或物理矛盾分離原理徹底攻克。

---

## 深入參考文獻

- 功能分析建模規範與三條修剪黃金法則：[function-analysis.md](references/function-analysis.md)
- RCA+ 因果鏈分析與根本衝突定位指南：[rca-plus-guide.md](references/rca-plus-guide.md)
