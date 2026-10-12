import { Scale } from './types';
import { sumOf } from './helpers';

const ids = ['sppb_balance', 'sppb_gait_speed', 'sppb_chair_stand'];

export const sppb: Scale = {
  id: 'sppb',
  name: 'Batería corta de desempeño físico (SPPB)',
  category: 'Fragilidad y funcionalidad',
  description: 'Tres pruebas: equilibrio, velocidad de la marcha en 4 metros y levantarse de la silla 5 veces. Puntuación total de 0 a 12.',
  reference: 'Guralnik JM, Simonsick EM, Ferrucci L, et al. A short physical performance battery assessing lower extremity function. J Gerontol. 1994;49(2):M85-94. Ministerio de Sanidad. Documento de consenso sobre prevención de la fragilidad en la persona mayor. Actualización 2022.',
  maxScore: 12,
  questions: [
    {
      id: 'sppb_balance',
      text: 'Equilibrio (pies juntos, semitándem y tándem, 10 segundos cada uno)',
      options: [
        { text: 'Pies juntos <10 s', value: 0 },
        { text: 'Pies juntos 10 s; semitándem <10 s', value: 1 },
        { text: 'Semitándem 10 s; tándem <3 s', value: 2 },
        { text: 'Tándem 3–9,99 s', value: 3 },
        { text: 'Tándem 10 s', value: 4 },
      ],
    },
    {
      id: 'sppb_gait_speed',
      text: 'Velocidad de la marcha: tiempo en recorrer 4 metros (mejor de 2 intentos)',
      options: [
        { text: 'No puede realizarlo', value: 0 },
        { text: '>8,70 s', value: 1 },
        { text: '6,21–8,70 s', value: 2 },
        { text: '4,82–6,20 s', value: 3 },
        { text: '<4,82 s', value: 4 },
      ],
    },
    {
      id: 'sppb_chair_stand',
      text: 'Levantarse de la silla 5 veces sin usar los brazos',
      options: [
        { text: 'No puede realizarlo o tarda >60 s', value: 0 },
        { text: '≥16,70 s', value: 1 },
        { text: '13,70–16,69 s', value: 2 },
        { text: '11,20–13,69 s', value: 3 },
        { text: '≤11,19 s', value: 4 },
      ],
    },
  ],
  calculateScore: (a) => sumOf(a, ids),
  interpretScore: (score) => {
    const notes = score < 10 ? ['Una puntuación <10 indica fragilidad y riesgo de discapacidad y caídas según el documento de consenso del Ministerio de Sanidad.'] : undefined;
    if (score >= 10) return { level: 'Limitación mínima (10–12)', severity: 'normal' };
    if (score >= 7) return { level: 'Limitación leve (7–9)', severity: 'leve', notes };
    if (score >= 4) return { level: 'Limitación moderada (4–6)', severity: 'moderado', notes };
    return { level: 'Limitación grave (0–3)', severity: 'grave', notes };
  },
};
