import { Scale } from './types';
import { sexOptions } from './helpers';

const lowerLimits: [number, number, number, number][] = [
  [60, 64, 14, 12],
  [65, 69, 12, 11],
  [70, 74, 12, 10],
  [75, 79, 11, 10],
  [80, 84, 10, 9],
  [85, 89, 8, 8],
  [90, 94, 7, 4],
];

export const chairStandTest: Scale = {
  id: 'chair_stand_test',
  name: 'Test de la silla (30 segundos)',
  category: 'Fragilidad y funcionalidad',
  description: 'Número de veces que la persona se levanta completamente de una silla y se vuelve a sentar en 30 segundos, con los brazos cruzados sobre el pecho. Se compara con los valores de referencia por edad y sexo (60–94 años).',
  reference: 'Jones CJ, Rikli RE, Beam WC. A 30-s chair-stand test as a measure of lower body strength in community-residing older adults. Res Q Exerc Sport. 1999;70(2):113-9. Rikli RE, Jones CJ. J Aging Phys Act. 1999;7(2):162-81.',
  scoreUnit: 'repeticiones',
  questions: [
    { id: 'chair_sex', text: 'Sexo', options: sexOptions },
    { id: 'chair_age', text: 'Edad', unit: 'años', min: 18, max: 120 },
    { id: 'repetitions', text: 'Repeticiones completas en 30 segundos', unit: 'repeticiones', min: 0, max: 60 },
  ],
  calculateScore: (a) => a.repetitions ?? 0,
  interpretScore: (score, a) => {
    const age = a.chair_age ?? 0;
    const row = lowerLimits.find(([from, to]) => age >= from && age <= to);
    if (!row) {
      return { level: 'Sin valores de referencia para esta edad', severity: 'info', notes: ['Las normas de Rikli y Jones abarcan de 60 a 94 años.'] };
    }
    const limit = a.chair_sex === 1 ? row[3] : row[2];
    const notes = [`Límite inferior de normalidad para ${row[0]}–${row[1]} años (${a.chair_sex === 1 ? 'mujeres' : 'hombres'}): ${limit} repeticiones.`];
    return score < limit
      ? { level: 'Por debajo del rango de referencia', severity: 'moderado', notes: [...notes, 'Un valor por debajo del rango se asocia a mayor riesgo de caídas.'] }
      : { level: 'Dentro o por encima del rango de referencia', severity: 'normal', notes };
  },
};
