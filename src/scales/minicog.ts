import { Scale } from './types';
import { sumOf } from './helpers';

export const minicog: Scale = {
  id: 'minicog',
  name: 'Mini-Cog',
  category: 'Función cognitiva',
  description: 'Cribado cognitivo breve: recuerdo de 3 palabras y test del reloj.',
  reference: 'Borson S, et al. The Mini-Cog: a cognitive "vital signs" measure for dementia screening in multi-lingual elderly. Int J Geriatr Psychiatry. 2000;15(11):1021-7. Mini-Cog © S. Borson: uso clínico y docente; no puede modificarse ni usarse con fines comerciales sin permiso del autor.',
  maxScore: 5,
  questions: [
    {
      id: 'word_recall',
      text: 'Recuerdo diferido de las 3 palabras:',
      options: [
        { text: '0 palabras', value: 0 },
        { text: '1 palabra', value: 1 },
        { text: '2 palabras', value: 2 },
        { text: '3 palabras', value: 3 },
      ],
    },
    {
      id: 'clock_drawing',
      text: 'Dibujo del reloj (todos los números en orden y posición correcta, manecillas en la hora pedida):',
      options: [
        { text: 'Normal (2 puntos)', value: 2 },
        { text: 'Anormal (0 puntos)', value: 0 },
      ],
    },
  ],
  calculateScore: (a) => sumOf(a, ['word_recall', 'clock_drawing']),
  interpretScore: (score) => {
    if (score < 3) return { level: 'Cribado positivo (<3)', severity: 'moderado' };
    if (score === 3) {
      return {
        level: 'Cribado negativo con el corte <3; positivo con el corte <4',
        severity: 'leve',
        notes: ['El punto de corte <4 aumenta la sensibilidad y puede indicar la necesidad de una evaluación adicional.'],
      };
    }
    return { level: 'Cribado negativo (4–5)', severity: 'normal' };
  },
};
