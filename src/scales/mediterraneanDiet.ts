import { Option, Scale } from './types';
import { idsOf, sumOf } from './helpers';

const two = (zero: string, one: string): Option[] => [
  { text: zero, value: 0 },
  { text: one, value: 1 },
];

const items: [string, Option[]][] = [
  ['¿Usa usted el aceite de oliva como principal grasa para cocinar?', two('No', 'Sí')],
  ['¿Cuánto aceite de oliva consume en total al día (incluido el usado para freír, comidas fuera de casa, ensaladas, etc.)?', two('Menos de 4 cucharadas', '4 o más cucharadas')],
  ['¿Cuántas raciones de verdura u hortalizas consume al día? (las guarniciones cuentan como media ración)', two('Menos de 2', '2 o más (al menos una cruda o en ensalada)')],
  ['¿Cuántas piezas de fruta (incluido el zumo natural) consume al día?', two('Menos de 3', '3 o más')],
  ['¿Cuántas raciones de carnes rojas, hamburguesas, salchichas o embutidos consume al día? (ración: 100–150 g)', two('1 o más', 'Menos de 1')],
  ['¿Cuántas raciones de mantequilla, margarina o nata consume al día? (porción individual: 12 g)', two('1 o más', 'Menos de 1')],
  ['¿Cuántas bebidas carbonatadas o azucaradas (refrescos, colas, tónicas, bitter) consume al día?', two('1 o más', 'Menos de 1')],
  ['¿Bebe usted vino? ¿Cuánto consume a la semana?', two('Menos de 7 vasos', '7 o más vasos')],
  ['¿Cuántas raciones de legumbres consume a la semana? (ración: 150 g)', two('Menos de 3', '3 o más')],
  ['¿Cuántas raciones de pescado o marisco consume a la semana? (ración: 100–150 g de pescado o 4–5 piezas de marisco)', two('Menos de 3', '3 o más')],
  ['¿Cuántas veces consume repostería comercial (no casera) como galletas, flanes, dulces o pasteles a la semana?', two('3 o más', 'Menos de 3')],
  ['¿Cuántas veces consume frutos secos a la semana? (ración: 30 g)', two('Menos de 3', '3 o más')],
  ['¿Consume preferentemente carne de pollo, pavo o conejo en vez de ternera, cerdo, hamburguesas o salchichas?', two('No', 'Sí')],
  ['¿Cuántas veces a la semana consume vegetales cocinados, pasta, arroz u otros platos aderezados con sofrito (salsa de tomate, ajo, cebolla o puerro elaborada a fuego lento con aceite de oliva)?', two('Menos de 2', '2 o más')],
];

const ids = idsOf('medas_q', 14);

export const mediterraneanDiet: Scale = {
  id: 'medas',
  name: 'Adherencia a la dieta mediterránea (MEDAS-14)',
  category: 'Estilo de vida y adherencia',
  description: 'Cuestionario de 14 puntos del estudio PREDIMED sobre adherencia a la dieta mediterránea.',
  reference: 'Schröder H, Fitó M, Estruch R, et al. A short screener is valid for assessing Mediterranean diet adherence among older Spanish men and women. J Nutr. 2011;141(6):1140-5. Martínez-González MA, et al. PLoS One. 2012;7(8):e43134.',
  maxScore: 14,
  questions: items.map(([text, options], i) => ({ id: ids[i], text, options })),
  calculateScore: (a) => sumOf(a, ids),
  interpretScore: (score) =>
    score >= 9
      ? { level: 'Buena adherencia (≥9)', severity: 'normal' }
      : { level: 'Baja adherencia (<9)', severity: 'moderado' },
};
