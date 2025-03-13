export const DEFAULT_CHAT_MODEL: string = 'chat-model-small';

interface ChatModel {
  id: string;
  name: string;
  description: string;
}

export const reasoningModels = [
  'chat-model-reasoning',
  'deepseek-r1',
  'deepseek-r1-distill-qwen-32b',
  'o3-mini',
  'o1-mini',
  'o1',
];

export const chatModels: Array<ChatModel> = [
  {
    id: 'chat-model-small',
    name: 'gpt-4o-mini',
    description: 'Small model for fast, lightweight tasks',
  },
  {
    id: 'chat-model-large',
    name: 'gpt-4o',
    description: 'Large model for complex, multi-step tasks',
  },
  {
    id: 'o1',
    name: 'o1',
    description: 'OpenAI o1',
  },
  {
    id: 'o1-mini',
    name: 'o1-mini',
    description: 'OpenAI o1-mini',
  },
  {
    id: 'o3-mini',
    name: 'o3-mini',
    description: 'OpenAI o3-mini',
  },

  // {
  //   id: 'chat-model-reasoning',
  //   name: 'Reasoning model',
  //   description: 'Uses advanced reasoning',
  // },
  {
    id: 'deepseek-r1',
    name: 'deepseek-r1',
    description: 'deepseek-r1',
  },
  {
    id: 'deepseek-r1-distill-qwen-32b',
    name: 'deepseek-r1-distill-qwen-32b',
    description: 'deepseek-r1-distill-qwen-32b',
  },
  {
    id: 'deepseek-v3',
    name: 'deepseek-v3',
    description: 'deepseek-v3',
  },
];
