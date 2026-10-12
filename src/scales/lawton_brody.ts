import { Scale } from './types';
import { sumOf } from './helpers';

const ids = [
  'lawton_phone', 'lawton_shopping', 'lawton_food_prep', 'lawton_housekeeping',
  'lawton_laundry', 'lawton_transportation', 'lawton_medication', 'lawton_finances',
];

export const lawtonBrody: Scale = {
  id: 'lawton_brody',
  name: 'Escala de Lawton y Brody (AIVD)',
  category: 'Fragilidad y funcionalidad',
  description: 'Valora la autonomía en 8 actividades instrumentales de la vida diaria (AIVD). Cada ítem puntúa 1 (independiente) o 0 (dependiente); a mayor puntuación, mayor independencia.',
  reference: 'Lawton MP, Brody EM. Assessment of older people: self-maintaining and instrumental activities of daily living. Gerontologist. 1969;9(3):179-86.',
  maxScore: 8,
  questions: [
    {
      id: 'lawton_phone',
      text: 'Capacidad para usar el teléfono',
      options: [
        { text: 'Lo usa por iniciativa propia, busca y marca números', value: 1 },
        { text: 'Marca bien algunos números conocidos', value: 1 },
        { text: 'Contesta el teléfono, pero no marca', value: 1 },
        { text: 'No usa el teléfono', value: 0 },
      ],
    },
    {
      id: 'lawton_shopping',
      text: 'Hacer compras',
      options: [
        { text: 'Realiza todas las compras necesarias de forma independiente', value: 1 },
        { text: 'Realiza de forma independiente pequeñas compras', value: 0 },
        { text: 'Necesita compañía para cualquier compra', value: 0 },
        { text: 'Totalmente incapaz de comprar', value: 0 },
      ],
    },
    {
      id: 'lawton_food_prep',
      text: 'Preparación de la comida',
      options: [
        { text: 'Organiza, prepara y sirve las comidas por sí mismo adecuadamente', value: 1 },
        { text: 'Prepara adecuadamente las comidas si se le proporcionan los ingredientes', value: 0 },
        { text: 'Prepara, calienta y sirve las comidas, pero no sigue una dieta adecuada', value: 0 },
        { text: 'Necesita que le preparen y sirvan las comidas', value: 0 },
      ],
    },
    {
      id: 'lawton_housekeeping',
      text: 'Cuidado de la casa',
      options: [
        { text: 'Mantiene la casa solo o con ayuda ocasional para trabajos pesados', value: 1 },
        { text: 'Realiza tareas ligeras, como lavar los platos o hacer las camas', value: 1 },
        { text: 'Realiza tareas ligeras, pero no mantiene un nivel de limpieza aceptable', value: 1 },
        { text: 'Necesita ayuda en todas las labores de la casa', value: 0 },
        { text: 'No participa en ninguna labor de la casa', value: 0 },
      ],
    },
    {
      id: 'lawton_laundry',
      text: 'Lavado de la ropa',
      options: [
        { text: 'Lava por sí mismo toda su ropa', value: 1 },
        { text: 'Lava por sí mismo pequeñas prendas', value: 1 },
        { text: 'Otra persona se encarga de todo el lavado', value: 0 },
      ],
    },
    {
      id: 'lawton_transportation',
      text: 'Uso de medios de transporte',
      options: [
        { text: 'Viaja solo en transporte público o conduce su propio coche', value: 1 },
        { text: 'Es capaz de coger un taxi, pero no usa otro medio de transporte', value: 1 },
        { text: 'Viaja en transporte público cuando va acompañado', value: 1 },
        { text: 'Solo utiliza taxi o automóvil con ayuda de otros', value: 0 },
        { text: 'No viaja', value: 0 },
      ],
    },
    {
      id: 'lawton_medication',
      text: 'Responsabilidad respecto a la medicación',
      options: [
        { text: 'Es capaz de tomar su medicación a la hora y dosis correctas', value: 1 },
        { text: 'Toma su medicación si se le prepara con antelación en dosis separadas', value: 0 },
        { text: 'No es capaz de administrarse su medicación', value: 0 },
      ],
    },
    {
      id: 'lawton_finances',
      text: 'Manejo de asuntos económicos',
      options: [
        { text: 'Se encarga de sus asuntos económicos por sí solo', value: 1 },
        { text: 'Realiza las compras de cada día, pero necesita ayuda en las grandes compras y en el banco', value: 1 },
        { text: 'Incapaz de manejar dinero', value: 0 },
      ],
    },
  ],
  calculateScore: (a) => sumOf(a, ids),
  interpretScore: (score) => {
    const notes = ['La escala original no define puntos de corte validados; las categorías son las de uso habitual en atención primaria.'];
    if (score === 8) return { level: 'Independiente (8)', severity: 'normal', notes };
    if (score >= 6) return { level: 'Dependencia leve (6–7)', severity: 'leve', notes };
    if (score >= 4) return { level: 'Dependencia moderada (4–5)', severity: 'moderado', notes };
    if (score >= 2) return { level: 'Dependencia grave (2–3)', severity: 'grave', notes };
    return { level: 'Dependencia total (0–1)', severity: 'grave', notes };
  },
};
