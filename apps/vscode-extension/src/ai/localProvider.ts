import { OpenAIProvider } from './openaiProvider';

export class LocalProvider extends OpenAIProvider {
  constructor(endpoint: string, model: string) {
    super('', model, 'chat-completions', {
      chatCompletionsUrl: toChatCompletionsUrl(endpoint),
      name: 'Local',
      requiresApiKey: false
    });
  }
}

function toChatCompletionsUrl(endpoint: string): string {
  const normalized = endpoint.trim().replace(/\/+$/, '');
  return normalized.endsWith('/chat/completions')
    ? normalized
    : `${normalized}/chat/completions`;
}
