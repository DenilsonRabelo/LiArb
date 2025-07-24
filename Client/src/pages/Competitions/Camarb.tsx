import React, { useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AnimatedSection from '@/components/AnimatedSection';

const CamarbPage = () => {
  // Scroll para o topo quando a página carregar
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const competitionImages = [
    {
      src: '/CAMARB/CAMARB/2020 XI CAMARB.png',
      alt: '2020 XI CAMARB',
      year: '2020'
    },
    {
      src: '/CAMARB/CAMARB/2021 XII CAMARB.png',
      alt: '2021 XII CAMARB',
      year: '2021'
    },
    {
      src: '/CAMARB/CAMARB/2022 XIII Camarb.jpg',
      alt: '2022 XIII CAMARB',
      year: '2022'
    },
    {
      src: '/CAMARB/CAMARB/2023-XIV-CAMARB.png',
      alt: '2023 XIV CAMARB',
      year: '2023'
    },
    {
      src: '/CAMARB/CAMARB/2024-XV-Camarb.png',
      alt: '2024 XV CAMARB',
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
            <h1 className="text-4xl md:text-5xl font-bold mb-4">CAMARB</h1>
            <p className="text-xl text-white/90 max-w-3xl">
              Competição Brasileira de Arbitragem e Direito Empresarial
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
                A Maior Competição de Arbitragem da América Latina
              </h2>
              <p className="text-gray-700 text-lg leading-relaxed">
                A CAMARB é a maior competição de arbitragem e Direito Empresarial da América Latina. 
                Reúne centenas de equipes de universidades brasileiras e internacionais, desafiando os 
                participantes com casos complexos e realistas que envolvem disputas empresariais, técnicas 
                de negociação e oratória jurídica de alto nível.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Esta competição representa uma oportunidade única para estudantes de Direito aprimorarem 
                suas habilidades em arbitragem comercial, desenvolvendo competências essenciais para a 
                prática profissional na área de resolução alternativa de disputas.
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
                Nossa Trajetória na CAMARB
              </h2>
              <p className="text-gray-700 text-lg leading-relaxed">
                A Liga participa da CAMARB desde 2020 até a atualidade e, ao longo dos anos, 
                tem conquistado posições expressivas. Em 2022, fomos semifinalistas e uma de 
                nossas integrantes recebeu uma menção honrosa pela excelência de sua atuação.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Nossa participação consistente demonstra o comprometimento da LiArb com a 
                excelência acadêmica e o desenvolvimento contínuo de nossos membros na área 
                de arbitragem e direito empresarial.
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
                  <h3 className="font-bold text-xl text-gray-800">2020</h3>
                  <p className="text-gray-700">Primeira participação na competição.</p>
                </div>
                <div className="border-l-4 border-liarb-blue pl-6 py-3">
                  <h3 className="font-bold text-xl text-gray-800">2022</h3>
                  <p className="text-gray-700">Semifinalistas, com menção honrosa por participação.</p>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed">
                Cada ano de participação representa crescimento e aprendizado. Nossa evolução 
                na competição reflete o desenvolvimento técnico e estratégico da equipe LiArb.
              </p>
            </div>
            <div className="relative">
              <img 
                src={competitionImages[2].src}
                alt={competitionImages[2].alt}
                className="w-full h-auto rounded-lg shadow-lg object-cover"
              />
              <div className="absolute -bottom-4 -right-4 bg-liarb-blue text-white px-4 py-2 rounded-lg font-semibold">
                {competitionImages[2].year} - Semifinalistas
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
                {competitionImages[3].year}
              </div>
            </div>
            <div className="space-y-6 order-1 lg:order-2">
              <h2 className="text-3xl font-bold text-liarb-blue mb-6">
                Continuidade e Crescimento
              </h2>
              <p className="text-gray-700 text-lg leading-relaxed">
                Nossa participação em 2023 consolidou a presença da LiArb como uma das equipes 
                mais consistentes da CAMARB. Continuamos aprimorando nossas técnicas e estratégias, 
                sempre buscando a excelência em cada apresentação.
              </p>
              <p className="text-gray-700 leading-relaxed">
                O aprendizado contínuo e a dedicação de nossos membros são os pilares que sustentam 
                nossa evolução constante na competição mais prestigiosa de arbitragem da América Latina.
              </p>
            </div>
          </div>
        </AnimatedSection>

        {/* Section 5: Texto | Foto */}
        <AnimatedSection>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-liarb-blue mb-6">
                Rumo ao Futuro
              </h2>
              <p className="text-gray-700 text-lg leading-relaxed">
                Em 2024, continuamos nossa trajetória de excelência na CAMARB, sempre em busca de 
                novos desafios e oportunidades de crescimento. Nossa participação mais recente 
                reafirma nosso compromisso com a qualidade e a inovação em arbitragem.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Cada edição nos ensina algo novo e nos prepara melhor para os desafios futuros. 
                A LiArb continua sendo uma referência em formação de arbitralistas no cenário 
                acadêmico brasileiro.
              </p>
            </div>
            <div className="relative">
              <img 
                src={competitionImages[4].src}
                alt={competitionImages[4].alt}
                className="w-full h-auto rounded-lg shadow-lg object-cover"
              />
              <div className="absolute -bottom-4 -right-4 bg-liarb-blue text-white px-4 py-2 rounded-lg font-semibold">
                {competitionImages[4].year}
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
              Junte-se à LiArb e participe das próximas edições da CAMARB. 
              Desenvolva suas habilidades em arbitragem e direito empresarial.
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

export default CamarbPage;
