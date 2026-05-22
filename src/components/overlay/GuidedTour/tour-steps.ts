import type { LucideIcon } from 'lucide-react';
import {
  Sparkles,
  GraduationCap,
  Wrench,
  Play,
  Library,
  Rocket,
} from 'lucide-react';
import type { AppTab } from '@/lib/store';

export interface TourStep {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  tab: AppTab;
  accentColor: string;
}

export const TOUR_STEPS: TourStep[] = [
  {
    id: 'welcome',
    title: 'Добро пожаловать в LLM Memory Guide',
    description:
      'Интерактивный справочник по техникам управления памятью для больших языковых моделей. Здесь вы найдёте 6 техник, от простых до продвинутых, с визуализациями, калькуляторами и живыми примерами. Давайте познакомимся!',
    icon: Sparkles,
    tab: 'overview',
    accentColor: 'text-amber-500',
  },
  {
    id: 'techniques',
    title: '6 Техник Управления Памятью',
    description:
      'Sliding Window, Суммаризация, Иерархическая память, RAG, Извлечение фактов и Семантический кэш. Каждая техника имеет свою сложность, экономию токенов и область применения. Изучите их пошагово с интерактивными визуализациями.',
    icon: GraduationCap,
    tab: 'learn',
    accentColor: 'text-cyan-500',
  },
  {
    id: 'tools',
    title: 'Интерактивные Инструменты',
    description:
      'Симулятор затрат — рассчитайте стоимость API для вашего проекта. Битва техник — сравните подходы 1v1. Дерево решений — выберите оптимальную технику по сценарию. Бенчмарки — сравнение по ключевым метрикам.',
    icon: Wrench,
    tab: 'tools',
    accentColor: 'text-emerald-500',
  },
  {
    id: 'playground',
    title: 'Живая Песочница',
    description:
      'Попробуйте каждую технику в действии! Переключайте подходы в реальном чате и наблюдайте, как меняется поведение модели. Пошаговый проводник покажет внутреннюю механику каждого метода.',
    icon: Play,
    tab: 'playground',
    accentColor: 'text-violet-500',
  },
  {
    id: 'resources',
    title: 'Ресурсы и Сообщество',
    description:
      'Глоссарий из 12+ терминов, FAQ с 8 популярными вопросами, дорожная карта развития памяти LLM и советы от сообщества. Всё, что нужно для глубокого погружения.',
    icon: Library,
    tab: 'resources',
    accentColor: 'text-orange-500',
  },
  {
    id: 'complete',
    title: 'Вы готовы!',
    description:
      'Теперь вы знаете всё о навигации и возможностях LLM Memory Guide. Используйте ⌘K для быстрого поиска по всему приложению. Начните с раздела «Обучение» или сразу перейдите к инструментам. Удачи в освоении!',
    icon: Rocket,
    tab: 'overview',
    accentColor: 'text-primary',
  },
];

export const TOTAL_STEPS = TOUR_STEPS.length;
