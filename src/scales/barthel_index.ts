import { Scale } from './types';
import { sumOf } from './helpers';

const ids = [
  'barthel_eating', 'barthel_bathing', 'barthel_dressing', 'barthel_grooming', 'barthel_bowels',
  'barthel_bladder', 'barthel_toilet', 'barthel_transfers', 'barthel_mobility', 'barthel_stairs',
];

export const barthelIndex: Scale = {
  id: 'barthel_index',
  name: 'Índice de Barthel',
  category: 'Fragilidad y funcionalidad',
  description: 'Valora la independencia en 10 actividades básicas de la vida diaria (ABVD).',
  reference: 'Mahoney FI, Barthel DW. Functional evaluation: the Barthel Index. Md State Med J. 1965;14:61-5. Versión española: Baztán JJ, et al. Rev Esp Geriatr Gerontol. 1993;28:32-40. Cid-Ruzafa J, Damián-Moreno J. Rev Esp Salud Pública. 1997;71(2):127-37.',
  maxScore: 100,
  questions: [
    {
      id: 'barthel_eating',
      text: 'Comer',
      options: [
        { text: 'Independiente: capaz de usar cualquier instrumento; come en un tiempo razonable', value: 10 },
        { text: 'Necesita ayuda para cortar la carne, untar, etc.', value: 5 },
        { text: 'Dependiente', value: 0 },
      ],
    },
    {
      id: 'barthel_bathing',
      text: 'Lavarse (baño o ducha)',
      options: [
        { text: 'Independiente: se lava entero, entra y sale del baño o ducha sin ayuda', value: 5 },
        { text: 'Dependiente', value: 0 },
      ],
    },
    {
      id: 'barthel_dressing',
      text: 'Vestirse',
      options: [
        { text: 'Independiente: se viste y desviste, se ata los zapatos, abrocha botones', value: 10 },
        { text: 'Necesita ayuda, pero hace al menos la mitad de las tareas en un tiempo razonable', value: 5 },
        { text: 'Dependiente', value: 0 },
      ],
    },
    {
      id: 'barthel_grooming',
      text: 'Arreglarse',
      options: [
        { text: 'Independiente: se lava la cara y las manos, se peina, se afeita o maquilla', value: 5 },
        { text: 'Dependiente', value: 0 },
      ],
    },
    {
      id: 'barthel_bowels',
      text: 'Deposiciones (valorar la semana previa)',
      options: [
        { text: 'Continente: ningún episodio de incontinencia', value: 10 },
        { text: 'Accidente ocasional (máximo uno por semana) o necesita ayuda con enemas o supositorios', value: 5 },
        { text: 'Incontinente', value: 0 },
      ],
    },
    {
      id: 'barthel_bladder',
      text: 'Micción (valorar la semana previa)',
      options: [
        { text: 'Continente, o capaz de cuidarse la sonda si la lleva', value: 10 },
        { text: 'Accidente ocasional (máximo uno en 24 horas) o necesita ayuda con la sonda', value: 5 },
        { text: 'Incontinente', value: 0 },
      ],
    },
    {
      id: 'barthel_toilet',
      text: 'Usar el retrete',
      options: [
        { text: 'Independiente: entra y sale solo, se limpia y se coloca la ropa', value: 10 },
        { text: 'Necesita ayuda, pero se limpia solo', value: 5 },
        { text: 'Dependiente', value: 0 },
      ],
    },
    {
      id: 'barthel_transfers',
      text: 'Trasladarse (sillón–cama)',
      options: [
        { text: 'Independiente', value: 15 },
        { text: 'Mínima ayuda física o supervisión verbal', value: 10 },
        { text: 'Gran ayuda (una persona entrenada o dos personas), pero se mantiene sentado sin ayuda', value: 5 },
        { text: 'Dependiente: necesita grúa o ser levantado por dos personas; no se mantiene sentado', value: 0 },
      ],
    },
    {
      id: 'barthel_mobility',
      text: 'Deambular',
      options: [
        { text: 'Independiente: camina 50 m solo; puede usar bastón o muletas, pero no andador', value: 15 },
        { text: 'Necesita supervisión o pequeña ayuda física para caminar 50 m, o usa andador', value: 10 },
        { text: 'Independiente en silla de ruedas, sin ayuda ni supervisión (50 m)', value: 5 },
        { text: 'Dependiente', value: 0 },
      ],
    },
    {
      id: 'barthel_stairs',
      text: 'Subir y bajar escaleras',
      options: [
        { text: 'Independiente: sube y baja un piso sin ayuda ni supervisión; puede usar barandilla o bastón', value: 10 },
        { text: 'Necesita ayuda física o supervisión', value: 5 },
        { text: 'Dependiente', value: 0 },
      ],
    },
  ],
  calculateScore: (a) => sumOf(a, ids),
  interpretScore: (score) => {
    if (score === 100) return { level: 'Independiente (100)', severity: 'normal' };
    if (score >= 60) return { level: 'Dependencia leve (≥60)', severity: 'leve', notes: ['En personas en silla de ruedas, el máximo alcanzable es 90.'] };
    if (score >= 40) return { level: 'Dependencia moderada (40–55)', severity: 'moderado' };
    if (score >= 20) return { level: 'Dependencia grave (20–35)', severity: 'grave' };
    return { level: 'Dependencia total (<20)', severity: 'grave' };
  },
};
