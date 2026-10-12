import { Scale } from './types';
import { frequency2Weeks, idsOf, sumOf } from './helpers';

const items = [
  'Se ha sentido nervioso(a), ansioso(a) o con los nervios de punta.',
  'No ha sido capaz de parar o controlar su preocupación.',
  'Se ha preocupado demasiado por diferentes cosas.',
  'Ha tenido dificultad para relajarse.',
  'Se ha sentido tan inquieto(a) que no ha podido quedarse quieto(a).',
  'Se ha molestado o irritado fácilmente.',
  'Ha tenido miedo de que algo terrible fuera a pasar.',
];

const ids = idsOf('gad7_q', 7);

export const gad7: Scale = {
  id: 'gad7',
  name: 'GAD-7',
  category: 'Salud mental y emocional',
  description: 'Cuestionario de 7 ítems para el cribado y la valoración de la gravedad de la ansiedad generalizada.',
  instructions: 'Durante las últimas 2 semanas, ¿con qué frecuencia le han molestado los siguientes problemas?',
  reference: 'Spitzer RL, Kroenke K, Williams JB, Löwe B. A brief measure for assessing generalized anxiety disorder: the GAD-7. Arch Intern Med. 2006;166(10):1092-7. Versión española: García-Campayo J, et al. Health Qual Life Outcomes. 2010;8:8.',
  maxScore: 21,
  questions: items.map((text, i) => ({ id: ids[i], text, options: frequency2Weeks })),
  calculateScore: (a) => sumOf(a, ids),
  interpretScore: (score) => {
    if (score >= 15) return { level: 'Gravedad: grave (15–21)', severity: 'grave' };
    if (score >= 10) return { level: 'Gravedad: moderada (10–14)', severity: 'moderado' };
    if (score >= 5) return { level: 'Gravedad: leve (5–9)', severity: 'leve' };
    return { level: 'Gravedad: mínima (0–4)', severity: 'normal' };
  },
};
