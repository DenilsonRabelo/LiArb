import React, { useEffect, useState } from 'react';
import { Box, Button, Grid, Typography, Modal, Fade, Backdrop, Pagination } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import BlogCard from '../../../components/Card';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { getToken } from '../../../services/login';
import "@blocknote/core/fonts/inter.css";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { useCreateBlockNote } from "@blocknote/react";


type Post = {
    id: number;
    title: string;
    content: string;
    published: string;
    author: string;
    tags: string[];
};

const BlogAdminPage: React.FC = () => {
    const navigate = useNavigate();
    const [posts, setPosts] = useState<Post[]>([]);
    const [openModal, setOpenModal] = useState(false);
    const [selectedPostId, setSelectedPostId] = useState<number | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    const editor = useCreateBlockNote();

    const handlePageChange = (event: any, value: number) => {
        setCurrentPage(value);
    };

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await fetch(`http://localhost:3000/post/buscar/paginado/${currentPage}/12`);
                const data = await response.json();
                setTotalPages(data.totalPages);
                setPosts(data.posts);
            } catch (error) {
                console.error('Erro ao buscar posts:', error);
            }
        };

        fetchPosts();
    }, [currentPage]);

    const handleCreatePost = () => {
        navigate('/adm/blog/cadastrar');
    };

    const handleEditPost = (postId: number) => {
        navigate(`/adm/blog/editar/${postId}`);
    };

    const handleOpenModal = (postId: number) => {
        setSelectedPostId(postId);
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
        setSelectedPostId(null);
    };

    const handleDeletePost = async () => {

        if (selectedPostId === null) return;

        try {
            await fetch(`http://localhost:3000/post/deletar/${selectedPostId}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${getToken()}`,
                },
            });
            setPosts((prevPosts) => prevPosts.filter((post) => post.id !== selectedPostId));
            handleCloseModal();
        } catch (error) {
            console.error('Erro ao excluir post:', error);
        }
    };

    return (
        <Box sx={{ padding: 2 }}>
            <Box
                sx={{
                    display: 'flex',
                    marginBottom: 2,
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: 2,
                }}
            >
                <Typography variant="h4" component="h1" gutterBottom>
                    Gerenciamento de Posts
                </Typography>
                <Button
                    variant="contained"
                    color="success"
                    sx={{
                        color: 'white',
                        minWidth: '150px',
                        alignSelf: { xs: 'center', sm: 'flex-end' },
                    }}
                    onClick={handleCreatePost}
                >
                    Cadastrar
                </Button>
            </Box>

            <Grid container spacing={2}>
                {posts.map((post) => (
                    <Grid item xs={12} sm={6} md={4} key={post.id}>
                        <BlogCard
                            id={post.id}
                            title={post.title}
                            content={post.content}
                            author={post.author}
                            published={post.published}
                            tags={post.tags}
                            onReadMore={() => navigate(`/liArb-academy/post/${post.id}`)}
                        >
                            <Button
                                variant="outlined"
                                color="secondary"
                                className="button2"
                                sx={{
                                    minWidth: { xs: '80px', sm: '100px' },
                                    maxWidth: { xs: '100px', sm: '120px' },
                                    fontSize: { xs: '0.75rem', sm: '0.875rem' },
                                    padding: { xs: '4px 8px', sm: '6px 12px' }, 
                                }}
                                onClick={() => handleEditPost(post.id)}
                            >
                                <EditIcon />
                            </Button>
                            <Button
                                variant="contained"
                                color="error"
                                sx={{
                                    minWidth: { xs: '80px', sm: '100px' },
                                    maxWidth: { xs: '100px', sm: '120px' },
                                    fontSize: { xs: '0.75rem', sm: '0.875rem' },
                                    padding: { xs: '4px 8px', sm: '6px 12px' }, 
                                }}
                                onClick={() => handleOpenModal(post.id)}
                            >
                                <DeleteIcon />
                            </Button>
                        </BlogCard>
                    </Grid>
                ))}
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        width: '100%',
                        alignItems: 'center',
                        my: 2,
                    }}
                >
                    <Pagination
                        count={totalPages}
                        color="primary"
                        page={currentPage}
                        onChange={handlePageChange}
                    />
                </Box>
            </Grid>

            <Modal
                open={openModal}
                onClose={handleCloseModal}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 400,
                        bgcolor: 'background.paper',
                        border: '2px solid #722E8E',
                        boxShadow: 24,
                        p: 4,
                        textAlign: 'center',
                    }}
                >
                    <Typography variant="h6" component="h2" gutterBottom>
                        Tem certeza que deseja excluir este post?
                    </Typography>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-around',
                            marginTop: 2,
                        }}
                    >
                        <Button variant="contained" color="error" onClick={handleDeletePost}>
                            Excluir
                        </Button>
                        <Button variant="outlined" onClick={handleCloseModal}>
                            Cancelar
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </Box>
    );
};

export default BlogAdminPage;