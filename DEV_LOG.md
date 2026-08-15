# TRIZ 專案開發與架構演進日誌 (DEV_LOG.md)

## 2026-08-15: 完整對齊 Agnes AI 官方 API 規範 (Bearer Auth / Chat Completions) 與多 Provider 支援

### 1. 執行目標 (Goal)
- **規格依據**：
  - **API Base URL (endpoint)**: `https://apihub.agnes-ai.com/v1`
  - **核心模型 ID**: `agnes-2.5-flash` (Chat Completions: `/v1/chat/completions`)
  - **認證機制**: `Authorization: Bearer <AGNES_API_KEY>`
- **執行範疇**：
  1. 重構 `js/ai_service.js` 實現通用 Multi-Provider 架構：
     - 自動路由：當選取 `agnes-2.5-flash` 時自動調用 `https://apihub.agnes-ai.com/v1/chat/completions`，使用 Bearer Token 驗證；
     - 當選取 `gemini-*` 時調用 `https://generativelanguage.googleapis.com`；
     - 支援自訂模型 ID 與端點路徑。
  2. 升級 UI 設定彈窗 (`index.html` + `js/main.js`)：選取模型時自動切換預設 Base URL 與 Key 提示。
  3. 鏡像同步至 `docs/` 與 `static/`，並寫入 `AGENTS.md` 自我演化紀錄。

### 2. 問題分析 (RCA) 與預防措施 (CAPA)
* **根因分析 (RCA)**：
  - 過去將所有模型統一依賴 Google Gemini SDK 請求格式，未考慮 Agnes AI 採用標準 OpenAI-compatible Chat Completions 協議 (`https://apihub.agnes-ai.com/v1/chat/completions`)。
* **矯正與預防措施 (CAPA)**：
  - **立即矯正**：實裝雙協定解析器（Agnes / OpenAI-compatible 與 Google Gemini 原生），選取 `agnes-2.5-flash` 時精準調用官方 endpoint 與 Bearer Token 認證。
  - **自我演化**：將 Agnes 完整技術規格寫入 `AGENTS.md`。
