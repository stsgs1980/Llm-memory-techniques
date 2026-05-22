export { summarizationSteps } from './SummarizationSteps';
export { hierarchicalSteps } from './HierarchicalSteps';
export { ragSteps } from './RAGSteps';
export { factExtractionSteps } from './FactExtractionSteps';
export { slidingWindowSteps } from './SlidingWindowSteps';
export { semanticCacheSteps } from './SemanticCacheSteps';

import { summarizationSteps } from './SummarizationSteps';
import { hierarchicalSteps } from './HierarchicalSteps';
import { ragSteps } from './RAGSteps';
import { factExtractionSteps } from './FactExtractionSteps';
import { slidingWindowSteps } from './SlidingWindowSteps';
import { semanticCacheSteps } from './SemanticCacheSteps';

export const allTechniqueSteps = [
  summarizationSteps,
  hierarchicalSteps,
  ragSteps,
  factExtractionSteps,
  slidingWindowSteps,
  semanticCacheSteps,
];
