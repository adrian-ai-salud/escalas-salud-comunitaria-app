import { Scale } from './types';
import { sexOptions, sumOf } from './helpers';

const ids = ['audit_c_q1', 'audit_c_q2', 'audit_c_q3'];

export const auditC: Scale = {
  id: 'audit_c',
  name: 'AUDIT-C',
  category: 'Consumo de sustancias',
  description: 'Tres primeras preguntas del AUDIT para el cribado del consumo de riesgo de alcohol.',
  instructions: 'Las preguntas se refieren a los últimos 12 meses. Una consumición equivale aproximadamente a una unidad de bebida estándar (UBE, 10 g de alcohol).',
  reference: 'Bush K, Kivlahan DR, McDonell MB, et al. The AUDIT alcohol consumption questions (AUDIT-C). Arch Intern Med. 1998;158(16):1789-95. Versión española: Gual A, Segura L, Contel M, et al. Alcohol Alcohol. 2002;37(6):591-6.',
  maxScore: 12,
  questions: [
    { id: 'audit_c_sex', text: 'Sexo', options: sexOptions },
    {
      id: 'audit_c_q1',
      text: '¿Con qué frecuencia consume alguna bebida alcohólica?',
      options: [
        { text: 'Nunca', value: 0 },
        { text: 'Una vez al mes o menos', value: 1 },
        { text: 'De 2 a 4 veces al mes', value: 2 },
        { text: 'De 2 a 3 veces a la semana', value: 3 },
        { text: '4 o más veces a la semana', value: 4 },
      ],
    },
    {
      id: 'audit_c_q2',
      text: '¿Cuántas consumiciones de bebidas alcohólicas suele realizar en un día de consumo normal?',
      options: [
        { text: '1 o 2', value: 0 },
        { text: '3 o 4', value: 1 },
        { text: '5 o 6', value: 2 },
        { text: '7 a 9', value: 3 },
        { text: '10 o más', value: 4 },
      ],
    },
    {
      id: 'audit_c_q3',
      text: '¿Con qué frecuencia toma 6 o más bebidas alcohólicas en una sola ocasión?',
      options: [
        { text: 'Nunca', value: 0 },
        { text: 'Menos de una vez al mes', value: 1 },
        { text: 'Mensualmente', value: 2 },
        { text: 'Semanalmente', value: 3 },
        { text: 'A diario o casi a diario', value: 4 },
      ],
    },
  ],
  calculateScore: (a) => sumOf(a, ids),
  interpretScore: (score, a) => {
    const woman = a.audit_c_sex === 1;
    const cutoff = woman ? 4 : 5;
    const group = woman ? 'mujeres' : 'hombres';
    return score >= cutoff
      ? { level: `Cribado positivo: consumo de riesgo (≥${cutoff} en ${group})`, severity: 'moderado' }
      : { level: `Cribado negativo (<${cutoff} en ${group})`, severity: 'normal' };
  },
};
