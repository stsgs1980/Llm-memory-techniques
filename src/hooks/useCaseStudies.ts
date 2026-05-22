'use client';

import { useState, useMemo, useCallback } from 'react';
import { CASE_STUDIES } from '@/data/case-studies';

export function useCaseStudies() {
  const [techniqueFilter, setTechniqueFilter] = useState<string | null>(null);
  const [industryFilter, setIndustryFilter] = useState<string | null>(null);

  const filteredStudies = useMemo(() => {
    return CASE_STUDIES.filter((cs) => {
      const matchTechnique = !techniqueFilter || cs.techniques.includes(techniqueFilter);
      const matchIndustry = !industryFilter || cs.industry === industryFilter;
      return matchTechnique && matchIndustry;
    });
  }, [techniqueFilter, industryFilter]);

  const clearFilters = useCallback(() => {
    setTechniqueFilter(null);
    setIndustryFilter(null);
  }, []);

  const toggleTechniqueFilter = useCallback((tech: string | null) => {
    setTechniqueFilter(tech);
  }, []);

  const toggleIndustryFilter = useCallback((ind: string | null) => {
    setIndustryFilter(ind);
  }, []);

  const hasActiveFilter = techniqueFilter !== null || industryFilter !== null;

  return {
    techniqueFilter,
    industryFilter,
    filteredStudies,
    hasActiveFilter,
    clearFilters,
    toggleTechniqueFilter,
    toggleIndustryFilter,
    totalStudies: CASE_STUDIES.length,
  };
}
