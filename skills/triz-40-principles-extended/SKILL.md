---
name: triz-40-principles-extended
description: "擴展版 40 發明原理（Extended 40 Inventive Principles）。將 TRIZ 創新原理跨界應用於軟體工程、系統架構、商業管理、服務創新及跨學科挑戰。提供跨領域映射案例與創新啟發。"
metadata:
  type: procedural
---

# 擴展版 40 發明原理 (Extended 40 Principles)

基於 Darrell Mann 等學者之《40 Principles: Extended Edition》，將傳統主要用於機械與物理領域的發明原理，升級延伸至現代**軟體架構、資訊科技、商業策略、流程管理與服務設計**。

---

## 跨領域解題步驟 (Instructions)

### Step 1: 跨領域問題抽象化 (Abstraction)
1. 將具體的軟體/商業問題轉化為系統要素（如：資料流、請求負載、用戶體驗、組織溝通、成本與速度）。
2. 識別系統矛盾（例：既要提高響應速度，又要減少伺服器成本；既要提升客製化，又要保持標準化）。

### Step 2: 檢索跨領域發明原理
- 參考跨領域映射庫，找出最適合的原理思維：
  - **架構與拆解**：#1 分割（微服務）、#2 分離（關注點分離）、#7 巢狀（容器封裝）。
  - **時序與性能**：#10 預先作用（預載/快取）、#15 動態化（自動伸縮）、#19 週期性（批次處理）。
  - **商業與體驗**：#3 局部質量（差別定價）、#25 自助（自助理賠/知識庫）、#35 參數變化（訂閱制轉型）。

### Step 3: 方案實施與架構重構
- 評估技術債或管理成本，設計漸進式演進路徑。

---

## 深入參考文獻

- 跨領域 40 原理完整應用對照表：[cross-domain-applications.md](references/cross-domain-applications.md)
