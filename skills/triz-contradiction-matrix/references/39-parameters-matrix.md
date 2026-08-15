# 39 個工程參數與技術矛盾矩陣 (39 Parameters & Contradiction Matrix)

本文檔提供經典 TRIZ 39 個工程參數定義、工程矛盾定義公式以及常見參數衝突之矛盾矩陣推薦原理速查。

---

## 39 個通用工程參數 (39 Engineering Parameters)

### 幾何與物理特徵 (1-10)
1. **運動物體的重量 (Weight of moving object)**
2. **靜止物體的重量 (Weight of stationary object)**
3. **運動物體的長度 (Length of moving object)**
4. **靜止物體的長度 (Length of stationary object)**
5. **運動物體的面積 (Area of moving object)**
6. **靜止物體的面積 (Area of stationary object)**
7. **運動物體的體積 (Volume of moving object)**
8. **靜止物體的體積 (Volume of stationary object)**
9. **速度 (Speed)**
10. **力 (Force)**

### 能量與動態性能 (11-20)
11. **應力/壓力 (Tension / Pressure)**
12. **形狀 (Shape)**
13. **結構穩定性 (Stability of object's composition)**
14. **強度 (Strength)**
15. **運動物體的作用時間 (Duration of action by moving object)**
16. **靜止物體的作用時間 (Duration of action by stationary object)**
17. **溫度 (Temperature)**
18. **光照度/亮度 (Illumination intensity)**
19. **運動物體的能量消耗 (Use of energy by moving object)**
20. **靜止物體的能量消耗 (Use of energy by stationary object)**

### 效率與效能損耗 (21-31)
21. **功率 (Power)**
22. **能量損失 (Loss of Energy)**
23. **物質損失 (Loss of Substance)**
24. **資訊損失 (Loss of Information)**
25. **時間損失 (Loss of Time)**
26. **物質數量/材料量 (Quantity of substance / amount of material)**
27. **可靠性 (Reliability)**
28. **測量精度 (Measurement accuracy)**
29. **製造精度 (Manufacturing precision)**
30. **物體外部有害因素敏感性 (External harm affects the object)**
31. **物體產生的有害效應 (Object-generated harmful factors)**

### 製造、維護與控制 (32-39)
32. **可製造性/易加工性 (Ease of manufacture)**
33. **可操作性/易用性 (Ease of operation)**
34. **可維修性 (Ease of repair)**
35. **適應性/通用性 (Adaptability / Versatility)**
36. **裝置複雜性 (Device complexity)**
37. **控制/測量複雜性 (Difficulty of detecting and measuring)**
38. **自動化程度 (Extent of automation)**
39. **生產率/產能 (Productivity)**

---

## 典型技術矛盾與矩陣推薦原理速查 (High-Frequency Pairs)

| 欲改善參數 (Improving Parameter) | 導致惡化參數 (Worsening Parameter) | 矛盾矩陣推薦原理 (Recommended Principles) |
| :--- | :--- | :--- |
| **#1 運動物體重量（減輕）** | **#14 強度（變差）** | **#1 (分割), #8 (配重), #15 (動態化), #40 (複合材料)** |
| **#9 速度（提升）** | **#14 強度（下降）** | **#11 (事先防範), #21 (快速衝過), #27 (廉價替代), #28 (機械替代)** |
| **#9 速度（提升）** | **#19 能量消耗（增加）** | **#15 (動態化), #19 (週期性), #2 (分離), #38 (強氧化)** |
| **#10 力（增強）** | **#1 運動物體重量（變重）** | **#8 (配重), #1 (分割), #35 (參數變化), #37 (熱膨脹)** |
| **#14 強度（提高）** | **#36 裝置複雜性（變複雜）** | **#1 (分割), #26 (複製), #27 (廉價替代), #35 (參數變化)** |
| **#27 可靠性（提升）** | **#36 裝置複雜性（變複雜）** | **#10 (預先作用), #11 (事先防範), #13 (反向運作), #27 (廉價替代)** |
| **#28 測量精度（提升）** | **#25 時間損失（耗時）** | **#10 (預先作用), #28 (機械替代), #24 (中介物), #34 (拋棄與再生)** |
| **#33 易操作性（提升）** | **#36 裝置複雜性（變複雜）** | **#1 (分割), #13 (反向運作), #25 (自助), #32 (改變顏色)** |
| **#35 適應性（提高）** | **#36 裝置複雜性（變複雜）** | **#15 (動態化), #28 (機械替代), #29 (氣壓液壓), #37 (熱膨脹)** |
| **#39 生產率（提升）** | **#19 能量消耗（增加）** | **#35 (參數變化), #28 (機械替代), #31 (多孔材料), #2 (分離)** |

---

## 矛盾矩陣應用三步法

1. **參數標準化**：將工程語言轉換為 1~39 的通用工程參數。
2. **定位交叉儲存格**：列為「欲改善參數」，行為「導致惡化參數」，查找交叉點之 2~4 個推薦原理序號。
3. **具體化發想**：依序研讀推薦原理的具體子條款，尋找無需妥協（Zero-trade-off）的創新解。
