export type Severity = 'normal' | 'leve' | 'moderado' | 'grave' | 'info';

export interface Option {
  text: string;
  value: number;
}

export interface Question {
  id: string;
  text: string;
  options?: Option[];
  unit?: string;
  min?: number;
  max?: number;
}

export interface Interpretation {
  level: string;
  severity: Severity;
  notes?: string[];
  alert?: string;
}

export type ScaleMode = 'score' | 'chart' | 'external' | 'page';

export interface Scale {
  id: string;
  name: string;
  category: string;
  description: string;
  instructions?: string;
  reference?: string;
  questions: Question[];
  mode?: ScaleMode;
  maxScore?: number;
  scoreUnit?: string;
  scoreDecimals?: number;
  calculateScore: (answers: Record<string, number>) => number;
  interpretScore: (score: number, answers: Record<string, number>) => Interpretation;
}
