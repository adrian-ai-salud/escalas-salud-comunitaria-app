import React from 'react';
import { Calculator } from 'lucide-react';
import { Scale } from '@/scales/types';
import { categoryIcons } from '@/categories';
import ScaleCard from './ScaleCard';

interface CategoryBlockProps {
  category: string;
  scales: Scale[];
  onSelectScale: (scale: Scale) => void;
  color: string;
}

const CategoryBlock: React.FC<CategoryBlockProps> = ({ category, scales, onSelectScale, color }) => {
  const Icon = categoryIcons[category] || Calculator;

  return (
    <section className="space-y-6" aria-label={category}>
      <div className="flex items-center gap-4 p-4 rounded-xl border-l-[6px]" style={{ borderColor: color, backgroundColor: `${color}10` }}>
        <div className="p-3 rounded-full bg-white shadow-sm" style={{ color }}>
          <Icon className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-serif text-foreground">{category}</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {scales.map((scale) => (
          <ScaleCard key={scale.id} scale={scale} onSelectScale={onSelectScale} categoryColor={color} />
        ))}
      </div>
    </section>
  );
};

export default CategoryBlock;
