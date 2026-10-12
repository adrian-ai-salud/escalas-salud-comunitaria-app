import { Scale } from './types';

const capMinutes = (minutes: number) => Math.min(Math.max(minutes, 0), 180);
const capDays = (days: number) => Math.min(Math.max(Math.round(days), 0), 7);

const domain = (a: Record<string, number>, name: string, met: number) => {
  const days = capDays(a[`ipaq_sf_${name}_days`] ?? 0);
  const minutes = capMinutes(a[`ipaq_sf_${name}_minutes`] ?? 0);
  const effectiveMinutes = minutes >= 10 ? minutes : 0;
  return { days: effectiveMinutes > 0 ? days : 0, minutes: effectiveMinutes, met: days * effectiveMinutes * met };
};

const summarize = (a: Record<string, number>) => {
  const vigorous = domain(a, 'vigorous', 8);
  const moderate = domain(a, 'moderate', 4);
  const walking = domain(a, 'walking', 3.3);
  return { vigorous, moderate, walking, total: vigorous.met + moderate.met + walking.met };
};

export const ipaqSf: Scale = {
  id: 'ipaq_sf',
  name: 'IPAQ-SF (versión corta)',
  category: 'Estilo de vida y adherencia',
  description: 'Actividad física en los últimos 7 días, expresada en MET-minutos por semana y en categorías (baja, moderada, alta) según el protocolo oficial de puntuación.',
  instructions: 'Piense solo en las actividades que realizó durante al menos 10 minutos seguidos. Si un día no hizo la actividad, indique 0 días y 0 minutos.',
  reference: 'Craig CL, Marshall AL, Sjöström M, et al. International Physical Activity Questionnaire: 12-country reliability and validity. Med Sci Sports Exerc. 2003;35(8):1381-95. IPAQ Research Committee. Guidelines for data processing and analysis of the IPAQ, 2005.',
  scoreUnit: 'MET-min/semana',
  scoreDecimals: 0,
  questions: [
    { id: 'ipaq_sf_vigorous_days', text: 'Durante los últimos 7 días, ¿cuántos días realizó actividades físicas vigorosas (levantar pesos, cavar, aeróbic, bicicleta rápida)?', unit: 'días', min: 0, max: 7 },
    { id: 'ipaq_sf_vigorous_minutes', text: 'Habitualmente, ¿cuántos minutos dedicó a actividades vigorosas en uno de esos días?', unit: 'min/día', min: 0, max: 960 },
    { id: 'ipaq_sf_moderate_days', text: 'Durante los últimos 7 días, ¿cuántos días realizó actividades físicas moderadas (transportar pesos ligeros, bicicleta a velocidad regular)? No incluya caminar.', unit: 'días', min: 0, max: 7 },
    { id: 'ipaq_sf_moderate_minutes', text: 'Habitualmente, ¿cuántos minutos dedicó a actividades moderadas en uno de esos días?', unit: 'min/día', min: 0, max: 960 },
    { id: 'ipaq_sf_walking_days', text: 'Durante los últimos 7 días, ¿cuántos días caminó al menos 10 minutos seguidos?', unit: 'días', min: 0, max: 7 },
    { id: 'ipaq_sf_walking_minutes', text: 'Habitualmente, ¿cuántos minutos caminó en uno de esos días?', unit: 'min/día', min: 0, max: 960 },
    { id: 'ipaq_sf_sitting_minutes', text: 'Durante los últimos 7 días, ¿cuánto tiempo pasó sentado(a) en un día laborable?', unit: 'min/día', min: 0, max: 1440 },
  ],
  calculateScore: (a) => Math.round(summarize(a).total),
  interpretScore: (score, a) => {
    const { vigorous, moderate, walking } = summarize(a);
    const totalDays = vigorous.days + moderate.days + walking.days;
    const notes = [
      `Vigorosa: ${Math.round(vigorous.met)} · Moderada: ${Math.round(moderate.met)} · Caminar: ${Math.round(walking.met)} MET-min/semana.`,
      `Tiempo sentado en un día laborable: ${a.ipaq_sf_sitting_minutes ?? 0} min.`,
      'Según el protocolo, los minutos diarios se truncan a 180 y los episodios de menos de 10 minutos no se cuentan.',
    ];
    if ((vigorous.days >= 3 && score >= 1500) || (totalDays >= 7 && score >= 3000)) {
      return { level: 'Actividad física alta', severity: 'normal', notes };
    }
    const daysWith30 = (moderate.minutes >= 30 ? moderate.days : 0) + (walking.minutes >= 30 ? walking.days : 0);
    const moderateLevel =
      (vigorous.days >= 3 && vigorous.minutes >= 20) || daysWith30 >= 5 || (totalDays >= 5 && score >= 600);
    if (moderateLevel) return { level: 'Actividad física moderada', severity: 'leve', notes };
    return { level: 'Actividad física baja', severity: 'moderado', notes };
  },
};
