export declare const llmResolvers: {
    Query: {
        llmPrompt: (_: any, { prompt, maxTokens }: {
            prompt: string;
            maxTokens?: number | undefined;
        }) => Promise<any>;
    };
};
