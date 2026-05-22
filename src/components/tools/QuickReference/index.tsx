'use client';

import { useReferenceFilter } from './features/useReferenceFilter';
import { CODE_SNIPPETS } from './features/codeSnippets';
import { ReferenceHeader } from './sections/ReferenceHeader';
import { ReferenceCard } from './sections/ReferenceCard';
import { ReferenceGrid, EmptyState } from './sections/ReferenceGrid';

export default function QuickReference() {
  const {
    complexityFilter,
    setComplexityFilter,
    infraFilter,
    setInfraFilter,
    filtered,
    toggleCard,
    isCardExpanded,
  } = useReferenceFilter();

  return (
    <section className="space-y-6">
      <ReferenceHeader
        complexityFilter={complexityFilter}
        onComplexityChange={setComplexityFilter}
        infraFilter={infraFilter}
        onInfraChange={setInfraFilter}
      />

      <ReferenceGrid>
        {filtered.map((t) => {
          const Icon = t.icon;
          return (
            <ReferenceCard
              key={t.id}
              id={t.id}
              name={t.name}
              description={t.description}
              complexity={t.complexity}
              infrastructure={t.infrastructure}
              bestFor={t.bestFor}
              color={t.color}
              icon={Icon}
              isExpanded={isCardExpanded(t.id)}
              onToggle={() => toggleCard(t.id)}
              codeSnippet={CODE_SNIPPETS[t.id]}
            />
          );
        })}
      </ReferenceGrid>

      <EmptyState show={filtered.length === 0} />
    </section>
  );
}
