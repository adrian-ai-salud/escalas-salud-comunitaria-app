import { phq2 } from './phq2';
import { phq9 } from './phq9';
import { gad7 } from './gad7';
import { who5 } from './who5';
import { minicog } from './minicog';
import { yesavageGDS15 } from './yesavage_gds15';
import { gds5 } from './gds5';
import { findrisc } from './findrisc';
import { score2 } from './score2';
import { regicor } from './regicor';
import { charlsonIndex } from './charlson_index';
import { frail } from './frail';
import { barthelIndex } from './barthel_index';
import { chairStandTest } from './chair_stand_test';
import { lawtonBrody } from './lawton_brody';
import { pfeifferTest } from './pfeiffer_test';
import { auditC } from './audit_c';
import { fagerstrom } from './fagerstrom';
import { dast10 } from './dast10';
import { ipaqSf } from './ipaq_sf';
import { moriskyGreen } from './morisky_green';
import { mediterraneanDiet } from './mediterraneanDiet';
import { mnaSf } from './mna_sf';
import { must } from './must';
import { nrs2002 } from './nrs2002';
import { clockDrawingTest } from './clock_drawing_test';
import { catCopd } from './cat_copd';
import { mmrc } from './mmrc';
import { dukeUnc } from './duke_unc';
import { eat26 } from './eat26';
import { sppb } from './sppb';
import { sedentaryBehavior } from './sedentary_behavior';
import { calculators } from './calculators';
import { bioimpedanceScale } from './bioimpedance';
import { Scale } from './types';

const page = (id: string, name: string): Scale => ({
  id,
  name,
  category: 'Información',
  description: '',
  mode: 'page',
  questions: [],
  calculateScore: () => 0,
  interpretScore: () => ({ level: '', severity: 'info' }),
});

export const aboutAppScale = page('about_app', 'Sobre esta aplicación');
export const contactScale = page('contact', 'Contacto');

export const clinicalScales: Scale[] = [
  phq2, phq9, gad7, who5, yesavageGDS15, gds5,
  minicog, pfeifferTest, clockDrawingTest,
  findrisc, regicor, score2, charlsonIndex,
  frail, barthelIndex, lawtonBrody, sppb, chairStandTest,
  auditC, fagerstrom, dast10,
  ipaqSf, sedentaryBehavior, moriskyGreen, mediterraneanDiet,
  mnaSf, must, nrs2002,
  catCopd, mmrc,
  dukeUnc, eat26,
];

export const allScales: Scale[] = [...clinicalScales, ...calculators, bioimpedanceScale];

export const CATEGORY_ORDER = [
  'Salud mental y emocional',
  'Función cognitiva',
  'Fragilidad y funcionalidad',
  'Riesgo cardiovascular y metabólico',
  'Consumo de sustancias',
  'Estilo de vida y adherencia',
  'Nutrición y riesgo',
  'Función respiratoria',
  'Promoción comunitaria y bienestar',
  'Calculadoras',
  'Información',
];

export const scalesByCategory: Record<string, Scale[]> = CATEGORY_ORDER.reduce((acc, category) => {
  acc[category] = category === 'Información'
    ? [aboutAppScale, contactScale]
    : allScales.filter((s) => s.category === category);
  return acc;
}, {} as Record<string, Scale[]>);
