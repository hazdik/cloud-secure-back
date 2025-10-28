import { createDefaultLLMProvider } from '../providers/LLMProvider';

(async () => {
  const llm = createDefaultLLMProvider();
  try {
    const response = await llm.generate('Say hello to the world', { max_tokens: 50 });
    console.log('Claude response:', response);
  } catch (err) {
    console.error('Claude LLM test failed:', err);
    process.exit(1);
  }
})();
