
import React, { useEffect, useState } from 'react';
import Card from './Card';
import AnimatedSection from './AnimatedSection';
import { config } from '../config/env';

type Event = {
  id: number;
  title: string;
  date: string;
  location: string;
};

const Academy = () => {
  const [events, setEvents] = useState<Event[]>([]);



  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(`${config.URL}/evento/buscar/paginado/1/5`);
        const data = await response.json();
        setEvents(data.events);
      } catch (error) {
        console.error('Failed to fetch events:', error);
      }
    };

    fetchEvents();
  }, []);

  const courses = [
    {
      title: "Fundamentos da Arbitragem",
      description: "Curso introdutório aos princípios e conceitos básicos da arbitragem.",
      duration: "4 semanas"
    },
    {
      title: "Arbitragem Comercial",
      description: "Especialização em resolução de disputas comerciais nacionais e internacionais.",
      duration: "8 semanas"
    },
    {
      title: "Técnicas de Mediação",
      description: "Desenvolvimento de habilidades para mediação eficaz de conflitos.",
      duration: "6 semanas"
    }
  ];

  return (
    <section id="academy" className="section-padding bg-white">
      <div className="container mx-auto">
        <AnimatedSection>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">LiArb Academy</h2>
            <div className="w-20 h-1 bg-purple-gradient mx-auto rounded-full mb-6"></div>
            
          </div>
        </AnimatedSection>

        {/* Boxes informativos */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <AnimatedSection delay={100}>
            <Card className="h-full bg-gradient-to-br from-liarb-blue/5 to-liarb-purple/5 border-liarb-blue/20">
              <div className="mb-4">
                <h3 className="text-xl font-bold text-liarb-blue mb-3">
                  O braço acadêmico da Liga de Arbitragem da UFC
                </h3>
                <p className="text-foreground/80 leading-relaxed">
                  A LiArb Academy é a extensão acadêmica da Liga de Arbitragem da Universidade Federal do Ceará. 
                  Formada por ex-membros da Liga e apoiada por professores, profissionais e parceiros da área jurídica, 
                  a Academy é o espaço dedicado à formação, pesquisa e difusão do conhecimento sobre arbitragem e 
                  áreas correlatas do Direito.
                </p>
              </div>
            </Card>
          </AnimatedSection>

          <AnimatedSection delay={200}>
            <Card className="h-full bg-gradient-to-br from-liarb-purple/5 to-liarb-blue/5 border-liarb-purple/20">
              <div className="mb-4">
                <h3 className="text-xl font-bold text-liarb-purple mb-3">
                  Nossa missão
                </h3>
                <p className="text-foreground/80 leading-relaxed">
                  Promover o aprofundamento acadêmico e o debate qualificado sobre arbitragem, Direito Empresarial 
                  e Contratual, contribuindo para a construção de uma comunidade jurídica crítica, atualizada e 
                  conectada com as demandas do mercado.
                </p>
              </div>
            </Card>
          </AnimatedSection>
        </div>

        {/* Botão Saiba mais centralizado */}
        <AnimatedSection delay={300} className="text-center mb-20">
          <a 
            href="/liarb-academy" 
            className="inline-block px-8 py-4 rounded-lg bg-liarb-purple text-white font-medium shadow-lg shadow-liarb-purple/20 hover:shadow-xl hover:shadow-liarb-purple/30 hover:-translate-y-1 transition-all duration-300"
          >
            Saiba mais da LiArb Academy
          </a>
        </AnimatedSection>



        <AnimatedSection>
          <h3 className="text-2xl font-bold text-center mb-10">Eventos Recentes</h3>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {(events || []).map((event, index) => {
            const day = new Date(event.date).getDate();

            const formattedDate = new Intl.DateTimeFormat('pt-BR', {
              day: '2-digit',
              month: 'long',
              year: 'numeric',
            }).format(new Date(event.date));

            return (
              <AnimatedSection key={index} delay={index * 100}>
                <Card className="h-full bg-gray-50 border-none cursor-pointer">
                  <div className="w-16 h-16 rounded-full bg-liarb-blue-light/20 flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-liarb-blue">
                      {day}
                    </span>
                  </div>
                  <h4 className="text-base font-bold text-center mb-2">{event.title}</h4>
                  <div className="text-center text-sm">
                    <p className="text-foreground/70">{formattedDate}</p>
                    <p className="text-liarb-blue">{event.location}</p>
                  </div>
                </Card>
              </AnimatedSection>
            );
          })}
        </div>

        <AnimatedSection delay={300} className="mt-12 text-center">
          <h4 className="text-xl font-medium mb-6">Histórico dos eventos mais recentes organizados</h4>
          <a 
            href="/eventos" 
            className="inline-block px-8 py-3 rounded-lg bg-liarb-blue text-white font-medium shadow-lg shadow-liarb-blue/20 hover:shadow-xl hover:shadow-liarb-blue/30 hover:-translate-y-1 transition-all duration-300"
          >
            Ver todos os eventos
          </a>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default Academy;
