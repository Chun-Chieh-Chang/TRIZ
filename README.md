# TRIZ Solver - 萃智多維矛盾求解與 AI 發明創新全能工作台 (v2.0)

這是一個基於 **TRIZ (萃智，發明問題解決理論)** 與 **Google Gemini AI 雲端大模型** 的現代多維矛盾求解與技術創新工作台。它整合了經典俄系發明理論、現代跨領域延伸案例（軟體架構、商業管理）與高階極限演算法 (ARIZ-85C)，幫助工程師、架構師與經理人快速破局。

---

## 🌟 核心架構與功能亮點 (Key Features)

### 1. 雙引擎協同 (Hybrid AI + Local Engine)
* **Google Gemini AI 雲端語意引擎**：
  * 專門針對**非工程與商業管理**等複雜語意問題進行形式化。
  * 自動提煉核心技術/物理矛盾，並針對業務場景客製化產出 3 套落地創新解法與 IFR 最終理想解。
  * **100% 本機隱私保護**：API Key 僅存於瀏覽器本機 `localStorage`，直接與 Google 官方通訊。
* **本機離線多維知識庫 (100% Offline Capable)**：
  * 未配置 API Key 或處於離線環境時，自動無縫回退至本機靜態規則庫。

### 2. 五大專業創新工作台
1. 🧭 **智慧衝突診斷路由 (Smart Diagnosis Router)**：自然語言語意診斷，自動導航至最適工具。
2. ⚙️ **39 技術矛盾矩陣工作台 (39 Contradiction Matrix)**：標準 39 參數對決查表與理想度評估計算器 (Ideality Calculator)。
3. ⚖️ **物理矛盾四大分離工作坊 (Physical Contradiction Workshop)**：空間、時間、條件、系統層級分離原理與啟發式提問引導。
4. 🌐 **40 原理跨領域全景庫 (Cross-Domain 40 Principles Explorer)**：全覽經典工程、軟體/IT 架構、商業模式與管理實例。
5. 🚀 **高階創新演算法 (ARIZ-85C & 9-Windows)**：九屏幕法時空資源探勘器（支援複製 Markdown）與 8 大技術進化法則。

---

## 📂 專案架構 (Directory Structure)

```
├── data/                  # 核心知識庫 (triz_master_db.json, parameters, principles, matrix)
├── js/                    # 前端核心引擎 (engine.js, ai_service.js, main.js)
├── css/                   # SkillsBuilder Glass Order 設計系統 (style.css)
├── index.html             # 主單頁應用程式入口 (SPA)
├── docs/                  # GitHub Pages 部署同步目錄
├── static/                # FastAPI 靜態資源同步目錄
├── skills/                # TRIZ 9 大專題 Agent Skills 知識文獻庫
├── src/                   # Python 後端模組 (engine.py, models.py, data/)
├── app.py                 # FastAPI 伺服器入口
├── main.py                # Python CLI 終端互動入口
├── DEV_LOG.md             # 專案開發、確效與演進日誌
└── package.ps1            # PyInstaller 打包腳本
```

---

## 🚀 快速啟動 (Quick Start)

### 模式 A：純前端網頁版 (推薦)
直接以瀏覽器開啟 `index.html`，或部署至 GitHub Pages 即開即用。

### 模式 B：本地 Python 服務 (FastAPI)
```bash
pip install -r requirements.txt
python app.py
```
系統會自動在瀏覽器開啟 `http://127.0.0.1:8000/static/index.html`。

### 模式 C：終端 CLI 模式
```bash
python main.py
```

---

## 🔒 數據隱私承諾 (Privacy Policy)
* 本專案不包含任何使用者數據蒐集、分析追蹤代碼或第三方廣告。
* Gemini API Key 僅存放於使用者瀏覽器的本機儲存空間 (`localStorage`)，且使用者可隨時一鍵清除。

---

<footer style="text-align: center; margin-top: 50px; color: #888;">
    TRIZ Solver Suite v2.0 - Developed by Wesley Chang @2026
</footer>
