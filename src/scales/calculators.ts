import { Scale } from './types';
import { sexOptions } from './helpers';

const round = (n: number, decimals: number) => Math.round(n * 10 ** decimals) / 10 ** decimals;

export const imc: Scale = {
  id: 'imc',
  name: 'Índice de masa corporal (IMC)',
  category: 'Calculadoras',
  description: 'Peso (kg) dividido por la talla al cuadrado (m²). Clasificación de la OMS para adultos.',
  reference: 'World Health Organization. Obesity: preventing and managing the global epidemic. WHO Technical Report Series 894. Ginebra: WHO; 2000.',
  scoreUnit: 'kg/m²',
  scoreDecimals: 1,
  questions: [
    { id: 'weight', text: 'Peso', unit: 'kg', min: 2, max: 400 },
    { id: 'height', text: 'Talla', unit: 'cm', min: 50, max: 250 },
  ],
  calculateScore: (a) => round(a.weight / (a.height / 100) ** 2, 1),
  interpretScore: (score) => {
    if (score < 18.5) return { level: 'Bajo peso (<18,5)', severity: 'moderado' };
    if (score < 25) return { level: 'Normopeso (18,5–24,9)', severity: 'normal' };
    if (score < 30) return { level: 'Sobrepeso (25–29,9)', severity: 'leve' };
    if (score < 35) return { level: 'Obesidad grado I (30–34,9)', severity: 'moderado' };
    if (score < 40) return { level: 'Obesidad grado II (35–39,9)', severity: 'grave' };
    return { level: 'Obesidad grado III (≥40)', severity: 'grave' };
  },
};

export const cockcroftGault: Scale = {
  id: 'cockcroft_gault',
  name: 'Aclaramiento de creatinina (Cockcroft-Gault)',
  category: 'Calculadoras',
  description: 'Estima el aclaramiento de creatinina, útil para ajustar dosis de fármacos. No equivale al filtrado glomerular: para estadificar la enfermedad renal crónica, KDIGO recomienda el FG estimado por CKD-EPI.',
  reference: 'Cockcroft DW, Gault MH. Prediction of creatinine clearance from serum creatinine. Nephron. 1976;16(1):31-41.',
  scoreUnit: 'ml/min',
  scoreDecimals: 0,
  questions: [
    { id: 'sex', text: 'Sexo', options: sexOptions },
    { id: 'age', text: 'Edad', unit: 'años', min: 18, max: 120 },
    { id: 'weight', text: 'Peso', unit: 'kg', min: 20, max: 300 },
    { id: 'creatinine', text: 'Creatinina sérica', unit: 'mg/dl', min: 0.1, max: 20 },
  ],
  calculateScore: (a) => {
    const value = ((140 - a.age) * a.weight) / (72 * a.creatinine);
    return round(a.sex === 1 ? value * 0.85 : value, 0);
  },
  interpretScore: (score) => {
    if (score >= 90) return { level: 'Aclaramiento ≥90 ml/min', severity: 'normal' };
    if (score >= 60) return { level: 'Aclaramiento 60–89 ml/min', severity: 'leve' };
    if (score >= 30) return { level: 'Aclaramiento 30–59 ml/min', severity: 'moderado' };
    if (score >= 15) return { level: 'Aclaramiento 15–29 ml/min', severity: 'grave' };
    return { level: 'Aclaramiento <15 ml/min', severity: 'grave' };
  },
};

export const harrisBenedict: Scale = {
  id: 'harris_benedict',
  name: 'Gasto energético basal (Harris-Benedict)',
  category: 'Calculadoras',
  description: 'Estima las kilocalorías diarias en reposo. Para el gasto total, multiplique por el factor de actividad o de estrés que corresponda.',
  reference: 'Harris JA, Benedict FG. A biometric study of human basal metabolism. Proc Natl Acad Sci USA. 1918;4(12):370-3.',
  scoreUnit: 'kcal/día',
  scoreDecimals: 0,
  questions: [
    { id: 'sex', text: 'Sexo', options: sexOptions },
    { id: 'weight', text: 'Peso', unit: 'kg', min: 20, max: 300 },
    { id: 'height', text: 'Talla', unit: 'cm', min: 100, max: 250 },
    { id: 'age', text: 'Edad', unit: 'años', min: 18, max: 120 },
  ],
  calculateScore: (a) =>
    round(
      a.sex === 1
        ? 655.0955 + 9.5634 * a.weight + 1.8496 * a.height - 4.6756 * a.age
        : 66.473 + 13.7516 * a.weight + 5.0033 * a.height - 6.755 * a.age,
      0,
    ),
  interpretScore: (score) => ({ level: `Gasto energético basal: ${score} kcal/día`, severity: 'info' }),
};

export const lorentz: Scale = {
  id: 'lorentz',
  name: 'Peso ideal (Lorentz)',
  category: 'Calculadoras',
  description: 'Peso de referencia según talla y sexo. Es una estimación orientativa que no tiene en cuenta la composición corporal.',
  reference: 'Lorentz FH. Ein neuer Konstitutionsindex. Klin Wochenschr. 1929;8:348-51.',
  scoreUnit: 'kg',
  scoreDecimals: 1,
  questions: [
    { id: 'sex', text: 'Sexo', options: sexOptions },
    { id: 'height', text: 'Talla', unit: 'cm', min: 100, max: 250 },
  ],
  calculateScore: (a) => round(a.height - 100 - (a.height - 150) / (a.sex === 1 ? 2.5 : 4), 1),
  interpretScore: (score) => ({ level: `Peso ideal estimado: ${score.toLocaleString('es-ES')} kg`, severity: 'info' }),
};

export const calculators: Scale[] = [imc, cockcroftGault, harrisBenedict, lorentz];
