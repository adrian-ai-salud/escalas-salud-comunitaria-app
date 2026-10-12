import { Option, Scale } from './types';
import { idsOf, sumOf } from './helpers';

const answer: Option[] = [
  { text: 'Correcto', value: 0 },
  { text: 'Error', value: 1 },
];

const items = [
  '¿Qué día es hoy? (día, mes y año)',
  '¿Qué día de la semana es hoy?',
  '¿Dónde estamos ahora? (lugar o edificio)',
  '¿Cuál es su número de teléfono? (o su dirección, si no tiene teléfono)',
  '¿Cuántos años tiene?',
  '¿Cuál es su fecha de nacimiento? (día, mes y año)',
  '¿Quién es ahora el presidente del Gobierno?',
  '¿Quién fue el anterior presidente del Gobierno?',
  '¿Cuáles son los dos apellidos de su madre?',
  'Reste de 3 en 3 desde 20 hasta 0 (cualquier fallo en la serie cuenta como un error)',
];

const ids = idsOf('pfeiffer_q', 10);

export const pfeifferTest: Scale = {
  id: 'pfeiffer_test',
  name: 'Test de Pfeiffer (SPMSQ)',
  category: 'Función cognitiva',
  description: 'Cuestionario breve del estado mental de 10 preguntas. Se puntúan los errores y se ajusta por nivel educativo.',
  reference: 'Pfeiffer E. A short portable mental status questionnaire for the assessment of organic brain deficit in elderly patients. J Am Geriatr Soc. 1975;23(10):433-41. Versión española: Martínez de la Iglesia J, et al. Med Clin (Barc). 2001;117(4):129-34.',
  maxScore: 10,
  scoreUnit: 'errores',
  questions: [
    ...items.map((text, i) => ({ id: ids[i], text, options: answer })),
    {
      id: 'pfeiffer_education',
      text: 'Nivel educativo',
      options: [
        { text: 'Sin estudios primarios (se permite un error más)', value: -1 },
        { text: 'Estudios primarios o medios', value: 0 },
        { text: 'Estudios superiores (se permite un error menos)', value: 1 },
      ],
    },
  ],
  calculateScore: (a) => sumOf(a, ids),
  interpretScore: (score, a) => {
    const adjusted = Math.max(0, score + (a.pfeiffer_education ?? 0));
    const notes = adjusted !== score ? [`Errores ajustados por nivel educativo: ${adjusted}.`] : undefined;
    if (adjusted >= 8) return { level: 'Deterioro cognitivo grave (8–10 errores)', severity: 'grave', notes };
    if (adjusted >= 5) return { level: 'Deterioro cognitivo moderado (5–7 errores)', severity: 'grave', notes };
    if (adjusted >= 3) return { level: 'Deterioro cognitivo leve (3–4 errores)', severity: 'moderado', notes };
    return { level: 'Normal (0–2 errores)', severity: 'normal', notes };
  },
};
