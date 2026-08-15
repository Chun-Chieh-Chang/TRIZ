# TRIZ 專案開發與架構演進日誌 (DEV_LOG.md)

## 2026-08-15: 修復 getARIZStages / getEvolutionLaws Getter 缺失問題

### 1. 執行目標 (Goal)
- **問題回報**：`main.js:35 Initialization error: TypeError: appState.engine.getARIZStages is not a function at renderARIZStages (main.js:569:36)`。
- **執行範疇**：
  1. 在 `TRIZEngine` (`js/engine.js`) 中補齊 `getARIZStages()`、`getEvolutionLaws()`、`getSeparationPrinciples()`、`getAllParameters()`、`getAllPrinciples()`、`getParameter(id)`、`getPrinciple(id)` 等方法。
  2. 鏡像同步至 `docs/` 與 `static/`。
  3. 透過無頭瀏覽器實測確效，確認初始化零報錯且 ARIZ 四大階段與 8 大進化法則正常渲染。

### 2. 問題分析 (RCA) 與預防措施 (CAPA)
* **根因分析 (RCA)**：
  - 在重構 `TRIZEngine` 類別時，直接將 `this.arizStages` 與 `this.evolutionLaws` 存為內部屬性，但 `main.js` 中的渲染函式使用了封裝的 getter 呼叫（`engine.getARIZStages()`），造成呼叫未定義方法引發 TypeError。
* **矯正與預防措施 (CAPA)**：
  - **立即矯正**：在 `TRIZEngine` 內實作完整的 Public API Getter 介面，支援所有模組的標準呼叫。
  - **驗證確認**：經瀏覽器實機測試，Console 錯誤已歸零。

---

## 2026-08-15: 完整納入 Google Gemini 3.x 全系列旗艦模型 (3.7 / 3.6 / 3.5 / 3.1)
