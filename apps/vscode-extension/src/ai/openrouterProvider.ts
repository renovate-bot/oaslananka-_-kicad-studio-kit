import { OpenAIProvider } from './openaiProvider';

const OPENROUTER_CHAT_COMPLETIONS_URL =
  'https://openrouter.ai/api/v1/chat/completions';

export class OpenRouterProvider extends OpenAIProvider {
  constructor(apiKey: string, model: string) {
    super(apiKey, model, 'chat-completions', {
      chatCompletionsUrl: OPENROUTER_CHAT_COMPLETIONS_URL,
      name: 'OpenRouter'
    });
  }
}
