/**
 * TRIZ Master Engine - Industrial-grade Multi-dimensional Contradiction Solver
 * Powered by TRIZ Knowledge Base (Altshuller Matrix, Physical Separation, Cross-Domain 40 Principles, ARIZ-85C)
 */

class TRIZEngine {
    constructor() {
        this.parameters = {};
        this.principles = {};
        this.matrix = {};
        this.separationPrinciples = [];
        this.evolutionLaws = [];
        this.arizStages = [];
        this.dataLoaded = false;
        this.aiService = typeof GeminiAIService !== 'undefined' ? new GeminiAIService() : null;
    }

    /**
     * Load comprehensive TRIZ master data
     */
    async loadData() {
        try {
            console.log('[Engine] Loading TRIZ Master Database...');
            const response = await fetch('data/triz_master_db.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const db = await response.json();

            // Load Parameters
            db.parameters.forEach(p => {
                this.parameters[p.id] = p;
            });

            // Load Principles
            db.principles.forEach(p => {
                this.principles[p.id] = p;
            });

            // Load Separation Principles
            this.separationPrinciples = db.separation_principles || [];

            // Load Evolution Laws & ARIZ
            this.evolutionLaws = db.evolution_laws || [];
            this.arizStages = db.ariz_stages || [];

            // Load Matrix
            this.matrix = db.matrix || {};

            this.dataLoaded = true;
            console.log(`[Engine] Master DB initialized: ${Object.keys(this.parameters).length} parameters, ${Object.keys(this.principles).length} principles, ${this.separationPrinciples.length} separation modes, ${Object.keys(this.matrix).length} matrix cells.`);
            return true;
        } catch (error) {
            console.warn('[Engine] Failed to load triz_master_db.json, attempting fallback files...', error);
            return await this.loadFallbackData();
        }
    }

    /**
     * Fallback loader for legacy separated JSON files
     */
    async loadFallbackData() {
        try {
            const [pRes, prRes, mRes] = await Promise.all([
                fetch('data/parameters.json'),
                fetch('data/principles.json'),
                fetch('data/matrix.json')
            ]);
            const pData = await pRes.json();
            const prData = await prRes.json();
            this.matrix = await mRes.json();

            pData.forEach(p => this.parameters[p.id] = p);
            prData.forEach(p => this.principles[p.id] = p);

            this.dataLoaded = true;
            console.log('[Engine] Fallback data loaded successfully.');
            return true;
        } catch (err) {
            console.error('[Engine] Critical: All data loading paths failed.', err);
            throw new Error('無法載入 TRIZ 資料庫，請檢查網路連線或靜態檔案路徑。');
        }
    }

    /**
     * Intelligent Problem Diagnosis and Routing
     * Analyzes natural language problem description to suggest the optimal TRIZ route
     */
    diagnoseProblem(text) {
        if (!text || typeof text !== 'string') {
            return {
                detected_type: 'unknown',
                confidence: 0,
                recommendation: '請輸入具體的問題或矛盾描述。',
                suggested_tool: 'wizard'
            };
        }

        const lower = text.toLowerCase();
        const logs = [];
        logs.push(`正在智慧診斷問題文本: "${text}"`);

        // Physical contradiction keywords (A既要...又要..., 同時要求互斥特性)
        const physicalKeywords = [
            '既要', '又要', '既想', '又想', '同時需要', '同時要求', '互斥',
            '既硬又軟', '既大又小', '既重又輕', '既熱又冷', '既透明又隱私',
            'both', 'simultaneously', 'contradictory requirement', 'rigid and flexible'
        ];

        // Software & IT domain keywords
        const softwareKeywords = [
            '軟體', '程式', '架構', '微服務', '伺服器', '資料庫', '快取', '並發', '延遲',
            'api', 'cloud', 'memory', 'cpu', 'latency', 'database', 'microservice',
            'cache', 'concurrency', 'docker', 'frontend', 'backend'
        ];

        // Business & Management domain keywords
        const businessKeywords = [
            '商業', '管理', '流程', '組織', '成本', '客戶', '定價', '外包', '營運', '利潤',
            'business', 'management', 'cost', 'customer', 'pricing', 'outsourcing', 'profit'
        ];

        // Trimming / Function Analysis keywords
        const trimmingKeywords = [
            '元件過多', '結構複雜', '修剪', '功能過剩', '降低成本', '消除零件', '冗餘',
            'trimming', 'redundant', 'simplify structure', 'excess components'
        ];

        let isPhysical = physicalKeywords.some(kw => lower.includes(kw));
        let isSoftware = softwareKeywords.some(kw => lower.includes(kw));
        let isBusiness = businessKeywords.some(kw => lower.includes(kw));
        let isTrimming = trimmingKeywords.some(kw => lower.includes(kw));

        // Detect parameters match
        const paramMatch = this.normalizeInputToParameter(text);

        if (isPhysical) {
            logs.push('檢測到互斥雙重屬性描述 -> 判定為【物理矛盾】');
            return {
                detected_type: 'physical_contradiction',
                confidence: 0.92,
                title: '物理矛盾 (Physical Contradiction)',
                description: '系統對同一物理參數或組件提出了相互對立的要求（既要 P，又要 非 P）。',
                suggested_tool: 'physical',
                recommended_path: '物理矛盾四大分離工作坊 (空間 / 時間 / 條件 / 系統層級分離)',
                logs
            };
        } else if (isTrimming) {
            logs.push('檢測到結構簡化與成本過剩描述 -> 建議採用【功能分析與元件修剪 (Trimming)】');
            return {
                detected_type: 'trimming',
                confidence: 0.85,
                title: '系統修剪與成本優化 (System Trimming)',
                description: '當系統結構過於複雜或成本過高時，透過修剪非核心元件並將有用功能轉移至超系統。',
                suggested_tool: 'principles',
                recommended_path: '40 原理 (原理 2 抽取、原理 6 多用性、原理 25 自助、原理 27 廉價替代)',
                logs
            };
        } else {
            let domain = isSoftware ? '軟體與資訊架構' : (isBusiness ? '商業管理與服務' : '通用工程與物理系統');
            logs.push(`檢測到參數衝突描述 -> 判定為【技術矛盾】(領域: ${domain})`);
            return {
                detected_type: 'technical_contradiction',
                domain: domain,
                confidence: 0.88,
                title: `技術矛盾 (${domain})`,
                description: '當改進系統某一性能參數時，導致另一性能參數惡化（改善 A 導致 B 惡化）。',
                suggested_tool: 'technical',
                suggested_parameter: paramMatch.match,
                recommended_path: '39 參數矛盾矩陣查表 + 跨領域 40 發明原理對應解',
                logs
            };
        }
    }

    /**
     * Map natural language text to standard 39 engineering parameters
     */
    normalizeInputToParameter(userText) {
        const logs = [];
        if (!userText) return { match: null, logs: ['輸入為空'] };

        const text = userText.toLowerCase().trim();
        logs.push(`分析輸入字串: '${text}'`);

        let bestMatch = null;
        let maxScore = 0;
        const candidates = [];

        for (const param of Object.values(this.parameters)) {
            let score = 0;
            const matchedKws = [];

            // Match parameter name directly
            if (text.includes(param.name.toLowerCase())) {
                score += 5;
                matchedKws.push(`全名匹配: ${param.name}`);
            }

            // Match keywords
            if (param.keywords && Array.isArray(param.keywords)) {
                for (const kw of param.keywords) {
                    const kwLower = kw.toLowerCase();
                    if (text.includes(kwLower)) {
                        score += 2;
                        matchedKws.push(kw);
                    }
                }
            }

            if (score > 0) {
                candidates.push({ param, score, matchedKws });
                if (score > maxScore) {
                    maxScore = score;
                    bestMatch = param;
                }
            }
        }

        candidates.sort((a, b) => b.score - a.score);

        if (candidates.length > 0) {
            logs.push(`共匹配到 ${candidates.length} 個潛在候選參數。`);
            candidates.slice(0, 3).forEach(c => {
                logs.push(` • 候選 [${c.param.id}] ${c.param.name} (得分: ${c.score}, 匹配詞: ${c.matchedKws.join(', ')})`);
            });
        } else {
            logs.push('未精準匹配到預設關鍵字，請手動由下拉選單選取標準參數。');
        }

        return {
            match: bestMatch,
            candidates: candidates.slice(0, 5),
            logs
        };
    }

    /**
     * Solve Technical Contradiction using 39x39 Altshuller Matrix
     */
    solveContradiction(improvingId, worseningId) {
        const logs = [];
        improvingId = parseInt(improvingId, 10);
        worseningId = parseInt(worseningId, 10);

        logs.push(`啟動矛盾矩陣查表: [改善參數: ${improvingId}] vs [惡化參數: ${worseningId}]`);

        const improving = this.parameters[improvingId];
        const worsening = this.parameters[worseningId];

        if (!improving || !worsening) {
            throw new Error('無效的參數編號，請選擇 1~39 號工程參數。');
        }

        // Check for Physical Contradiction (Improving ID == Worsening ID)
        if (improvingId === worseningId) {
            logs.push('⚡ 偵測到物理矛盾（改善與惡化為同一參數）！自動轉向【物理矛盾四大分離原理】求解流程。');
            const pcSolution = this.solvePhysicalContradiction(improvingId);
            return {
                is_physical: true,
                improving_parameter: improving,
                worsening_parameter: worsening,
                strategy_note: 'PHYSICAL CONTRADICTION (物理矛盾自動切換)',
                separation_data: pcSolution,
                execution_log: logs
            };
        }

        // Lookup Standard Matrix
        const key = `${improvingId},${worseningId}`;
        let principleIds = this.matrix[key] || [];
        let note = '';
        const suggested = [];

        if (principleIds.length === 0) {
            logs.push('矩陣單元格為空（歷史專利中無直接經典推薦）。');
            logs.push('啟動頂級啟發式通用解 (Heuristic Fallback: #35 參數變化, #10 預先作用, #1 分割, #28 機械替代)。');
            principleIds = [35, 10, 1, 28];
            note = '啟發式推薦解 (矩陣無直接對應，推薦四大高頻通用原理)';
        } else {
            logs.push(`成功檢索到矩陣推薦發明原理: ${principleIds.join(', ')}`);
            note = '經典 Altshuller 矩陣精準推薦解';
        }

        for (const pid of principleIds) {
            const principle = this.principles[pid];
            if (principle) {
                suggested.push(principle);
            }
        }

        return {
            is_physical: false,
            improving_parameter: improving,
            worsening_parameter: worsening,
            suggested_principles: suggested,
            strategy_note: note,
            execution_log: logs
        };
    }

    /**
     * Solve Physical Contradiction using 4 Separation Principles
     */
    solvePhysicalContradiction(paramIdOrName) {
        const logs = [];
        logs.push(`啟動物理矛盾專屬求解引擎 (四大分離維度分析)...`);

        const enrichedSeparation = this.separationPrinciples.map(sep => {
            const principleObjs = (sep.recommended_principles || []).map(pid => this.principles[pid]).filter(Boolean);
            return {
                ...sep,
                recommended_principles_details: principleObjs
            };
        });

        logs.push(`已構建【空間分離】、【時間分離】、【條件分離】、【系統層級分離】全維度解法矩陣。`);

        return {
            title: '物理矛盾四大分離原理體系',
            core_theory: '物理矛盾是指同一個系統參數既要求是 P 又要求是 非 P。解決物理矛盾的關鍵在於打破時空與條件限制，實現互斥特性的和平共存。',
            separations: enrichedSeparation,
            execution_log: logs
        };
    }

    /**
     * Search principles across domains (Engineering, Software, Business)
     */
    searchPrinciples(query, domain = 'all') {
        const queryLower = (query || '').toLowerCase().trim();
        const results = [];

        for (const p of Object.values(this.principles)) {
            let matched = false;
            let matchReason = [];

            if (!queryLower) {
                matched = true;
            } else {
                // Match ID or Name
                if (String(p.id) === queryLower || p.name.toLowerCase().includes(queryLower)) {
                    matched = true;
                    matchReason.push('名稱/編號匹配');
                }
                // Match Description
                if (p.description && p.description.toLowerCase().includes(queryLower)) {
                    matched = true;
                    matchReason.push('定義匹配');
                }
                // Match Engineering examples
                if (p.examples_engineering && p.examples_engineering.some(e => e.toLowerCase().includes(queryLower))) {
                    matched = true;
                    matchReason.push('工程範例匹配');
                }
                // Match Software examples
                if (p.examples_software && p.examples_software.some(e => e.toLowerCase().includes(queryLower))) {
                    matched = true;
                    matchReason.push('軟體範例匹配');
                }
                // Match Business examples
                if (p.examples_business && p.examples_business.some(e => e.toLowerCase().includes(queryLower))) {
                    matched = true;
                    matchReason.push('商業範例匹配');
                }
            }

            if (matched) {
                results.push({
                    principle: p,
                    domain: domain,
                    matchReason: matchReason.join(', ')
                });
            }
        }

        return results;
    }

    /**
     * Check if AI Cloud Engine is ready
     */
    isAIReady() {
        return !!(this.aiService && this.aiService.isConfigured());
    }

    /**
     * Hybrid Problem Diagnosis
     * If Gemini AI is configured, uses deep LLM semantic understanding;
     * otherwise falls back to local rule-based engine.
     */
    async diagnoseProblemHybrid(text, systemName = '') {
        const logs = [];
        if (this.isAIReady()) {
            logs.push('⚡ 偵測到已啟用 Gemini AI 雲端引擎，啟動高階語意解構與矛盾形式化...');
            try {
                const aiReport = await this.aiService.analyzeAndSolveWithAI(text, systemName);
                logs.push(`✓ Gemini AI 分析完成 (領域: ${aiReport.domain}, 類型: ${aiReport.conflict_type_label})`);
                return {
                    is_ai: true,
                    ai_report: aiReport,
                    detected_type: aiReport.conflict_type,
                    title: `${aiReport.conflict_type_label} (${aiReport.domain})`,
                    description: aiReport.formalization?.summary || 'AI 語意解構完畢',
                    recommended_path: `AI 量身推薦 ${aiReport.recommended_principles?.length || 3} 套落地創新解法`,
                    suggested_tool: aiReport.conflict_type === 'physical' ? 'physical' : 'technical',
                    suggested_parameter: aiReport.formalization?.suggested_improving_param_id ? {
                        id: aiReport.formalization.suggested_improving_param_id,
                        name: aiReport.formalization.suggested_improving_param_name
                    } : null,
                    logs
                };
            } catch (err) {
                logs.push(`⚠️ AI 請求失敗 (${err.message})，自動平滑回退至本機啟發式規則引擎。`);
                console.warn('[Engine] AI diagnosis failed, falling back to local...', err);
            }
        } else {
            logs.push('當前處於【本機離線模式】(可於左側「AI 設定」輸入 Gemini API Key 啟用深度語意推理)。');
        }

        const localResult = this.diagnoseProblem(text);
        return {
            is_ai: false,
            ...localResult,
            logs: [...logs, ...(localResult.logs || [])]
        };
    }
}

// Export for global access in browser
window.TRIZEngine = TRIZEngine;
