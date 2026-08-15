/**
 * TRIZ Solver PRO - Main UI Controller
 * Integrates Smart Diagnosis, 39 Technical Contradictions, Physical Contradictions,
 * 40 Principles Cross-Domain Explorer, 9-Windows & ARIZ-85C.
 */

// Application State
const appState = {
    engine: null,
    currentWorkspace: 'workspace-diagnosis',
    selectedDomain: 'all',
    suggestedTool: null,
    improvingParamId: null,
    worseningParamId: null
};

// Initialize Application on DOM Ready
window.addEventListener('DOMContentLoaded', async () => {
    log('正在初始化 TRIZ 核心引擎與知識庫...');
    appState.engine = new TRIZEngine();

    try {
        await appState.engine.loadData();
        log('✓ 知識庫與多維求解引擎就緒。');

        // Initialize UI components
        populateParameterSelects();
        renderAllPrinciples();
        renderARIZStages();
        renderEvolutionLaws();
        setupNavigation();
        updateAIStatusUI();
    } catch (err) {
        log(`✗ 初始化失敗: ${err.message}`);
        console.error('Initialization error:', err);
    }
});

/**
 * Append message to the sidebar console
 */
function log(msg) {
    const consoleEl = document.getElementById('log-content');
    if (!consoleEl) return;
    const line = document.createElement('span');
    line.className = 'log-line';
    line.innerText = `> ${msg}`;
    consoleEl.appendChild(line);
    consoleEl.scrollTop = consoleEl.scrollHeight;
}

/**
 * Setup Navigation Tab Switching (Desktop Sidebar & Mobile Nav)
 */
function setupNavigation() {
    const navItems = document.querySelectorAll('.nav-item, .mobile-nav-item');
    navItems.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetId = btn.getAttribute('data-target');
            if (targetId) {
                switchWorkspace(targetId);
            }
        });
    });
}

/**
 * Switch active workspace
 */
function switchWorkspace(workspaceId) {
    appState.currentWorkspace = workspaceId;

    // Update sections
    document.querySelectorAll('.workspace').forEach(ws => {
        ws.classList.remove('active');
    });
    const targetWs = document.getElementById(workspaceId);
    if (targetWs) {
        targetWs.classList.add('active');
    }

    // Update Desktop Nav
    document.querySelectorAll('.nav-item').forEach(item => {
        if (item.getAttribute('data-target') === workspaceId) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });

    // Update Mobile Nav
    document.querySelectorAll('.mobile-nav-item').forEach(item => {
        if (item.getAttribute('data-target') === workspaceId) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });

    log(`切換工作台視圖 -> ${workspaceId}`);
}

/**
 * Populate 39 Engineering Parameters into dropdown selects
 */
function populateParameterSelects() {
    const selImp = document.getElementById('select-improving');
    const selWor = document.getElementById('select-worsening');
    if (!selImp || !selWor || !appState.engine) return;

    selImp.innerHTML = '<option value="">-- 請選擇 39 改善參數 --</option>';
    selWor.innerHTML = '<option value="">-- 請選擇 39 惡化參數 --</option>';

    const params = Object.values(appState.engine.parameters).sort((a, b) => a.id - b.id);

    params.forEach(p => {
        const optImp = document.createElement('option');
        optImp.value = p.id;
        optImp.textContent = `[${p.id}] ${p.name}`;
        selImp.appendChild(optImp);

        const optWor = document.createElement('option');
        optWor.value = p.id;
        optWor.textContent = `[${p.id}] ${p.name}`;
        selWor.appendChild(optWor);
    });
}

/* ==========================================================================
   WORKSPACE 1: SMART DIAGNOSIS
   ========================================================================== */

