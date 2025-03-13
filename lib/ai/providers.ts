import {
  customProvider,
  extractReasoningMiddleware,
  wrapLanguageModel,
} from 'ai';
import { openai } from '@ai-sdk/openai';
import { fireworks } from '@ai-sdk/fireworks';
import { isTestEnvironment } from '../constants';
import {
  artifactModel,
  chatModel,
  reasoningModel,
  titleModel,
} from './models.test';
import { deepseek, createDeepSeek } from '@ai-sdk/deepseek';

const ArkR1 = createDeepSeek({
  baseURL: process.env.ARK_BASE_URL,
  apiKey: process.env.ARK_API_KEY,
});

const infinite = createDeepSeek({
  baseURL: process.env.INFINI_BASE_URL,
  apiKey: process.env.INFINI_API_KEY,
});
export const myProvider = isTestEnvironment
  ? customProvider({
      languageModels: {
        'chat-model-small': chatModel,
        'chat-model-large': chatModel,
        'chat-model-reasoning': reasoningModel,
        'title-model': titleModel,
        'artifact-model': artifactModel,
      },
    })
  : customProvider({
      languageModels: {
        'chat-model-small': openai('gpt-4o-mini'),
        'chat-model-large': openai('gpt-4o'),
        'chat-model-reasoning': wrapLanguageModel({
          model: fireworks('accounts/fireworks/models/deepseek-r1'),
          middleware: extractReasoningMiddleware({ tagName: 'think' }),
        }),
        o1: openai('o1'),
        'o1-mini': openai('o1-mini'),
        'o3-mini': openai('o3-mini'),
        'deepseek-r1-distill-qwen-32b': wrapLanguageModel({
          model: ArkR1('deepseek-r1-250120'),
          middleware: extractReasoningMiddleware({ tagName: 'think' }),
        }),
        'deepseek-r1': wrapLanguageModel({
          model: ArkR1('deepseek-r1-distill-qwen-32b-250120'),
          middleware: extractReasoningMiddleware({ tagName: 'think' }),
        }),
        'deepseek-v3': ArkR1('deepseek-v3-241226'),
        // 'deepseek-r1': deepseek('deepseek-reasoner'),

        'title-model': ArkR1('deepseek-v3-241226'),
        'artifact-model': openai('gpt-4o-mini'),
      },
      imageModels: {
        'small-model': openai.image('dall-e-2'),
        'large-model': openai.image('dall-e-3'),
      },
    });
