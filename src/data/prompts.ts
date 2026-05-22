import type { LucideIcon } from 'lucide-react';
import { Brain, Layers, Database, FileJson, Scissors, Zap } from 'lucide-react';

export interface PromptTemplate {
  id: string;
  techniqueId: string;
  techniqueName: string;
  techniqueIcon: LucideIcon;
  title: string;
  description: string;
  prompt: string;
  variables: string[];
}

export const PROMPT_TEMPLATES: PromptTemplate[] = [
  // ── Суммаризация (3 prompts) ──
  {
    id: 'sum-1',
    techniqueId: 'summarization',
    techniqueName: 'Суммаризация',
    techniqueIcon: Brain,
    title: 'Системный промпт суммаризации',
    description:
      'Основной промпт для сжатия длинной истории диалога в краткое резюме. Используйте при каждом достижении порога токенов.',
    prompt: `Ты — система управления памятью. Твоя задача: сжать историю диалога пользователя в краткое резюме.

Правила:
1. Сохрани все ключевые факты, предпочтения и решения
2. Удали повторения и несущественные детали
3. Запиши резюме от третьего лица
4. Используй маркированный список для фактов
5. Уложись в {max_tokens} токенов

История диалога:
{conversation_history}

Формат вывода:
## Ключевые факты
- ...
## Текущий контекст
...
## Открытые вопросы
- ...`,
    variables: ['max_tokens', 'conversation_history'],
  },
  {
    id: 'sum-2',
    techniqueId: 'summarization',
    techniqueName: 'Суммаризация',
    techniqueIcon: Brain,
    title: 'Инкрементальное обновление саммари',
    description:
      'Промпт для обновления существующего саммари новыми сообщениями. Экономит токены по сравнению с пересуммаризацией всей истории.',
    prompt: `У тебя есть текущее резюме диалога и новые сообщения. Обнови резюме, включив новую информацию.

Текущее резюме:
{existing_summary}

Новые сообщения:
{new_messages}

Правила обновления:
1. Добавь новые факты и предпочтения
2. Удали устаревшую или противоречивую информацию
3. Обнови «текущий контекст»
4. Сохрани структуру: ## Ключевые факты / ## Текущий контекст / ## Открытые вопросы
5. Максимальная длина: {max_tokens} токенов`,
    variables: ['existing_summary', 'new_messages', 'max_tokens'],
  },
  {
    id: 'sum-3',
    techniqueId: 'summarization',
    techniqueName: 'Суммаризация',
    techniqueIcon: Brain,
    title: 'Экстракция ключевых решений',
    description:
      'Промпт для извлечения только принятых решений и действий из диалога. Полезен для чатов с поддержкой или проектных обсуждений.',
    prompt: `Извлеки из истории диалога все принятые решения, договорённости и запланированные действия.

История:
{conversation_history}

Формат вывода (JSON):
{
  "decisions": ["решение 1", "решение 2"],
  "actions": [{"task": "...", "owner": "...", "deadline": "..."}],
  "preferences": ["предпочтение 1"],
  "constraints": ["ограничение 1"]
}

Правила:
- Не выдумывай — только из диалога
- Если что-то не указано, ставь null
- {language} язык ответа`,
    variables: ['conversation_history', 'language'],
  },

  // ── Иерархическая память (3 prompts) ──
  {
    id: 'hier-1',
    techniqueId: 'hierarchical',
    techniqueName: 'Иерархическая память',
    techniqueIcon: Layers,
    title: 'Классификация краткосрочная/долгосрочная',
    description:
      'Промпт для определения, какие фрагменты информации нужно сохранить в долгосрочной памяти, а какие достаточно хранить в краткосрочной.',
    prompt: `Классифицируй каждое утверждение из текущего сообщения пользователя.

Сообщение:
{user_message}

Категории:
- SHORT_TERM: временное, актуально только для текущей сессии (настроение, текущая задача)
- LONG_TERM: устойчивое, полезно в будущем (имя, предпочтения, факты)
- DISCARD: шум, повтор, неинформативно

Формат вывода (JSON массив):
[
  {
    "text": "фрагмент текста",
    "category": "SHORT_TERM | LONG_TERM | DISCARD",
    "confidence": 0.0-1.0,
    "reason": "причина классификации"
  }
]

Правила:
- Индивидуальные предпочтения → LONG_TERM
- Места, даты, контакты → LONG_TERM
- Временные состояния → SHORT_TERM
- Приветствия, согласия → DISCARD`,
    variables: ['user_message'],
  },
  {
    id: 'hier-2',
    techniqueId: 'hierarchical',
    techniqueName: 'Иерархическая память',
    techniqueIcon: Layers,
    title: 'Слияние долгосрочных записей',
    description:
      'Промпт для объединения новой информации с существующим профилем долгосрочной памяти без дублирования и конфликтов.',
    prompt: `Слей новую информацию с существующим профилем долгосрочной памяти пользователя.

Текущий профиль:
{long_term_memory}

Новые данные:
{new_facts}

Правила слияния:
1. Если факт уже есть — обнови, если есть различия
2. Новые уникальные факты — добавь
3. Удали противоречия (новое имеет приоритет)
4. Сохраняй хронологический порядок
5. Максимальный размер: {max_entries} записей

Формат вывода (JSON):
{
  "merged_memory": [...],
  "added": [...],
  "updated": [...],
  "removed": [...]
}`,
    variables: ['long_term_memory', 'new_facts', 'max_entries'],
  },
  {
    id: 'hier-3',
    techniqueId: 'hierarchical',
    techniqueName: 'Иерархическая память',
    techniqueIcon: Layers,
    title: 'Построение контекста для LLM',
    description:
      'Промпт для сборки итогового промпта из краткосрочной и долгосрочной памяти перед отправкой в LLM.',
    prompt: `Построй оптимальный контекст для ответа пользователю на основе двух уровней памяти.

Краткосрочная память (последние {k} сообщений):
{short_term}

Долгосрочная память (профиль):
{long_term}

Текущий запрос пользователя:
{current_query}

Задача:
1. Выбери из долгосрочной памяти только релевантные к запросу факты (макс. {max_facts} штук)
2. Определи, конфликтует ли долгосрочная память с краткосрочной
3. Сформируй контекст в формате:

[КОНТЕКСТ]
## Релевантные факты о пользователе:
- ...
## Текущая беседа:
...
## Примечания:
...
[/КОНТЕКСТ]

Если конфликт — укажи его в Примечаниях.`,
    variables: ['k', 'short_term', 'long_term', 'current_query', 'max_facts'],
  },

  // ── RAG (3 prompts) ──
  {
    id: 'rag-1',
    techniqueId: 'rag',
    techniqueName: 'RAG (векторный поиск)',
    techniqueIcon: Database,
    title: 'Реформулировка запроса',
    description:
      'Промпт для преобразования разговорного запроса в поисковый формат, оптимизированный для векторного поиска.',
    prompt: `Преобразуй разговорный запрос пользователя в поисковый запрос для векторной БД.

Оригинальный запрос:
{user_query}

Контекст беседы:
{conversation_context}

Задача: создай 3 варианта поискового запроса, которые максимизируют релевантный поиск.

Формат вывода (JSON):
{
  "queries": [
    {
      "text": "поисковый запрос",
      "focus": "на что именно фокус",
      "scope": "узкий | средний | широкий"
    }
  ],
  "keywords": ["ключевое слово 1", "..."],
  "timeframe": null | "указанный период",
  "entity_types": ["person", "technology", "concept"]
}`,
    variables: ['user_query', 'conversation_context'],
  },
  {
    id: 'rag-2',
    techniqueId: 'rag',
    techniqueName: 'RAG (векторный поиск)',
    techniqueIcon: Database,
    title: 'Инъекция контекста в промпт',
    description:
      'Шаблон для встраивания найденных фрагментов в итоговый промпт к LLM. Управляет балансом между найденным контекстом и текущим запросом.',
    prompt: `Ты — {assistant_name}. Ответь на вопрос пользователя, используя предоставленный контекст.

Найденный контекст (источник: {source}, релевантность: {relevance_score}):
{rag_context}

Правила использования контекста:
1. Опирайся только на предоставленный контекст
2. Если контекста недостаточно — явно укажи это
3. Упомяни источник, если пользователь спрашивает
4. Если в контексте противоречия — укажи оба варианта

Вопрос пользователя:
{user_question}

Формат ответа:
{response_format}`,
    variables: [
      'assistant_name',
      'source',
      'relevance_score',
      'rag_context',
      'user_question',
      'response_format',
    ],
  },
  {
    id: 'rag-3',
    techniqueId: 'rag',
    techniqueName: 'RAG (векторный поиск)',
    techniqueIcon: Database,
    title: 'Чанкинг с метаданными',
    description:
      'Промпт для интеллектуального разбиения текста на чанки с автоматическим извлечением метаданных для векторной БД.',
    prompt: `Разбей текст на чанки оптимального размера для векторного поиска.

Текст:
{text}

Параметры чанкинга:
- Максимальный размер чанка: {chunk_size} токенов
- Перекрытие: {overlap} токенов
- Стратегия: семантическая (разрыв по смыслу, а не по длине)

Формат вывода (JSON массив):
[
  {
    "id": "chunk_001",
    "text": "текст чанка",
    "metadata": {
      "topic": "основная тема",
      "entities": ["сущность1"],
      "time_ref": "временная отсылка или null",
      "importance": "high | medium | low"
    },
    "token_count": 123
  }
]

Правила:
- Не разрывай предложения на границе чанка
- Каждый чанк должен быть самодостаточным
- Добавляй перекрытие для сохранения контекста`,
    variables: ['text', 'chunk_size', 'overlap'],
  },

  // ── Извлечение фактов (3 prompts) ──
  {
    id: 'fact-1',
    techniqueId: 'fact-extraction',
    techniqueName: 'Извлечение фактов',
    techniqueIcon: FileJson,
    title: 'JSON-экстракция профиля пользователя',
    description:
      'Основной промпт для извлечения структурированных данных из сообщений пользователя в JSON-формат для долгосрочного хранения.',
    prompt: `Извлеки все факты о пользователе из сообщения и верни в формате JSON.

Сообщение пользователя:
{user_message}

История диалога (последние сообщения):
{recent_history}

Текущий профиль:
{current_profile}

Формат вывода (JSON):
{
  "personal": {
    "name": null | "имя",
    "age": null | число,
    "location": null | "место",
    "occupation": null | "профессия"
  },
  "preferences": {
    "topics": ["тема1"],
    "style": "формальный | неформальный",
    "detail_level": "кратко | средне | подробно"
  },
  "facts": [
    {
      "category": "работа | учеба | хобби | семья | здоровье | другое",
      "statement": "утверждение",
      "confidence": 0.0-1.0,
      "source_message_index": число
    }
  ],
  "updated_fields": ["personal.name", "preferences.topics"]
}

Правила:
- Не выдумывай — только из текста
- null если данных нет
- confidence < 0.7 — пометь как «возможно»`,
    variables: ['user_message', 'recent_history', 'current_profile'],
  },
  {
    id: 'fact-2',
    techniqueId: 'fact-extraction',
    techniqueName: 'Извлечение фактов',
    techniqueIcon: FileJson,
    title: 'Обновление и слияние профилей',
    description:
      'Промпт для интеллектуального объединения извлечённых фактов с существующим профилем, обнаружения конфликтов и обновления данных.',
    prompt: `Обнови существующий профиль пользователя новыми извлечёнными фактами.

Текущий профиль:
{existing_profile}

Новые факты для слияния:
{extracted_facts}

Правила:
1. Новые факты → добавь в соответствующие категории
2. Конфликтующие данные → новый факт имеет приоритет, старый перенеси в «superseded»
3. Подтверждение существующих данных → увеличь confidence на 0.1 (макс. 1.0)
4. Не упоминай факты с confidence < 0.5 в ответах пользователю

Формат вывода (JSON):
{
  "profile": { ... обновлённый профиль ... },
  "changes": [
    {
      "action": "added | updated | superseded | confirmed",
      "field": "путь к полю",
      "old_value": null | "старое",
      "new_value": "новое"
    }
  ],
  "conflicts": [
    {
      "field": "поле",
      "existing": "существующее значение",
      "new": "новое значение",
      "resolution": "new_wins | ask_user | keep_both"
    }
  ]
}`,
    variables: ['existing_profile', 'extracted_facts'],
  },
  {
    id: 'fact-3',
    techniqueId: 'fact-extraction',
    techniqueName: 'Извлечение фактов',
    techniqueIcon: FileJson,
    title: 'Синтез контекста из профиля',
    description:
      'Промпт для преобразования структурированного JSON-профиля в естественный текстовый контекст для вставки в промпт LLM.',
    prompt: `На основе JSON-профиля пользователя создай естественный контекст для промпта ассистента.

Профиль пользователя:
{user_profile}

Текущий запрос:
{current_query}

Задача:
1. Выбери из профиля только факты, релевантные текущему запросу
2. Сформулируй их как краткие контекстные заметки
3. Не раскрывай внутреннюю структуру профиля

Формат вывода:
[ПАМЯТЬ О ПОЛЬЗОВАТЕЛЕ]
• Имя: {name}
• Интересы: {interests}
• Ранее обсуждали: {topics}
• Важное: {relevant_facts}
[/ПАМЯТЬ]

Правила:
- Макс. 5 фактов
- Без технических терминов (confidence, category и т.д.)
- На {language} языке`,
    variables: ['user_profile', 'current_query', 'language'],
  },

  // ── Sliding Window (3 prompts) ──
  {
    id: 'win-1',
    techniqueId: 'sliding-window',
    techniqueName: 'Sliding Window',
    techniqueIcon: Scissors,
    title: 'Конфигурация окна контекста',
    description:
      'Промпт-шаблон для настройки параметров скользящего окна. Определяет размер окна и стратегию обработки старых сообщений.',
    prompt: `Настрой параметры скользящего окна для диалога.

Параметры системы:
- Модель: {model_name}
- Макс. контекст модели: {model_context} токенов
- Системный промпт: {system_prompt_tokens} токенов
- Резерв для ответа: {response_reserve} токенов

Факторы:
- Средняя длина сообщения пользователя: {avg_user_msg} токенов
- Средняя длина ответа: {avg_assistant_msg} токенов
- Допустимая задержка ответа: {latency_budget}мс

Вычисли:
1. Доступное пространство для истории: model_context - system_prompt - response_reserve
2. Оптимальный размер окна N (пар user/assistant): ...
3. Рекомендуемая стратегия при overflow: truncate | summarize_oldest | priority_based

Формат вывода (JSON):
{
  "available_tokens": число,
  "window_size": N,
  "strategy": "...",
  "estimated_latency_ms": число,
  "notes": "комментарии"
}`,
    variables: [
      'model_name',
      'model_context',
      'system_prompt_tokens',
      'response_reserve',
      'avg_user_msg',
      'avg_assistant_msg',
      'latency_budget',
    ],
  },
  {
    id: 'win-2',
    techniqueId: 'sliding-window',
    techniqueName: 'Sliding Window',
    techniqueIcon: Scissors,
    title: 'Обнаружение важных сообщений',
    description:
      'Промпт для выявления сообщений, которые не должны быть удалены при сдвиге окна (ключевые решения, контакты, предпочтения).',
    prompt: `Определи, какие сообщения из истории являются критически важными и должны быть сохранены при сдвиге окна.

История (от старых к новым):
{message_history}

Критерии «важности»:
- Содержит контактные данные (email, телефон)
- Содержит принятые решения или договорённости
- Содержит персональные предпочтения
- Содержит пароли или ключи (never delete!)
- Содержит ссылки на документы или ресурсы

Формат вывода (JSON массив):
[
  {
    "index": число,
    "importance": "critical | high | medium | low",
    "reason": "причина",
    "preserve": true | false
  }
]

Правила:
- critical → никогда не удалять, перенести в «pinned»
- high → попытаться сохранить, если есть место
- low → безопасно удалять`,
    variables: ['message_history'],
  },
  {
    id: 'win-3',
    techniqueId: 'sliding-window',
    techniqueName: 'Sliding Window',
    techniqueIcon: Scissors,
    title: 'Приоритетное сжатие при overflow',
    description:
      'Промпт для интеллектуального сжатия истории когда окно переполнено. Удаляет наименее важные сообщения с сохранением структуры.',
    prompt: `Окно контекста переполнено. Сократи историю, сохранив максимум важной информации.

Текущая история ({total_tokens} токенов, лимит: {token_limit}):
{conversation_history}

Сжатые важные сообщения (если есть):
{pinned_messages}

Задача: сократить до {target_tokens} токенов.

Стратегия:
1. Удали приветствия, подтверждения, однозначные вопросы
2. Сжатием оставь: факты, решения, предпочтения, контекст
3. Pinned сообщения всегда включай
4. Если одного удаления недостаточно — суммаризируй старую часть

Формат вывода:
{
  "messages": [... сжатая история ...],
  "removed_count": число,
  "compressed_count": число,
  "final_tokens": число
}`,
    variables: ['total_tokens', 'token_limit', 'conversation_history', 'pinned_messages', 'target_tokens'],
  },

  // ── Семантический кэш (3 prompts) ──
  {
    id: 'cache-1',
    techniqueId: 'semantic-cache',
    techniqueName: 'Семантический кэш',
    techniqueIcon: Zap,
    title: 'Проверка семантического сходства',
    description:
      'Промпт для оценки, является ли новый запрос семантически эквивалентным ранее кэшированному запросу.',
    prompt: `Определи, является ли новый запрос семантически эквивалентным кэшированному запросу.

Кэшированный запрос:
{cached_query}

Кэшированный ответ:
{cached_response}

Новый запрос:
{new_query}

Оцени сходство по шкале от 0 до 1:
- 1.0 = запросы идентичны по смыслу
- 0.7-0.9 = высокая схожесть, ответ применим
- 0.4-0.6 = частичная схожесть, ответ может быть полезен с адаптацией
- 0.0-0.3 = разные запросы

Формат вывода (JSON):
{
  "similarity": 0.0-1.0,
  "same_intent": true | false,
  "response_applicable": true | false | "with_modification",
  "differences": ["разница1", "разница2"],
  "recommendation": "use_cached | regenerate | adapt_cached"
}

Порог использования кэша: {threshold}`,
    variables: ['cached_query', 'cached_response', 'new_query', 'threshold'],
  },
  {
    id: 'cache-2',
    techniqueId: 'semantic-cache',
    techniqueName: 'Семантический кэш',
    techniqueIcon: Zap,
    title: 'Генерация кэш-ключа',
    description:
      'Промпт для создания нормализованного кэш-ключа из произвольного запроса. Одинаковый смысл → одинаковый ключ.',
    prompt: `Нормализуй запрос пользователя для использования как ключа семантического кэша.

Оригинальный запрос:
{user_query}

Цель: создать каноническую форму, сохраняющую смысл, но независимую от формулировки.

Формат вывода (JSON):
{
  "canonical_query": "нормализованный запрос",
  "intent": "основное намерение (глагол + объект)",
  "entities": ["сущность1", "сущность2"],
  "parameters": {
    "topic": "тема или null",
    "action": "действие или null",
    "target": "объект или null"
  },
  "cache_key": "хэш-строка для поиска: intent+entities+parameters",
  "ttl_seconds": рекомендуемое_время_жизни_кэша
}

Примеры нормализации:
- «Как настроить VPN?» → intent=configure, target=VPN
- «Расскажи про VPN» → intent=explain, target=VPN (разный intent!)
- «А как насчёт VPN?» → intent=explain, target=VPN (тот же intent!)`,
    variables: ['user_query'],
  },
  {
    id: 'cache-3',
    techniqueId: 'semantic-cache',
    techniqueName: 'Семантический кэш',
    techniqueIcon: Zap,
    title: 'Адаптация кэшированного ответа',
    description:
      'Промпт для модификации кэшированного ответа под новый, похожий, но не идентичный запрос.',
    prompt: `Адаптируй кэшированный ответ под новый запрос пользователя.

Кэшированный ответ:
{cached_response}

Оригинальный запрос (для которого был ответ):
{original_query}

Новый запрос:
{new_query}

Различия: {differences}

Задача: модифицируй кэшированный ответ так, чтобы он точно отвечал на новый запрос.

Правила:
1. Сохрани фактическую точность из кэшированного ответа
2. Уточни или расширь детали, если новый запрос требует
3. Убери нерелевантную информацию
4. Добавь пометку: «На основе предыдущего ответа»

Формат: {response_format}`,
    variables: ['cached_response', 'original_query', 'new_query', 'differences', 'response_format'],
  },
];
