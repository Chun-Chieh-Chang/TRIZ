# TRIZ 專案開發與架構演進日誌 (DEV_LOG.md)

## 2026-08-15: 查閱 Google AI Studio 官方文檔全面更正 Gemini 適用模型清單

### 1. 執行目標 (Goal)
- **官方文檔檢索與查證**：
  - 查閱 `https://ai.google.dev/gemini-api/docs/models` 官方最新模型規範與生命週期。
- **更正清單**：
  1. 移除/替換已於 2026 年中下線之 `gemini-2.0-flash`、`gemini-2.0-flash-lite` 舊版模型。
  2. 完整納入 Google AI Studio 現行活躍與最新旗艦模型：
     - `gemini-2.5-flash`（推薦主力）
     - `gemini-2.5-pro`（旗艦深思）
     - `gemini-2.5-flash-lite`（輕量低延遲）
     - `gemini-3.1-pro`（次世代旗艦推理）
     - `gemini-1.5-flash` / `gemini-1.5-pro`（經典相容）
  3. 更新 UI 下拉選單、文檔超連結與多端鏡像同步。

### 2. 問題分析 (RCA) 與預防措施 (CAPA)
* **根因分析 (RCA)**：
  - 未第一時間調研 Google AI Studio 最新官方模型規格頁，導致模型清單中出現已下線版本。
* **矯正與預防措施 (CAPA)**：
  - **立即矯正**：更新 `index.html`、`js/ai_service.js`、`docs/`、`static/` 為 Google 官方現行精確 Model ID，並在介面上直接附帶官方文檔連結。
  - **自我演化**：將 Google AI Studio 現行活躍標準寫入 `AGENTS.md`。

---

## 2026-08-15: 完整對齊 Agnes AI 官方 API 規範 (Bearer Auth / Chat Completions) 與多 Provider 支援

### 1. 執行目標 (Goal)
- **規格依據**：
  - **API Base URL (endpoint)**: `https://apihub.agnes-ai.com/v1`
  - **核心模型 ID**: `agnes-2.5-flash` (Chat Completions: `/v1/chat/completions`)
  - **認證機制**: `Authorization: Bearer <AGNES_API_KEY>`
