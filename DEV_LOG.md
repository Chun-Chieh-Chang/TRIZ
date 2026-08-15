# TRIZ 專案開發與架構演進日誌 (DEV_LOG.md)

## 2026-08-15: 完整納入 Google Gemini 3.x 全系列旗艦模型 (3.7 / 3.6 / 3.5 / 3.1)

### 1. 執行目標 (Goal)
- **問題回報**：確認 Google AI Studio 官方文檔中最新世代之 `gemini-3.7-flash`、`gemini-3.6-flash`、`gemini-3.5-flash` 等 Gemini 3 全系列未完整列出。
- **執行範疇**：
  1. 在 `index.html` 的模型下拉選單中建立專屬 `Google Gemini 3.x 系列 (最新世代旗艦)` 分組：
     - `gemini-3.7-flash`（最新旗艦・原生多模態與深度推理）
     - `gemini-3.6-flash`（程式碼與 Agentic 執行專精）
     - `gemini-3.5-flash`（多步驟工作流與長程任務）
     - `gemini-3.5-flash-lite`（超低延遲高輸送量）
     - `gemini-3.1-pro`（次世代高階深思推理）
     - `gemini-3-flash-preview`（Gemini 3 Flash 預覽版）
  2. 鏡像同步至 `docs/` 與 `static/`。
  3. 記錄 RCA/CAPA 並更新 `AGENTS.md`。

### 2. 問題分析 (RCA) 與預防措施 (CAPA)
* **根因分析 (RCA)**：
  - 前次檢索 Google 文檔時僅聚焦於 2.5 穩定版與淘汰版對照，未一次性穷盡提取 Gemini 3.x 最新世代家族成員。
* **矯正與預防措施 (CAPA)**：
  - **立即矯正**：將 Gemini 3.x 全系列（3.7 / 3.6 / 3.5 / 3.1 / 3-preview）完整納入模型清單，並依世代分組排列。
  - **自我演化**：將 Gemini 3.x 家族規格寫入 `AGENTS.md`。
