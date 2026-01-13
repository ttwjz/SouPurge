// 引入各个黑名单
import { BAIDU_PARAMS } from './rules/baidu.js';
import { BING_PARAMS } from './rules/bing.js';
import { GOOGLE_PARAMS } from './rules/google.js';

// 导出总配置对象
export const SEARCH_ENGINES = {
    baidu: {
        // 你的域名列表
        domains: ["baidu.com"],
        // 对应的黑名单
        params: BAIDU_PARAMS
    },
    bing: {
        domains: ["bing.com"],
        params: BING_PARAMS
    },
    google: {
        domains: ["google.com", "google.com.hk", "google.co.jp"],
        params: GOOGLE_PARAMS
    }
};