
import React from 'react';
import { Link } from 'react-router-dom';
import AnimatedSection from './AnimatedSection';

const Competitions = () => {
  return (
    <section 
      id="competitions" 
      className="section-padding bg-liarb-blue text-white relative overflow-hidden"
    >
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10">
        <div className="absolute top-10 left-10 w-64 h-64 rounded-full bg-white"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 rounded-full bg-white"></div>
      </div>
      
      <div className="container mx-auto relative z-10">
        <AnimatedSection>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Competições</h2>
            <div className="w-20 h-1 bg-white mx-auto rounded-full mb-6"></div>
            <p className="text-white/80 max-w-2xl mx-auto">
              A LiArb organiza e apoia diversas competições de arbitragem acadêmica, 
              fornecendo um ambiente para o desenvolvimento de habilidades práticas.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <AnimatedSection direction="left">
            <div className="prose prose-invert max-w-none">
              <p className="text-lg">
                Nossas competições são projetadas para simular cenários reais de arbitragem, oferecendo aos participantes
                a oportunidade de aplicar seus conhecimentos teóricos em situações práticas.
              </p>
              <p>
                Cada competição tem seu próprio regulamento e critérios de avaliação, elaborados de acordo com os padrões
                internacionais e adaptados ao contexto acadêmico. Promovemos um ambiente de aprendizado construtivo,
                onde o feedback é valorizado e utilizado para o aprimoramento contínuo.
              </p>
              <p>
                Os participantes têm a oportunidade de interagir com profissionais experientes da área, recebendo
                orientações valiosas e estabelecendo conexões importantes para sua futura carreira.
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection direction="right">
            <div className="grid grid-cols-1 gap-6">
              {[
                {
                  name: "CAMAGRO",
                  date: "Março - Maio",
                  description: "Competição de Arbitragem em Agronegócio, focada em disputas do setor agrícola.",
                  link: "/competicoes/camagro"
                },
                {
                  name: "CAMARB",
                  date: "Junho - Agosto",
                  description: "Competição de Arbitragem em Direito Comercial, abordando conflitos empresariais.",
                  link: "/competicoes/camarb"
                },
                {
                  name: "VIS",
                  date: "Setembro - Novembro",
                  description: "Vienna International Simulation, competição internacional de arbitragem comercial.",
                  link: "/competicoes/vis-moot"
                }
              ].map((competition, index) => (
                <div 
                  key={index} 
                  className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300"
                >
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-bold">{competition.name}</h3>
                    <span className="px-3 py-1 bg-white/20 rounded-full text-xs">{competition.date}</span>
                  </div>
                  <p className="text-white/80 text-sm">{competition.description}</p>
                  {competition.link === "#" ? (
                    <span className="inline-block mt-4 text-white/60 font-medium text-sm">
                      Em breve
                    </span>
                  ) : (
                    <Link 
                      to={competition.link}
                      className="inline-block mt-4 text-white font-medium text-sm hover:underline"
                    >
                      Saiba mais
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>

        
      </div>
    </section>
  );
};

export default Competitions;
