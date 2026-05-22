# [ANTI-MONOLITH] Scan Report

**Project:** Llm-memory-techniques
**Date:** 2026-05-23
**Scanner:** Anti-Monolith v1.0

---

## Summary

| Metric | Count | Severity |
|--------|-------|----------|
| Files > 250 lines | 8 | [C] Critical |
| Files with 3+ useState | 7 | [W] Warning |
| Exceptions (shadcn/data) | 7 | [I] Info |

---

## [C] CRITICAL VIOLATIONS - Must Decompose

| File | Lines | useState | Issue |
|------|-------|----------|-------|
| `GlobalSearch.tsx` | 434 | 2 | Exceeds 250 limit by 184 lines |
| `ApiMatrix.tsx` | 397 | 5 | Exceeds limit + max useState |
| `TechniqueBattle.tsx` | 389 | 4 | Exceeds limit + useState overflow |
| `TokenCalculator.tsx` | 380 | 4 | Exceeds limit + useState overflow |
| `QuickQuiz.tsx` | 374 | 2 | Exceeds 250 limit by 124 lines |
| `CostSimulator.tsx` | 353 | 2 | Exceeds 250 limit by 103 lines |
| `QuickReference.tsx` | 341 | 4 | Exceeds limit + useState overflow |
| `GuidedTour.tsx` | 291 | 2 | Exceeds 250 limit by 41 lines |

---

## [W] WARNING - Near Limits

| File | Lines | useState | Risk |
|------|-------|----------|------|
| `TabComponents.tsx` | 246 | 0 | 4 lines from limit |
| `DecisionTree.tsx` | 245 | 3 | 5 lines from limit + useState |
| `LiveChatDemo.tsx` | 240 | 2 | 10 lines from limit |
| `BenchmarksChart.tsx` | 220 | 0 | Growing |
| `CaseStudies.tsx` | 208 | 0 | Growing |

---

## [I] INFO - useState Overflow (Under 250 lines)

| File | Lines | useState | Action |
|------|-------|----------|--------|
| `Glossary.tsx` | 156 | 4 | Extract to useGlossary hook |
| `PromptTemplates.tsx` | 190 | 4 | Extract to usePromptTemplates hook |

---

## [EXCEPTION] Valid Exceptions

| File | Lines | Reason |
|------|-------|--------|
| `sidebar.tsx` | 726 | shadcn/ui component (auto-generated) |
| `chart.tsx` | 353 | shadcn/ui component (auto-generated) |
| `menubar.tsx` | 276 | shadcn/ui component (auto-generated) |
| `dropdown-menu.tsx` | 257 | shadcn/ui component (auto-generated) |
| `context-menu.tsx` | 252 | shadcn/ui component (auto-generated) |
| `prompts.ts` | 660 | Data file (static content) |
| `quiz-questions.ts` | 302 | Data file (static content) |

---

## Decomposition Plan

### Priority 1: ApiMatrix.tsx (397 lines, 5 useState)

**Current Structure:**
- Mixed data + UI + state in single file
- 5 useState hooks need extraction

**Decomposition:**
```
src/components/tools/ApiMatrix/
  index.tsx              <- Composer (30-50 lines)
  sections/
    MatrixHeader.tsx     <- Header UI
    MatrixGrid.tsx       <- Grid display
    MatrixFilters.tsx    <- Filter controls
    MatrixCard.tsx       <- Individual API card
  features/
    useApiMatrix.ts      <- Data + filtering logic
    useMatrixFilters.ts  <- Filter state management
```

### Priority 2: GlobalSearch.tsx (434 lines)

**Decomposition:**
```
src/components/overlay/GlobalSearch/
  index.tsx              <- Composer
  sections/
    SearchInput.tsx      <- Input field
    SearchResults.tsx    <- Results list
    SearchHighlight.tsx  <- Text highlighting
  features/
    useGlobalSearch.ts   <- Search logic + state
```

### Priority 3: TechniqueBattle.tsx (389 lines, 4 useState)