async function handleRunDiagnosis() {
    const inputEl = document.getElementById('diag-input');
    const btnDiag = document.getElementById('btn-run-diagnosis');
    const text = inputEl ? inputEl.value.trim() : '';

    if (!text) {
        alert('請先輸入您遭遇的問題或矛盾描述。');
        return;
    }

    // UI Loading state
    if (btnDiag) {
        btnDiag.disabled = true;
        btnDiag.innerHTML = '<span>⏳</span> 正在進行語意形式化剖析...';
    }

    log(`執行衝突診斷: "${text.substring(0, 30)}..."`);

    try {
        const diag = await appState.engine.diagnoseProblemHybrid(text);

        // Print logs
        if (diag.logs) {
            diag.logs.forEach(l => log(`[診斷] ${l}`));
        }

        // Render result card
        const resCard = document.getElementById('diag-result-card');
        const typeBadge = document.getElementById('diag-type-badge');
        const confText = document.getElementById('diag-confidence-text');
        const diagTitle = document.getElementById('diag-title');
        const diagDesc = document.getElementById('diag-desc');
        const pathText = document.getElementById('diag-path-text');

        if (resCard && typeBadge && confText && diagTitle && diagDesc && pathText) {
            resCard.style.display = 'block';
            typeBadge.innerText = diag.title || '衝突診斷完畢';
            confText.innerText = diag.is_ai ? '✨ Gemini AI 深度剖析' : `匹配信心度: ${Math.round((diag.confidence || 0.85) * 100)}%`;
            diagTitle.innerText = diag.title;
            diagDesc.innerText = diag.description;
            pathText.innerText = diag.recommended_path;
            appState.suggestedTool = diag.suggested_tool;

            // If AI produced concrete customized solutions, render them
            if (diag.is_ai && diag.ai_report) {
                renderAICustomSolutions(diag.ai_report);
            } else {
                // Clear any existing AI box
                const existingAiBox = document.getElementById('ai-custom-solutions-box');
                if (existingAiBox) existingAiBox.remove();
            }

            // If a parameter was suggested, pre-fill
            if (diag.suggested_parameter) {
                appState.improvingParamId = diag.suggested_parameter.id;
            }
        }
    } catch (err) {
        log(`診斷出錯: ${err.message}`);
        console.error('Diagnosis error:', err);
    } finally {
        if (btnDiag) {
            btnDiag.disabled = false;
            btnDiag.innerHTML = '<span>✨</span> 智慧診斷與 AI 形式化';
        }
    }
}

/**
 * Render Gemini AI deep customized solutions
 */
