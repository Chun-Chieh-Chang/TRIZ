# Project Agent Rules & Self-Evolution (AGENTS.md)

## 1. CI/CD 與自動化工作流防禦規則 (Workflow Governance)
- **前置清理原則 (Pre-cleanup Principle)**：
  - 在配置或推送新的 GitHub Actions（如 `.github/workflows/deploy-pages.yml`）前，必須主動掃描 `.github/workflows/` 目錄。
  - 若發現歷史遺留、無用或第三方未經測試的舊 Actions（例如 `jules.yml` 等無效樣板），必須立即遵循 MECE 原則予以刪除，嚴禁多個衝突或異常的 Workflow 並存。
- **單一職責 (Single Responsibility)**：
  - 本專案 GitHub Pages 部署僅以 `deploy-pages.yml` 為唯一官方 CI/CD 工作流。

## 2. AI 模型與參照生態對齊規範 (AI Reference & Model Alignment)
- **Agnes AI 官方規格基準 (Agnes AI Specification Baseline)**：
  - **API Base URL**: `https://apihub.agnes-ai.com/v1`
  - **核心模型 ID**: `agnes-2.5-flash` (Chat Completions: `/v1/chat/completions`)
  - **認證機制**: `Authorization: Bearer <AGNES_API_KEY>`
  - **擴充能力庫**: `agnes-image-2.1-flash`、`agnes-image-2.0-flash`、`agnes-video-v2.0`
- **Google Gemini 系列模型規範**:
  - **API Base URL**: `https://generativelanguage.googleapis.com`
  - **支援模型**: `gemini-2.5-flash`、`gemini-2.5-pro`、`gemini-2.0-flash-thinking-exp`、`gemini-2.0-flash`、`gemini-1.5-flash`、`gemini-1.5-pro`
- **開放式自訂模型 (Custom Model & Base URL)**：
  - 必須常態開放 Custom Model ID 與 Custom Base URL，保障未來生態擴展性。

## 3. 錯誤萃取與自我演化紀錄 (Self-Evolution Log)
- **2026-08-15 錯誤萃取（Agnes AI 端點與協議精確對齊）**：
  - **現象**：初次整合 Agnes 時，誤將其與 Gemini 原生 API 端點混淆，未實現 Agnes 原生之 `https://apihub.agnes-ai.com/v1` 與 Bearer Token `/v1/chat/completions` 協議。
  - **根因 (RCA)**：未調研 Agnes 專屬之 OpenAI-compatible 協定標準。
  - **預防機制 (CAPA)**：建立多 Provider 路由架構，將 Agnes 原生規範寫入本 `AGENTS.md`。
