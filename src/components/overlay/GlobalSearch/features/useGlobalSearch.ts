'use client';

import { useCallback, useMemo } from 'react';
import { useAppStore, type AppTab } from '@/lib/store';
import { TECHNIQUES, DEMO_ITEMS } from '@/lib/constants';
import { HelpCircle, Lightbulb, BookOpen, Zap, Brain } from 'lucide-react';
import type { SearchEntry, SearchGroup } from '../types';
import {
  FAQ_ITEMS,
  COMMUNITY_TIPS,
  GLOSSARY_TERMS,
  LEARNING_MODULES,
  NAV_TABS,
  TECHNIQUE_ICONS,
  DEMO_ICONS,
  MODULE_ICONS,
  CATEGORY_ORDER,
  CATEGORY_LABELS,
  TOOL_ITEMS,
  TOOL_ICONS_MAP,
} from './searchData';

/* ────────────────────────────────────────────
   Build all search entries
   ──────────────────────────────────────────── */
function buildEntries(
  setActiveTab: (tab: AppTab) => void,
  setSelectedTechnique: (id: string) => void,
): SearchEntry[] {
  const entries: SearchEntry[] = [];

  // Techniques
  TECHNIQUES.forEach((t) => {
    entries.push({
      id: `tech-${t.id}`,
      label: t.name,
      description: t.shortName
        ? `${t.shortName} — ${t.description}`
        : t.description,
      category: CATEGORY_LABELS.techniques,
      categoryKey: 'techniques',
      icon: TECHNIQUE_ICONS[t.id] ?? Brain,
      action: () => {
        setActiveTab('learn');
        setSelectedTechnique(t.id);
      },
    });
  });

  // Demo items
  DEMO_ITEMS.forEach((d) => {
    const catLabel =
      d.category === 'playground'
        ? 'Песочница'
        : d.category === 'tools'
          ? 'Инструменты'
          : d.category === 'learning'
            ? 'Обучение'
            : d.category === 'resources'
              ? 'Ресурсы'
              : 'Справка';

    entries.push({
      id: `demo-${d.id}`,
      label: d.name,
      description: d.description,
      category: CATEGORY_LABELS.demo,
      categoryKey: 'demo',
      icon: DEMO_ICONS[d.id] ?? Zap,
      action: () => {
        if (d.category === 'playground' || d.category === 'tools') {
          setActiveTab(d.category as AppTab);
        } else if (d.category === 'learning' || d.category === 'resources') {
          setActiveTab(d.category as AppTab);
        } else {
          setActiveTab('resources');
        }
      },
    });
  });

  // Learning modules
  LEARNING_MODULES.forEach((m, i) => {
    entries.push({
      id: `learn-${m.id}`,
      label: m.title,
      description: m.desc,
      category: CATEGORY_LABELS.learning,
      categoryKey: 'learning',
      icon: MODULE_ICONS[i] ?? BookOpen,
      action: () => setActiveTab('learn'),
    });
  });

  // Tools sub-items
  TOOL_ITEMS.forEach((t, i) => {
    entries.push({
      id: t.id,
      label: t.label,
      description: t.desc,
      category: CATEGORY_LABELS.tools,
      categoryKey: 'tools',
      icon: TOOL_ICONS_MAP[i] ?? Zap,
      action: () => setActiveTab('tools'),
    });
  });

  // Resources: Glossary
  GLOSSARY_TERMS.forEach((g) => {
    entries.push({
      id: `glossary-${g.term}`,
      label: g.term,
      description: g.def,
      category: CATEGORY_LABELS.resources,
      categoryKey: 'resources',
      icon: BookOpen,
      action: () => setActiveTab('resources'),
    });
  });

  // Resources: FAQ
  FAQ_ITEMS.forEach((f, i) => {
    entries.push({
      id: `faq-${i}`,
      label: f.q,
      description: 'Часто задаваемый вопрос',
      category: CATEGORY_LABELS.resources,
      categoryKey: 'resources',
      icon: HelpCircle,
      action: () => setActiveTab('resources'),
    });
  });

  // Resources: Community tips
  COMMUNITY_TIPS.forEach((c, i) => {
    entries.push({
      id: `community-${i}`,
      label: c.title,
      description: c.desc,
      category: CATEGORY_LABELS.resources,
      categoryKey: 'resources',
      icon: Lightbulb,
      action: () => setActiveTab('resources'),
    });
  });

  // Navigation tabs
  NAV_TABS.forEach((nav) => {
    entries.push({
      id: `nav-${nav.id}`,
      label: nav.label,
      description: nav.desc,
      category: CATEGORY_LABELS.navigation,
      categoryKey: 'navigation',
      icon: nav.icon,
      action: () => setActiveTab(nav.id),
    });
  });

  return entries;
}

/* ────────────────────────────────────────────
   Group entries by category
   ──────────────────────────────────────────── */
function groupEntries(entries: SearchEntry[]): SearchGroup[] {
  return CATEGORY_ORDER.map((catKey) => {
    const items = entries.filter((e) => e.categoryKey === catKey);
    return { key: catKey, label: CATEGORY_LABELS[catKey], items };
  }).filter((g) => g.items.length > 0);
}

/* ────────────────────────────────────────────
   Hook: useGlobalSearch
   ──────────────────────────────────────────── */
export function useGlobalSearch() {
  const { searchOpen, setSearchOpen, setActiveTab, setSelectedTechnique } = useAppStore();

  const handleSelect = useCallback(
    (entry: SearchEntry) => {
      entry.action();
      setSearchOpen(false);
    },
    [setSearchOpen],
  );

  const allEntries = useMemo(
    () => buildEntries(setActiveTab, setSelectedTechnique),
    [setActiveTab, setSelectedTechnique],
  );

  const grouped = useMemo(() => groupEntries(allEntries), [allEntries]);

  return {
    searchOpen,
    setSearchOpen,
    handleSelect,
    grouped,
  };
}