function renderAICustomSolutions(aiReport) {
    const resCard = document.getElementById('diag-result-card');
    if (!resCard) return;

    let existingAiBox = document.getElementById('ai-custom-solutions-box');
    if (!existingAiBox) {
        existingAiBox = document.createElement('div');
        existingAiBox.id = 'ai-custom-solutions-box';
        existingAiBox.className = 'ai-solutions-card';
        resCard.appendChild(existingAiBox);
    }

    let principlesHtml = '';
    (aiReport.recommended_principles || []).forEach(p => {
        principlesHtml += `
            <div class="ai-solution-item">
                <h4>💡 原理 #${p.id} ${p.name}</h4>
                <p><b>適用依據：</b>${p.core_rationale}</p>
                <p style="margin-top: 4px; color: #6EE7B7;"><b>🎯 具體實施方案：</b>${p.concrete_actionable_solution}</p>
            </div>
        `;
    });

    let sepDimensionsHtml = '';
    if (aiReport.separation_recommendations && aiReport.separation_recommendations.length > 0) {
        sepDimensionsHtml = '<div style="margin-top: 12px;"><b>🔮 分離維度破局建議：</b><ul>';
        aiReport.separation_recommendations.forEach(sep => {
            sepDimensionsHtml += `<li style="font-size: 0.85rem; color: #94A3B8; margin-top: 4px;"><b>${sep.dimension}</b>: ${sep.approach}</li>`;
        });
        sepDimensionsHtml += '</ul></div>';
    }

    existingAiBox.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
            <h4 style="color: #60A5FA; font-size: 1.05rem;">✨ Gemini AI 量身客製化解題方案 (${aiReport.domain})</h4>
            <span class="badge badge-emerald">AI Generated</span>
        </div>
        ${principlesHtml}
        ${sepDimensionsHtml}
        ${aiReport.ideality_advice ? `<div style="background: rgba(59, 130, 246, 0.1); padding: 10px; border-radius: 6px; font-size: 0.82rem; color: #93C5FD; margin-top: 10px;"><b>🌟 最終理想解 (IFR) 建議：</b>${aiReport.ideality_advice}</div>` : ''}
    `;
}

function setDiagnosisExample(exampleText) {
    const inputEl = document.getElementById('diag-input');
    if (inputEl) {
        inputEl.value = exampleText;
        handleRunDiagnosis();
    }
}

function routeToSuggestedTool() {
    if (appState.suggestedTool === 'physical') {
        switchWorkspace('workspace-physical');
        const inputP = document.getElementById('pc-state-p');
        const inputNonP = document.getElementById('pc-state-non-p');
        if (inputP && inputNonP) {
            inputP.value = '零件必須剛硬承受拉力';
            inputNonP.value = '零件必須柔順可自由彎曲';
            executePhysicalSolve();
        }
    } else if (appState.suggestedTool === 'principles') {
        switchWorkspace('workspace-principles');
        setDomainFilter('all');
    } else {
        switchWorkspace('workspace-technical');
        if (appState.improvingParamId) {
            const selImp = document.getElementById('select-improving');
            if (selImp) {
                selImp.value = appState.improvingParamId;
                syncParamSelect('improving');
            }
        }
    }
}

/* ==========================================================================
   WORKSPACE 2: TECHNICAL CONTRADICTION SOLVER
   ========================================================================== */

function autoDetectParam(type) {
    const inputEl = document.getElementById(`input-${type}-text`);
    const selectEl = document.getElementById(`select-${type}`);
    if (!inputEl || !selectEl || !appState.engine) return;

    const query = inputEl.value.trim();
    if (!query) {
        alert(`請輸入欲查詢 ${type === 'improving' ? '改善' : '惡化'} 的特徵關鍵字。`);
        return;
    }

    log(`智能檢索參數: "${query}"`);
    const result = appState.engine.normalizeInputToParameter(query);
    if (result.logs) {
        result.logs.forEach(l => log(`[參數檢索] ${l}`));
    }

    if (result.match) {
        selectEl.value = result.match.id;
        syncParamSelect(type);
        log(`✓ 自動匹配成功: [${result.match.id}] ${result.match.name}`);
    } else {
        alert('未找到精確匹配參數，請手動由下拉選單挑選最接近的工程參數。');
    }
}

function syncParamSelect(type) {
    const selectEl = document.getElementById(`select-${type}`);
    const inputEl = document.getElementById(`input-${type}-text`);
    if (!selectEl || !appState.engine) return;

    const id = parseInt(selectEl.value, 10);
    if (id && appState.engine.parameters[id]) {
        if (type === 'improving') appState.improvingParamId = id;
        if (type === 'worsening') appState.worseningParamId = id;
        if (inputEl) inputEl.value = appState.engine.parameters[id].name;
    }
}

function executeTechnicalSolve() {
    const selImp = document.getElementById('select-improving');
    const selWor = document.getElementById('select-worsening');
    const impId = selImp ? parseInt(selImp.value, 10) : null;
    const worId = selWor ? parseInt(selWor.value, 10) : null;

    if (!impId || !worId) {
        alert('請先選取「改善參數」與「惡化參數」。');
        return;
    }

    log(`執行矛盾矩陣求解: 改善 [${impId}] vs 惡化 [${worId}]`);
    const solution = appState.engine.solveContradiction(impId, worId);

    if (solution.execution_log) {
        solution.execution_log.forEach(l => log(l));
    }

    const container = document.getElementById('tech-solution-container');
    const strategyTag = document.getElementById('tech-strategy-tag');
    const idealityBox = document.getElementById('ideality-box');

    if (strategyTag) {
        strategyTag.innerText = solution.strategy_note;
        strategyTag.className = solution.is_physical ? 'badge badge-emerald' : 'badge badge-accent';
    }

    if (solution.is_physical) {
        // Physical contradiction automatically detected
        container.innerHTML = `
            <div class="diagnosis-result-box" style="margin-top:0;">
                <h4 style="color:#60A5FA; margin-bottom:8px;">⚡ 偵測到物理矛盾 (A vs A)</h4>
                <p style="font-size:0.9rem; color:#94A3B8; margin-bottom:12px;">
                    改善與惡化指向同一參數 [${solution.improving_parameter.name}]。這屬於更深層的物理矛盾，建議採用四大分離原理求解。
                </p>
                <button class="btn-primary" onclick="switchWorkspace('workspace-physical'); executePhysicalSolve();">
                    前往物理矛盾四大分離工作坊 &rarr;
                </button>
            </div>
        `;
        if (idealityBox) idealityBox.style.display = 'none';
        return;
    }

    // Render principles
    let html = '<div class="principles-result-list">';
    solution.suggested_principles.forEach(p => {
        html += renderPrincipleCardHTML(p);
    });
    html += '</div>';

    container.innerHTML = html;
    if (idealityBox) idealityBox.style.display = 'block';
    calcIdeality();
}

function calcIdeality() {
    const bVal = parseFloat(document.getElementById('range-benefit')?.value || 8);
    const cVal = parseFloat(document.getElementById('range-cost')?.value || 2);

    document.getElementById('val-benefit').innerText = bVal;
    document.getElementById('val-cost').innerText = cVal;

    const score = (bVal / cVal).toFixed(2);
    const scoreEl = document.getElementById('ideality-score-val');
    if (scoreEl) {
        scoreEl.innerText = score;
    }
}

/**
 * Generate Principle Card HTML
 */
function renderPrincipleCardHTML(p, defaultTab = 'engineering') {
    const engList = (p.examples_engineering || []).map(e => `<li>${e}</li>`).join('');
    const softList = (p.examples_software || []).map(e => `<li>${e}</li>`).join('');
    const bizList = (p.examples_business || []).map(e => `<li>${e}</li>`).join('');

    return `
        <div class="principle-card" id="card-p-${p.id}">
            <div class="principle-card-header">
                <div class="principle-name">${p.name}</div>
                <div class="principle-number">#${p.id}</div>
            </div>
            <div class="principle-desc">${p.description}</div>

            <div class="principle-domain-tabs">
                <button class="p-tab-btn active" onclick="switchPrincipleTab(${p.id}, 'eng', this)">⚙️ 經典工程</button>
                <button class="p-tab-btn" onclick="switchPrincipleTab(${p.id}, 'soft', this)">💻 軟體架構</button>
                <button class="p-tab-btn" onclick="switchPrincipleTab(${p.id}, 'biz', this)">📈 商業管理</button>
            </div>

            <div class="p-examples-box" id="p-box-${p.id}-eng">
                <strong>工程實例：</strong>
                <ul>${engList || '<li>通用物理工程實例</li>'}</ul>
            </div>
            <div class="p-examples-box" id="p-box-${p.id}-soft" style="display:none;">
                <strong>軟體與 IT 架構實例：</strong>
                <ul>${softList || '<li>暫無軟體實例</li>'}</ul>
            </div>
            <div class="p-examples-box" id="p-box-${p.id}-biz" style="display:none;">
                <strong>商業模式與管理實例：</strong>
                <ul>${bizList || '<li>暫無商業實例</li>'}</ul>
            </div>
        </div>
    `;
}

function switchPrincipleTab(principleId, domain, btn) {
    const parentCard = document.getElementById(`card-p-${principleId}`);
    if (!parentCard) return;

    parentCard.querySelectorAll('.p-tab-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    parentCard.querySelectorAll('.p-examples-box').forEach(box => box.style.display = 'none');
    const activeBox = document.getElementById(`p-box-${principleId}-${domain}`);
    if (activeBox) activeBox.style.display = 'block';
}

/* ==========================================================================
   WORKSPACE 3: PHYSICAL CONTRADICTION SOLVER
   ========================================================================== */

function executePhysicalSolve() {
    const stateP = document.getElementById('pc-state-p')?.value || '狀態 P';
    const stateNonP = document.getElementById('pc-state-non-p')?.value || '狀態 非 P';

    log(`執行物理矛盾四大分離求解: 要求 [${stateP}] vs [${stateNonP}]`);
    const pc = appState.engine.solvePhysicalContradiction(stateP);

    if (pc.execution_log) {
        pc.execution_log.forEach(l => log(l));
    }

    const container = document.getElementById('separations-container');
    if (!container) return;

    let html = '';
    pc.separations.forEach(sep => {
        const pTags = (sep.recommended_principles_details || []).map(p => 
            `<span class="principle-tag" onclick="jumpToPrinciple(${p.id})">#${p.id} ${p.name_zh || p.name}</span>`
        ).join('');

        const exList = (sep.examples || []).map(e => `<li>${e}</li>`).join('');

        html += `
            <div class="separation-card">
                <div class="sep-title">🔮 ${sep.name_zh}</div>
                <div class="sep-guiding-q">💡 啟發提問：${sep.guiding_question}</div>
                <div class="sep-core-idea"><b>核心思想：</b>${sep.core_idea}</div>
                
                <div class="sep-examples">
                    <h5>經典應用案例：</h5>
                    <ul>${exList}</ul>
                </div>

                <div class="sep-principles">
                    <h5>推薦發明原理 (點擊查看詳情)：</h5>
                    <div class="sep-tags">${pTags}</div>
                </div>
            </div>
        `;
    });

    container.innerHTML = html;
}

