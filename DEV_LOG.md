# TRIZ 專案開發與架構演進日誌 (DEV_LOG.md)

## 2026-08-15: 行動裝置與手機介面全面升級 PWA 相容技術架構

### 1. 執行目標 (Goal)
- **需求**：手機或行動裝置介面版本採用 PWA (Progressive Web App) 相容技術，具備離線快取、主螢幕獨立 App 安裝、全螢幕原生體驗與 Mobile First 響應式優化。
- **執行範疇**：
  1. **Web App Manifest (`manifest.json`)**：
     - 配置標準 standalone 模式、深色主題色 (`#0F172A`)、中英文名稱與分類。
     - 生成完整尺寸的標準與 Maskable PWA 圖標（192x192、512x512 PNG）。
  2. **Service Worker (`sw.js`) 離線快取引擎**：
     - 實作 Cache-First / Stale-While-Revalidate 離線快取機制，預先快取核心 HTML、CSS、JS、JSON 資料庫與圖標。
     - 外部 AI 雲端端點自動旁路直連。
  3. **PWA 安裝提示控制與 Mobile Top Header**：
     - 在 `js/main.js` 註冊 Service Worker，並捕捉 `beforeinstallprompt` 事件，支援一鍵點擊「📥 安裝 App 至手機/桌面」。
     - 在行動端建立專屬頂部導航列（Mobile Top Header），提供「⚙️ AI 設定」與「📖 SOP 指南」快捷入口。
  4. **行動端體驗與安全區域適配 (CSS Safe Area Insets)**：
     - 適配 iOS / Android 全螢幕手勢條與瀏海螢幕 (`env(safe-area-inset-top)` / `env(safe-area-inset-bottom)`)。
     - 觸控目標維持 >= 48x48px，開啟 `-webkit-overflow-scrolling: touch`。
  5. 鏡像同步至 `docs/` (GitHub Pages) 與 `static/` (FastAPI)。

---

## 2026-08-15: 重構 TRIZ 核心原理概述：深入淺出圖解手冊與通俗心智模型
