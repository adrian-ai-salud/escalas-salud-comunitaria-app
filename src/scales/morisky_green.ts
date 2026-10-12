import { Scale } from './types';
import { sumOf, yesNo } from './helpers';

const ids = ['morisky_q1', 'morisky_q2', 'morisky_q3', 'morisky_q4'];

export const moriskyGreen: Scale = {
  id: 'morisky_green',
  name: 'Morisky-Green',
  category: 'Estilo de vida y adherencia',
  description: 'Test de 4 preguntas sobre adherencia al tratamiento farmacológico. Se considera adherente a la persona que responde correctamente a las 4 (No, Sí, No, No).',
  reference: 'Morisky DE, Green LW, Levine DM. Concurrent and predictive validity of a self-reported measure of medication adherence. Med Care. 1986;24(1):67-74. Versión española: Val Jiménez A, et al. Aten Primaria. 1992;10(5):767-70.',
  maxScore: 4,
  scoreUnit: 'respuestas de no adherencia',
  questions: [
    { id: 'morisky_q1', text: '¿Olvida alguna vez tomar los medicamentos para tratar su enfermedad?', options: yesNo(1, 0) },
    { id: 'morisky_q2', text: '¿Toma los medicamentos a las horas indicadas?', options: yesNo(0, 1) },
    { id: 'morisky_q3', text: 'Cuando se encuentra bien, ¿deja de tomar la medicación?', options: yesNo(1, 0) },
    { id: 'morisky_q4', text: 'Si alguna vez le sienta mal, ¿deja usted de tomarla?', options: yesNo(1, 0) },
  ],
  calculateScore: (a) => sumOf(a, ids),
  interpretScore: (score) =>
    score === 0
      ? { level: 'Adherente', severity: 'normal' }
      : { level: 'No adherente', severity: 'moderado', notes: ['Basta una respuesta de no adherencia para clasificar como no adherente.'] },
};