function jumpToPrinciple(principleId) {
    switchWorkspace('workspace-principles');
    const searchInput = document.getElementById('principle-search-input');
    if (searchInput) {
        searchInput.value = principleId;
        handlePrincipleSearch();
    }
}

/* ==========================================================================
   WORKSPACE 4: 40 PRINCIPLES EXPLORER
   ========================================================================== */

function renderAllPrinciples() {
    if (!appState.engine) return;
    const container = document.getElementById('principles-all-grid');
    if (!container) return;

    const list = Object.values(appState.engine.principles).sort((a, b) => a.id - b.id);
    let html = '';
    list.forEach(p => {
        html += renderPrincipleCardHTML(p);
    });
    container.innerHTML = html;
}

function handlePrincipleSearch() {
    const input = document.getElementById('principle-search-input');
    const query = input ? input.value.trim() : '';

    const results = appState.engine.searchPrinciples(query, appState.selectedDomain);
    const container = document.getElementById('principles-all-grid');
    if (!container) return;

    if (results.length === 0) {
        container.innerHTML = `<div class="empty-placeholder" style="grid-column: 1/-1;"><p>未找到符合 "${query}" 的發明原理。</p></div>`;
        return;
    }

    let html = '';
    results.forEach(res => {
        html += renderPrincipleCardHTML(res.principle);
    });
    container.innerHTML = html;
}

