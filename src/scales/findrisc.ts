import { Scale } from './types';
import { idsOf, noYes, sumOf } from './helpers';

const ids = idsOf('findrisc_q', 8);

export const findrisc: Scale = {
  id: 'findrisc',
  name: 'FINDRISC',
  category: 'Riesgo cardiovascular y metabólico',
  description: 'Estima el riesgo de desarrollar diabetes tipo 2 en los próximos 10 años.',
  reference: 'Lindström J, Tuomilehto J. The diabetes risk score: a practical tool to predict type 2 diabetes risk. Diabetes Care. 2003;26(3):725-31.',
  maxScore: 26,
  questions: [
    {
      id: ids[0],
      text: 'Edad',
      options: [
        { text: 'Menos de 45 años', value: 0 },
        { text: '45–54 años', value: 2 },
        { text: '55–64 años', value: 3 },
        { text: 'Más de 64 años', value: 4 },
      ],
    },
    {
      id: ids[1],
      text: 'Índice de masa corporal (IMC)',
      options: [
        { text: 'Menos de 25 kg/m²', value: 0 },
        { text: '25–30 kg/m²', value: 1 },
        { text: 'Más de 30 kg/m²', value: 3 },
      ],
    },
    {
      id: ids[2],
      text: 'Perímetro de cintura (medido a la altura del ombligo)',
      options: [
        { text: 'Hombres <94 cm · Mujeres <80 cm', value: 0 },
        { text: 'Hombres 94–102 cm · Mujeres 80–88 cm', value: 3 },
        { text: 'Hombres >102 cm · Mujeres >88 cm', value: 4 },
      ],
    },
    {
      id: ids[3],
      text: '¿Realiza habitualmente al menos 30 minutos de actividad física al día, en el trabajo o en el tiempo libre?',
      options: [
        { text: 'Sí', value: 0 },
        { text: 'No', value: 2 },
      ],
    },
    {
      id: ids[4],
      text: '¿Con qué frecuencia come verduras, frutas o bayas?',
      options: [
        { text: 'Todos los días', value: 0 },
        { text: 'No todos los días', value: 1 },
      ],
    },
    { id: ids[5], text: '¿Le han recetado alguna vez medicación para la hipertensión arterial?', options: noYes(0, 2) },
    {
      id: ids[6],
      text: '¿Le han detectado alguna vez niveles altos de glucosa en sangre (en un control médico, durante una enfermedad o durante el embarazo)?',
      options: noYes(0, 5),
    },
    {
      id: ids[7],
      text: '¿Algún familiar ha sido diagnosticado de diabetes (tipo 1 o tipo 2)?',
      options: [
        { text: 'No', value: 0 },
        { text: 'Sí: abuelos, tíos o primos hermanos', value: 3 },
        { text: 'Sí: padres, hermanos o hijos', value: 5 },
      ],
    },
  ],
  calculateScore: (a) => sumOf(a, ids),
  interpretScore: (score) => {
    if (score > 20) return { level: 'Riesgo muy alto (>20): ≈ 1 de cada 2 desarrollará diabetes', severity: 'grave' };
    if (score >= 15) return { level: 'Riesgo alto (15–20): ≈ 1 de cada 3', severity: 'grave' };
    if (score >= 12) return { level: 'Riesgo moderado (12–14): ≈ 1 de cada 6', severity: 'moderado' };
    if (score >= 7) return { level: 'Riesgo ligeramente elevado (7–11): ≈ 1 de cada 25', severity: 'leve' };
    return { level: 'Riesgo bajo (<7): ≈ 1 de cada 100', severity: 'normal' };
  },
};
