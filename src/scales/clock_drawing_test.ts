import { Scale } from './types';
import { sumOf } from './helpers';

const ids = ['clock_drawing_sphere', 'clock_drawing_numbers', 'clock_drawing_hands'];

export const clockDrawingTest: Scale = {
  id: 'clock_drawing_test',
  name: 'Test del reloj (a la orden)',
  category: 'Función cognitiva',
  description: 'Se pide dibujar un reloj con todos sus números y las manecillas marcando las 11 y 10. Puntuación simplificada de 0 a 10 (esfera 2, números 4, manecillas 4); para casos dudosos, aplique los criterios detallados de Cacho et al.',
  reference: 'Cacho J, García-García R, Arcaya J, Vicente JL, Lantada N. Una propuesta de aplicación y puntuación del test del reloj en la enfermedad de Alzheimer. Rev Neurol. 1999;28(7):648-55.',
  maxScore: 10,
  questions: [
    {
      id: 'clock_drawing_sphere',
      text: 'Esfera',
      options: [
        { text: 'Círculo cerrado, sin deformidades importantes (2)', value: 2 },
        { text: 'Incompleta o con alguna distorsión (1)', value: 1 },
        { text: 'Ausente o muy distorsionada (0)', value: 0 },
      ],
    },
    {
      id: 'clock_drawing_numbers',
      text: 'Números',
      options: [
        { text: 'Todos presentes, en orden y bien distribuidos (4)', value: 4 },
        { text: 'Todos presentes con pequeños errores de posición (3)', value: 3 },
        { text: 'Errores importantes de posición u omisiones (2)', value: 2 },
        { text: 'Muchos errores o números fuera de la esfera (1)', value: 1 },
        { text: 'Ausentes o ilegibles (0)', value: 0 },
      ],
    },
    {
      id: 'clock_drawing_hands',
      text: 'Manecillas (11 y 10)',
      options: [
        { text: 'Ambas correctas y con la proporción adecuada (4)', value: 4 },
        { text: 'Ambas en posición correcta, sin proporción (3)', value: 3 },
        { text: 'Una correcta o errores de posición leves (2)', value: 2 },
        { text: 'Errores importantes (1)', value: 1 },
        { text: 'Ausentes o sin relación con la hora pedida (0)', value: 0 },
      ],
    },
  ],
  calculateScore: (a) => sumOf(a, ids),
  interpretScore: (score) =>
    score >= 7
      ? { level: 'Normal (≥7)', severity: 'normal' }
      : { level: 'Sugiere deterioro cognitivo (≤6)', severity: 'moderado' },
};
