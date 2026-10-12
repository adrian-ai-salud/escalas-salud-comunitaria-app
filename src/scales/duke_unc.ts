import { Option, Scale } from './types';
import { idsOf, sumOf } from './helpers';

const options: Option[] = [
  { text: 'Mucho menos de lo que deseo', value: 1 },
  { text: 'Menos de lo que deseo', value: 2 },
  { text: 'Ni mucho ni poco', value: 3 },
  { text: 'Casi como deseo', value: 4 },
  { text: 'Tanto como deseo', value: 5 },
];

const items = [
  'Recibo visitas de mis amigos y familiares',
  'Recibo ayuda en asuntos relacionados con mi casa',
  'Recibo elogios y reconocimientos cuando hago bien mi trabajo',
  'Cuento con personas que se preocupan de lo que me sucede',
  'Recibo amor y afecto',
  'Tengo la posibilidad de hablar con alguien de mis problemas en el trabajo o en la casa',
  'Tengo la posibilidad de hablar con alguien de mis problemas personales y familiares',
  'Tengo la posibilidad de hablar con alguien de mis problemas económicos',
  'Recibo invitaciones para distraerme y salir con otras personas',
  'Recibo consejos útiles cuando me ocurre algún acontecimiento importante en mi vida',
  'Recibo ayuda cuando estoy enfermo(a) en la cama',
];

const ids = idsOf('duke_q', 11);

export const dukeUnc: Scale = {
  id: 'duke_unc',
  name: 'Duke-UNC-11 (apoyo social funcional)',
  category: 'Promoción comunitaria y bienestar',
  description: 'Apoyo social funcional percibido en sus dimensiones confidencial y afectiva.',
  instructions: 'En la siguiente lista se muestran algunas cosas que otras personas hacen por nosotros o nos proporcionan. Elija para cada una la respuesta que mejor refleje su situación.',
  reference: 'Bellón JA, Delgado A, Luna JD, Lardelli P. Validez y fiabilidad del cuestionario de apoyo social funcional Duke-UNC-11. Aten Primaria. 1996;18(4):153-63.',
  maxScore: 55,
  questions: items.map((text, i) => ({ id: ids[i], text, options })),
  calculateScore: (a) => sumOf(a, ids),
  interpretScore: (score) =>
    score >= 32
      ? { level: 'Apoyo social percibido normal (≥32)', severity: 'normal' }
      : { level: 'Apoyo social percibido bajo (<32)', severity: 'moderado' },
};
