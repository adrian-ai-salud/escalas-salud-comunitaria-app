import { Scale } from './types';
import { idsOf, sumOf, yesNo } from './helpers';

const ids = idsOf('fagerstrom_q', 6);

export const fagerstrom: Scale = {
  id: 'fagerstrom',
  name: 'Test de Fagerström',
  category: 'Consumo de sustancias',
  description: 'Valora el grado de dependencia física a la nicotina en personas fumadoras.',
  reference: 'Heatherton TF, Kozlowski LT, Frecker RC, Fagerström KO. The Fagerström Test for Nicotine Dependence. Br J Addict. 1991;86(9):1119-27. Versión española: Becoña E, Vázquez FL. Psychol Rep. 1998;83(3 Pt 2):1455-8.',
  maxScore: 10,
  questions: [
    {
      id: ids[0],
      text: '¿Cuánto tiempo pasa desde que se despierta hasta que fuma el primer cigarrillo?',
      options: [
        { text: 'Hasta 5 minutos', value: 3 },
        { text: 'De 6 a 30 minutos', value: 2 },
        { text: 'De 31 a 60 minutos', value: 1 },
        { text: 'Más de 60 minutos', value: 0 },
      ],
    },
    { id: ids[1], text: '¿Le resulta difícil no fumar en lugares donde está prohibido (hospital, cine, biblioteca)?', options: yesNo() },
    {
      id: ids[2],
      text: '¿Qué cigarrillo le costaría más dejar?',
      options: [
        { text: 'El primero de la mañana', value: 1 },
        { text: 'Cualquier otro', value: 0 },
      ],
    },
    {
      id: ids[3],
      text: '¿Cuántos cigarrillos fuma al día?',
      options: [
        { text: '10 o menos', value: 0 },
        { text: '11–20', value: 1 },
        { text: '21–30', value: 2 },
        { text: '31 o más', value: 3 },
      ],
    },
    { id: ids[4], text: '¿Fuma con más frecuencia durante las primeras horas después de levantarse que durante el resto del día?', options: yesNo() },
    { id: ids[5], text: '¿Fuma aunque esté tan enfermo que tenga que guardar cama la mayor parte del día?', options: yesNo() },
  ],
  calculateScore: (a) => sumOf(a, ids),
  interpretScore: (score) => {
    if (score >= 8) return { level: 'Dependencia muy alta (8–10)', severity: 'grave' };
    if (score >= 6) return { level: 'Dependencia alta (6–7)', severity: 'grave' };
    if (score === 5) return { level: 'Dependencia media (5)', severity: 'moderado' };
    if (score >= 3) return { level: 'Dependencia baja (3–4)', severity: 'leve' };
    return { level: 'Dependencia muy baja (0–2)', severity: 'normal' };
  },
};
