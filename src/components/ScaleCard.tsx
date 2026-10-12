import React from 'react';
import { motion } from 'motion/react';
import { ChevronRight, Clipboard } from 'lucide-react';
import { Scale } from '@/scales/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

interface ScaleCardProps {
  scale: Scale;
  onSelectScale: (scale: Scale) => void;
  categoryColor: string;
}

const ScaleCard: React.FC<ScaleCardProps> = ({ scale, onSelectScale, categoryColor }) => {
  const questionCount = scale.questions.length;
  const isCalculator = scale.category === 'Calculadoras';

  return (
    <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.2 }} className="h-full">
      <Card className="h-full flex flex-col overflow-hidden group hover:shadow-lg transition-all border-t-[4px]" style={{ borderTopColor: categoryColor }}>
        <CardHeader className="pb-3">
          <div className="flex justify-between items-start">
            <div className="p-2 rounded-lg bg-slate-50 text-slate-400 group-hover:text-primary transition-colors">
              <Clipboard className="w-5 h-5" />
            </div>
            {questionCount > 0 && (
              <Badge variant="outline" className="font-sans text-[10px] text-muted-text border-slate-200">
                {questionCount} {isCalculator ? (questionCount === 1 ? 'dato' : 'datos') : questionCount === 1 ? 'pregunta' : 'preguntas'}
              </Badge>
            )}
          </div>
          <CardTitle className="text-xl mt-4 line-clamp-2 leading-tight group-hover:text-primary transition-colors">{scale.name}</CardTitle>
        </CardHeader>

        <CardContent className="flex-1 pb-4">
          <CardDescription className="line-clamp-3 text-sm leading-relaxed min-h-[4.5rem]">{scale.description}</CardDescription>
        </CardContent>

        <CardFooter className="pt-2">
          <Button onClick={() => onSelectScale(scale)} className="w-full justify-between pr-3 group/btn hover:bg-primary-dark">
            {isCalculator ? 'Abrir calculadora' : 'Abrir escala'}
            <ChevronRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default ScaleCard;
