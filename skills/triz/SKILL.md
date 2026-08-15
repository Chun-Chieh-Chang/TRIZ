---
name: triz
description: "TRIZ 創新方法論智慧總導航與方法路由 Skill（Master TRIZ Navigator）。整合 40 發明原理、39 矛盾矩陣、物理矛盾分離、ARIZ 演算法、8 大系統進化法則、專利布局戰略與工程實戰分析。提供問題智能診斷與專題子技能路由導航。"
metadata:
  type: procedural
---

# TRIZ 創新方法論總導航 (Master TRIZ Navigator)

歡迎使用 TRIZ（萃智，發明問題解決理論）智慧導航系統。本系統遵循 **Agent Skills 開放標準** 與 **漸進式披露架構**，將全套 TRIZ 工具鏈模組化為專題技能，並在此提供核心心智模型與智慧問題診斷路由。

---

## 智慧問題診斷與路由決策樹 (Decision Flow)

當面對任何工程、研發、架構或商業難題時，請依照下圖指引選擇最適切的專題 Skill：

```
                              【研發/技術問題輸入】
                                        │
     ┌──────────────────┬───────────────┴───────────────┬──────────────────┐
     ▼                  ▼                               ▼                  ▼
【專利攻防/布局】   【系統瓶頸/成本高】             【性能衝突/兩難】   【技術預測/代際規劃】
     │                  │                               │                  │
     ▼                  ▼                               ▼                  ▼
[triz-patent-strategy] [triz-for-engineers]            【衝突性質分析】    [triz-golden-key]
專利迴避/阻斷布局    功能分析(FA)/修剪(Trimming)                │           8大進化法則/九屏幕
                        因果鏈分析(RCA+)                │
                                               ┌────────┴────────┐
                                               ▼                 ▼
                                         【技術矛盾】        【物理矛盾】
                                       (改善A導致B惡化)    (同一參數既要P又要非P)
                                               │                 │
                                    ┌──────────┴──────────┐      ▼
                                    ▼                     ▼ [triz-inventive-problem-solving]
                         [triz-contradiction-matrix]      │   四大分離原理求解
                              39參數矛盾矩陣查表          │
                                                          ▼
                                            [triz-40-principles] (經典工程)
                                            [triz-40-principles-extended] (軟體/商業)
                                                          │
                                         (若仍無解，升級至高階極限演算法)
                                                          ▼
                                            [triz-innovation-algorithm]
                                            ARIZ-85C 演算法 / 物質-場分析
```

---

## 專題子技能全景索引庫 (Sub-Skills Catalog)

| 專題 Skill | 核心職責與適用情境 | 核心文獻依據 |
| :--- | :--- | :--- |
| **`triz-40-principles`** | 40 條經典發明原理詳解、子分類 (a, b, c) 與標準工程範例 | `40 TRIZ Principles.pdf` |
| **`triz-40-principles-extended`** | 跨領域延伸 40 原理（軟體架構、商業模式、流程管理、微系統） | `40 principles, extended edition.pdf` |
| **`triz-contradiction-matrix`** | 39 個通用工程參數、技術矛盾標準化定義與矩陣查表推薦 | `TRIZ contradictions Matrix.pdf` |
| **`triz-innovation-algorithm`** | ARIZ-85C 演算法、最終理想解 (IFR)、物質-場 (Su-Field) 分析與 76 標準解 | `TRIZ_the innovation algorithm.pdf` |
| **`triz-golden-key`** | 技術系統 8 大客觀進化法則、S 曲線技術預測、九屏幕法與資源探勘 | `TRIZ_打开创新之门的金钥匙Ⅰ.pdf` |
| **`triz-inventive-problem-solving`** | 物理矛盾轉化、四大分離原理（空間/時間/條件/系統層級分離） | `创新系列 创新40法...Altshuller.pdf` |
| **`triz-patent-strategy`** | 專利請求項拆解、全要件原則防禦、修剪迴避設計 (Design-Around) 與包夾布局 | `技術性專利布局：專利探勘與TRIZ+理論.pdf` |
| **`triz-for-engineers`** | 工程系統功能建模 (FA)、元件修剪 (Trimming)、因果鏈根因分析 (RCA+) | `TRIZ for Engineers.pdf` (全書) |

---

## 快速查閱與輔助文檔

- 完整問題診斷與方法論映射路由表：[routing-matrix.md](references/routing-matrix.md)
- 40 原理與四大分離全景速查手冊：[contradiction-lookup.md](references/contradiction-lookup.md)
