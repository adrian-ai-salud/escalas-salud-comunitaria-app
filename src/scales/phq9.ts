import { Scale } from './types';
import { frequency2Weeks, idsOf, sumOf } from './helpers';

const items = [
  'Poco interés o placer en hacer cosas.',
  'Se ha sentido decaído(a), deprimido(a) o sin esperanzas.',
  'Ha tenido dificultad para quedarse o permanecer dormido(a), o ha dormido demasiado.',
  'Se ha sentido cansado(a) o con poca energía.',
  'Sin apetito o ha comido en exceso.',
  'Se ha sentido mal con usted mismo(a), o que es un fracaso, o que ha quedado mal con usted mismo(a) o con su familia.',
  'Ha tenido dificultad para concentrarse en ciertas actividades, tales como leer el periódico o ver la televisión.',
  '¿Se ha movido o hablado tan lento que otras personas podrían haberlo notado? O lo contrario: muy inquieto(a) o agitado(a), moviéndose mucho más de lo normal.',
  'Pensamientos de que estaría mejor muerto(a) o de lastimarse de alguna manera.',
];

const ids = idsOf('phq9_q', 9);

export const phq9: Scale = {
  id: 'phq9',
  name: 'PHQ-9',
  category: 'Salud mental y emocional',
  description: 'Cuestionario de 9 ítems para el cribado y la valoración de la gravedad de los síntomas depresivos.',
  instructions: 'Durante las últimas 2 semanas, ¿con qué frecuencia le han molestado los siguientes problemas?',
  reference: 'Kroenke K, Spitzer RL, Williams JB. The PHQ-9: validity of a brief depression severity measure. J Gen Intern Med. 2001;16(9):606-13. Versión española: Diez-Quevedo C, et al. Psychosom Med. 2001;63(4):679-86.',
  maxScore: 27,
  questions: items.map((text, i) => ({ id: ids[i], text, options: frequency2Weeks })),
  calculateScore: (a) => sumOf(a, ids),
  interpretScore: (score, a) => {
    const alert = (a.phq9_q9 ?? 0) > 0
      ? 'Ítem 9 positivo: la persona refiere pensamientos de muerte o de hacerse daño. Valore hoy el riesgo de suicidio, sea cual sea la puntuación total.'
      : undefined;
    if (score >= 20) return { level: 'Gravedad: grave (20–27)', severity: 'grave', alert };
    if (score >= 15) return { level: 'Gravedad: moderadamente grave (15–19)', severity: 'grave', alert };
    if (score >= 10) return { level: 'Gravedad: moderada (10–14)', severity: 'moderado', alert };
    if (score >= 5) return { level: 'Gravedad: leve (5–9)', severity: 'leve', alert };
    return { level: 'Gravedad: mínima (0–4)', severity: 'normal', alert };
  },
};
