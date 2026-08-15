# Project Agent Rules & Self-Evolution (AGENTS.md)

## 1. CI/CD 與自動化工作流防禦規則 (Workflow Governance)
- **前置清理原則 (Pre-cleanup Principle)**：
  - 在配置或推送新的 GitHub Actions（如 `.github/workflows/deploy-pages.yml`）前，必須主動掃描 `.github/workflows/` 目錄。
  - 若發現歷史遺留、無用或第三方未經測試的舊 Actions（例如 `jules.yml` 等無效樣板），必須立即遵循 MECE 原則予以刪除，嚴禁多個衝突或異常的 Workflow 並存。
- **單一職責 (Single Responsibility)**：
  - 本專案 GitHub Pages 部署僅以 `deploy-pages.yml` 為唯一官方 CI/CD 工作流。

## 2. AI 模型與參照生態對齊規範 (AI Reference & Model Alignment)
- **Google AI Studio 官方規格基準 (Google AI Studio Specification Baseline)**：
  - **官方文檔**: `https://ai.google.dev/gemini-api/docs/models`
  - **API Base URL**: `https://generativelanguage.googleapis.com`
  - **官方現行活躍模型**:
    - `gemini-2.5-flash`（主力推薦：高速度、多模態、支援 Structured JSON 格式化輸出）
    - `gemini-2.5-pro`（旗艦：頂級複雜深思推理）
    - `gemini-2.5-flash-lite`（超低延遲、成本優化）
    - `gemini-3.1-pro`（次世代高階推理）
    - `gemini-1.5-flash` / `gemini-1.5-pro`（經典長文本相容）
  - **淘汰狀態 (Deprecated/Shutdown)**：
    - `gemini-2.0-flash`、`gemini-2.0-flash-lite` 已於 2026/06 官方下線停用，專案內不得作為預設主力。
- **Agnes AI 官方規格基準 (Agnes AI Specification Baseline)**：
  - **API Base URL**: `https://apihub.agnes-ai.com/v1`
  - **核心模型 ID**: `agnes-2.5-flash` (Chat Completions: `/v1/chat/completions`)
  - **認證機制**: `Authorization: Bearer <AGNES_API_KEY>`
  - **擴充能力庫**: `agnes-image-2.1-flash`、`agnes-image-2.0-flash`、`agnes-video-v2.0`
- **開放式自訂模型 (Custom Model & Base URL)**：
  - 必須常態開放 Custom Model ID 與 Custom Base URL，保障未來生態擴展性。

## 3. 錯誤萃取與自我演化紀錄 (Self-Evolution Log)
- **2026-08-15 錯誤萃取（Google AI Studio 官方模型精確對齊）**：
  - **現象**：過去模型列表中混入已於 2026 年中下線之舊預覽模型（如 `gemini-2.0-flash`），未依 Google AI Studio 官方文檔對齊現行活躍清單。
  - **根因 (RCA)**：未即時查閱 `ai.google.dev/gemini-api/docs/models` 官方最新生命週期文檔。
  - **預防機制 (CAPA)**：全面對齊官方 `gemini-2.5-flash`、`gemini-2.5-pro`、`gemini-3.1-pro` 等官方現行標準模型 ID，並寫入本 `AGENTS.md`。
