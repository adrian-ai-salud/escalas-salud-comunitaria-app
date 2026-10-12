import { Scale } from './types';
import { idsOf, sumOf, yesNo } from './helpers';

const items = [
  '¿Ha consumido drogas distintas de las requeridas por razones médicas?',
  '¿Consume más de una droga a la vez?',
  '¿Es siempre capaz de dejar de consumir drogas cuando quiere?',
  '¿Ha tenido «lagunas» o «flashbacks» como consecuencia del consumo de drogas?',
  '¿Se siente alguna vez mal o culpable por su consumo de drogas?',
  '¿Se quejan alguna vez su pareja (o sus padres) de su consumo de drogas?',
  '¿Ha descuidado a su familia por su consumo de drogas?',
  '¿Ha realizado actividades ilegales para conseguir drogas?',
  '¿Ha tenido alguna vez síntomas de abstinencia (se ha sentido enfermo) al dejar de consumir drogas?',
  '¿Ha tenido problemas médicos como consecuencia de su consumo de drogas (pérdida de memoria, hepatitis, convulsiones, hemorragias, etc.)?',
];

const ids = idsOf('dast10_q', 10);

export const dast10: Scale = {
  id: 'dast10',
  name: 'DAST-10',
  category: 'Consumo de sustancias',
  description: 'Cribado de problemas relacionados con el consumo de drogas (excluye alcohol y tabaco). El ítem 3 se puntúa a la inversa.',
  instructions: 'Las preguntas se refieren a los últimos 12 meses. «Drogas» incluye cualquier uso no médico de sustancias y el uso de medicamentos con o sin receta en dosis o formas distintas de las indicadas. No incluye alcohol ni tabaco.',
  reference: 'Skinner HA. The Drug Abuse Screening Test. Addict Behav. 1982;7(4):363-71 (© 1982 Harvey A. Skinner; uso no comercial con cita del autor). Versión española: Pérez Gálvez B, et al. Salud y drogas. 2010;10(1):35-50.',
  maxScore: 10,
  questions: items.map((text, i) => ({ id: ids[i], text, options: i === 2 ? yesNo(0, 1) : yesNo(1, 0) })),
  calculateScore: (a) => sumOf(a, ids),
  interpretScore: (score) => {
    if (score >= 9) return { level: 'Nivel de problemas grave (9–10)', severity: 'grave' };
    if (score >= 6) return { level: 'Nivel de problemas sustancial (6–8)', severity: 'grave' };
    if (score >= 3) return { level: 'Nivel de problemas moderado (3–5)', severity: 'moderado' };
    if (score >= 1) return { level: 'Nivel de problemas bajo (1–2)', severity: 'leve' };
    return { level: 'Sin problemas referidos (0)', severity: 'normal' };
  },
};
