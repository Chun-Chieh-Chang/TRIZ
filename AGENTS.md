# Project Agent Rules & Self-Evolution (AGENTS.md)

## 1. CI/CD 與自動化工作流防禦規則 (Workflow Governance)
- **前置清理原則 (Pre-cleanup Principle)**：
  - 在配置或推送新的 GitHub Actions（如 `.github/workflows/deploy-pages.yml`）前，必須主動掃描 `.github/workflows/` 目錄。
  - 若發現歷史遺留、無用或第三方未經測試的舊 Actions（例如 `jules.yml` 等無效樣板），必須立即遵循 MECE 原則予以刪除，嚴禁多個衝突或異常的 Workflow 並存。
- **單一職責 (Single Responsibility)**：
  - 本專案 GitHub Pages 部署僅以 `deploy-pages.yml` 為唯一官方 CI/CD 工作流。

## 2. 錯誤萃取與自我演化紀錄 (Self-Evolution Log)
- **2026-08-15 錯誤萃取**：
  - **現象**：遠端 GitHub Actions 同時觸發了 `Deploy GitHub Pages` 與歷史遺留的 `Jules Invoke`，且後者因缺少配置而失敗報紅。
  - **根因 (RCA)**：初始推送時未對 `.github/workflows/` 下既有的歷史 action 進行主動清理。
  - **預防機制 (CAPA)**：將 `.github/workflows/` 盤點與清理納入專案標準 SOP，並寫入本 `AGENTS.md`。
