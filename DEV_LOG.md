# TRIZ 專案開發與架構演進日誌 (DEV_LOG.md)

## 2026-08-15: 清理異常與重複的 GitHub Workflows (MECE CI/CD 優化)

### 1. 執行目標 (Goal)
- **問題回報**：遠端 GitHub 倉庫在每次推送時同時觸發了兩個 Actions（`Deploy GitHub Pages` 與 `Jules Invoke`），其中歷史遺留的 `Jules Invoke` 產生執行異常報紅。
- **執行範疇**：
  1. 徹底刪除無效的 `.github/workflows/jules.yml`。
  2. 僅保留唯一的 `.github/workflows/deploy-pages.yml`（GitHub Pages 官方部署工作流）。
  3. 將防禦規則萃取至 `AGENTS.md` 實施自演化管理。

### 2. 問題分析 (RCA) 與預防措施 (CAPA)
* **根因分析 (RCA)**：
  - 專案最初包含歷史舊樣板 `.github/workflows/jules.yml`，在新增 `deploy-pages.yml` 後未依 MECE 原則將舊檔清理，導致 push 事件同時觸發兩個工作流，且舊腳本因缺乏依賴而失敗。
* **矯正與預防措施 (CAPA)**：
  - **立即矯正**：刪除 `.github/workflows/jules.yml`，確保僅由 `deploy-pages.yml` 負責 Pages 部署。
  - **自我演化**：將「CI/CD 目錄前置清查與單一職責規範」寫入專案 `AGENTS.md`，未來建立 CI 腳本前強制先執行衝突清理。

---

## 2026-08-14: 全專案整體程式碼與檔案優化重構 + 遠端倉庫推送與 GitHub Pages 建置

### 1. 執行目標 (Goal)
- **觸發指令**：執行專案的整體程式碼與檔案優化作業，並推送到 `https://github.com/Chun-Chieh-Chang/TRIZ` 建立 GitHub Pages。
- **執行範疇**：
  1. **MECE 全面盤點與清理**：清理死碼、重複暫存檔，將大型參考 PDF (`books/`) 納入 `.gitignore` 以符合 GitHub 規範。
  2. **多端資源 100% 同步**：將根目錄 SPA 核心（HTML, CSS, JS, Master DB, SW）同步至 `docs/` (GitHub Pages)、`static/` (FastAPI) 與 `src/data/`。
  3. **文件全量同步**：更新 `README.md`、`TRIZ_TRD.md`、`guides/Technical_Specs.md` 至 v2.0.0。
  4. **GitHub Actions 自動化部署**：建立 `.github/workflows/deploy-pages.yml` 自動觸發 GitHub Pages 部署。
  5. **成功推送遠端**：推送至 `https://github.com/Chun-Chieh-Chang/TRIZ.git` (分支: `main`)。
