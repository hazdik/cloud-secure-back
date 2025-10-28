import { createDefaultLLMProvider } from '@cloud-secure/shared/providers/LLMProvider';

export const llmResolvers = {
  Query: {
    llmPrompt: async (_: any, { prompt, maxTokens }: { prompt: string; maxTokens?: number }) => {
      const llm = createDefaultLLMProvider();
      const result = await llm.generate(prompt, { max_tokens: maxTokens ?? 300 });
      // Adapt to return only the completion string if Claude returns a full object
      return typeof result === 'string' ? result : result.completion || result.result || JSON.stringify(result);
    },
  },
};
