import { describe, expect, it } from 'vitest';
import { allScales, clinicalScales, scalesByCategory } from '../src/scales';
import { Scale } from '../src/scales/types';

const byId = (id: string) => {
  const scale = allScales.find((s) => s.id === id);
  if (!scale) throw new Error(`No existe la escala ${id}`);
  return scale;
};

const answersAt = (scale: Scale, pick: (values: number[]) => number) =>
  Object.fromEntries(scale.questions.filter((q) => q.options?.length).map((q) => [q.id, pick(q.options!.map((o) => o.value))]));

const run = (scale: Scale, answers: Record<string, number>) => {
  const score = scale.calculateScore(answers);
  return { score, ...scale.interpretScore(score, answers) };
};

const fill = (scale: Scale, value: number, overrides: Record<string, number> = {}) => ({
  ...Object.fromEntries(scale.questions.map((q) => [q.id, value])),
  ...overrides,
});

describe('estructura de todas las escalas', () => {
  it.each(allScales.map((s) => [s.id, s]))('%s tiene referencia, ids únicos y opciones', (_, scale) => {
    const s = scale as Scale;
    expect(s.reference).toBeTruthy();
    expect(new Set(s.questions.map((q) => q.id)).size).toBe(s.questions.length);
    for (const q of s.questions) {
      if (q.options) expect(q.options.length).toBeGreaterThan(0);
      else expect(q.unit).toBeTruthy();
    }
  });

  const scored = allScales.filter((s) => s.maxScore !== undefined && s.questions.every((q) => q.options?.length));
  it.each(scored.map((s) => [s.id, s]))('%s: el máximo declarado coincide con el cálculo y todo rango tiene etiqueta', (_, scale) => {
    const s = scale as Scale;
    const max = s.calculateScore(answersAt(s, (v) => Math.max(...v)));
    const min = s.calculateScore(answersAt(s, (v) => Math.min(...v)));
    expect(max).toBe(s.maxScore);
    for (let score = min; score <= max; score++) {
      expect(s.interpretScore(score, answersAt(s, (v) => Math.max(...v))).level).not.toBe('');
    }
  });

  it('retira las escalas con licencia restrictiva', () => {
    for (const id of ['moca', 'pam13', 'wemwbs', 'rapa']) expect(allScales.find((s) => s.id === id)).toBeUndefined();
  });

  it('todas las escalas clínicas aparecen en alguna categoría', () => {
    const listed = Object.values(scalesByCategory).flat().map((s) => s.id);
    for (const s of clinicalScales) expect(listed).toContain(s.id);
  });
});

describe('salud mental', () => {
  it('PHQ-9 avisa si el ítem 9 es positivo aunque el total sea bajo', () => {
    const r = run(byId('phq9'), fill(byId('phq9'), 0, { phq9_q9: 3 }));
    expect(r.score).toBe(3);
    expect(r.level).toContain('mínima');
    expect(r.alert).toBeTruthy();
  });

  it('PHQ-9 sin ítem 9 positivo no muestra alerta', () => {
    expect(run(byId('phq9'), fill(byId('phq9'), 1, { phq9_q9: 0 })).alert).toBeUndefined();
  });

  it('PHQ-9 cortes 5, 10, 15 y 20', () => {
    const s = byId('phq9');
    expect(s.interpretScore(4, {}).severity).toBe('normal');
    expect(s.interpretScore(5, {}).level).toContain('leve');
    expect(s.interpretScore(10, {}).level).toContain('moderada');
    expect(s.interpretScore(15, {}).level).toContain('moderadamente grave');
    expect(s.interpretScore(20, {}).level).toContain('grave (20');
  });

  it('WHO-5 multiplica por 4 y marca ≤28 como posible depresión', () => {
    const s = byId('who5');
    const r = run(s, { who5_q1: 2, who5_q2: 2, who5_q3: 1, who5_q4: 1, who5_q5: 1 });
    expect(r.score).toBe(28);
    expect(r.severity).toBe('grave');
    expect(s.interpretScore(52, {}).severity).toBe('normal');
  });

  it('GDS-5 usa los ítems de Hoyl', () => {
    expect(byId('gds5').questions.map((q) => q.text)).toContain('¿Se siente inútil tal como está ahora?');
  });
});

