import { Option, Scale } from './types';
import { idsOf, sumOf } from './helpers';

const direct: Option[] = [
  { text: 'Siempre', value: 3 },
  { text: 'Casi siempre', value: 2 },
  { text: 'A menudo', value: 1 },
  { text: 'Algunas veces', value: 0 },
  { text: 'Casi nunca', value: 0 },
  { text: 'Nunca', value: 0 },
];

const reverse: Option[] = [
  { text: 'Siempre', value: 0 },
  { text: 'Casi siempre', value: 0 },
  { text: 'A menudo', value: 0 },
  { text: 'Algunas veces', value: 1 },
  { text: 'Casi nunca', value: 2 },
  { text: 'Nunca', value: 3 },
];

const items = [
  'Me angustia la idea de estar demasiado gordo(a).',
  'Procuro no comer cuando tengo hambre.',
  'La comida es para mí una preocupación habitual.',
  'He sufrido atracones en los que tenía la sensación de no poder parar de comer.',
  'Corto mis alimentos en trozos pequeños.',
  'Conozco la cantidad de calorías de los alimentos que como.',
  'Procuro no comer alimentos con muchos hidratos de carbono (pan, arroz, patatas, etc.).',
  'Tengo la impresión de que a los demás les gustaría verme comer más.',
  'Vomito después de comer.',
  'Me siento muy culpable después de comer.',
  'Me obsesiona el deseo de estar más delgado(a).',
  'Cuando hago deporte pienso sobre todo en quemar calorías.',
  'Los demás piensan que estoy demasiado delgado(a).',
  'Me preocupa la idea de tener zonas gordas en el cuerpo o tener celulitis.',
  'Tardo más tiempo que los demás en comer.',
  'Procuro no comer alimentos que tengan azúcar.',
  'Como alimentos dietéticos.',
  'Tengo la impresión de que mi vida gira alrededor de la comida.',
  'Tengo un buen autocontrol en lo que se refiere a la comida.',
  'Tengo la sensación de que los demás me presionan para que coma más.',
  'Paso demasiado tiempo pensando en la comida.',
  'No me siento bien después de haber tomado dulces.',
  'Estoy haciendo dieta.',
  'Me gusta tener el estómago vacío.',
  'Me gusta probar platos nuevos, sabrosos y ricos en calorías.',
  'Después de las comidas tengo el impulso de vomitar.',
];

const ids = idsOf('eat26_q', 26);

export const eat26: Scale = {
  id: 'eat26',
  name: 'EAT-26 (Eating Attitudes Test)',
  category: 'Promoción comunitaria y bienestar',
  description: 'Cribado de actitudes y conductas de riesgo de trastorno de la conducta alimentaria. El ítem 25 se puntúa a la inversa.',
  reference: 'Garner DM, Olmsted MP, Bohr Y, Garfinkel PE. The Eating Attitudes Test: psychometric features and clinical correlates. Psychol Med. 1982;12(4):871-8. Versión española: Castro J, Toro J, Salamero M, Guimerá E. Evaluación Psicológica. 1991;7:175-90.',
  maxScore: 78,
  questions: items.map((text, i) => ({ id: ids[i], text, options: i === 24 ? reverse : direct })),
  calculateScore: (a) => sumOf(a, ids),
  interpretScore: (score) =>
    score >= 20
      ? { level: 'Cribado positivo (≥20)', severity: 'grave', notes: ['Indica actitudes de riesgo que justifican una valoración especializada.'] }
      : { level: 'Cribado negativo (<20)', severity: 'normal' },
};