function setDomainFilter(domain) {
    appState.selectedDomain = domain;
    document.querySelectorAll('.filter-chip').forEach(chip => {
        if (chip.getAttribute('data-domain') === domain) {
            chip.classList.add('active');
        } else {
            chip.classList.remove('active');
        }
    });
    handlePrincipleSearch();
}

/* ==========================================================================
   WORKSPACE 5: ADVANCED TOOLS (NINE WINDOWS & ARIZ)
   ========================================================================== */

function switchSubTab(tabId) {
    document.querySelectorAll('.sub-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.subtab-content').forEach(c => c.classList.remove('active'));

    const activeTab = document.querySelector(`.sub-tab[onclick="switchSubTab('${tabId}')"]`);
    const activeContent = document.getElementById(`subtab-${tabId}`);

    if (activeTab) activeTab.classList.add('active');
    if (activeContent) activeContent.classList.add('active');
}

function renderARIZStages() {
    if (!appState.engine) return;
    const container = document.getElementById('ariz-stages-container');
    if (!container) return;

    const stages = appState.engine.getARIZStages();
    let html = '';
    stages.forEach(st => {
        const stepsHtml = st.steps.map(s => `<li>${s}</li>`).join('');
        html += `
            <div class="ariz-stage-card">
                <div class="ariz-stage-title">${st.title}</div>
                <ul>${stepsHtml}</ul>
            </div>
        `;
    });
    container.innerHTML = html;
}

function renderEvolutionLaws() {
    if (!appState.engine) return;
    const container = document.getElementById('evolution-laws-container');
    if (!container) return;

    const laws = appState.engine.getEvolutionLaws();
    let html = '';
    laws.forEach(l => {
        html += `
            <div class="law-card">
                <div class="law-name">${l.name_zh}</div>
                <div class="law-desc">${l.description}</div>
            </div>
        `;
    });
    container.innerHTML = html;
}

