import { Scale } from './types';

const activities: [string, string][] = [
  ['tv', 'Ver la televisión (incluidos vídeos y plataformas)'],
  ['computer_games', 'Jugar con el ordenador o videojuegos'],
  ['listening_music', 'Estar sentado(a) escuchando música'],
  ['phone', 'Estar sentado(a) hablando por teléfono'],
  ['paperwork', 'Hacer papeleo o trabajo de oficina'],
  ['reading', 'Estar sentado(a) leyendo un libro o una revista'],
  ['musical_instrument', 'Tocar un instrumento musical'],
  ['arts_crafts', 'Hacer manualidades o actividades artísticas'],
  ['driving', 'Estar sentado(a) conduciendo o viajando en coche, autobús o tren'],
];

const day = (a: Record<string, number>, kind: 'weekday' | 'weekend') =>
  Math.min(activities.reduce((t, [key]) => t + Math.max(a[`sbq_${key}_${kind}`] ?? 0, 0), 0), 24);

const round1 = (n: number) => Math.round(n * 10) / 10;

export const sedentaryBehavior: Scale = {
  id: 'sedentary_behavior',
  name: 'Cuestionario de conducta sedentaria (SBQ)',
  category: 'Estilo de vida y adherencia',
  description: 'Tiempo que la persona pasa sentada en 9 actividades, en un día laborable y en un día de fin de semana. Resultado: media de horas sedentarias al día.',
  instructions: 'Indique en horas (por ejemplo, 1,5) el tiempo que dedica a cada actividad en un día típico.',
  reference: 'Rosenberg DE, Norman GJ, Wagner N, et al. Reliability and validity of the Sedentary Behavior Questionnaire (SBQ) for adults. J Phys Act Health. 2010;7(6):697-705.',
  scoreUnit: 'h/día',
  scoreDecimals: 1,
  questions: activities.flatMap(([key, label]) => [
    { id: `sbq_${key}_weekday`, text: `${label}: día laborable`, unit: 'h', min: 0, max: 24 },
    { id: `sbq_${key}_weekend`, text: `${label}: día de fin de semana`, unit: 'h', min: 0, max: 24 },
  ]),
  calculateScore: (a) => round1((day(a, 'weekday') * 5 + day(a, 'weekend') * 2) / 7),
  interpretScore: (score, a) => ({
    level: `Tiempo sedentario medio: ${score.toLocaleString('es-ES')} h/día`,
    severity: 'info',
    notes: [
      `Día laborable: ${round1(day(a, 'weekday'))} h · Fin de semana: ${round1(day(a, 'weekend'))} h · Total semanal: ${round1(day(a, 'weekday') * 5 + day(a, 'weekend') * 2)} h.`,
      'El SBQ no define puntos de corte de riesgo; el resultado sirve para describir el patrón y su evolución.',
    ],
  }),
};
