import { Scale } from './types';
import { sexOptions } from './helpers';

type Range = [number, number, number];

const fatRanges: Record<'0' | '1', [number, number, Range][]> = {
  '0': [
    [20, 39, [8, 20, 25]],
    [40, 59, [11, 22, 28]],
    [60, 79, [13, 25, 30]],
  ],
  '1': [
    [20, 39, [21, 33, 39]],
    [40, 59, [23, 34, 40]],
    [60, 79, [24, 36, 42]],
  ],
};

const classify = (value: number, [low, overweight, obesity]: Range) =>
  value < low ? 'baja' : value < overweight ? 'normal' : value < obesity ? 'alta' : 'muy alta';

export const bioimpedanceScale: Scale = {
  id: 'bioimpedance',
  name: 'Interpretación de bioimpedancia',
  category: 'Calculadoras',
  description: 'Compara los valores de un analizador de bioimpedancia doméstico con rangos de referencia orientativos. Los rangos de masa muscular, agua y grasa visceral dependen del fabricante del aparato.',
  reference: 'Grasa corporal: Gallagher D, Heymsfield SB, Heo M, et al. Healthy percentage body fat ranges. Am J Clin Nutr. 2000;72(3):694-701. Resto de parámetros: rangos orientativos de fabricantes de básculas de bioimpedancia.',
  scoreUnit: '% grasa',
  scoreDecimals: 1,
  questions: [
    { id: 'sex', text: 'Sexo', options: sexOptions },
    { id: 'age', text: 'Edad', unit: 'años', min: 18, max: 100 },
    { id: 'bodyFat', text: 'Grasa corporal', unit: '%', min: 2, max: 70 },
    { id: 'muscleMass', text: 'Masa muscular esquelética', unit: '%', min: 5, max: 70 },
    { id: 'bodyWater', text: 'Agua corporal total', unit: '%', min: 20, max: 80 },
    { id: 'visceralFat', text: 'Nivel de grasa visceral', unit: 'nivel', min: 1, max: 59 },
  ],
  calculateScore: (a) => a.bodyFat,
  interpretScore: (score, a) => {
    const woman = a.sex === 1;
    const row = fatRanges[woman ? '1' : '0'].find(([from, to]) => a.age >= from && a.age <= to);
    const muscle = a.muscleMass < (woman ? 24.3 : 33.3) ? 'baja' : a.muscleMass <= (woman ? 30.3 : 39.3) ? 'normal' : 'alta';
    const water = a.bodyWater < (woman ? 45 : 50) ? 'baja' : a.bodyWater <= (woman ? 60 : 65) ? 'normal' : 'alta';
    const visceral = a.visceralFat <= 12 ? 'normal' : 'alta';
    const notes = [
      `Masa muscular: ${muscle}.`,
      `Agua corporal: ${water}.`,
      `Grasa visceral: ${visceral}.`,
    ];
    if (!row) {
      return { level: 'Grasa corporal: sin rango de referencia para esta edad (20–79 años)', severity: 'info', notes };
    }
    const fat = classify(score, row[2]);
    const severity = fat === 'normal' ? 'normal' : fat === 'muy alta' ? 'grave' : 'moderado';
    return { level: `Grasa corporal ${fat}`, severity, notes: [`Rango saludable para su edad y sexo: de ${row[2][0]} % a menos de ${row[2][1]} %.`, ...notes] };
  },
};
