import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { AnimatePresence, motion } from 'motion/react';
import { Menu } from 'lucide-react';

import ScaleDisplay from './components/ScaleDisplay';
import AboutPage from './components/AboutPage';
import ContactPage from './components/ContactPage';
import CategoryBlock from './components/CategoryBlock';
import NavigationSidebar from './components/NavigationSidebar';
import WelcomeModal from './components/WelcomeModal';
import { Button } from './components/ui/Button';
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from './components/ui/Sheet';
import { scalesByCategory } from './scales';
import { Scale } from './scales/types';
import { categoryColors } from './categories';
import { AUTHOR_NAME, LINKEDIN_PROFILE_URL } from './config';

import './index.css';

type View = 'scales' | 'about' | 'scaleDetail' | 'contact';

const App = () => {
  const [selectedScale, setSelectedScale] = React.useState<Scale | null>(null);
  const [currentView, setCurrentView] = React.useState<View>('scales');
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  const handleSelectScale = (scale: Scale) => {
    if (scale.id === 'about_app') {
      setCurrentView('about');
      setSelectedScale(null);
    } else if (scale.id === 'contact') {
      setCurrentView('contact');
      setSelectedScale(null);
    } else {
      setSelectedScale(scale);
      setCurrentView('scaleDetail');
    }
    setIsSidebarOpen(false);
  };

  const handleGoHome = () => {
    setCurrentView('scales');
    setSelectedScale(null);
    window.scrollTo({ top: 0 });
  };

  const sidebar = (
    <NavigationSidebar
      scalesByCategory={scalesByCategory}
      onSelectScale={handleSelectScale}
      currentScaleId={selectedScale?.id}
    />
  );

  const mobileMenu = (trigger: React.ReactElement) => (
    <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
      <SheetTrigger asChild>{trigger}</SheetTrigger>
      <SheetContent side="left" className="p-0 w-80">
        <SheetTitle className="sr-only">Menú de escalas</SheetTitle>
        {sidebar}
      </SheetContent>
    </Sheet>
  );

  return (
    <div className="min-h-screen bg-background flex">
      <WelcomeModal />

      <aside className="hidden lg:flex w-72 border-r bg-white flex-col fixed inset-y-0 z-40">{sidebar}</aside>

      <div className="flex-1 lg:ml-72 flex flex-col min-w-0">
        <header className="h-16 bg-gradient-to-r from-primary-dark to-primary flex items-center px-4 sticky top-0 z-30 shadow-md">
          {mobileMenu(
            <Button variant="ghost" size="icon" className="lg:hidden text-white mr-2" aria-label="Abrir menú">
              <Menu />
            </Button>,
          )}

          <div className="flex flex-col min-w-0">
            <h1 className="text-white text-lg sm:text-2xl font-serif truncate">
              <button type="button" onClick={handleGoHome} className="hover:opacity-90">Escalas de Salud Comunitaria</button>
            </h1>
            <span className="text-primary-light/80 text-[10px] sm:text-xs">
              Por{' '}
              <a href={LINKEDIN_PROFILE_URL} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                {AUTHOR_NAME}
              </a>
            </span>
          </div>

          {currentView !== 'scales' && (
            <Button onClick={handleGoHome} variant="outline" size="sm" className="ml-auto bg-white/10 text-white border-white/20 hover:bg-white/20">
              Inicio
            </Button>
          )}
        </header>

        <main className="p-3 sm:p-8 flex-1">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentView + (selectedScale?.id || '')}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {currentView === 'scales' && (
                <div className="space-y-8 sm:space-y-12">
                  {Object.entries(scalesByCategory).map(([category, scales]) => (
                    <CategoryBlock
                      key={category}
                      category={category}
                      scales={scales}
                      onSelectScale={handleSelectScale}
                      color={categoryColors[category] || '#0D9488'}
                    />
                  ))}
                </div>
              )}
              {currentView === 'scaleDetail' && selectedScale && (
                <ScaleDisplay
                  scale={selectedScale}
                  onGoHome={handleGoHome}
                  color={categoryColors[selectedScale.category] || '#0D9488'}
                />
              )}
              {currentView === 'about' && <AboutPage />}
              {currentView === 'contact' && <ContactPage />}
            </motion.div>
          </AnimatePresence>
        </main>

        <div className="lg:hidden fixed bottom-20 right-6 z-50">
          {mobileMenu(
            <Button size="lg" aria-label="Abrir menú de escalas" className="h-14 w-14 rounded-full shadow-2xl bg-primary hover:bg-primary-dark text-white p-0 border-4 border-white">
              <Menu className="w-6 h-6" />
            </Button>,
          )}
        </div>
      </div>
    </div>
  );
};

createRoot(document.getElementById('root') as HTMLElement).render(<App />);
