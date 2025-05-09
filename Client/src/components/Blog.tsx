
import React, { useEffect, useState } from 'react';
import AnimatedSection from './AnimatedSection';
import Card from './Card';
import {URL} from '../../constants' 


type Post = {
  id: number;
  title: string;
  content: string;
  subtitle: string;
  published: string;
  author: string;
  image: string;
  tags: string[];
  navigate: any;
};

const Blog = () => {

  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`${URL}/post/buscar/paginado/1/3`);
        const data = await response.json();
        setPosts(data.posts);
      } catch (error) {
        console.error('Failed to fetch posts:', error);
      }
    };

    fetchPosts();
  }, []);

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
  };

  return (
    <section id="blog" className="section-padding bg-gray-50">
      <div className="container mx-auto">
        <AnimatedSection>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Blog</h2>
            <div className="w-20 h-1 bg-purple-gradient mx-auto rounded-full mb-6"></div>
            <p className="text-foreground/70 max-w-2xl mx-auto">
              Artigos, notícias e atualizações sobre o mundo da arbitragem, mediação e resolução alternativa de conflitos.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map((article, index) => (
            <AnimatedSection key={index} delay={index * 100}>
              <Card
                className="h-full overflow-hidden cursor-pointer"
                hoverEffect={true}
              >
                <div className="h-48 -mx-6 -mt-6 mb-6">
                  <img
                    className="w-full h-full object-cover"
                    src={article.image}
                    alt={article.title}
                  />
                </div>
                <span className="text-sm text-foreground/60">{formatDate(article.published)}</span>
                <h3 className="text-xl font-bold mt-2 mb-3">{article.title}</h3>
                <p className="text-foreground/70 text-sm mb-4">{article.subtitle}</p>
                <a
                  href={`/post/${article.id}`}
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
            onClick={() => window.location.href = '/blog'}
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
