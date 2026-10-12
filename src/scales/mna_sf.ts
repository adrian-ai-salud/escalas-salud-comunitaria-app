import { Scale } from './types';
import { idsOf, sumOf } from './helpers';

const ids = idsOf('mna_sf_q', 6);

export const mnaSf: Scale = {
  id: 'mna_sf',
  name: 'MNA-SF (Mini Nutritional Assessment, forma corta)',
  category: 'Nutrición y riesgo',
  description: 'Cribado del estado nutricional en personas mayores. Si no se dispone del IMC, puede usarse la circunferencia de la pantorrilla.',
  reference: 'Rubenstein LZ, et al. Screening for undernutrition in geriatric practice: developing the short-form MNA (MNA-SF). J Gerontol A Biol Sci Med Sci. 2001;56(6):M366-72. Kaiser MJ, et al. J Nutr Health Aging. 2009;13(9):782-8. MNA® Société des Produits Nestlé SA.',
  maxScore: 14,
  questions: [
    {
      id: ids[0],
      text: '¿Ha comido menos en los últimos 3 meses por falta de apetito, problemas digestivos o dificultad para masticar o tragar?',
      options: [
        { text: 'Ha comido mucho menos', value: 0 },
        { text: 'Ha comido menos', value: 1 },
        { text: 'Ha comido igual', value: 2 },
      ],
    },
    {
      id: ids[1],
      text: 'Pérdida de peso en los últimos 3 meses',
      options: [
        { text: 'Pérdida de más de 3 kg', value: 0 },
        { text: 'No lo sabe', value: 1 },
        { text: 'Pérdida de entre 1 y 3 kg', value: 2 },
        { text: 'Sin pérdida de peso', value: 3 },
      ],
    },
    {
      id: ids[2],
      text: 'Movilidad',
      options: [
        { text: 'De la cama al sillón', value: 0 },
        { text: 'Autonomía en el interior', value: 1 },
        { text: 'Sale del domicilio', value: 2 },
      ],
    },
    {
      id: ids[3],
      text: '¿Ha tenido una enfermedad aguda o situación de estrés psicológico en los últimos 3 meses?',
      options: [
        { text: 'Sí', value: 0 },
        { text: 'No', value: 2 },
      ],
    },
    {
      id: ids[4],
      text: 'Problemas neuropsicológicos',
      options: [
        { text: 'Demencia o depresión grave', value: 0 },
        { text: 'Demencia leve', value: 1 },
        { text: 'Sin problemas psicológicos', value: 2 },
      ],
    },
    {
      id: ids[5],
      text: 'Índice de masa corporal (o, si no se dispone, circunferencia de la pantorrilla)',
      options: [
        { text: 'IMC <19', value: 0 },
        { text: 'IMC 19 a <21', value: 1 },
        { text: 'IMC 21 a <23', value: 2 },
        { text: 'IMC ≥23', value: 3 },
        { text: 'Sin IMC: pantorrilla <31 cm', value: 0 },
        { text: 'Sin IMC: pantorrilla ≥31 cm', value: 3 },
      ],
    },
  ],
  calculateScore: (a) => sumOf(a, ids),
  interpretScore: (score) => {
    if (score >= 12) return { level: 'Estado nutricional normal (12–14)', severity: 'normal' };
    if (score >= 8) return { level: 'Riesgo de malnutrición (8–11)', severity: 'moderado' };
    return { level: 'Malnutrición (0–7)', severity: 'grave' };
  },
};
