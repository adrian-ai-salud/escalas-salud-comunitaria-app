import { Scale } from './types';
import { noYes, sumOf } from './helpers';

const ids = ['nrs2002_nutrition', 'nrs2002_disease', 'nrs2002_age'];

export const nrs2002: Scale = {
  id: 'nrs2002',
  name: 'NRS-2002 (Nutritional Risk Screening)',
  category: 'Nutrición y riesgo',
  description: 'Cribado de riesgo nutricional diseñado para pacientes hospitalizados. En cada apartado elija la opción de mayor gravedad que se cumpla.',
  reference: 'Kondrup J, Rasmussen HH, Hamberg O, Stanga Z; ESPEN. Nutritional risk screening (NRS 2002): a new method based on an analysis of controlled clinical trials. Clin Nutr. 2003;22(3):321-36.',
  maxScore: 7,
  questions: [
    {
      id: 'nrs2002_nutrition',
      text: 'Alteración del estado nutricional',
      options: [
        { text: 'Ausente: estado nutricional normal', value: 0 },
        { text: 'Leve: pérdida de peso >5 % en 3 meses, o ingesta del 50–75 % de lo necesario en la última semana', value: 1 },
        { text: 'Moderada: pérdida de peso >5 % en 2 meses, o IMC 18,5–20,5 con deterioro del estado general, o ingesta del 25–60 % en la última semana', value: 2 },
        { text: 'Grave: pérdida de peso >5 % en 1 mes (>15 % en 3 meses), o IMC <18,5 con deterioro del estado general, o ingesta del 0–25 % en la última semana', value: 3 },
      ],
    },
    {
      id: 'nrs2002_disease',
      text: 'Gravedad de la enfermedad (aumento de requerimientos)',
      options: [
        { text: 'Ausente: requerimientos nutricionales normales', value: 0 },
        { text: 'Leve: fractura de cadera, enfermedad crónica con complicación aguda (cirrosis, EPOC), hemodiálisis crónica, diabetes, cáncer', value: 1 },
        { text: 'Moderada: cirugía abdominal mayor, ictus, neumonía grave, neoplasia hematológica', value: 2 },
        { text: 'Grave: traumatismo craneoencefálico, trasplante de médula ósea, paciente en UCI (APACHE >10)', value: 3 },
      ],
    },
    { id: 'nrs2002_age', text: '¿Tiene 70 años o más?', options: noYes(0, 1) },
  ],
  calculateScore: (a) => sumOf(a, ids),
  interpretScore: (score) =>
    score >= 3
      ? { level: 'En riesgo nutricional (≥3)', severity: 'grave' }
      : { level: 'Sin riesgo nutricional actual (<3)', severity: 'normal', notes: ['En pacientes ingresados se recomienda repetir el cribado cada semana.'] },
};
