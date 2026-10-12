import { Scale } from './types';
import { noYes, sexOptions } from './helpers';

export const regicor: Scale = {
  id: 'regicor',
  name: 'REGICOR',
  category: 'Riesgo cardiovascular y metabólico',
  description: 'Tablas de riesgo coronario a 10 años calibradas para población española (35–74 años). Seleccione sexo y diabetes para ver la tabla; después localice la casilla según edad, tabaquismo, presión arterial y colesterol total. Riesgo: <5 % bajo; 5–9,9 % moderado; 10–14,9 % alto; ≥15 % muy alto.',
  reference: 'Marrugat J, Solanas P, D\'Agostino R, et al. Estimación del riesgo coronario en España mediante la ecuación de Framingham calibrada. Rev Esp Cardiol. 2003;56(3):253-61. Marrugat J, et al. J Epidemiol Community Health. 2007;61(1):40-7.',
  mode: 'chart',
  questions: [
    { id: 'regicor_sex', text: 'Sexo', options: sexOptions },
    { id: 'regicor_diabetes', text: '¿Tiene diabetes?', options: noYes() },
  ],
  calculateScore: () => 0,
  interpretScore: () => ({ level: '', severity: 'info' }),
};
