import { Scale } from './types';
import { frequency2Weeks, sumOf } from './helpers';

export const phq2: Scale = {
  id: 'phq2',
  name: 'PHQ-2',
  category: 'Salud mental y emocional',
  description: 'Cribado inicial de depresión con los dos primeros ítems del PHQ-9.',
  instructions: 'Durante las últimas 2 semanas, ¿con qué frecuencia le han molestado los siguientes problemas?',
  reference: 'Kroenke K, Spitzer RL, Williams JB. The Patient Health Questionnaire-2: validity of a two-item depression screener. Med Care. 2003;41(11):1284-92.',
  maxScore: 6,
  questions: [
    { id: 'phq2_q1', text: 'Poco interés o placer en hacer cosas.', options: frequency2Weeks },
    { id: 'phq2_q2', text: 'Se ha sentido decaído(a), deprimido(a) o sin esperanzas.', options: frequency2Weeks },
  ],
  calculateScore: (a) => sumOf(a, ['phq2_q1', 'phq2_q2']),
  interpretScore: (score) =>
    score >= 3
      ? { level: 'Cribado positivo (≥3)', severity: 'moderado', notes: ['El punto de corte ≥3 indica completar la evaluación con el PHQ-9.'] }
      : { level: 'Cribado negativo (<3)', severity: 'normal' },
};
