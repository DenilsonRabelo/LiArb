import React, { useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AnimatedSection from '@/components/AnimatedSection';

const VisMootPage = () => {
  // Scroll para o topo quando a página carregar
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const competitionImages = [
    {
      src: '/Vis Moot/Vis Moot/IMG_0334.png',
      alt: 'Vis Moot 2022 - Participação Online',
      year: '2022'
    },
    {
      src: '/Vis Moot/Vis Moot/IMG_0498.png',
      alt: 'Vis Moot 2023 - Estreia em Viena',
      year: '2023'
    },
    {
      src: '/Vis Moot/Vis Moot/IMG_0530 ed.jpg',
      alt: 'Vis Moot 2024 - Segunda participação presencial',
      year: '2024'
    },
    {
      src: '/Vis Moot/Vis Moot/IMG_4940.jpg',
      alt: 'Equipe LiArb no Vis Moot',
      year: '2024'
    },
    {
      src: '/Vis Moot/Vis Moot/WhatsApp Image 2024-03-18 at 18.19.36.jpg',
      alt: 'Experiência em Viena',
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
            <h1 className="text-4xl md:text-5xl font-bold mb-4">VIS MOOT</h1>
            <p className="text-xl text-white/90 max-w-3xl">
              Willem C. Vis International Commercial Arbitration Moot
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
                A Maior Competição de Arbitragem Internacional do Mundo
              </h2>
              <p className="text-gray-700 text-lg leading-relaxed">
                O Vis Moot, realizado anualmente em Viena, é a maior competição de arbitragem 
                internacional do mundo. Foca em arbitragem comercial internacional e aplicação 
                da Convenção de Viena sobre Compra e Venda Internacional de Mercadorias (CISG). 
                Reúne estudantes de mais de 80 países e universidades de ponta como Harvard e Oxford.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Esta competição representa o ápice do ensino jurídico internacional em arbitragem, 
                oferecendo uma experiência única de imersão no direito comercial internacional 
                e nas práticas arbitrais mais avançadas do mundo.
              </p>
            </div>
            <div className="relative">
              <img 
                src={competitionImages[0].src}
                alt={competitionImages[0].alt}
                className="w-full h-auto rounded-lg shadow-lg object-cover"
              />
              <div className="absolute -bottom-4 -right-4 bg-liarb-blue text-white px-4 py-2 rounded-lg font-semibold">
                {competitionImages[0].year} - Online
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
                {competitionImages[1].year} - Viena
              </div>
            </div>
            <div className="space-y-6 order-1 lg:order-2">
              <h2 className="text-3xl font-bold text-liarb-blue mb-6">
                Nossa Trajetória no Vis Moot
              </h2>
              <p className="text-gray-700 text-lg leading-relaxed">
                Participar do Vis Moot é um marco para qualquer Liga de Arbitragem. Desde 2022, 
                estamos presentes na competição, com participações tanto online quanto presenciais. 
                Estar entre equipes internacionais e debater com as maiores universidades do mundo 
                é uma experiência transformadora que reafirma o nível de excelência da nossa formação.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Nossa presença no Vis Moot demonstra o alcance internacional da LiArb e nossa 
                capacidade de competir em igualdade com as melhores instituições acadêmicas 
                do cenário mundial.
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
                  <h3 className="font-bold text-xl text-gray-800">2022</h3>
                  <p className="text-gray-700">Primeira participação no Vis Moot (formato online).</p>
                </div>
                <div className="border-l-4 border-liarb-blue pl-6 py-3">
                  <h3 className="font-bold text-xl text-gray-800">2023</h3>
                  <p className="text-gray-700">Estreia presencial em Viena.</p>
                </div>
                <div className="border-l-4 border-liarb-blue pl-6 py-3">
                  <h3 className="font-bold text-xl text-gray-800">2024</h3>
                  <p className="text-gray-700">Segunda participação presencial no evento.</p>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed">
                Nossa evolução do formato online para participações presenciais consecutivas 
                em Viena demonstra o crescimento e a consolidação da LiArb no cenário 
                internacional de arbitragem.
              </p>
            </div>
            <div className="relative">
              <img 
                src={competitionImages[2].src}
                alt={competitionImages[2].alt}
                className="w-full h-auto rounded-lg shadow-lg object-cover"
              />
              <div className="absolute -bottom-4 -right-4 bg-liarb-blue text-white px-4 py-2 rounded-lg font-semibold">
                {competitionImages[2].year} - Presencial
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
                Equipe LiArb
              </div>
            </div>
            <div className="space-y-6 order-1 lg:order-2">
              <h2 className="text-3xl font-bold text-liarb-blue mb-6">
                Experiência Internacional
              </h2>
              <p className="text-gray-700 text-lg leading-relaxed">
                Competir no Vis Moot significa enfrentar os melhores estudantes de direito do mundo 
                em um ambiente de altíssimo nível técnico. Nossa equipe demonstra preparação 
                excepcional e capacidade de argumentação em inglês, debatendo casos complexos 
                de direito comercial internacional.
              </p>
              <p className="text-gray-700 leading-relaxed">
                A experiência adquirida no Vis Moot é inestimável, proporcionando networking 
                internacional e conhecimento profundo das práticas arbitrais mais modernas 
                e sofisticadas do cenário global.
              </p>
            </div>
          </div>
        </AnimatedSection>

        {/* Section 5: Texto | Foto */}
        <AnimatedSection>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-liarb-blue mb-6">
                Viena: Capital Mundial da Arbitragem
              </h2>
              <p className="text-gray-700 text-lg leading-relaxed">
                Participar presencialmente em Viena oferece uma imersão completa na cultura 
                jurídica internacional. A cidade, reconhecida como capital mundial da arbitragem, 
                proporciona um ambiente único para o aprendizado e desenvolvimento profissional 
                dos nossos membros.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Cada participação presencial fortalece nossos laços com a comunidade internacional 
                de arbitragem e amplia as perspectivas de carreira dos nossos integrantes no 
                cenário jurídico global.
              </p>
            </div>
            <div className="relative">
              <img 
                src={competitionImages[4].src}
                alt={competitionImages[4].alt}
                className="w-full h-auto rounded-lg shadow-lg object-cover"
              />
              <div className="absolute -bottom-4 -right-4 bg-liarb-blue text-white px-4 py-2 rounded-lg font-semibold">
                Viena 2024
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
              Junte-se à LiArb e participe das próximas edições do Vis Moot. 
              Compete internacionalmente e desenvolva expertise em arbitragem comercial global.
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

export default VisMootPage;
