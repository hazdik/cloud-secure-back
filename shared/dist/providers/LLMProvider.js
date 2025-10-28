"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDefaultLLMProvider = exports.ClaudeProvider = void 0;
const axios_1 = __importDefault(require("axios"));
const ConfigurationProvider_1 = require("../config/ConfigurationProvider");
class ClaudeProvider {
    constructor() {
        this.config = ConfigurationProvider_1.ConfigurationProvider.getInstance().getLLMConfig();
        if (!this.config.claude.apiUrl) {
            this.config.claude.apiUrl = this.config.claude.apiUrl || 'https://api.anthropic.com/v1/complete';
        }
    }
    async generate(prompt, options = {}) {
        if (!this.config.enabled) {
            throw new Error('LLM is disabled in configuration');
        }
        const body = {
            model: this.config.claude.model,
            input: prompt,
            ...options,
        };
        const headers = {
            'x-api-key': this.config.claude.apiKey,
            'Content-Type': 'application/json',
        };
        const resp = await axios_1.default.post(this.config.claude.apiUrl, body, {
            headers,
            timeout: 30000,
        });
        return resp.data;
    }
}
exports.ClaudeProvider = ClaudeProvider;
function createDefaultLLMProvider() {
    const cfg = ConfigurationProvider_1.ConfigurationProvider.getInstance().getLLMConfig();
    if (cfg.defaultProvider === 'claude')
        return new ClaudeProvider();
    return new ClaudeProvider();
}
exports.createDefaultLLMProvider = createDefaultLLMProvider;
const cfg = ConfigurationProvider_1.ConfigurationProvider.getInstance().getLLMConfig();
