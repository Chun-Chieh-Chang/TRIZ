# Project Agent Rules & Self-Evolution (AGENTS.md)

## 1. CI/CD 與自動化工作流防禦規則 (Workflow Governance)
- **前置清理原則 (Pre-cleanup Principle)**：
  - 在配置或推送新的 GitHub Actions（如 `.github/workflows/deploy-pages.yml`）前，必須主動掃描 `.github/workflows/` 目錄。
  - 若發現歷史遺留、無用或第三方未經測試的舊 Actions（例如 `jules.yml` 等無效樣板），必須立即遵循 MECE 原則予以刪除，嚴禁多個衝突或異常的 Workflow 並存。
- **單一職責 (Single Responsibility)**：
  - 本專案 GitHub Pages 部署僅以 `deploy-pages.yml` 為唯一官方 CI/CD 工作流。

## 2. AI 模型與參照生態對齊規範 (AI Reference & Model Alignment)
- **現代模型基準線 (Model Baseline Principle)**：
  - 參照其他生態專案（如 `8D-Creator`）導入 AI 模組時，必須主動整合當前最新的旗艦與思考模型（包含 `gemini-2.5-flash`、`gemini-2.5-pro`、`gemini-2.0-flash-thinking`、`agnes` 專屬模型），並開放自訂模型 ID (Custom Model ID) 與自訂 API Base URL。
  - 嚴禁僅提供單一或歷史舊版本模型選項。

## 3. 錯誤萃取與自我演化紀錄 (Self-Evolution Log)
- **2026-08-15 錯誤萃取（工作流衝突）**：
  - **現象**：遠端 GitHub Actions 同時觸發了 `Deploy GitHub Pages` 與歷史遺留的 `Jules Invoke` 報紅。
  - **根因 (RCA)**：初始推送時未對 `.github/workflows/` 下既有的歷史 action 進行主動清理。
  - **預防機制 (CAPA)**：將 `.github/workflows/` 盤點與清理納入專案標準 SOP。
- **2026-08-15 錯誤萃取（AI 模型參照缺失）**：
  - **現象**：AI 設定介面未包含 `agnes` 專用模型與完整 2.5/2.0 最新模型矩陣。
  - **根因 (RCA)**：初次構建 AI 服務時對參照專案的模型生態調研不全，缺少自由自訂模型與 Agnes 專用通道。
  - **預防機制 (CAPA)**：已將 `agnes`、`gemini-2.5`、`gemini-2.0-flash-thinking` 與自訂模型輸入整合至標準 AI 模組，並寫入本 `AGENTS.md`。
