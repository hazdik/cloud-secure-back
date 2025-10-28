import axios from 'axios';
import { ConfigurationProvider, LLMConfig } from '../config/ConfigurationProvider';

export interface LLMProvider {
  generate(prompt: string, options?: Record<string, any>): Promise<any>;
}

export class ClaudeProvider implements LLMProvider {
  private config: LLMConfig;

  constructor() {
    this.config = ConfigurationProvider.getInstance().getLLMConfig();
    if (!this.config.claude.apiUrl) {
      this.config.claude.apiUrl = this.config.claude.apiUrl || 'https://api.anthropic.com/v1/complete';
    }
  }

  async generate(prompt: string, options: Record<string, any> = {}): Promise<any> {
    if (!this.config.enabled) {
      throw new Error('LLM is disabled in configuration');
    }

    const body = {
      model: this.config.claude.model,
      input: prompt,
      ...options,
    };

    const headers: Record<string, string> = {
      'x-api-key': this.config.claude.apiKey,
      'Content-Type': 'application/json',
    };

    const resp = await axios.post(this.config.claude.apiUrl, body, {
      headers,
      timeout: 30_000,
    });

    return resp.data;
  }
}

export function createDefaultLLMProvider(): LLMProvider {
  const cfg = ConfigurationProvider.getInstance().getLLMConfig();
  if (cfg.defaultProvider === 'claude') return new ClaudeProvider();
  return new ClaudeProvider();
}
  const cfg = ConfigurationProvider.getInstance().getLLMConfig();
