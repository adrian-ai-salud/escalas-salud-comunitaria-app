import React, { useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AlertTriangle, BookOpen, ChevronLeft, ExternalLink, Info, RotateCcw } from 'lucide-react';
import { Interpretation, Question, Scale } from '@/scales/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Progress } from '@/components/ui/Progress';
import { cn } from '@/lib/utils';
import { severityColors } from '@/categories';
import ResultGauge from './ResultGauge';

import hombreConDM from '@/assets/Hombre con DM.jpg';
import hombreSinDM from '@/assets/Hombre sin DM.jpg';
import mujerConDM from '@/assets/Mujer con DM.jpg';
import mujerSinDM from '@/assets/Mujer sin DM.jpg';

interface ScaleDisplayProps {
  scale: Scale;
  onGoHome: () => void;
  color?: string;
}

interface Result {
  score: number;
  interpretation: Interpretation;
}

const parseNumber = (raw: string | undefined) => {
  if (raw === undefined || raw.trim() === '') return undefined;
  const value = Number(raw.replace(',', '.'));
  return Number.isFinite(value) ? value : undefined;
};

const inputError = (q: Question, raw: string | undefined) => {
  if (raw === undefined || raw.trim() === '') return undefined;
  const value = parseNumber(raw);
  if (value === undefined) return 'Introduzca un número válido.';
  if (q.min !== undefined && value < q.min) return `El valor mínimo es ${q.min}.`;
  if (q.max !== undefined && value > q.max) return `El valor máximo es ${q.max}.`;
  return undefined;
};

const formatScore = (score: number, decimals?: number) =>
  decimals === undefined ? String(score) : score.toLocaleString('es-ES', { maximumFractionDigits: decimals });

