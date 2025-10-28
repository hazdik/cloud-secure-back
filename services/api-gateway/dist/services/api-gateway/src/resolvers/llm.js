"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.llmResolvers = void 0;
const LLMProvider_1 = require("@cloud-secure/shared/providers/LLMProvider");
exports.llmResolvers = {
    Query: {
        llmPrompt: async (_, { prompt, maxTokens }) => {
            const llm = (0, LLMProvider_1.createDefaultLLMProvider)();
            const result = await llm.generate(prompt, { max_tokens: maxTokens !== null && maxTokens !== void 0 ? maxTokens : 300 });
            // Adapt to return only the completion string if Claude returns a full object
            return typeof result === 'string' ? result : result.completion || result.result || JSON.stringify(result);
        },
    },
};
