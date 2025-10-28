export interface LLMProvider {
    generate(prompt: string, options?: Record<string, any>): Promise<any>;
}
export declare class ClaudeProvider implements LLMProvider {
    private config;
    constructor();
    generate(prompt: string, options?: Record<string, any>): Promise<any>;
}
export declare function createDefaultLLMProvider(): LLMProvider;
