/**
 * Gemini AI Service for TRIZ Solver
 * Handles semantic problem decomposition, non-engineering contradiction modeling,
 * and context-aware inventive solution generation using Google Gemini API.
 */

class GeminiAIService {
    constructor() {
        this.apiKeyStorageKey = 'TRIZ_GEMINI_API_KEY';
        this.modelStorageKey = 'TRIZ_GEMINI_MODEL';
        this.customPromptStorageKey = 'TRIZ_GEMINI_CUSTOM_PROMPT';

        this.apiKey = localStorage.getItem(this.apiKeyStorageKey) || '';
        this.model = localStorage.getItem(this.modelStorageKey) || 'gemini-2.5-flash';
    }

    /**
     * Check if AI service is ready (has API Key)
     */
    isConfigured() {
        return !!(this.apiKey && this.apiKey.trim().length > 10);
    }

    /**
     * Get stored configuration
     */
    getConfig() {
        return {
            apiKey: this.apiKey,
            model: this.model
        };
    }

    /**
     * Save configuration to localStorage
     */
    saveConfig(apiKey, model) {
        this.apiKey = (apiKey || '').trim();
        this.model = model || 'gemini-2.5-flash';

        if (this.apiKey) {
            localStorage.setItem(this.apiKeyStorageKey, this.apiKey);
        } else {
            localStorage.removeItem(this.apiKeyStorageKey);
        }
        localStorage.setItem(this.modelStorageKey, this.model);
    }

    /**
     * Clear API configuration
     */
    clearConfig() {
        this.apiKey = '';
        localStorage.removeItem(this.apiKeyStorageKey);
    }

    /**
     * Test connection to Gemini API
     */
    async testConnection() {
        if (!this.isConfigured()) {
            throw new Error('請先輸入有效的 Gemini API Key。');
        }

        const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${this.model}:generateContent?key=${this.apiKey}`;
        const payload = {
            contents: [
                {
                    role: 'user',
                    parts: [{ text: '請回覆 "OK" 確認 API 連線正常。' }]
                }
            ],
            generationConfig: {
                maxOutputTokens: 10,
                temperature: 0.1
            }
        };

        const response = await fetch(endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            const errData = await response.json().catch(() => ({}));
            const errMsg = errData.error?.message || `HTTP 錯誤碼: ${response.status}`;
            throw new Error(`連線失敗: ${errMsg}`);
        }

        return true;
    }

    /**
     * Deep semantic contradiction analysis and solution synthesis
     * @param {string} problemDescription - Natural language problem text
     * @param {string} systemName - Optional system context
     * @returns {Promise<Object>} Structured TRIZ AI Report
     */
    async analyzeAndSolveWithAI(problemDescription, systemName = '') {
        if (!this.isConfigured()) {
            throw new Error('Gemini API 未配置，請點擊「AI 設定」輸入您的 API Key。');
        }

        const systemPrompt = `
你是一位精通 TRIZ（萃智，發明問題解決理論）、跨領域系統工程與現代商業/軟體架構的資深首席科學家。
請分析使用者提出的問題（無論是工程物理、軟體架構、商業管理、服務流程或組織瓶頸），進行深層語意解構，並精準形式化為 TRIZ 衝突模型，最後給出具體的落地創新解法。

你必須輸出合法的 JSON 物件，格式如下（請勿在 JSON 前後加入額外 markdown 說明以外的無效字元）：
{
  "domain": "軟體架構 / 商業管理 / 服務流程 / 經典工程",
  "conflict_type": "technical" 或 "physical" 或 "trimming",
  "conflict_type_label": "技術矛盾 / 物理矛盾 / 系統修剪",
  "formalization": {
    "summary": "一句話總結問題核心與利益衝突",
    "improving_aspect": "想要改善或達成的目標 (What gets better)",
    "worsening_aspect": "會隨之惡化或阻礙的代價 (What gets worse)",
    "suggested_improving_param_id": 9,
    "suggested_improving_param_name": "速度 (Speed)",
    "suggested_worsening_param_id": 17,
    "suggested_worsening_param_name": "溫度 (Temperature)",
    "physical_state_p": "若為物理矛盾，填寫狀態 P",
    "physical_state_non_p": "若為物理矛盾，填寫狀態 非 P"
  },
  "recommended_principles": [
    {
      "id": 1,
      "name": "分割原理 (Segmentation)",
      "core_rationale": "為什麼此原理適用於該場景",
      "concrete_actionable_solution": "結合用戶具體業務場景的詳細落地執行方案（不要給空洞泛話，給出具體技術/管理措施）"
    },
    {
      "id": 10,
      "name": "預先作用原理 (Preliminary Action)",
      "core_rationale": "為什麼此原理適用於該場景",
      "concrete_actionable_solution": "結合用戶具體業務場景的詳細落地執行方案"
    },
    {
      "id": 25,
      "name": "自助原理 (Self-service)",
      "core_rationale": "為什麼此原理適用於該場景",
      "concrete_actionable_solution": "結合用戶具體業務場景的詳細落地執行方案"
    }
  ],
  "separation_recommendations": [
    {
      "dimension": "空間分離 / 時間分離 / 條件分離 / 系統層次分離",
      "approach": "具體如何透過分離互斥特性來破局"
    }
  ],
  "ideality_advice": "如何以最小成本與副作用達成最大價值提升 (IFR 最終理想解思路)"
}
`;

        const userPrompt = `
【問題背景 / 系統名稱】：${systemName || '未指定'}
【遭遇的矛盾難題】：${problemDescription}

請以第一性原理進行深度語意剖析，辨識底層衝突本質，並給出結構化 JSON 回應。
`;

        const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${this.model}:generateContent?key=${this.apiKey}`;
        const payload = {
            contents: [
                {
                    role: 'user',
                    parts: [{ text: `${systemPrompt}\n\n${userPrompt}` }]
                }
            ],
            generationConfig: {
                temperature: 0.3,
                topP: 0.95,
                maxOutputTokens: 2500
            }
        };

        const response = await fetch(endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            const errData = await response.json().catch(() => ({}));
            throw new Error(`Gemini API 請求失敗 (${response.status}): ${errData.error?.message || '未知錯誤'}`);
        }

        const data = await response.json();
        const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text || '';

        // Extract JSON from raw response (handling ```json codeblock)
        return this.parseJSONResponse(rawText);
    }

    /**
     * Safely parse JSON from LLM output
     */
    parseJSONResponse(text) {
        try {
            // Remove markdown code fence if present
            let cleaned = text.trim();
            if (cleaned.startsWith('```json')) {
                cleaned = cleaned.replace(/^```json/, '').replace(/```$/, '').trim();
            } else if (cleaned.startsWith('```')) {
                cleaned = cleaned.replace(/^```/, '').replace(/```$/, '').trim();
            }
            return JSON.parse(cleaned);
        } catch (e) {
            console.warn('[AIService] Direct JSON parse failed, trying regex match...', e);
            const match = text.match(/\{[\s\S]*\}/);
            if (match) {
                return JSON.parse(match[0]);
            }
            throw new Error('AI 回傳格式無法解析為 JSON，請重試。');
        }
    }
}

// Export for global access
window.GeminiAIService = GeminiAIService;
