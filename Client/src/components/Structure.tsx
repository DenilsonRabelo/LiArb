import React, { useEffect, useState, useRef } from 'react';
import Card from './Card';
import AnimatedSection from './AnimatedSection';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { config } from '@/config/env';

type MemberData = {
  id: number;
  nome: string;
  cargo: string;
  descricao: string;
  fotoUrl: string;
}

type PhotoData = {
  src: string;
  alt: string;
  category: string;
}

const StructureCard = ({ title, description, index }: { title: string; description: string; index: number }) => (
  <AnimatedSection delay={index * 100} className="h-full">
    <Card
      className="h-full bg-purple-gradient text-white hover:shadow-lg hover:shadow-liarb-blue/20"
    >
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-white/90 text-sm">{description}</p>
    </Card>
  </AnimatedSection>
);

const PhotoSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState<PhotoData | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Reduzindo drasticamente o número de fotos para melhor performance
  const selectedPhotos = [
    // CAMARB - todas as fotos
    { src: '/CAMARB/CAMARB/2020 XI CAMARB.png', alt: '2020 XI CAMARB', category: 'CAMARB' },
    { src: '/CAMARB/CAMARB/2021 XII CAMARB.png', alt: '2021 XII CAMARB', category: 'CAMARB' },
    { src: '/CAMARB/CAMARB/2022 XIII Camarb.jpg', alt: '2022 XIII CAMARB', category: 'CAMARB' },
    { src: '/CAMARB/CAMARB/2023-XIV-CAMARB.png', alt: '2023 XIV CAMARB', category: 'CAMARB' },
    { src: '/CAMARB/CAMARB/2024-XV-Camarb.png', alt: '2024 XV CAMARB', category: 'CAMARB' },
    
    // CAMAGRO - todas as fotos
    { src: '/CAMAGRO/CAMAGRO/2021 III CAMAGRO.png', alt: '2021 III CAMAGRO', category: 'CAMAGRO' },
    { src: '/CAMAGRO/CAMAGRO/2022 IV CAMAGRO.png', alt: '2022 IV CAMAGRO', category: 'CAMAGRO' },
    { src: '/CAMAGRO/CAMAGRO/2023 V CAMAGRO.png', alt: '2023 V CAMAGRO', category: 'CAMAGRO' },
    { src: '/CAMAGRO/CAMAGRO/Prêmio de Equipe Destaque - VI CAMAGRO 2024 - Cescon Barrieu.jpeg', alt: 'CAMAGRO 2024 - Prêmio Destaque', category: 'CAMAGRO' },
    { src: '/CAMAGRO/CAMAGRO/VI Edição 2024 RODADA PRESENCIAL EM SP.jpg', alt: 'CAMAGRO 2024 - São Paulo', category: 'CAMAGRO' },
    
    // VIS MOOT - todas as fotos
    { src: '/Vis Moot/Vis Moot/IMG_0334.png', alt: 'Vis Moot 2022', category: 'VIS MOOT' },
    { src: '/Vis Moot/Vis Moot/IMG_0498.png', alt: 'Vis Moot 2023', category: 'VIS MOOT' },
    { src: '/Vis Moot/Vis Moot/IMG_0530 ed.jpg', alt: 'Vis Moot 2024', category: 'VIS MOOT' },
    { src: '/Vis Moot/Vis Moot/IMG_4940.jpg', alt: 'Equipe Vis Moot', category: 'VIS MOOT' },
    { src: '/Vis Moot/Vis Moot/WhatsApp Image 2024-03-18 at 18.19.36.jpg', alt: 'Vis Moot Viena', category: 'VIS MOOT' },
    
    // LIARB ACADEMY - todas as fotos
    { src: '/LiArb Academy/Eventos-LiArb Academy/2024 - I CONGRESSO LIARB.jpg', alt: 'I Congresso LiArb 2024', category: 'ACADEMY' },
    { src: '/LiArb Academy/Eventos-LiArb Academy/2025 - II CONGRESSO LIARB.jpg', alt: 'II Congresso LiArb 2025', category: 'ACADEMY' },
    { src: '/LiArb Academy/Eventos-LiArb Academy/Equipe-LiArb-UFC-Dialogar-UFC.png', alt: 'Equipe LiArb UFC - Dialogar', category: 'ACADEMY' },
    { src: '/LiArb Academy/Eventos-LiArb Academy/435 inscritos.jpg', alt: '435 Inscritos - Congresso', category: 'ACADEMY' },
    { src: '/LiArb Academy/Eventos-LiArb Academy/2025 - II CONGRESSO.jpg', alt: 'II Congresso LiArb', category: 'ACADEMY' },
    { src: '/LiArb Academy/Eventos-LiArb Academy/2024 - I CONGRESSO LIARB(1).jpg', alt: 'I Congresso LiArb', category: 'ACADEMY' },
    { src: '/LiArb Academy/Eventos-LiArb Academy/II CONGRESSO LIARB.jpg', alt: 'II Congresso LiArb - Evento', category: 'ACADEMY' },
    { src: '/LiArb Academy/Eventos-LiArb Academy/Média de 135 espectadores por painel.jpg', alt: '135 Espectadores por Painel', category: 'ACADEMY' },
    { src: '/LiArb Academy/Eventos-LiArb Academy/II CONGRESSO LIARB - COM FÁBIO ULHOA COELHO.jpg', alt: 'II Congresso com Fábio Ulhoa Coelho', category: 'ACADEMY' },
    { src: '/LiArb Academy/Eventos-LiArb Academy/Equipe-LiArb-UFC-I-ENCONTRO-DE-ARBITRAGEM-E-MEDIAÇÃO.png', alt: 'I Encontro de Arbitragem e Mediação UFC', category: 'ACADEMY' },
    { src: '/LiArb Academy/Eventos-LiArb Academy/PRÉ-EVENTO II CONGRESSO LIARB.JPG', alt: 'Pré-evento II Congresso LiArb', category: 'ACADEMY' }
  ];

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % selectedPhotos.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + selectedPhotos.length) % selectedPhotos.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  // Função para abrir o modal com a imagem atual
  const openModal = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    setSelectedImage(selectedPhotos[currentIndex]);
    document.body.style.overflow = 'hidden';
  };

  // Função para fechar o modal
  const closeModal = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'auto';
    
    // Reiniciar o autoplay após fechar o modal
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % selectedPhotos.length);
    }, 4000);
  };

  // Navegar para a próxima imagem dentro do modal
  const nextImageInModal = (e: React.MouseEvent) => {
    e.stopPropagation();
    const newIndex = (currentIndex + 1) % selectedPhotos.length;
    setCurrentIndex(newIndex);
    setSelectedImage(selectedPhotos[newIndex]);
  };

  // Navegar para a imagem anterior dentro do modal
  const prevImageInModal = (e: React.MouseEvent) => {
    e.stopPropagation();
    const newIndex = (currentIndex - 1 + selectedPhotos.length) % selectedPhotos.length;
    setCurrentIndex(newIndex);
    setSelectedImage(selectedPhotos[newIndex]);
  };

  // Impedir propagação do clique na imagem do modal
  const handleModalContentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  // Auto-slide super otimizado
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % selectedPhotos.length);
    }, 4000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [selectedPhotos.length]);

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      {/* Slider ultra simples */}
      <div className="relative h-80 md:h-96 overflow-hidden rounded-2xl shadow-lg">
        <div 
          className="flex transition-transform duration-300 ease-out h-full cursor-pointer"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          onClick={openModal}
        >
          {selectedPhotos.map((photo, index) => (
            <div key={index} className="w-full h-full flex-shrink-0 relative">
              <img
                src={photo.src}
                alt={photo.alt}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                <div className="text-white">
                  <span className="inline-block px-2 py-1 bg-liarb-blue/80 rounded-full text-xs font-medium mb-1">
                    {photo.category === 'ACADEMY' ? 'LIARB ACADEMY' : photo.category}
                  </span>
                  <h4 className="text-sm font-semibold">{photo.alt}</h4>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Setas simples */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            prevSlide();
          }}
          className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/30 rounded-full flex items-center justify-center text-white hover:bg-black/50 transition-colors z-10"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            nextSlide();
          }}
          className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/30 rounded-full flex items-center justify-center text-white hover:bg-black/50 transition-colors z-10"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Dots simples - sem thumbnails pesadas */}
      <div className="flex justify-center mt-4 gap-2">
        {selectedPhotos.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-colors ${
              currentIndex === index ? 'bg-liarb-blue' : 'bg-gray-300 hover:bg-gray-400'
            }`}
          />
        ))}
      </div>

      {/* Contador simples */}
      <div className="text-center mt-2">
        <div className="text-sm text-gray-600">
          {currentIndex + 1} / {selectedPhotos.length}
        </div>
      </div>

      {/* Modal para visualizar a imagem ampliada */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={closeModal}
        >
          <div 
            className="relative max-w-6xl w-full h-full flex items-center justify-center"
            onClick={handleModalContentClick}
          >
            <button 
              className="absolute top-4 right-4 bg-white rounded-full p-2 hover:bg-gray-200 transition-colors z-10"
              onClick={closeModal}
              aria-label="Fechar"
            >
              <X size={24} />
            </button>
            
            <button
              onClick={prevImageInModal}
              className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/40 hover:bg-black/60 rounded-full flex items-center justify-center text-white transition-colors z-10"
              aria-label="Imagem anterior"
            >
              <ChevronLeft size={24} />
            </button>
            
            <img 
              src={selectedImage.src} 
              alt={selectedImage.alt} 
              className="max-h-[85vh] max-w-full object-contain"
            />
            
            <button
              onClick={nextImageInModal}
              className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/40 hover:bg-black/60 rounded-full flex items-center justify-center text-white transition-colors z-10"
              aria-label="Próxima imagem"
            >
              <ChevronRight size={24} />
            </button>
            
            <div className="absolute bottom-8 left-0 right-0 text-center text-white">
              <div className="inline-block px-4 py-2 bg-black/60 rounded-lg">
                <span className="block font-bold text-sm mb-1">
                  {selectedImage.category === 'ACADEMY' ? 'LIARB ACADEMY' : selectedImage.category}
                </span>
                <h4 className="text-lg font-medium">{selectedImage.alt}</h4>
                <div className="mt-2 text-sm text-white/70">
                  {currentIndex + 1} / {selectedPhotos.length}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const Structure = () => {
  const [membros, setmembros] = React.useState<MemberData[]>([]);

  useEffect(() => {
    const fetchmembros = async () => {
      try {
        const response = await fetch(`${config.URL}/membros`);
        const data = await response.json();
        setmembros(data);
      } catch (error) {
        console.error('Erro ao buscar membros:', error);
      }
    };
    fetchmembros();
  }, []);

  const structures = [
    {
      title: "Diretoria",
      description: "Responsável pela gestão estratégica da Liga, definindo objetivos e supervisionando todas as atividades."
    },
    {
      title: "Conselho Consultivo",
      description: "Composto por especialistas que oferecem orientação técnica e estratégica para a Liga."
    },
    {
      title: "Coordenadores",
      description: "Gerenciam áreas específicas como competições, treinamentos e relações institucionais."
    }
  ];

  return (
    <section id="structure" className="section-padding bg-gray-50">
      <div className="container mx-auto">
        <AnimatedSection>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Estrutura</h2>
            <div className="w-20 h-1 bg-purple-gradient mx-auto rounded-full mb-6"></div>
            <p className="text-foreground/70 max-w-2xl mx-auto">
              Nossa estrutura organizacional é projetada para garantir eficiência e excelência em todas as nossas atividades.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 cursor-pointer">
          {structures.map((structure, index) => (
            <StructureCard
              key={index}
              title={structure.title}
              description={structure.description}
              index={index}
            />
          ))}
        </div>

        <div className="mt-24">
          <AnimatedSection>
            <h3 className="text-2xl font-bold text-center mb-12">Galeria</h3>
          </AnimatedSection>

          <PhotoSlider />
        </div>
      </div>
    </section>
  );
};

export default Structure;