import React, { useMemo, useState } from 'react';
import { Calculator, Search } from 'lucide-react';
import { Scale } from '@/scales/types';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/Accordion';
import { cn } from '@/lib/utils';
import { categoryColors, categoryIcons } from '@/categories';
import { APP_VERSION, AUTHOR_NAME } from '@/config';

interface NavigationSidebarProps {
  scalesByCategory: Record<string, Scale[]>;
  onSelectScale: (scale: Scale) => void;
  currentScaleId?: string;
}

const normalize = (text: string) => text.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();

const NavigationSidebar: React.FC<NavigationSidebarProps> = ({ scalesByCategory, onSelectScale, currentScaleId }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const query = normalize(searchQuery.trim());

  const filtered = useMemo(() => {
    const result: Record<string, Scale[]> = {};
    for (const [category, scales] of Object.entries(scalesByCategory)) {
      const matches = query
        ? scales.filter((s) => normalize(s.name).includes(query) || normalize(category).includes(query))
        : scales;
      if (matches.length) result[category] = matches;
    }
    return result;
  }, [scalesByCategory, query]);

  const categories = Object.keys(filtered);

  return (
    <div className="flex flex-col h-full bg-white">
      <div className="p-6 border-b">
        <h3 className="font-serif text-xl text-foreground">Explorador</h3>
        <div className="relative mt-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-text" />
          <input
            type="search"
            placeholder="Buscar escala..."
            aria-label="Buscar escala"
            className="w-full h-10 pl-10 pr-4 bg-slate-50 border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto px-2" aria-label="Escalas por categoría">
        {categories.length === 0 && <p className="p-4 text-sm text-muted-text">No hay escalas que coincidan.</p>}
        <Accordion key={query ? 'search' : 'browse'} type="multiple" defaultValue={query ? categories : []} className="w-full">
          {categories.map((category) => {
            const Icon = categoryIcons[category] || Calculator;
            const color = categoryColors[category] || '#0D9488';
            return (
              <AccordionItem key={category} value={category} className="border-none">
                <AccordionTrigger className="hover:no-underline py-3 px-4 rounded-lg hover:bg-slate-50 group transition-colors">
                  <span className="flex items-center gap-3">
                    <span className="p-1.5 rounded-md flex items-center justify-center text-white" style={{ backgroundColor: color }}>
                      <Icon className="w-4 h-4" />
                    </span>
                    <span className="text-sm font-medium text-slate-700 group-hover:text-primary transition-colors text-left">{category}</span>
                  </span>
                </AccordionTrigger>
                <AccordionContent className="pt-1 pb-2">
                  <div className="flex flex-col gap-1 ml-4 pl-4 border-l-2 border-slate-100">
                    {filtered[category].map((scale) => (
                      <button
                        key={scale.id}
                        type="button"
                        onClick={() => onSelectScale(scale)}
                        aria-current={currentScaleId === scale.id ? 'page' : undefined}
                        className={cn(
                          'text-left text-[13px] sm:text-xs py-2.5 sm:py-2 px-3 rounded-md transition-all',
                          currentScaleId === scale.id
                            ? 'bg-primary-light text-primary-dark font-semibold shadow-sm'
                            : 'text-muted-text hover:bg-slate-50 hover:text-foreground',
                        )}
                      >
                        {scale.name}
                      </button>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      </nav>

      <div className="p-4 bg-slate-50 border-t mt-auto text-[10px] text-muted-text">
        <p>Versión {APP_VERSION}</p>
        <p>© {new Date().getFullYear()} {AUTHOR_NAME}</p>
      </div>
    </div>
  );
};

export default NavigationSidebar;
