import React, { useEffect } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import AnimatedSection from '../../components/AnimatedSection';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const LiarbAcademy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const academyImages = [
    '/LiArb Academy/Eventos-LiArb Academy/2024 - I CONGRESSO LIARB.jpg',
    '/LiArb Academy/Eventos-LiArb Academy/2025 - II CONGRESSO LIARB.jpg',
    '/LiArb Academy/Eventos-LiArb Academy/Equipe-LiArb-UFC-Dialogar-UFC.png',
    '/LiArb Academy/Eventos-LiArb Academy/435 inscritos.jpg',
    '/LiArb Academy/Eventos-LiArb Academy/2025 - II CONGRESSO.jpg',
    '/LiArb Academy/Eventos-LiArb Academy/2024 - I CONGRESSO LIARB(1).jpg',
    '/LiArb Academy/Eventos-LiArb Academy/II CONGRESSO LIARB.jpg',
    '/LiArb Academy/Eventos-LiArb Academy/Média de 135 espectadores por painel.jpg',
    '/LiArb Academy/Eventos-LiArb Academy/II CONGRESSO LIARB - COM FÁBIO ULHOA COELHO.jpg',
    '/LiArb Academy/Eventos-LiArb Academy/Equipe-LiArb-UFC-I-ENCONTRO-DE-ARBITRAGEM-E-MEDIAÇÃO.png',
    '/LiArb Academy/Eventos-LiArb Academy/PRÉ-EVENTO II CONGRESSO LIARB.JPG'
  ];

  const sections = [
    {
      title: "O braço acadêmico da Liga de Arbitragem da UFC",
      content: "A LiArb Academy é a extensão acadêmica da Liga de Arbitragem da Universidade Federal do Ceará. Formada por ex-membros da Liga e apoiada por professores, profissionais e parceiros da área jurídica, a Academy é o espaço dedicado à formação, pesquisa e difusão do conhecimento sobre arbitragem e áreas correlatas do Direito.",
      image: academyImages[0]
    },
    {
      title: "Nossa missão",
      content: "Promover o aprofundamento acadêmico e o debate qualificado sobre arbitragem, Direito Empresarial e Contratual, contribuindo para a construção de uma comunidade jurídica crítica, atualizada e conectada com as demandas do mercado.",
      image: academyImages[1]
    },
    {
      title: "O que fazemos - Ensino",
      content: "A LiArb Academy atua por meio de três grandes frentes: Ensino - Curso de Arbitragem: formação teórica e prática para estudantes e profissionais que desejam se aprofundar na arbitragem como meio de resolução de conflitos.",
      image: academyImages[2]
    },
    {
      title: "Pesquisa e Produção Acadêmica",
      content: "Incentivo à escrita de artigos, participação em revistas científicas e grupos de estudo sobre arbitragem, contratos e Direito Empresarial.",
      image: academyImages[7]
    },
    {
      title: "Eventos de Alto Nível",
      content: "Organizamos e promovemos eventos de alto nível com nomes relevantes do cenário jurídico nacional: Congresso LiArb (evento anual com grandes juristas), Simpósio LiArb (espaço de debate), LiArb Convida (encontros com convidados de destaque) e participações em eventos como a SPAW (São Paulo Arbitration Week).",
      image: academyImages[4]
    },
    {
      title: "II Congresso de Arbitragem (2025)",
      content: "Local: Faculdade de Direito da UFC. Data: 24 e 25 de abril. Com presença de nomes como Judith Martins-Costa, Ana Frazão, Marlon Tomazette, Francisco Satiro, Eleonora Coelho, entre outros juristas de renome.",
      image: academyImages[5]
    },
    {
      title: "Participe da LiArb Academy",
      content: "Se você é apaixonado por Direito e quer ir além da graduação, a LiArb Academy é o espaço ideal para aprofundar seus estudos, se conectar com especialistas e contribuir com a construção do saber jurídico. Fique atento às próximas turmas, eventos e chamadas para publicação. Instagram: @ligadearbitragem",
      image: academyImages[6]
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar darkTheme={true} />
      
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 bg-gradient-to-br from-liarb-purple to-liarb-blue overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <AnimatedSection>
            <Link 
              to="/" 
              className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-8 transition-colors"
            >
              <ArrowLeft size={20} />
              Voltar ao início
            </Link>
          </AnimatedSection>
          
          <AnimatedSection delay={100}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              LiArb Academy
            </h1>
            <p className="text-xl text-white/90 max-w-3xl">
              O braço acadêmico da Liga de Arbitragem da UFC
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Content Sections */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          {sections.map((section, index) => (
            <div 
              key={index}
              className={`flex flex-col lg:flex-row items-center gap-12 mb-20 ${
                index % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}
            >
              <div className="flex-1">
                <AnimatedSection delay={100}>
                  <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
                    {section.title}
                  </h2>
                  <p className="text-lg text-foreground/80 leading-relaxed">
                    {section.content}
                  </p>
                </AnimatedSection>
              </div>
              
              <div className="flex-1">
                <AnimatedSection delay={200} direction={index % 2 === 0 ? 'right' : 'left'}>
                  <div className="relative">
                    <img
                      src={section.image}
                      alt={section.title}
                      className="w-full h-80 object-cover rounded-2xl shadow-2xl"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-2xl"></div>
                  </div>
                </AnimatedSection>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
              Galeria de Eventos
            </h2>
          </AnimatedSection>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {academyImages.map((image, index) => (
              <AnimatedSection key={index} delay={index * 100}>
                <div className="relative group overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300">
                  <img
                    src={image}
                    alt={`LiArb Academy ${index + 1}`}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-gradient-to-br from-liarb-purple to-liarb-blue">
        <div className="container mx-auto px-4 text-center">
          <AnimatedSection>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
              Entre em Contato
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Interessado em participar da LiArb Academy? Entre em contato conosco!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://instagram.com/ligadearbitragem"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-white text-liarb-purple font-semibold rounded-lg hover:bg-gray-100 transition-colors"
              >
                @ligadearbitragem
              </a>
              <a
                href="https://instagram.com/ligadearbitragem"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-liarb-purple transition-all"
              >
                Fale Conosco
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default LiarbAcademy;
