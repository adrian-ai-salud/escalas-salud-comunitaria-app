import React, { useEffect, useState } from 'react';
import { AlertCircle, Database, ShieldCheck } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/Dialog';
import { Button } from '@/components/ui/Button';
import { Checkbox } from '@/components/ui/Checkbox';
import { Label } from '@/components/ui/Label';
import { DISCLAIMER_STORAGE_KEY } from '@/config';

const readAccepted = () => {
  try {
    return localStorage.getItem(DISCLAIMER_STORAGE_KEY) === 'true';
  } catch {
    return false;
  }
};

const saveAccepted = () => {
  try {
    localStorage.setItem(DISCLAIMER_STORAGE_KEY, 'true');
  } catch {
    return;
  }
};

const WelcomeModal: React.FC = () => {
  const [show, setShow] = useState(false);
  const [accepted, setAccepted] = useState(false);

  useEffect(() => {
    if (!readAccepted()) setShow(true);
  }, []);

  const handleAccept = () => {
    if (!accepted) return;
    saveAccepted();
    setShow(false);
  };

  return (
    <Dialog open={show}>
      <DialogContent
        hideClose
        className="max-w-2xl bg-white p-0 overflow-hidden w-[95vw] sm:w-full max-h-[95vh] overflow-y-auto"
        onPointerDownOutside={(e) => e.preventDefault()}
        onInteractOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
      >
        <div className="bg-primary h-2 w-full" />
        <div className="p-5 sm:p-8">
          <DialogHeader>
            <DialogTitle className="text-3xl font-serif text-foreground flex items-center gap-3">
              <ShieldCheck className="text-primary w-8 h-8" />
              Aviso para profesionales
            </DialogTitle>
            <DialogDescription className="text-base pt-4">
              <strong>Escalas de Salud Comunitaria</strong> es una herramienta de referencia y docencia para profesionales sanitarios. Lea y acepte estas condiciones para continuar.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 my-8">
            <div className="flex gap-4">
              <div className="bg-primary-light p-2 rounded-full h-fit mt-1">
                <AlertCircle className="text-primary w-5 h-5" />
              </div>
              <div>
                <h4 className="font-semibold text-foreground">No es un producto sanitario</h4>
                <p className="text-sm text-muted-text">
                  Calcula la puntuación de escalas publicadas y muestra el rango que les asignan sus autores, con la referencia bibliográfica. No emite diagnósticos ni recomendaciones de tratamiento y no sustituye el juicio clínico.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="bg-primary-light p-2 rounded-full h-fit mt-1">
                <Database className="text-primary w-5 h-5" />
              </div>
              <div>
                <h4 className="font-semibold text-foreground">Privacidad</h4>
                <p className="text-sm text-muted-text">
                  Las respuestas se procesan solo en su navegador: no se envían a ningún servidor ni se guardan al salir. No introduzca nombres ni otros datos que identifiquen al paciente.
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-3 bg-slate-50 p-4 rounded-lg border border-slate-200">
            <Checkbox id="terms" checked={accepted} onCheckedChange={(checked) => setAccepted(checked === true)} />
            <Label htmlFor="terms" className="text-sm font-medium leading-snug cursor-pointer">
              Soy profesional sanitario y utilizaré esta herramienta como apoyo a mi propio juicio clínico.
            </Label>
          </div>

          <DialogFooter className="mt-8">
            <Button className="w-full h-12 text-lg font-semibold" disabled={!accepted} onClick={handleAccept}>
              Aceptar y continuar
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WelcomeModal;
