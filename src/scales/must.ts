import { Scale } from './types';
import { sumOf } from './helpers';

const ids = ['must_q1_imc', 'must_q2_weight_loss', 'must_q3_acute_disease'];

export const must: Scale = {
  id: 'must',
  name: 'MUST (Malnutrition Universal Screening Tool)',
  category: 'Nutrición y riesgo',
  description: 'Cribado de malnutrición en adultos en cualquier ámbito asistencial.',
  reference: 'Elia M. The "MUST" report. Nutritional screening of adults: a multidisciplinary responsibility. BAPEN; 2003. «MUST» reproducido con permiso de BAPEN.',
  maxScore: 6,
  questions: [
    {
      id: 'must_q1_imc',
      text: 'Índice de masa corporal',
      options: [
        { text: 'IMC >20 kg/m² (>30: obesidad)', value: 0 },
        { text: 'IMC 18,5–20 kg/m²', value: 1 },
        { text: 'IMC <18,5 kg/m²', value: 2 },
      ],
    },
    {
      id: 'must_q2_weight_loss',
      text: 'Pérdida de peso involuntaria en los últimos 3–6 meses',
      options: [
        { text: '<5 %', value: 0 },
        { text: '5–10 %', value: 1 },
        { text: '>10 %', value: 2 },
      ],
    },
    {
      id: 'must_q3_acute_disease',
      text: 'Efecto de enfermedad aguda: enfermedad grave con ingesta nula o probable ausencia de ingesta durante más de 5 días',
      options: [
        { text: 'No', value: 0 },
        { text: 'Sí', value: 2 },
      ],
    },
  ],
  calculateScore: (a) => sumOf(a, ids),
  interpretScore: (score) => {
    if (score >= 2) return { level: 'Riesgo alto (≥2)', severity: 'grave' };
    if (score === 1) return { level: 'Riesgo medio (1)', severity: 'moderado' };
    return { level: 'Riesgo bajo (0)', severity: 'normal' };
  },
};