describe('funcionalidad', () => {
  it('Lawton puntúa 1 en "contesta el teléfono pero no marca"', () => {
    const s = byId('lawton_brody');
    const phone = s.questions.find((q) => q.id === 'lawton_phone')!;
    expect(phone.options!.find((o) => o.text.startsWith('Contesta'))!.value).toBe(1);
    expect(s.interpretScore(7, {}).level).toContain('leve');
    expect(s.interpretScore(8, {}).level).toContain('Independiente');
  });

  it('Barthel: caminar con bastón de forma independiente vale 15', () => {
    const mobility = byId('barthel_index').questions.find((q) => q.id === 'barthel_mobility')!;
    expect(mobility.options![0].value).toBe(15);
    expect(mobility.options![0].text).toContain('bastón');
  });

  it('Pfeiffer: máximo 10 errores y ajuste por nivel educativo', () => {
    const s = byId('pfeiffer_test');
    const three = fill(s, 0, { pfeiffer_q1: 1, pfeiffer_q2: 1, pfeiffer_q3: 1, pfeiffer_education: -1 });
    expect(run(s, three).level).toContain('Normal');
    expect(run(s, { ...three, pfeiffer_education: 0 }).level).toContain('leve');
  });

  it('Test de la silla compara con la norma por edad y sexo', () => {
    const s = byId('chair_stand_test');
    expect(run(s, { chair_sex: 1, chair_age: 72, repetitions: 9 }).severity).toBe('moderado');
    expect(run(s, { chair_sex: 1, chair_age: 72, repetitions: 10 }).severity).toBe('normal');
    expect(run(s, { chair_sex: 0, chair_age: 50, repetitions: 10 }).severity).toBe('info');
  });

  it('SPPB <10 añade la nota de fragilidad', () => {
    expect(byId('sppb').interpretScore(9, {}).notes?.[0]).toContain('<10');
  });
});

describe('consumo de sustancias', () => {
  it('AUDIT-C: 4 es positivo en mujeres y negativo en hombres', () => {
    const s = byId('audit_c');
    const base = { audit_c_q1: 2, audit_c_q2: 1, audit_c_q3: 1 };
    expect(run(s, { ...base, audit_c_sex: 1 }).severity).toBe('moderado');
    expect(run(s, { ...base, audit_c_sex: 0 }).severity).toBe('normal');
  });

  it('DAST-10: el ítem 3 es inverso y los cortes son los de Skinner', () => {
    const s = byId('dast10');
    const none = Object.fromEntries(s.questions.map((q) => [q.id, q.options!.find((o) => o.text === 'No')!.value]));
    none.dast10_q3 = 0;
    expect(run(s, none).score).toBe(0);
    expect(s.interpretScore(5, {}).level).toContain('moderado');
    expect(s.interpretScore(6, {}).level).toContain('sustancial');
    expect(s.interpretScore(9, {}).level).toContain('grave');
  });
});