function exportNineWindows() {
    const fields = [
        ['超系統 - 過去', document.getElementById('nw-super-past')?.value],
        ['超系統 - 現在', document.getElementById('nw-super-present')?.value],
        ['超系統 - 未來', document.getElementById('nw-super-future')?.value],
        ['系統 - 過去', document.getElementById('nw-sys-past')?.value],
        ['系統 - 現在', document.getElementById('nw-sys-present')?.value],
        ['系統 - 未來', document.getElementById('nw-sys-future')?.value],
        ['子系統 - 過去', document.getElementById('nw-sub-past')?.value],
        ['子系統 - 現在', document.getElementById('nw-sub-present')?.value],
        ['子系統 - 未來', document.getElementById('nw-sub-future')?.value],
    ];

    let markdown = "# TRIZ 九屏幕法時空資源探勘筆記\n\n";
    fields.forEach(([title, val]) => {
        markdown += `### ${title}\n${val || '(無填寫)'}\n\n`;
    });

    navigator.clipboard.writeText(markdown).then(() => {
        alert('九屏幕筆記已成功複製至剪貼簿 (Markdown 格式)！');
    }).catch(() => {
        alert('複製失敗，請手動複製文字。');
    });
}

/* ==========================================================================
   MODAL & AI SETTINGS CONTROLS
   ========================================================================== */

function openHelpModal() {
    document.getElementById('help-modal')?.classList.add('active');
}

function closeHelpModal() {
    document.getElementById('help-modal')?.classList.remove('active');
}

function switchManualTab(tabId) {
    document.querySelectorAll('.manual-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.manual-content').forEach(c => c.classList.remove('active'));

    const btn = document.querySelector(`.manual-tab[onclick="switchManualTab('${tabId}')"]`);
    const content = document.getElementById(`manual-tab-${tabId}`);

    if (btn) btn.classList.add('active');
    if (content) content.classList.add('active');
}

function openAISettingsModal() {
    const modal = document.getElementById('ai-settings-modal');
    if (!modal) return;

    // Pre-fill existing config
    const config = appState.engine?.aiService?.getConfig() || { apiKey: '', model: 'gemini-2.5-flash', customModel: '', baseUrl: '' };
    const keyInput = document.getElementById('ai-api-key-input');
    const modelSelect = document.getElementById('ai-model-select');
    const customModelInput = document.getElementById('ai-custom-model-input');
    const baseUrlInput = document.getElementById('ai-base-url-input');
    const statusBox = document.getElementById('ai-test-status');

    if (keyInput) keyInput.value = config.apiKey || '';
    if (modelSelect) modelSelect.value = config.model || 'gemini-2.5-flash';
    if (customModelInput) customModelInput.value = config.customModel || '';
    if (baseUrlInput) baseUrlInput.value = config.baseUrl || 'https://generativelanguage.googleapis.com';
    if (statusBox) statusBox.style.display = 'none';

    toggleCustomModelInput();
    modal.classList.add('active');
}

function closeAISettingsModal() {
    document.getElementById('ai-settings-modal')?.classList.remove('active');
}

function toggleCustomModelInput() {
    handleModelSelectChange();
}

function handleModelSelectChange() {
    const modelSelect = document.getElementById('ai-model-select');
    const customGroup = document.getElementById('custom-model-group');
    const baseUrlInput = document.getElementById('ai-base-url-input');
    const keyInput = document.getElementById('ai-api-key-input');
    if (!modelSelect) return;

    const val = modelSelect.value;
    if (customGroup) {
        customGroup.style.display = (val === 'custom') ? 'block' : 'none';
    }

    if (baseUrlInput) {
        if (val.startsWith('agnes-') || val === 'agnes') {
            baseUrlInput.value = 'https://apihub.agnes-ai.com/v1';
            if (keyInput) keyInput.placeholder = '輸入 AGNES_API_KEY (Bearer Token)...';
        } else if (val.startsWith('gemini-')) {
            baseUrlInput.value = 'https://generativelanguage.googleapis.com';
            if (keyInput) keyInput.placeholder = '貼上 Gemini API Key (AIzaSy...)';
        }
    }
}

