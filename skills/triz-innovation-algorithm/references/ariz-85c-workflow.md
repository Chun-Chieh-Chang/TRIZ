# ARIZ-85C 發明問題解決演算法 (Algorithm for Inventive Problem Solving)

ARIZ (Algorithm for Resheniya Izobretatelskikh Zadach) 是 TRIZ 中針對極度困難、無現成模式可循之非標準複雜發明問題的高階演算法。

---

## ARIZ-85C 九大求解階段 (9 Stages of ARIZ-85C)

### 第一階段：分析問題 (Problem Analysis)
1. **1.1 建立微型問題模型 (Mini-problem)**：在不改變現有大系統的前提下，透過引入微小改變消除問題。
2. **1.2 識別衝突對偶 (Conflict Pair)**：明確相互作用並產生有害效應的兩個核心元件（如：刀具 vs 工件）。
3. **1.3 構建技術矛盾 TC-1 與 TC-2**：
   - TC-1：若強化操作，有用功能增強，但有害作用激增。
   - TC-2：若弱化操作，有害作用消除，但有用功能不足。
4. **1.4 選擇主導技術矛盾**：選擇能提供系統主要有用功能的那個 TC 方向。
5. **1.5 強化極端矛盾 (Intensify Contradiction)**：將條件推向極限（例如：速度無限快、溫度極端高），迫使深層物理限制顯現。
6. **1.6 提出迷你模型任務說明**：在不增加系統複雜度的前提下，如何實現所需效果？

### 第二階段：分析問題模型資源 (Resource Analysis)
1. **操作區 (Operational Zone, OZ)**：衝突發生的微觀空間區域。
2. **操作時間 (Operational Time, OT)**：衝突發生的時間段（衝突前、衝突中、衝突後）。
3. **物質與場資源 (Substance-Field Resources, SFR)**：
   - 系統內部資源（內部物質、已有能量場）；
   - 外部環境資源（空氣、重力、磁場、環境熱）；
   - 廉價/微量/廢料資源。

### 第三階段：確定最終理想解 (IFR) 與物理矛盾 (Physical Contradiction)
1. **定義最終理想解 IFR (Ideal Final Result)**：
   - 「物質/場 X 在操作時間 (OT) 內於操作區 (OZ) 自動消除有害效應，同時保留所有有用功能，且不增加任何成本與複雜性。」
2. **強化 IFR 敘述**：排除引入新外部複雜元件的可能性。
3. **表述物理矛盾 (PC)**：
   - 為了實現功能 A，操作區的某個物理狀態必須為 **P**（如：高溫、剛硬、多孔）；
   - 為了避免有害效應 B，該操作區的物理狀態必須為 **非 P**（如：低溫、柔順、緻密）。

### 第四階段：動員與應用物質-場資源 (Mobilizing SFR)
1. 模擬「小人法 (Smart Little People)」打破心理慣性。
2. 嘗試用系統內部微觀結構變化解決矛盾。

### 第五階段：應用 TRIZ 知識庫 (Applying Knowledge Base)
1. 調用 76 種標準解法 (Standard Solutions)。
2. 應用物理/化學/幾何效應資料庫 (Effects Database)。

### 第六階段：轉換或替代問題 (Change / Reformulate the Problem)
若上述步驟未獲完全解，放寬約束條件，回到第一階段重新定義問題。

### 第七階段：分析物理矛盾消除法 (Evaluating PC Solutions)
1. 驗證是否藉由四大分離原理（空間、時間、條件、系統轉化）消除了物理矛盾。
2. 評估是否達到 IFR 境界。

### 第八階段：發展衍生應用 (Developing Implementation)
1. 將概念解工程化、產品化。
2. 預測新方案可能帶來的次級問題並預先防範。

### 第九階段：分析求解歷程 (Meta-Analysis & Reflection)
記錄認知盲點與心理慣性，將新提煉的解題模式回饋沉澱。
