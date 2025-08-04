
import React from 'react';
import AnimatedSection from './AnimatedSection';

const Hero = () => {
  return (
    <section 
      id="home" 
      className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-gradient-to-br from-white to-blue-50"
    >
      {/* Decorative Hexagons */}
      <div className="absolute left-0 top-1/4 w-64 h-64 bg-liarb-blue-light/20 rounded-tr-3xl rounded-bl-3xl rotate-12 animate-floating"></div>
      <div className="absolute right-0 bottom-1/4 w-48 h-48 bg-liarb-purple-light/10 rounded-tl-3xl rounded-br-3xl -rotate-12 animate-floating animation-delay-300"></div>
      
      <div className="w-full px-4 md:px-8 lg:px-12 z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="w-full lg:w-1/2 text-center lg:text-left">
            <AnimatedSection direction="left">
              <div className="inline-block mb-2 px-4 py-1 rounded-full bg-liarb-blue/10 text-liarb-blue text-sm font-medium">
                Liga de Arbitragem
              </div>
            </AnimatedSection>
            
            <AnimatedSection delay={100} direction="left">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                <span className="bg-clip-text text-transparent bg-dual-gradient">
                  LIGA DE
                </span>
                <br />
                <span className="text-foreground">
                  ARBITRAGEM
                </span>
              </h1>
            </AnimatedSection>
            
            <AnimatedSection delay={200} direction="left">
              <p className="text-lg text-foreground/80 mb-8 max-w-xl">
                A Liga de Arbitragem LiArb tem como missão promover a arbitragem e o esporte acadêmico, 
                contribuindo para a formação de profissionais éticos e competentes.
              </p>
            </AnimatedSection>
            
            <AnimatedSection delay={300} direction="left">
              <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                <a 
                  href="#about" 
                  className="px-6 py-3 rounded-lg bg-liarb-blue text-white font-medium shadow-lg shadow-liarb-blue/20 hover:shadow-xl hover:shadow-liarb-blue/30 hover:-translate-y-1 transition-all duration-300"
                >
                  Conheça a Liga
                </a>
                <a 
                  href="https://instagram.com/ligadearbitragem" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-lg bg-white border border-gray-200 text-foreground font-medium hover:bg-gray-50 hover:-translate-y-1 transition-all duration-300"
                >
                  Entre em contato
                </a>
              </div>
            </AnimatedSection>
          </div>
          
          <div className="w-full lg:w-1/2 justify-center lg:justify-end hidden lg:flex">
            <AnimatedSection direction="right">
              <div className="flex items-center justify-center">
                <img 
                  src="/logo_liarb.png" 
                  alt="LiArb Logo"
                  className="w-48 h-48 md:w-64 md:h-64 lg:w-72 lg:h-72 drop-shadow-lg object-contain"
                />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-pulse-soft">
        <div className="flex flex-col items-center">
          <span className="text-foreground/70 text-sm mb-2">Scroll para descobrir</span>
          <div className="w-6 h-10 border-2 border-foreground/30 rounded-full flex justify-center">
            <span className="block w-1 h-2 bg-foreground/50 rounded-full mt-2 animate-[bounce_1.5s_infinite]"></span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
