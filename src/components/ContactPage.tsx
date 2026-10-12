import React from 'react';
import { ExternalLink, Github, Globe, Linkedin, Mail } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { AUTHOR_NAME, CONTACT_EMAIL, GITHUB_REPO_URL, LINKEDIN_PROFILE_URL, WEBSITE_URL } from '@/config';

const links = [
  { href: `mailto:${CONTACT_EMAIL}`, icon: Mail, label: 'Escribir un correo', detail: CONTACT_EMAIL, external: false },
  { href: LINKEDIN_PROFILE_URL, icon: Linkedin, label: 'LinkedIn', detail: 'Perfil profesional', external: true },
  { href: WEBSITE_URL, icon: Globe, label: 'Web personal', detail: 'adrianvencesgarrido.com', external: true },
  { href: GITHUB_REPO_URL, icon: Github, label: 'Código en GitHub', detail: 'adrian-ai-salud', external: true },
];

const ContactPage: React.FC = () => (
  <div className="max-w-2xl mx-auto py-10">
    <Card className="border-none shadow-2xl overflow-hidden bg-white">
      <div className="bg-gradient-to-r from-primary to-primary-dark h-32 flex items-center justify-center">
        <h2 className="text-white text-3xl font-serif tracking-tight">Contacto</h2>
      </div>
      <CardHeader className="text-center">
        <CardTitle className="text-2xl mt-2">{AUTHOR_NAME}</CardTitle>
        <p className="text-muted-text font-medium">Enfermero especialista en Enfermería Familiar y Comunitaria</p>
      </CardHeader>

      <CardContent className="space-y-8 p-6 sm:p-8">
        <p className="text-center text-slate-600 leading-relaxed">
          Si quiere proponer nuevas escalas, ha detectado un error en algún cálculo o quiere contactar conmigo, puede hacerlo por estos canales:
        </p>

        <div className="grid grid-cols-1 gap-4">
          {links.map(({ href, icon: Icon, label, detail, external }) => (
            <Button key={label} asChild variant="outline" size="lg" className="h-16 justify-between border-2">
              <a href={href} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
                <span className="flex items-center gap-3">
                  <Icon className="w-6 h-6 text-primary" />
                  <span className="font-bold">{label}</span>
                </span>
                <span className="flex items-center gap-2 text-xs text-muted-text truncate">
                  {detail}
                  {external && <ExternalLink className="w-4 h-4 opacity-50" />}
                </span>
              </a>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  </div>
);

export default ContactPage;