const ScaleDisplay: React.FC<ScaleDisplayProps> = ({ scale, onGoHome, color = '#0D9488' }) => {
  const [selected, setSelected] = useState<Record<string, number>>({});
  const [inputs, setInputs] = useState<Record<string, string>>({});
  const [result, setResult] = useState<Result | null>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setSelected({});
    setInputs({});
    setResult(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [scale]);

  const answers = useMemo(() => {
    const values: Record<string, number> = {};
    for (const q of scale.questions) {
      if (q.options?.length) {
        const index = selected[q.id];
        if (index !== undefined) values[q.id] = q.options[index].value;
      } else {
        const value = parseNumber(inputs[q.id]);
        if (value !== undefined && !inputError(q, inputs[q.id])) values[q.id] = value;
      }
    }
    return values;
  }, [scale, selected, inputs]);

  const totalQuestions = scale.questions.length;
  const answeredCount = Object.keys(answers).length;
  const complete = answeredCount === totalQuestions;

  const selectOption = (questionId: string, index: number) => {
    setSelected((prev) => ({ ...prev, [questionId]: index }));
    setResult(null);
  };

  const changeInput = (questionId: string, value: string) => {
    setInputs((prev) => ({ ...prev, [questionId]: value }));
    setResult(null);
  };

  const reset = () => {
    setSelected({});
    setInputs({});
    setResult(null);
  };

  const calculate = () => {
    const score = scale.calculateScore(answers);
    setResult({ score, interpretation: scale.interpretScore(score, answers) });
    setTimeout(() => resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
  };

  const regicorImage = () => {
    const sex = answers.regicor_sex;
    const diabetes = answers.regicor_diabetes;
    if (sex === undefined || diabetes === undefined) return null;
    if (sex === 0) return diabetes === 1 ? hombreConDM : hombreSinDM;
    return diabetes === 1 ? mujerConDM : mujerSinDM;
  };

  const resultColor = result
    ? severityColors[result.interpretation.alert ? 'grave' : result.interpretation.severity]
    : color;

  return (
    <div className="max-w-4xl mx-auto pb-24">
      <div className="flex items-center gap-4 mb-8">
        <Button variant="ghost" size="icon" onClick={onGoHome} className="rounded-full" aria-label="Volver al inicio">
          <ChevronLeft className="w-6 h-6" />
        </Button>
        <h2 className="text-3xl sm:text-4xl font-serif text-foreground">{scale.name}</h2>
      </div>

      <Card className="mb-6 border-none shadow-sm bg-primary/5">
        <CardContent className="p-6 space-y-3">
          <p className="text-muted-text text-sm sm:text-base leading-relaxed">{scale.description}</p>
          {scale.instructions && (
            <p className="text-foreground text-sm sm:text-base font-medium leading-relaxed">{scale.instructions}</p>
          )}
        </CardContent>
      </Card>

      {scale.mode === 'external' ? (
        <Card className="border-2 border-primary/20 overflow-hidden">
          <CardHeader className="bg-primary/5">
            <CardTitle className="text-xl flex items-center gap-2">
              <ExternalLink className="w-5 h-5 text-primary" />
              Calculadoras oficiales de la ESC
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="h-14 px-8 text-lg">
              <a href="https://www.heartscore.org/" target="_blank" rel="noopener noreferrer">HeartScore</a>
            </Button>
            <Button asChild size="lg" variant="outline" className="h-14 px-8 text-lg">
              <a href="https://www.escardio.org/guidelines/practice-tools/cvd-prevention-toolbox/score-risk-charts/" target="_blank" rel="noopener noreferrer">
                Tablas SCORE2 de la ESC
              </a>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-8">
          {scale.mode !== 'chart' && (
            <div className="sticky top-[64px] sm:top-20 z-20 bg-white/90 backdrop-blur-md p-3 sm:p-4 rounded-xl border shadow-sm mb-6 sm:mb-12 mx-[-12px] sm:mx-0">
              <div className="flex justify-between items-center mb-1 sm:mb-2">
                <span className="text-[10px] sm:text-xs font-semibold text-muted-text uppercase tracking-wider">Progreso</span>
                <span className="text-xs font-bold text-primary">{answeredCount} / {totalQuestions}</span>
              </div>
              <Progress value={totalQuestions ? (answeredCount / totalQuestions) * 100 : 0} className="h-1.5 sm:h-2" />
            </div>
          )}

          <div className="space-y-8 sm:space-y-12">
            {scale.questions.map((q, idx) => {
              const error = q.options?.length ? undefined : inputError(q, inputs[q.id]);
              const labelId = `${q.id}-label`;
              return (
                <div key={q.id} className="flex gap-3 sm:gap-6 items-start">
                  <div
                    className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-serif text-base sm:text-lg border-2 border-white shadow-sm"
                    style={{ backgroundColor: `${color}15`, color }}
                    aria-hidden="true"
                  >
                    {idx + 1}
                  </div>
                  <div className="flex-1 space-y-3 sm:space-y-4">
                    <h3 id={labelId} className="text-lg sm:text-xl font-serif text-foreground leading-snug">{q.text}</h3>

                    {q.options?.length ? (
                      <div role="radiogroup" aria-labelledby={labelId} className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                        {q.options.map((opt, optIndex) => {
                          const checked = selected[q.id] === optIndex;
                          return (
                            <button
                              key={optIndex}
                              type="button"
                              role="radio"
                              aria-checked={checked}
                              onClick={() => selectOption(q.id, optIndex)}
                              className={cn(
                                'p-3 sm:p-4 rounded-xl border-2 text-left transition-all duration-200 flex items-center justify-between gap-3 group',
                                checked ? 'border-primary bg-primary/5 ring-1 ring-primary' : 'border-slate-100 hover:border-slate-300 hover:bg-slate-50',
                              )}
                            >
                              <span className={cn('text-sm font-medium', checked ? 'text-primary-dark' : 'text-slate-600')}>{opt.text}</span>
                              <span
                                className={cn(
                                  'flex-shrink-0 w-4 h-4 sm:w-5 sm:h-5 rounded-full border-2 flex items-center justify-center transition-colors',
                                  checked ? 'bg-primary border-primary' : 'border-slate-200 group-hover:border-slate-400',
                                )}
                              >
                                {checked && <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-white" />}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="max-w-xs">
                        <div className="relative">
                          <input
                            type="text"
                            inputMode="decimal"
                            aria-labelledby={labelId}
                            aria-invalid={Boolean(error)}
                            value={inputs[q.id] ?? ''}
                            onChange={(e) => changeInput(q.id, e.target.value)}
                            className={cn(
                              'w-full h-12 bg-slate-50 border-2 rounded-xl px-4 pr-24 focus:outline-none transition-all text-lg font-semibold',
                              error ? 'border-destructive focus:border-destructive' : 'border-slate-200 focus:border-primary',
                            )}
                          />
                          {q.unit && (
                            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm">{q.unit}</span>
                          )}
                        </div>
                        {error && <p className="text-destructive text-sm mt-1">{error}</p>}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {scale.mode === 'chart' ? (
            <div className="p-4 sm:p-6 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200 text-center">
              {regicorImage() ? (
                <img src={regicorImage() as string} alt="Tabla de riesgo coronario REGICOR" className="mx-auto rounded-lg shadow-xl max-w-full" />
              ) : (
                <p className="text-muted-text text-sm flex items-center justify-center gap-2">
                  <Info className="w-5 h-5" />
                  Seleccione sexo y diabetes para ver la tabla.
                </p>
              )}
            </div>
          ) : (
            <div className="pt-10 mb-20 sm:mb-0 flex flex-col sm:flex-row gap-4 items-center">
              <Button
                onClick={calculate}
                size="lg"
                className="px-12 text-xl shadow-xl shadow-primary/20 transition-all w-full sm:w-auto fixed bottom-0 left-0 rounded-none h-16 sm:relative sm:rounded-md sm:h-14 z-30 sm:z-0 disabled:opacity-100 disabled:bg-slate-400"
                disabled={!complete}
              >
                Calcular resultado
              </Button>
              <Button onClick={reset} variant="ghost" className="text-muted-text">
                <RotateCcw className="w-4 h-4 mr-2" />
                Reiniciar
              </Button>
            </div>
          )}

          <AnimatePresence>
            {result && (
              <motion.div
                ref={resultsRef}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-20 scroll-mt-40"
                aria-live="polite"
              >
                <Card className="border-none shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-3" style={{ backgroundColor: resultColor }} />
                  <CardContent className="px-6 sm:px-8 pt-12 pb-10">
                    <div className="flex flex-col items-center">
                      {scale.maxScore !== undefined ? (
                        <ResultGauge score={result.score} maxScore={scale.maxScore} color={resultColor} />
                      ) : (
                        <p className="text-center">
                          <span className="text-5xl sm:text-6xl font-serif" style={{ color: resultColor }}>
                            {formatScore(result.score, scale.scoreDecimals)}
                          </span>
                          {scale.scoreUnit && <span className="text-lg sm:text-2xl text-muted-text ml-2">{scale.scoreUnit}</span>}
                        </p>
                      )}
                      {scale.maxScore !== undefined && scale.scoreUnit && (
                        <p className="text-sm text-muted-text mt-1">{scale.scoreUnit}</p>
                      )}

                      <div className="text-center mt-6 space-y-2">
                        <p className="text-xs font-bold text-muted-text uppercase tracking-[.2em]">Rango según la escala</p>
                        <h4 className="text-2xl sm:text-4xl font-serif" style={{ color: resultColor }}>
                          {result.interpretation.level}
                        </h4>
                      </div>

                      {result.interpretation.alert && (
                        <div role="alert" className="w-full mt-8 flex gap-3 items-start rounded-xl border-2 border-destructive bg-destructive/10 p-4 text-left">
                          <AlertTriangle className="w-6 h-6 text-destructive flex-shrink-0" />
                          <p className="text-sm sm:text-base font-semibold text-foreground">{result.interpretation.alert}</p>
                        </div>
                      )}

                      {result.interpretation.notes && result.interpretation.notes.length > 0 && (
                        <ul className="w-full mt-8 space-y-2 text-sm sm:text-base text-slate-600 list-disc pl-5">
                          {result.interpretation.notes.map((note) => <li key={note}>{note}</li>)}
                        </ul>
                      )}

                      <p className="w-full mt-8 pt-6 border-t border-slate-100 text-xs sm:text-sm text-slate-500 leading-relaxed">
                        El rango se asigna con los puntos de corte publicados para la escala. No constituye un diagnóstico: la interpretación y las decisiones clínicas corresponden al profesional sanitario.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      {scale.reference && (
        <div className="mt-12 flex gap-3 items-start text-xs sm:text-sm text-muted-text">
          <BookOpen className="w-4 h-4 mt-0.5 flex-shrink-0" />
          <p><span className="font-semibold">Referencia: </span>{scale.reference}</p>
        </div>
      )}
    </div>
  );
};

export default ScaleDisplay;