function toggleApiKeyVisibility() {
    const input = document.getElementById('ai-api-key-input');
    if (input) {
        input.type = input.type === 'password' ? 'text' : 'password';
    }
}

function updateAIStatusUI() {
    const dot = document.getElementById('sidebar-ai-dot');
    const text = document.getElementById('sidebar-ai-status-text');
    const isReady = appState.engine?.isAIReady();
    const effectiveModel = appState.engine?.aiService?.getEffectiveModel() || 'Gemini';

    if (dot && text) {
        if (isReady) {
            dot.className = 'ai-dot active';
            text.innerText = `AI 啟用中 (${effectiveModel})`;
            text.style.color = '#34D399';
        } else {
            dot.className = 'ai-dot';
            text.innerText = 'AI 引擎 (本機模式)';
            text.style.color = '#94A3B8';
        }
    }
}

async function testAIConnection() {
    const keyInput = document.getElementById('ai-api-key-input');
    const modelSelect = document.getElementById('ai-model-select');
    const customModelInput = document.getElementById('ai-custom-model-input');
    const baseUrlInput = document.getElementById('ai-base-url-input');
    const statusBox = document.getElementById('ai-test-status');
    const btnTest = document.getElementById('btn-test-ai');

    const key = keyInput ? keyInput.value.trim() : '';
    const model = modelSelect ? modelSelect.value : 'gemini-2.5-flash';
    const customModel = customModelInput ? customModelInput.value.trim() : '';
    const baseUrl = baseUrlInput ? baseUrlInput.value.trim() : '';

    if (!key) {
        alert('請先輸入 API Key 再進行連線測試。');
        return;
    }

    if (statusBox) {
        statusBox.style.display = 'block';
        statusBox.style.color = '#60A5FA';
        statusBox.innerText = '⏳ 正在測試 AI 模型 API 連線...';
    }
    if (btnTest) btnTest.disabled = true;

    // Temporarily save to test
    appState.engine.aiService.saveConfig(key, model, customModel, baseUrl);

    try {
        await appState.engine.aiService.testConnection();
        const effectiveModel = appState.engine.aiService.getEffectiveModel();
        if (statusBox) {
            statusBox.style.color = '#34D399';
            statusBox.innerText = `✓ 連線測試成功！模型 [${effectiveModel}] 回應正常。`;
        }
        log(`✓ AI 模型 [${effectiveModel}] 連線測試成功。`);
    } catch (e) {
        if (statusBox) {
            statusBox.style.color = '#F87171';
            statusBox.innerText = `✗ 連線失敗: ${e.message}`;
        }
        log(`✗ AI 連線失敗: ${e.message}`);
    } finally {
        if (btnTest) btnTest.disabled = false;
    }
}

function saveAISettings() {
    const keyInput = document.getElementById('ai-api-key-input');
    const modelSelect = document.getElementById('ai-model-select');
    const customModelInput = document.getElementById('ai-custom-model-input');
    const baseUrlInput = document.getElementById('ai-base-url-input');

    const key = keyInput ? keyInput.value.trim() : '';
    const model = modelSelect ? modelSelect.value : 'gemini-2.5-flash';
    const customModel = customModelInput ? customModelInput.value.trim() : '';
    const baseUrl = baseUrlInput ? baseUrlInput.value.trim() : '';

    appState.engine.aiService.saveConfig(key, model, customModel, baseUrl);
    updateAIStatusUI();
    closeAISettingsModal();

    const effectiveModel = appState.engine.aiService.getEffectiveModel();
    if (key) {
        log(`✓ AI 配置已儲存 (模型: ${effectiveModel})`);
        alert(`AI 雲端引擎已成功設定並啟用 (模型: ${effectiveModel})！`);
    } else {
        log('AI API Key 已清空，切換回本機模式。');
    }
}

function clearAIConfig() {
    if (confirm('確定要清除儲存的 AI API Key 嗎？')) {
        appState.engine.aiService.clearConfig();
        const keyInput = document.getElementById('ai-api-key-input');
        if (keyInput) keyInput.value = '';
        updateAIStatusUI();
        log('AI API Key 已清除。');
        alert('API Key 已清除，系統已回到本機啟發式模式。');
    }
}
