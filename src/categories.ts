import {
  Activity, Apple, Brain, Calculator, HeartPulse, Info, LucideIcon, PersonStanding, Puzzle, Users, Wind, Wine,
} from 'lucide-react';
import { Severity } from './scales/types';

export const categoryColors: Record<string, string> = {
  'Salud mental y emocional': '#3B82F6',
  'Función cognitiva': '#A855F7',
  'Fragilidad y funcionalidad': '#F97316',
  'Riesgo cardiovascular y metabólico': '#0D9488',
  'Consumo de sustancias': '#D97706',
  'Estilo de vida y adherencia': '#10B981',
  'Nutrición y riesgo': '#65A30D',
  'Función respiratoria': '#0891B2',
  'Promoción comunitaria y bienestar': '#8B5CF6',
  'Calculadoras': '#64748B',
  'Información': '#94A3B8',
};

export const categoryIcons: Record<string, LucideIcon> = {
  'Salud mental y emocional': Brain,
  'Función cognitiva': Puzzle,
  'Fragilidad y funcionalidad': PersonStanding,
  'Riesgo cardiovascular y metabólico': HeartPulse,
  'Consumo de sustancias': Wine,
  'Estilo de vida y adherencia': Activity,
  'Nutrición y riesgo': Apple,
  'Función respiratoria': Wind,
  'Promoción comunitaria y bienestar': Users,
  'Calculadoras': Calculator,
  'Información': Info,
};

export const severityColors: Record<Severity, string> = {
  normal: '#16A34A',
  leve: '#CA8A04',
  moderado: '#EA580C',
  grave: '#DC2626',
  info: '#0D9488',
};
