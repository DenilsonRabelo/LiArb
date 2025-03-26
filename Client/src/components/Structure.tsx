
import React, { useEffect } from 'react';
import Card from './Card';
import AnimatedSection from './AnimatedSection';

type MemberData = {
  id: number;
  nome: string;
  cargo: string;
  descricao: string;
  fotoUrl: string;
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

const Structure = () => {
  const [membros, setmembros] = React.useState<MemberData[]>([]);

  useEffect(() => {
    const fetchmembros = async () => {
      try {
        const response = await fetch('http://localhost:3000/membros');
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
            <h3 className="text-2xl font-bold text-center mb-12">Membros da Diretoria</h3>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {(membros || []).length > 0 ? (
              membros.map((member, index) => (
                <AnimatedSection key={member.id} delay={index * 100}>
                  <Card className="flex flex-col items-center text-center cursor-pointer">
                    <div className="w-24 h-24 bg-gray-200 rounded-full mb-4 overflow-hidden">
                      {member.fotoUrl ? (
                        <img
                          src={member.fotoUrl}
                          alt={member.nome}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-200"></div>
                      )}
                    </div>
                    <h4 className="text-lg font-bold">{member.nome}</h4>
                    <p className="text-liarb-blue text-sm font-medium mb-2">{member.cargo}</p>
                    <p className="text-foreground/70 text-sm">{member.descricao}</p>
                  </Card>
                </AnimatedSection>
              ))
            ) : (
              <p className="text-center text-foreground/70 col-span-full">
                Nenhum membro encontrado.
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Structure;
