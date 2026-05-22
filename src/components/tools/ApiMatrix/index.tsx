'use client';

import { MatrixHeader } from './sections/MatrixHeader';
import { MatrixFilters } from './sections/MatrixFilters';
import { MatrixGrid } from './sections/MatrixGrid';
import { useMatrixFilters } from './features/useMatrixFilters';
import { useApiMatrix } from './features/useApiMatrix';

export default function ApiMatrix() {
  const {
    activeProviders,
    costView,
    setCostView,
    toggleProvider,
    resetFilters,
  } = useMatrixFilters();

  const {
    sortKey,
    sortDir,
    handleSort,
    resetSort,
    sortedModels,
    bestValues,
  } = useApiMatrix(activeProviders);

  const handleReset = () => {
    resetFilters();
    resetSort();
  };

  return (
    <section className="space-y-6">
      <MatrixHeader onReset={handleReset} />
      <MatrixFilters
        activeProviders={activeProviders}
        costView={costView}
        onToggleProvider={toggleProvider}
        onSetCostView={setCostView}
      />
      <MatrixGrid
        models={sortedModels}
        sortKey={sortKey}
        sortDir={sortDir}
        costView={costView}
        bestValues={bestValues}
        onSort={handleSort}
      />
      {/* Footnote */}
      <div className="text-[10px] font-mono text-muted-foreground leading-relaxed">
        * Расчёт для 100K токенов в день (вход + выход). Цены указаны за 1M токенов. Open Source модели — бесплатно при self-hosted, не включают расходы на инфраструктуру.
      </div>
    </section>
  );
}
