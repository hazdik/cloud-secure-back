"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const LLMProvider_1 = require("../providers/LLMProvider");
(async () => {
    const llm = (0, LLMProvider_1.createDefaultLLMProvider)();
    try {
        const response = await llm.generate('Say hello to the world', { max_tokens: 50 });
        console.log('Claude response:', response);
    }
    catch (err) {
        console.error('Claude LLM test failed:', err);
        process.exit(1);
    }
})();
