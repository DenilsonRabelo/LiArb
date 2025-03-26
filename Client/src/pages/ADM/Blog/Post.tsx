
import React, { useEffect, useState } from 'react';
import AnimatedSection from '../../../components/AnimatedSection';
import Card from '../../../components/Card';
import Box from '@mui/material/Box';
import { Pagination } from '@mui/material';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { getToken } from '@/services/login';
import { enqueueSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';


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

const PostPage = () => {

    const [posts, setPosts] = useState<Post[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [openModal, setOpenModal] = useState(false);
    const [postToDelete, setPostToDelete] = useState<number | null>(null);
    const navagate = useNavigate();

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


    const handleOpenModal = (postId: number) => {
        setPostToDelete(postId);
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
        setPostToDelete(null);
    };

    const handleDeletePost = async (postId: number) => {
        try {
            const response = await fetch(`${process.env.URL}/post/deletar/${postId}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${getToken()}`,
                },
            });

            if(response.ok) {
                enqueueSnackbar("Erro ao excluir post. Tente novamente.", { variant: "error" });
                return;
            }
            enqueueSnackbar("Post excluído com sucesso!", { variant: "success" });
            setPosts(posts.filter(post => post.id !== postId));
        } catch (error) {
            console.error("Erro ao excluir post:", error);
            enqueueSnackbar("Erro ao excluir o post. Tente novamente.", { variant: "error" });
        }
    };

    return (
        <>
            <Navbar />
            <section id="blog" className="mt-20 bg-gray-50">
                <div className="container mx-auto mt-10">
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
                                    <div className="flex justify-between items-center mt-4">
                                        <a
                                            href={`/post/${article.id}`}
                                            className="inline-block text-liarb-blue font-medium hover:text-liarb-blue-dark transition-colors"
                                        >
                                            Leia mais
                                        </a>
                                        <div className="flex space-x-2">
                                            <button
                                                onClick={() => navagate(`/post/editar/${article.id}`)}
                                                className="p-2 rounded-full bg-purple-500 text-white hover:bg-blue-600 transition-colors"
                                            >
                                                <EditIcon />
                                            </button>
                                            <button
                                                onClick={() => handleOpenModal(article.id)}
                                                className="p-2 rounded-full bg-red-500 text-white hover:bg-red-600 transition-colors"
                                            >
                                                <DeleteIcon />
                                            </button>
                                        </div>
                                    </div>
                                </Card>
                            </AnimatedSection>
                        ))}
                    </div>

                    <AnimatedSection delay={300} className="mt-20 text-center">
                        <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
                            <Pagination count={totalPages} color="primary" page={currentPage} onChange={handlePageChange} />
                        </Box>
                    </AnimatedSection>
                </div>
                <Footer />
            </section>


            <Dialog
                open={openModal}
                onClose={handleCloseModal}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Confirmar exclusão"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Tem certeza de que deseja excluir este post? Esta ação não pode ser desfeita.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseModal} color="primary">
                        Cancelar
                    </Button>
                    <Button
                        onClick={() => {
                            if (postToDelete !== null) {
                                handleDeletePost(postToDelete);
                            }
                            handleCloseModal();
                        }}
                        color="error"
                        autoFocus
                    >
                        Excluir
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default PostPage;
