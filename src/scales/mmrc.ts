import { Scale } from './types';

export const mmrc: Scale = {
  id: 'mmrc',
  name: 'Escala de disnea mMRC',
  category: 'Función respiratoria',
  description: 'Grado de disnea en la vida diaria según la escala modificada del Medical Research Council.',
  reference: 'Bestall JC, Paul EA, Garrod R, et al. Usefulness of the Medical Research Council (MRC) dyspnoea scale as a measure of disability in patients with COPD. Thorax. 1999;54(7):581-6.',
  maxScore: 4,
  questions: [
    {
      id: 'mmrc_grade',
      text: 'Seleccione el grado que mejor describe su situación:',
      options: [
        { text: 'Grado 0: ausencia de disnea, excepto al realizar ejercicio intenso', value: 0 },
        { text: 'Grado 1: disnea al andar deprisa en llano o al subir una pendiente poco pronunciada', value: 1 },
        { text: 'Grado 2: la disnea le impide mantener el paso de otras personas de su edad caminando en llano, o tiene que parar a descansar al andar en llano a su propio paso', value: 2 },
        { text: 'Grado 3: tiene que parar a descansar al andar unos 100 metros o a los pocos minutos de andar en llano', value: 3 },
        { text: 'Grado 4: la disnea le impide salir de casa o aparece con actividades como vestirse o desvestirse', value: 4 },
      ],
    },
  ],
  calculateScore: (a) => a.mmrc_grade ?? 0,
  interpretScore: (score) => {
    const notes = ['En la estrategia GOLD, un grado mMRC ≥2 identifica a los pacientes con más disnea.'];
    const level = `Grado ${score}`;
    if (score >= 3) return { level, severity: 'grave', notes };
    if (score === 2) return { level, severity: 'moderado', notes };
    if (score === 1) return { level, severity: 'leve', notes };
    return { level, severity: 'normal', notes };
  },
};