describe('estilo de vida y nutrición', () => {
  it('Morisky-Green: un solo fallo es no adherencia', () => {
    const s = byId('morisky_green');
    expect(run(s, { morisky_q1: 0, morisky_q2: 1, morisky_q3: 0, morisky_q4: 0 }).level).toBe('No adherente');
    expect(run(s, { morisky_q1: 0, morisky_q2: 0, morisky_q3: 0, morisky_q4: 0 }).level).toBe('Adherente');
  });

  it('IPAQ: 3 días de 30 min vigorosos = 720 MET y actividad moderada', () => {
    const s = byId('ipaq_sf');
    const r = run(s, {
      ipaq_sf_vigorous_days: 3, ipaq_sf_vigorous_minutes: 30,
      ipaq_sf_moderate_days: 0, ipaq_sf_moderate_minutes: 0,
      ipaq_sf_walking_days: 0, ipaq_sf_walking_minutes: 0, ipaq_sf_sitting_minutes: 300,
    });
    expect(r.score).toBe(720);
    expect(r.level).toContain('moderada');
  });

  it('IPAQ trunca a 180 minutos diarios', () => {
    const s = byId('ipaq_sf');
    const r = run(s, {
      ipaq_sf_vigorous_days: 0, ipaq_sf_vigorous_minutes: 0, ipaq_sf_moderate_days: 0, ipaq_sf_moderate_minutes: 0,
      ipaq_sf_walking_days: 1, ipaq_sf_walking_minutes: 600, ipaq_sf_sitting_minutes: 0,
    });
    expect(r.score).toBe(Math.round(180 * 3.3));
  });

  it('NRS-2002 suma estado nutricional, gravedad y edad', () => {
    const r = run(byId('nrs2002'), { nrs2002_nutrition: 1, nrs2002_disease: 1, nrs2002_age: 1 });
    expect(r.score).toBe(3);
    expect(r.severity).toBe('grave');
  });

  it('MNA-SF admite la circunferencia de pantorrilla', () => {
    const q = byId('mna_sf').questions[5];
    expect(q.options!.some((o) => o.text.includes('pantorrilla'))).toBe(true);
  });
});

describe('otras escalas', () => {
  it('CAT: 10 puntos es impacto medio', () => {
    expect(byId('cat_copd').interpretScore(10, {}).level).toContain('medio');
    expect(byId('cat_copd').interpretScore(9, {}).level).toContain('bajo');
  });

  it('EAT-26: el ítem 25 se puntúa a la inversa', () => {
    const q25 = byId('eat26').questions[24];
    expect(q25.options!.find((o) => o.text === 'Nunca')!.value).toBe(3);
    expect(q25.options!.find((o) => o.text === 'Siempre')!.value).toBe(0);
    expect(new Set(byId('eat26').questions.map((q) => q.text)).size).toBe(26);
  });

  it('Charlson no suma dos grados de la misma enfermedad', () => {
    const s = byId('charlson_index');
    const liver = s.questions.find((q) => q.id === 'charlson_liver')!;
    expect(liver.options!.map((o) => o.value)).toEqual([0, 1, 3]);
    const r = run(s, { charlson_age: 75, charlson_solid_tumor: 6 });
    expect(r.score).toBe(6);
    expect(r.notes?.[0]).toContain('9 puntos');
  });
});

describe('calculadoras', () => {
  it('IMC 72,05 kg y 170 cm queda en normopeso (sin huecos)', () => {
    const r = run(byId('imc'), { weight: 72.05, height: 170 });
    expect(r.score).toBe(24.9);
    expect(r.level).toContain('Normopeso');
    expect(run(byId('imc'), { weight: 72.2, height: 170 }).level).toContain('Sobrepeso');
  });

  it('Cockcroft-Gault aplica 0,85 en mujeres', () => {
    expect(run(byId('cockcroft_gault'), { sex: 0, age: 70, weight: 72, creatinine: 1 }).score).toBe(70);
    expect(run(byId('cockcroft_gault'), { sex: 1, age: 70, weight: 72, creatinine: 1 }).score).toBe(60);
  });

  it('La bioimpedancia devuelve resultados visibles', () => {
    const r = run(byId('bioimpedance'), { sex: 0, age: 45, bodyFat: 30, muscleMass: 35, bodyWater: 55, visceralFat: 10 });
    expect(r.level).toBe('Grasa corporal muy alta');
    expect(r.notes?.length).toBeGreaterThanOrEqual(4);
  });

  it('SBQ calcula la media diaria', () => {
    const s = byId('sedentary_behavior');
    const answers = Object.fromEntries(s.questions.map((q) => [q.id, 0]));
    answers.sbq_tv_weekday = 3;
    answers.sbq_tv_weekend = 5;
    expect(run(s, answers).score).toBe(Math.round(((3 * 5 + 5 * 2) / 7) * 10) / 10);
  });
});
