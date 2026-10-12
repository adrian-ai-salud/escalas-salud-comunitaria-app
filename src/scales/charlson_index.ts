import { Scale } from './types';
import { noYes, sumOf } from './helpers';

const comorbidityIds = [
  'charlson_mi', 'charlson_chf', 'charlson_pvd', 'charlson_cvd', 'charlson_dementia',
  'charlson_cpd', 'charlson_ctd', 'charlson_pud', 'charlson_liver', 'charlson_diabetes',
  'charlson_hemiplegia', 'charlson_renal', 'charlson_solid_tumor', 'charlson_leukemia',
  'charlson_lymphoma', 'charlson_aids',
];

const agePoints = (age: number) => (age >= 80 ? 4 : age >= 70 ? 3 : age >= 60 ? 2 : age >= 50 ? 1 : 0);

export const charlsonIndex: Scale = {
  id: 'charlson_index',
  name: 'Índice de Comorbilidad de Charlson',
  category: 'Riesgo cardiovascular y metabólico',
  description: 'Cuantifica la carga de comorbilidad con valor pronóstico. Se muestra el índice de comorbilidad y, aparte, el índice combinado con la edad.',
  reference: 'Charlson ME, Pompei P, Ales KL, MacKenzie CR. A new method of classifying prognostic comorbidity in longitudinal studies. J Chronic Dis. 1987;40(5):373-83. Charlson M, et al. Validation of a combined comorbidity index. J Clin Epidemiol. 1994;47(11):1245-51.',
  questions: [
    { id: 'charlson_age', text: 'Edad', unit: 'años', min: 0, max: 120 },
    { id: 'charlson_mi', text: 'Infarto de miocardio', options: noYes(0, 1) },
    { id: 'charlson_chf', text: 'Insuficiencia cardiaca congestiva', options: noYes(0, 1) },
    { id: 'charlson_pvd', text: 'Enfermedad vascular periférica', options: noYes(0, 1) },
    { id: 'charlson_cvd', text: 'Enfermedad cerebrovascular', options: noYes(0, 1) },
    { id: 'charlson_dementia', text: 'Demencia', options: noYes(0, 1) },
    { id: 'charlson_cpd', text: 'Enfermedad pulmonar crónica', options: noYes(0, 1) },
    { id: 'charlson_ctd', text: 'Enfermedad del tejido conectivo', options: noYes(0, 1) },
    { id: 'charlson_pud', text: 'Úlcera gastroduodenal', options: noYes(0, 1) },
    {
      id: 'charlson_liver',
      text: 'Hepatopatía',
      options: [
        { text: 'No', value: 0 },
        { text: 'Leve (hepatitis crónica o cirrosis sin hipertensión portal)', value: 1 },
        { text: 'Moderada o grave (cirrosis con hipertensión portal)', value: 3 },
      ],
    },
    {
      id: 'charlson_diabetes',
      text: 'Diabetes',
      options: [
        { text: 'No', value: 0 },
        { text: 'Sin lesión de órgano diana', value: 1 },
        { text: 'Con lesión de órgano diana (retinopatía, nefropatía, neuropatía)', value: 2 },
      ],
    },
    { id: 'charlson_hemiplegia', text: 'Hemiplejia', options: noYes(0, 2) },
    { id: 'charlson_renal', text: 'Enfermedad renal moderada o grave', options: noYes(0, 2) },
    {
      id: 'charlson_solid_tumor',
      text: 'Tumor sólido',
      options: [
        { text: 'No', value: 0 },
        { text: 'Sin metástasis', value: 2 },
        { text: 'Con metástasis', value: 6 },
      ],
    },
    { id: 'charlson_leukemia', text: 'Leucemia', options: noYes(0, 2) },
    { id: 'charlson_lymphoma', text: 'Linfoma', options: noYes(0, 2) },
    { id: 'charlson_aids', text: 'SIDA', options: noYes(0, 6) },
  ],
  calculateScore: (a) => sumOf(a, comorbidityIds),
  interpretScore: (score, a) => {
    const notes = [
      `Índice combinado con la edad: ${score + agePoints(a.charlson_age ?? 0)} puntos (suma 1 punto por década a partir de los 50 años).`,
      'Mortalidad al año en la cohorte original (Charlson 1987): índice 0 → 12 %; 1–2 → 26 %; 3–4 → 52 %; ≥5 → 85 %.',
    ];
    if (score >= 5) return { level: 'Índice ≥5', severity: 'grave', notes };
    if (score >= 3) return { level: 'Índice 3–4', severity: 'moderado', notes };
    if (score >= 1) return { level: 'Índice 1–2', severity: 'leve', notes };
    return { level: 'Índice 0: sin comorbilidad puntuable', severity: 'normal', notes };
  },
};
