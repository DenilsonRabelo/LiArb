
import React, { useEffect, useState } from 'react';
import Card from './Card';
import AnimatedSection from './AnimatedSection';

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
        const response = await fetch(`${process.env.URL}/evento/buscar/paginado/1/5`);
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
            <p className="text-foreground/70 max-w-2xl mx-auto">
              Nossa academia oferece cursos, workshops e eventos para o desenvolvimento profissional 
              em arbitragem e métodos alternativos de resolução de conflitos.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
          {courses.map((course, index) => (
            <AnimatedSection key={index} delay={index * 100}>
              <Card 
                className="h-full border border-gray-100 hover:border-liarb-blue/20"
                hoverEffect={true}
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-foreground">{course.title}</h3>
                  <span className="px-3 py-1 bg-liarb-blue-light/20 rounded-full text-liarb-blue text-xs font-medium">
                    {course.duration}
                  </span>
                </div>
                <p className="text-foreground/70 mb-4">{course.description}</p>
                <a 
                  href="#" 
                  className="inline-block text-liarb-blue font-medium hover:text-liarb-blue-dark transition-colors"
                >
                  Ver detalhes
                </a>
              </Card>
            </AnimatedSection>
          ))}
        </div>

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
