# TRIZ 專案開發與架構演進日誌 (DEV_LOG.md)

## 2026-08-15: 升級 AI 模型矩陣：支援 Agnes 專用模型、Gemini 2.5/2.0 全系列與自訂端點

### 1. 執行目標 (Goal)
- **問題回報**：參照 `8D-Creator` 導入之 AI 引擎模型清單不完整，缺少 `agnes` 專用模型與 2.5/2.0 最新推理模型。
- **執行範疇**：
  1. 升級 `js/ai_service.js`：支援 `gemini-2.5-flash`、`gemini-2.5-pro`、`gemini-2.0-flash`、`gemini-2.0-flash-thinking-exp`、`gemini-2.0-pro-exp`、`agnes` 以及自訂模型 ID (`custom`) 與自訂 API Base URL。
  2. 更新 `index.html` 與 `js/main.js`：提供完整下拉選項、自訂模型輸入框與動態切換支援。
  3. 將完整靜態資源鏡像同步至 `docs/` 與 `static/`。
  4. 記錄 RCA/CAPA 並將預防規則萃取至 `AGENTS.md`。

### 2. 問題分析 (RCA) 與預防措施 (CAPA)
* **根因分析 (RCA)**：
  - 初始實作 AI 模組時，僅提供了基礎選項，未納入參照專案生態中的 `agnes` 專屬模型與 Gemini 2.0/2.5 完整思考推理模型，亦缺乏開放式自訂模型 ID 欄位。
* **矯正與預防措施 (CAPA)**：
  - **立即矯正**：將 `agnes` 與 Gemini 2.5/2.0 全系列旗艦模型作為一等公民支援，並加入「自訂模型名稱 (Custom Model ID)」與「自訂 Base URL」輸入功能，無論使用官方或微調端點皆能彈性配置。
  - **自我演化**：將「現代模型基準線規範」寫入 `AGENTS.md`。
