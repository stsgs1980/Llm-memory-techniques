export type SortKey = 'name' | 'provider' | 'context' | 'input' | 'output' | 'maxOutput' | 'cutoff';
export type SortDir = 'asc' | 'desc';
export type CostView = 'monthly' | 'daily';

export interface ModelEntry {
  id: string;
  name: string;
  provider: string;
  providerColor: string;
  context: number;
  input: number;
  output: number;
  maxOutput: number;
  cutoff: string;
  bestFor: string[];
}

export interface MatrixFiltersState {
  activeProviders: string[];
  costView: CostView;
}

export interface MatrixSortState {
  sortKey: SortKey;
  sortDir: SortDir;
}
