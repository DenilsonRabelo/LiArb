import React, { useState, useEffect } from 'react';
import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import BlogCard from '../../components/Card';
import PageTitle from '../../components/Tittle';
import { Pagination, Typography } from '@mui/material';
import { Route, useNavigate } from 'react-router-dom';

type Post = {
    id: number;
    title: string;
    content: string;
    published: string;
    author: string;
    tags: string[];
    navigate: any;
};

export default function ResponsiveGrid() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const navigate = useNavigate(); 

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

    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
            <Typography variant="body1" sx={{ ml: 2 }} style={{ marginTop: 10, marginBottom: 30 }}>
            Explore uma lista diversificada de artigos publicados, abrangendo uma ampla gama de tópicos. Navegue pelos últimos insights e descobertas de nossos colaboradores.
          </Typography>
                <Grid container spacing={2} columns={{ xs: 8, sm: 12, md: 16, lg: 24 }}>
                    {posts && posts.map((post, index) => (
                        <Grid key={index} item xs={8} sm={3} md={4} lg={6}>
                            <BlogCard
                                id={post.id}
                                title={post.title}
                                content={post.content}
                                author={post.author}
                                published={new Date(post.published).toDateString()}
                                tags={post.tags}
                                onReadMore={() => {
                                    navigate(`/liArb-academy/post/${post.id}`);
                                  }}/>
                        </Grid>
                    ))}
                </Grid>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
                <Pagination count={totalPages} color="primary" page={currentPage} onChange={handlePageChange} />
            </Box>
        </>
    );
}
