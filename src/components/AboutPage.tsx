import React from 'react';
import { BookOpen, Heart, Shield } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { APP_VERSION, AUTHOR_NAME } from '@/config';
import { clinicalScales } from '@/scales';

const features = [
  {
    icon: BookOpen,
    title: 'Fuentes citadas',
    text: 'Cada escala muestra su referencia bibliográfica y los puntos de corte publicados por sus autores o por la validación española.',
  },
  {
    icon: Shield,
    title: 'Privacidad',
    text: 'Los cálculos se hacen en su navegador. La aplicación no envía ni guarda las respuestas.',
  },
  {
    icon: Heart,
    title: 'Para la comunidad',
    text: 'Pensada para el trabajo diario de enfermería familiar y comunitaria y de atención primaria.',
  },
];

const AboutPage: React.FC = () => (
  <div className="max-w-4xl mx-auto space-y-12 pb-20">
    <div className="text-center space-y-4">
      <Badge variant="success" className="px-4 py-1">Versión {APP_VERSION}</Badge>
      <h2 className="text-4xl sm:text-5xl font-serif text-foreground">Sobre Escalas de Salud Comunitaria</h2>
      <p className="text-lg sm:text-xl text-muted-text max-w-2xl mx-auto">
        {clinicalScales.length} escalas y cuestionarios de uso habitual en atención primaria, más varias calculadoras, reunidos por {AUTHOR_NAME}, enfermero especialista en Enfermería Familiar y Comunitaria.
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {features.map(({ icon: Icon, title, text }) => (
        <Card key={title} className="border-none shadow-md bg-white">
          <CardContent className="pt-8 text-center space-y-4">
            <div className="bg-primary/10 p-4 rounded-full w-fit mx-auto">
              <Icon className="text-primary w-8 h-8" />
            </div>
            <h3 className="text-xl font-serif">{title}</h3>
            <p className="text-sm text-muted-text leading-relaxed">{text}</p>
          </CardContent>
        </Card>
      ))}
    </div>

    <Card className="border-none shadow-md bg-white">
      <CardContent className="p-6 sm:p-8 space-y-3 text-sm sm:text-base text-slate-600 leading-relaxed">
        <h3 className="text-xl font-serif text-foreground">Uso responsable</h3>
        <p>
          La aplicación no es un producto sanitario. Muestra la puntuación y el rango que la literatura asigna a cada escala; la valoración clínica y las decisiones corresponden siempre al profesional.
        </p>
        <p>
          Algunas escalas tienen derechos de autor de sus creadores. Se incluyen con la cita correspondiente y para uso clínico y docente no comercial.
        </p>
      </CardContent>
    </Card>
  </div>
);

export default AboutPage;
