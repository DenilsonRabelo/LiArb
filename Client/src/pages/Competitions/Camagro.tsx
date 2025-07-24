import React, { useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AnimatedSection from '@/components/AnimatedSection';

const CamagroPage = () => {
  // Scroll para o topo quando a página carregar
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Imagens das participações da LiArb na CAMAGRO
  const competitionImages = [
    {
      src: '/CAMAGRO/CAMAGRO/2021 III CAMAGRO.png',
      alt: '2021 III CAMAGRO',
      year: '2021'
    },
    {
      src: '/CAMAGRO/CAMAGRO/2022 IV CAMAGRO.png',
      alt: '2022 IV CAMAGRO',
      year: '2022'
    },
    {
      src: '/CAMAGRO/CAMAGRO/2023 V CAMAGRO.png',
      alt: '2023 V CAMAGRO',
      year: '2023'
    },
    {
      src: '/CAMAGRO/CAMAGRO/Prêmio de Equipe Destaque - VI CAMAGRO 2024 - Cescon Barrieu.png',
      alt: '2024 VI CAMAGRO - Equipe Destaque',
      year: '2024'
    },
    {
      src: '/CAMAGRO/CAMAGRO/VI Edição 2024 RODADA PRESENCIAL EM SP.jpg',
      alt: '2024 VI CAMAGRO - Rodada Presencial SP',
      year: '2024'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar darkTheme={true} />
      
      {/* Header */}
      <div className="bg-liarb-blue text-white py-20">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <Link 
              to="/#competitions" 
              className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors"
            >
              <ArrowLeft size={20} />
              Voltar para Competições
            </Link>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">CAMAGRO</h1>
            <p className="text-xl text-white/90 max-w-3xl">
              Competição de Arbitragem no Agronegócio
            </p>
          </AnimatedSection>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-16">
        {/* Section 1: Texto | Foto */}
        <AnimatedSection>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-liarb-blue mb-6">
                Arbitragem Especializada no Agronegócio
              </h2>
              <p className="text-gray-700 text-lg leading-relaxed">
                A CAMAGRO é uma das principais competições de arbitragem do Brasil voltada 
                especificamente para o setor do agronegócio. Promovida pela CAMAGRO (Câmara de 
                Mediação e Arbitragem no Agronegócio), a competição simula casos reais relacionados 
                a conflitos contratuais típicos do setor, exigindo dos estudantes domínio técnico 
                e desenvoltura oral.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Esta competição oferece uma oportunidade única para os participantes mergulharem 
                nas especificidades jurídicas do agronegócio brasileiro, um dos setores mais 
                importantes da economia nacional, desenvolvendo expertise em uma área de crescente 
                demanda no mercado jurídico.
              </p>
            </div>
            <div className="relative">
              <img 
                src={competitionImages[0].src}
                alt={competitionImages[0].alt}
                className="w-full h-auto rounded-lg shadow-lg object-cover"
              />
              <div className="absolute -bottom-4 -right-4 bg-liarb-blue text-white px-4 py-2 rounded-lg font-semibold">
                {competitionImages[0].year}
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Section 2: Foto | Texto */}
        <AnimatedSection>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
            <div className="relative order-2 lg:order-1">
              <img 
                src={competitionImages[1].src}
                alt={competitionImages[1].alt}
                className="w-full h-auto rounded-lg shadow-lg object-cover"
              />
              <div className="absolute -bottom-4 -left-4 bg-liarb-blue text-white px-4 py-2 rounded-lg font-semibold">
                {competitionImages[1].year}
              </div>
            </div>
            <div className="space-y-6 order-1 lg:order-2">
              <h2 className="text-3xl font-bold text-liarb-blue mb-6">
                Nossa Trajetória na CAMAGRO
              </h2>
              <p className="text-gray-700 text-lg leading-relaxed">
                A Liga de Arbitragem tem marcado presença constante na CAMAGRO, conquistando 
                reconhecimento nacional com sua atuação. Desde a estreia em 2021, quando fomos 
                semifinalistas, mantivemos uma performance sólida, chegando diversas vezes às 
                fases finais da competição e sendo destaque entre as equipes.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Nossa consistência na CAMAGRO demonstra a capacidade da LiArb de se adaptar e 
                se especializar em diferentes áreas do direito, mantendo sempre o alto padrão 
                de excelência que nos caracteriza.
              </p>
            </div>
          </div>
        </AnimatedSection>

        {/* Section 3: Texto | Foto */}
        <AnimatedSection>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-liarb-blue mb-6">
                Histórico de Participações
              </h2>
              <div className="space-y-4">
                <div className="border-l-4 border-liarb-blue pl-6 py-3">
                  <h3 className="font-bold text-xl text-gray-800">2021</h3>
                  <p className="text-gray-700">Estreia na competição e semifinalistas.</p>
                </div>
                <div className="border-l-4 border-liarb-blue pl-6 py-3">
                  <h3 className="font-bold text-xl text-gray-800">2022</h3>
                  <p className="text-gray-700">Alcançamos as quartas de final.</p>
                </div>
                <div className="border-l-4 border-liarb-blue pl-6 py-3">
                  <h3 className="font-bold text-xl text-gray-800">2023</h3>
                  <p className="text-gray-700">Novamente chegamos às quartas de final.</p>
                </div>
                <div className="border-l-4 border-liarb-blue pl-6 py-3">
                  <h3 className="font-bold text-xl text-gray-800">2024</h3>
                  <p className="text-gray-700">Quartas de final, com menção como equipe destaque e honras para o 7º melhor orador.</p>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed">
                Nossa trajetória na CAMAGRO reflete não apenas conhecimento jurídico, mas também 
                a capacidade de compreender as nuances específicas do agronegócio brasileiro.
              </p>
            </div>
            <div className="relative">
              <img 
                src={competitionImages[2].src}
                alt={competitionImages[2].alt}
                className="w-full h-auto rounded-lg shadow-lg object-cover"
              />
              <div className="absolute -bottom-4 -right-4 bg-liarb-blue text-white px-4 py-2 rounded-lg font-semibold">
                {competitionImages[2].year}
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Section 4: Foto | Texto */}
        <AnimatedSection>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
            <div className="relative order-2 lg:order-1">
              <img 
                src={competitionImages[3].src}
                alt={competitionImages[3].alt}
                className="w-full h-auto rounded-lg shadow-lg object-cover"
              />
              <div className="absolute -bottom-4 -left-4 bg-liarb-blue text-white px-4 py-2 rounded-lg font-semibold">
                Equipe Destaque
              </div>
            </div>
            <div className="space-y-6 order-1 lg:order-2">
              <h2 className="text-3xl font-bold text-liarb-blue mb-6">
                Reconhecimento Nacional
              </h2>
              <p className="text-gray-700 text-lg leading-relaxed">
                Em 2024, nossa dedicação foi recompensada com o prêmio de "Equipe Destaque" na 
                VI CAMAGRO, um reconhecimento que reflete anos de trabalho árduo e excelência 
                técnica. Além disso, um de nossos membros foi honrado como o 7º melhor orador 
                da competição.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Este reconhecimento consolida a LiArb como uma das principais equipes de arbitragem 
                no agronegócio do país, destacando nossa capacidade de formar profissionais de 
                excelência na área.
              </p>
            </div>
          </div>
        </AnimatedSection>

        {/* Section 5: Texto | Foto */}
        <AnimatedSection>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-liarb-blue mb-6">
                Experiência Presencial
              </h2>
              <p className="text-gray-700 text-lg leading-relaxed">
                A participação na rodada presencial em São Paulo durante a VI CAMAGRO 2024 
                proporcionou uma experiência única para nossos membros. O contato direto com 
                outros competidores e com profissionais do setor enriqueceu ainda mais nosso 
                aprendizado.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Essas experiências presenciais são fundamentais para o desenvolvimento de nossas 
                habilidades de oratória e para o networking profissional, aspectos essenciais 
                para uma carreira bem-sucedida em arbitragem.
              </p>
            </div>
            <div className="relative">
              <img 
                src={competitionImages[4].src}
                alt={competitionImages[4].alt}
                className="w-full h-auto rounded-lg shadow-lg object-cover"
              />
              <div className="absolute -bottom-4 -right-4 bg-liarb-blue text-white px-4 py-2 rounded-lg font-semibold">
                Rodada Presencial SP
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Call to Action */}
        <AnimatedSection>
          <div className="text-center bg-gray-50 rounded-xl p-12">
            <h2 className="text-3xl font-bold text-liarb-blue mb-4">
              Quer fazer parte da nossa equipe?
            </h2>
            <p className="text-gray-700 mb-8 max-w-2xl mx-auto">
              Junte-se à LiArb e participe das próximas edições da CAMAGRO. 
              Especialize-se em arbitragem no setor do agronegócio.
            </p>
            <a 
              href="https://instagram.com/ligadearbitragem"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-3 bg-liarb-blue text-white rounded-lg font-semibold hover:bg-opacity-90 transition-all duration-300"
            >
              Entre em Contato
            </a>
          </div>
        </AnimatedSection>
      </div>

      <Footer />
    </div>
  );
};

export default CamagroPage;
