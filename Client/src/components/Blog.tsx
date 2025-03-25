
import React from 'react';
import AnimatedSection from './AnimatedSection';
import Card from './Card';

const Blog = () => {
  const articles = [
    {
      title: "Arbitragem comercial no contexto brasileiro",
      date: "15 de Abril, 2023",
      excerpt: "Uma análise do cenário atual da arbitragem comercial no Brasil e suas perspectivas futuras.",
      image: "bg-gradient-to-br from-blue-100 to-blue-200"
    },
    {
      title: "Técnicas avançadas de negociação em disputas complexas",
      date: "28 de Maio, 2023",
      excerpt: "Estratégias e abordagens para negociar eficazmente em cenários de disputas de alta complexidade.",
      image: "bg-gradient-to-br from-purple-100 to-purple-200"
    },
    {
      title: "O papel da mediação na resolução de conflitos empresariais",
      date: "10 de Junho, 2023",
      excerpt: "Como a mediação pode ser uma alternativa eficiente para resolver disputas no ambiente corporativo.",
      image: "bg-gradient-to-br from-green-100 to-green-200"
    }
  ];

  return (
    <section id="blog" className="section-padding bg-gray-50">
      <div className="container mx-auto">
        <AnimatedSection>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Blog</h2>
            <div className="w-20 h-1 bg-blue-gradient mx-auto rounded-full mb-6"></div>
            <p className="text-foreground/70 max-w-2xl mx-auto">
              Artigos, notícias e atualizações sobre o mundo da arbitragem, mediação e resolução alternativa de conflitos.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.map((article, index) => (
            <AnimatedSection key={index} delay={index * 100}>
              <Card 
                className="h-full overflow-hidden"
                hoverEffect={true}
              >
                <div className={`h-48 -mx-6 -mt-6 mb-6 ${article.image}`}></div>
                <span className="text-sm text-foreground/60">{article.date}</span>
                <h3 className="text-xl font-bold mt-2 mb-3">{article.title}</h3>
                <p className="text-foreground/70 text-sm mb-4">{article.excerpt}</p>
                <a 
                  href="#" 
                  className="inline-block text-liarb-blue font-medium hover:text-liarb-blue-dark transition-colors"
                >
                  Leia mais
                </a>
              </Card>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection delay={300} className="mt-12 text-center">
          <a 
            href="#" 
            className="inline-block px-8 py-3 rounded-lg border border-liarb-blue text-liarb-blue font-medium hover:bg-liarb-blue hover:text-white transition-all duration-300"
          >
            Ver todos os artigos
          </a>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default Blog;
