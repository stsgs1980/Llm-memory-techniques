import type { ModelEntry } from './types';

export const ALL_MODELS: ModelEntry[] = [
  // OpenAI
  { id: 'gpt-4o', name: 'GPT-4o', provider: 'OpenAI', providerColor: 'text-emerald-500', context: 128000, input: 2.5, output: 10.0, maxOutput: 16384, cutoff: 'Окт 2023', bestFor: ['Мультимодальность', 'Скорость', 'Общий задачи'] },
  { id: 'gpt-4o-mini', name: 'GPT-4o Mini', provider: 'OpenAI', providerColor: 'text-emerald-500', context: 128000, input: 0.15, output: 0.60, maxOutput: 16384, cutoff: 'Окт 2023', bestFor: ['Бюджет', 'Высокая нагрузка', 'Простые задачи'] },
  { id: 'gpt-4-turbo', name: 'GPT-4 Turbo', provider: 'OpenAI', providerColor: 'text-emerald-500', context: 128000, input: 10.0, output: 30.0, maxOutput: 4096, cutoff: 'Апр 2023', bestFor: ['Код', 'Аналитика'] },
  { id: 'o1', name: 'o1', provider: 'OpenAI', providerColor: 'text-emerald-500', context: 200000, input: 15.0, output: 60.0, maxOutput: 100000, cutoff: 'Окт 2023', bestFor: ['Сложные рассуждения', 'Математика', 'Наука'] },
  { id: 'o1-mini', name: 'o1-mini', provider: 'OpenAI', providerColor: 'text-emerald-500', context: 128000, input: 3.0, output: 12.0, maxOutput: 65536, cutoff: 'Окт 2023', bestFor: ['Рассуждения', 'Экономия'] },
  { id: 'o3-mini', name: 'o3-mini', provider: 'OpenAI', providerColor: 'text-emerald-500', context: 200000, input: 1.10, output: 4.40, maxOutput: 100000, cutoff: 'Янв 2025', bestFor: ['Рассуждения', 'Код', 'Бюджет'] },

  // Anthropic
  { id: 'claude-3.5-sonnet', name: 'Claude 3.5 Sonnet', provider: 'Anthropic', providerColor: 'text-orange-500', context: 200000, input: 3.0, output: 15.0, maxOutput: 8192, cutoff: 'Апр 2024', bestFor: ['Код', 'Письменность', 'Аналитика'] },
  { id: 'claude-3-haiku', name: 'Claude 3 Haiku', provider: 'Anthropic', providerColor: 'text-orange-500', context: 200000, input: 0.80, output: 4.0, maxOutput: 4096, cutoff: 'Авг 2023', bestFor: ['Скорость', 'Бюджет', 'Модерация'] },
  { id: 'claude-3-opus', name: 'Claude 3 Opus', provider: 'Anthropic', providerColor: 'text-orange-500', context: 200000, input: 15.0, output: 75.0, maxOutput: 4096, cutoff: 'Авг 2023', bestFor: ['Нюансы', 'Сложный анализ', 'Creative'] },

  // Google
  { id: 'gemini-1.5-pro', name: 'Gemini 1.5 Pro', provider: 'Google', providerColor: 'text-blue-500', context: 2000000, input: 1.25, output: 5.0, maxOutput: 8192, cutoff: 'Янв 2024', bestFor: ['Огромный контекст', 'Видео', 'Документы'] },
  { id: 'gemini-1.5-flash', name: 'Gemini 1.5 Flash', provider: 'Google', providerColor: 'text-blue-500', context: 1000000, input: 0.075, output: 0.30, maxOutput: 8192, cutoff: 'Янв 2024', bestFor: ['Скорость', 'Бюджет', 'Мультимодальность'] },
  { id: 'gemini-2.0-flash', name: 'Gemini 2.0 Flash', provider: 'Google', providerColor: 'text-blue-500', context: 1000000, input: 0.10, output: 0.40, maxOutput: 8192, cutoff: 'Янв 2025', bestFor: ['Агенты', 'Код', 'Скорость'] },

  // Meta
  { id: 'llama-3.1-405b', name: 'Llama 3.1 405B', provider: 'Meta', providerColor: 'text-violet-500', context: 128000, input: 0.0, output: 0.0, maxOutput: 16384, cutoff: 'Дек 2023', bestFor: ['Open Source', 'Self-hosted', 'Custom fine-tuning'] },
  { id: 'llama-3.1-70b', name: 'Llama 3.1 70B', provider: 'Meta', providerColor: 'text-violet-500', context: 128000, input: 0.0, output: 0.0, maxOutput: 8192, cutoff: 'Дек 2023', bestFor: ['Open Source', 'Edge deploy', 'Бюджет'] },

  // Mistral
  { id: 'mistral-large', name: 'Mistral Large', provider: 'Mistral', providerColor: 'text-red-500', context: 128000, input: 2.0, output: 6.0, maxOutput: 4096, cutoff: 'Янв 2025', bestFor: ['Мультиязычность', 'EU data', 'Код'] },
  { id: 'mistral-medium', name: 'Mistral Medium', provider: 'Mistral', providerColor: 'text-red-500', context: 32000, input: 0.70, output: 2.10, maxOutput: 4096, cutoff: 'Янв 2025', bestFor: ['Бюджет', 'Баланс', 'Чат'] },
];

export const PROVIDERS = [...new Set(ALL_MODELS.map((m) => m.provider))];

export const PROVIDER_COLORS: Record<string, string> = {
  OpenAI: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
  Anthropic: 'bg-orange-500/10 text-orange-500 border-orange-500/20',
  Google: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
  Meta: 'bg-violet-500/10 text-violet-500 border-violet-500/20',
  Mistral: 'bg-red-500/10 text-red-500 border-red-500/20',
};