**Decomposition:**
```
src/components/tools/TechniqueBattle/
  index.tsx              <- Composer
  sections/
    BattleHeader.tsx     <- Title + description
    BattleCard.tsx       <- Technique comparison card
    BattleVote.tsx       <- Voting controls
    BattleResults.tsx    <- Results display
  features/
    useBattle.ts         <- Battle state + voting logic
```

### Priority 4: TokenCalculator.tsx (380 lines, 4 useState)

**Decomposition:**
```
src/components/tools/TokenCalculator/
  index.tsx              <- Composer
  sections/
    CalculatorInput.tsx  <- Input controls
    CalculatorResult.tsx <- Results display
    CalculatorChart.tsx  <- Visual breakdown
  features/
    useTokenCalc.ts      <- Calculation logic
```

### Priority 5: QuickQuiz.tsx (374 lines)

**Decomposition:**
```
src/components/learn/QuickQuiz/
  index.tsx              <- Composer
  sections/
    QuizQuestion.tsx     <- Question display
    QuizOptions.tsx      <- Answer options
    QuizProgress.tsx     <- Progress indicator
    QuizResult.tsx       <- Final score
  features/
    useQuiz.ts           <- Quiz state + scoring
```

### Priority 6: CostSimulator.tsx (353 lines)

**Decomposition:**
```
src/components/tools/CostSimulator/
  index.tsx              <- Composer
  sections/
    SimulatorInput.tsx   <- Configuration inputs
    SimulatorOutput.tsx  <- Cost breakdown
    SimulatorChart.tsx   <- Visualization
  features/
    useCostSim.ts        <- Simulation logic
```

### Priority 7: QuickReference.tsx (341 lines, 4 useState)

**Decomposition:**
```
src/components/tools/QuickReference/
  index.tsx              <- Composer
  sections/
    ReferenceHeader.tsx  <- Filter controls
    ReferenceCard.tsx    <- Technique card
    ReferenceGrid.tsx    <- Grid layout
  features/
    useReferenceFilter.ts <- Filtering logic
```

### Priority 8: GuidedTour.tsx (291 lines)

**Decomposition:**
```
src/components/overlay/GuidedTour/
  index.tsx              <- Composer
  sections/
    TourStep.tsx         <- Individual step UI
    TourNavigation.tsx   <- Prev/Next controls
    TourProgress.tsx     <- Step indicator
  features/
    useTour.ts           <- Tour state management
```

---

## Hook Extraction Quick Wins

These files are under 250 lines but have useState overflow:

```tsx
// Glossary.tsx: Extract 4 useState -> useGlossary()
function useGlossary() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedLetter, setSelectedLetter] = useState('')
  const [expandedTerms, setExpandedTerms] = useState<Set<string>>(new Set())
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  const filteredTerms = useMemo(() => {
    // filtering logic
  }, [searchTerm, selectedLetter, activeCategory])

  return { searchTerm, setSearchTerm, filteredTerms, toggleTerm, ... }
}

// PromptTemplates.tsx: Extract 4 useState -> usePromptTemplates()
function usePromptTemplates() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [selectedTemplate, setSelectedTemplate] = useState<PromptTemplate | null>(null)

  // ... logic

  return { templates, copyToClipboard, ... }
}
```

---

## Recommended Actions

1. **IMMEDIATE:** Decompose `ApiMatrix.tsx` (worst offender: 5 useState + 397 lines)
2. **HIGH:** Decompose `GlobalSearch.tsx` (largest at 434 lines)
3. **MEDIUM:** Decompose remaining 6 critical files
4. **QUICK WIN:** Extract hooks from Glossary + PromptTemplates

---

## Estimated Impact

| Metric | Before | After |
|--------|--------|-------|
| Avg file size | 280 lines | 80 lines |
| Max useState | 5 | 2 |
| Files > 250 lines | 8 | 0 |
| Testability | Low | High |

---

*Generated by Anti-Monolith v1.0*
