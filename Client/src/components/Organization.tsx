
import React from 'react';
import Card from './Card';
import AnimatedSection from './AnimatedSection';

const Organization = () => {
  return (
    <section id="about" className="section-padding bg-white">
      <div className="container mx-auto">
        <AnimatedSection>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Como é organizado</h2>
            <div className="w-20 h-1 bg-purple-gradient mx-auto rounded-full mb-6"></div>
            <p className="text-foreground/70 max-w-2xl mx-auto">
              Conheça a organização da Liga de Arbitragem e entenda como trabalhamos para 
              promover a excelência no esporte acadêmico.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <AnimatedSection delay={100}>
            <div className="prose max-w-none">
              <p className="text-lg">
                A LiArb é estruturada em um modelo organizacional que promove a eficiência e a colaboração entre todas as áreas. 
                Somos formados por profissionais dedicados ao desenvolvimento da arbitragem no cenário acadêmico e esportivo.
              </p>
              <p>
                Nossa estrutura é composta por diretorias especializadas, consultores experientes e membros ativos,
                todos trabalhando em sinergia para alcançar nossos objetivos comuns. Cada área possui responsabilidades
                específicas que se complementam, garantindo um funcionamento integrado e eficaz.
              </p>
              <p>
                Valorizamos a transparência em nossas operações e a participação ativa de todos os membros.
                Reuniões periódicas e canais de comunicação eficientes asseguram que todos estejam alinhados
                com nossa missão e valores.
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={200} direction="right">
            <div className="bg-gray-50 rounded-xl p-8 shadow-inner">
              <h3 className="text-xl font-semibold mb-4">Nossos princípios organizacionais</h3>
              <ul className="space-y-4">
                {[
                  {
                    title: "Transparência",
                    description: "Comunicação clara e acessível sobre todas as decisões e processos."
                  },
                  {
                    title: "Colaboração",
                    description: "Trabalho conjunto entre todas as áreas para alcançar objetivos comuns."
                  },
                  {
                    title: "Excelência",
                    description: "Busca constante pelo aprimoramento e qualidade em todas as atividades."
                  },
                  {
                    title: "Inovação",
                    description: "Abertura para novas ideias e metodologias que possam aprimorar nossos serviços."
                  }
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-liarb-blue-light flex items-center justify-center mt-1">
                      <span className="text-liarb-blue text-xs font-bold">{index + 1}</span>
                    </div>
                    <div className="ml-4">
                      <h4 className="font-medium text-foreground">{item.title}</h4>
                      <p className="text-sm text-foreground/70">{item.description}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default Organization;
