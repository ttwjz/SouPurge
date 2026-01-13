import { SEARCH_ENGINES } from './config.js';

// 监听插件安装或启动
chrome.runtime.onInstalled.addListener(updateRules);
chrome.runtime.onStartup.addListener(updateRules);

function updateRules() {
    const rules = [];
    let idCounter = 1;

    console.log("正在初始化规则...");

    // 遍历配置生成规则
    for (const [key, config] of Object.entries(SEARCH_ENGINES)) {
        // 简单的参数清洗（去空值、去空格）
        const validParams = config.params.filter(p => p && typeof p === 'string' && p.trim() !== '');

        if (validParams.length === 0) continue;

        rules.push({
            "id": idCounter++,
            "priority": 1,
            "action": {
                "type": "redirect",
                "redirect": {
                    "transform": {
                        "queryTransform": {
                            "removeParams": validParams
                        }
                    }
                }
            },
            "condition": {
                "requestDomains": config.domains,
                // 覆盖所有资源类型
                "resourceTypes": ["main_frame", "xmlhttprequest", "sub_frame", "ping", "other", "script"]
            }
        });
    }

    // 动态更新 API
    chrome.declarativeNetRequest.getDynamicRules(oldRules => {
        const oldRuleIds = oldRules.map(r => r.id);

        chrome.declarativeNetRequest.updateDynamicRules({
            removeRuleIds: oldRuleIds,
            addRules: rules
        }, () => {
            if (chrome.runtime.lastError) {
                console.error("❌ 规则更新失败:", chrome.runtime.lastError);
            } else {
                console.log(`✅ 成功加载 ${rules.length} 组规则（涵盖 ${Object.keys(SEARCH_ENGINES).join(', ')}）`);
            }
        });
    });
}