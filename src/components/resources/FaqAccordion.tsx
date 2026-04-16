'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { HelpCircle } from 'lucide-react';

const FAQ_DATA = [
  {
    question: 'Что такое управление памятью LLM?',
    answer: 'Управление памятью LLM — это набор техник для эффективного использования контекстного окна модели. Поскольку контекстное окно ограничено (128K-2M токенов), память нужна для: (1) экономии токенов и стоимости API, (2) сохранения важного контекста из прошлых сообщений, (3) обеспечения согласованного поведения на протяжении долгих диалогов. Без управления памятью LLM «забывает» старые сообщения, когда они выходят за пределы контекстного окна.',
  },
  {
    question: 'Что такое контекстное окно?',
    answer: 'Контекстное окно — это максимальный объём текста (в токенах), который LLM может обработать за один запрос. Оно включает в себя: системный промпт, историю сообщений, и ответ модели. Примеры: GPT-4o — 128K токенов, Claude 3.5 — 200K токенов, Gemini 1.5 Pro — 2M токенов. Один токен ≈ 4 символа на английском и ≈ 2-3 символа на русском. Среднее сообщение содержит 20-100 токенов.',
  },
  {
    question: 'Сколько стоит память API?',
    answer: 'Стоимость зависит от провайдера и модели:\n\n• GPT-4o: $2.50 / 1M входных токенов, $10.00 / 1M выходных\n• Claude 3.5 Sonnet: $3.00 / 1M входных, $15.00 / 1M выходных\n• GPT-4o Mini: $0.15 / 1M входных, $0.60 / 1M выходных\n• Gemini 1.5 Flash: $0.075 / 1M входных, $0.30 / 1M выходных\n\nПример: диалог из 50 сообщений (~5000 токенов) = ~$0.013 (GPT-4o). С техникой суммаризации это можно снизить до ~$0.003.',
  },
  {
    question: 'Какая техника экономит больше всего?',
    answer: 'Рейтинг по экономии токенов:\n\n1. 🏆 Семантический кэш: 90-99% (при повторяющихся запросах)\n2. 🥈 Извлечение фактов: 90-99% (только ключевые данные)\n3. 🥉 RAG: 80-95% (только релевантные чанки)\n4. Суммаризация: 70-90% (сжатие в резюме)\n5. Иерархическая память: 60-80% (два уровня)\n6. Sliding Window: 40-60% (простое обрезание)\n\nНо экономия — не единственный критерий. RAG обеспечивает точность, извлечение фактов — персонализацию, а кэш работает только для повторяющихся запросов.',
  },
  {
    question: 'Можно ли комбинировать техники?',
    answer: 'Да! Комбинации часто дают лучший результат. Примеры:\n\n• RAG + Суммаризация: Поиск по архиву + сжатие недавних сообщений\n• Извлечение фактов + RAG: Профиль пользователя + векторный поиск по истории\n• Sliding Window + Кэш: Быстрый доступ к недавним + кэширование повторов\n• Иерархия + Факты: Два уровня памяти + структурированный профиль\n\nГлавное правило: начните с одной техники, измерьте результат, затем добавляйте другие по необходимости.',
  },
  {
    question: 'Как реализовать суммаризацию?',
    answer: 'Пример реализации на Python:\n\n```python\nclass ConversationMemory:\n    def __init__(self, threshold=3000):\n        self.messages = []\n        self.summary = ""\n        self.threshold = threshold\n\n    def add_message(self, role, content):\n        self.messages.append({"role": role, "content": content})\n\n    def get_context(self):\n        tokens = estimate_tokens(self.summary + str(self.messages))\n        if tokens > self.threshold:\n            # LLM generates summary\n            self.summary = llm.summarize(self.messages)\n            self.messages = self.messages[-5:]\n        return self.summary + "\\n" + str(self.messages)\n```\n\nПорог определяется размером контекстного окна модели.',
  },
  {
    question: 'Какие библиотеки использовать?',
    answer: 'Популярные библиотеки для управления памятью LLM:\n\n• LangChain Memory: Полный набор абстракций (ConversationBufferMemory, ConversationSummaryMemory, VectorStoreRetrieverMemory)\n• Mem0: Специализированная система памяти для AI-агентов с автосохранением\n• Letta (ex-MemGPT): Оперативная система для LLM с виртуальным контекстным управлением\n• Zep: Сервер памяти с хранением, суммаризацией и поиском\n• Chroma / Qdrant: Векторные БД для RAG и семантического кэша\n\nДля начала рекомендую LangChain (больше всего примеров) или Mem0 (проще интеграция).',
  },
  {
    question: 'Как мониторить расход токенов?',
    answer: 'Стратегии мониторинга:\n\n1. **Логирование middleware**: Перехватывайте каждый запрос и логируйте количество токенов\n2. **Prometheus + Grafana**: Экспортируйте метрики токенов и стройте дашборды\n3. **Cost tracking API**: Используйте OpenAI / Anthropic API для получения usage данных\n4. **Бюджетные лимиты**: Установите максимальный расход на пользователя/сессию\n\nПример middleware:\n```python\nasync def token_middleware(request, call_next):\n    response = await call_next(request)\n    tokens_used = response.headers.get("x-tokens-used")\n    prometheus_counter.inc(int(tokens_used))\n    if budget_exceeded(user):\n        raise BudgetExceeded()\n    return response\n```\n\nКлючевые метрики: total_tokens, cost_per_request, tokens_per_user, cache_hit_rate.',
  },
];

export default function FaqAccordion() {
  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center gap-2">
        <HelpCircle className="h-4 w-4 text-primary" />
        <span className="font-mono text-sm text-primary tracking-wider">FAQ</span>
        <span className="text-xs text-muted-foreground font-mono">
          {FAQ_DATA.length} вопросов
        </span>
      </div>

      {/* Accordion */}
      <Accordion type="single" collapsible className="space-y-2">
        {FAQ_DATA.map((item, index) => (
          <AccordionItem
            key={index}
            value={`faq-${index}`}
            className="industrial-card border-0 px-0 data-[state=open]:border-primary/30"
          >
            <AccordionTrigger className="px-4 py-3 hover:no-underline hover:bg-muted/30 rounded-md transition-colors [&[data-state=open]>svg]:text-primary">
              <div className="flex items-start gap-3 text-left">
                <span className="font-mono text-xs text-primary/60 flex-shrink-0 mt-0.5">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="font-mono text-sm font-medium">{item.question}</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-4 pt-0">
              <div className="ml-8 mr-1 animate-industrial-slide-up">
                <div className="text-sm text-muted-foreground leading-relaxed whitespace-pre-wrap">
                  {item.answer}
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
