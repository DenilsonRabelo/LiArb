
import React, { useEffect, useState } from 'react';
import AnimatedSection from '../components/AnimatedSection';
import Card from '../components/Card';
import Box from '@mui/material/Box';
import { Pagination } from '@mui/material';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';


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

const BlogPage = () => {

    const [posts, setPosts] = useState<Post[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await fetch(`${process.env.URL}/post/buscar/paginado/${currentPage}/12`);
                const data = await response.json();
                console.log(data);
                setPosts(data.posts);
                setTotalPages(data.totalPages);
            } catch (error) {
                console.error('Failed to fetch posts:', error);
            }
        };

        fetchPosts();
    }, [currentPage]);

    const handlePageChange = (event: any, value: number) => {
        setCurrentPage(value);
    };

    const formatDate = (dateString: string): string => {
        const date = new Date(dateString);
        return date.toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
        });
    };

    return (
        <>
            <Navbar />
            <section id="blog" className="mt-20 bg-gray-50">
                <div className="container mx-auto mt-10">
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
                        {(posts || []).length > 0 ? (
                            posts.map((article, index) => (
                                <AnimatedSection key={index} delay={index * 100}>
                                    <Card
                                        className="h-full overflow-hidden"
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
                            ))
                        ) : (
                            <p className="text-center text-foreground/70 col-span-full">
                                Nenhum post encontrado.
                            </p>
                        )}
                    </div>

                    <AnimatedSection delay={300} className="mt-20 text-center">
                        <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
                            <Pagination count={totalPages} color="primary" page={currentPage} onChange={handlePageChange} />
                        </Box>
                    </AnimatedSection>
                </div>
                <Footer />
            </section>
        </>
    );
};

export default BlogPage;
