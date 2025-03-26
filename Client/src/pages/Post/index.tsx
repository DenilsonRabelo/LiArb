import React, { useEffect, useState } from 'react';
import { Box, Typography, Divider, Chip } from '@mui/material';
import { useParams } from 'react-router-dom';
import './style.css';

interface PostPageProps {
  title: string;
  content: string;
  author: string;
  published: string;
  tags: string[];
}

export default function PostPage() {
  const [post, setPost] = useState<PostPageProps>();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchPost = async () => {
      await fetch(`${process.env.URL}/post/buscar/por-id/${id}`)
        .then((response) => response.json())
        .then((data) => setPost(data))
        .catch((error) => console.error('Failed to fetch post:', error));
    }
    if (id) {
      fetchPost();
    }
  }, [id]);

  return (
    <Box
      sx={{
        maxWidth: '800px',
        margin: '0 auto',
        padding: '20px',
        backgroundColor: '#f9f9f9',
        borderRadius: '8px',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
      }}
    >
      {post ? (
        <>
          <Typography variant="h3" component="h1" className='titulo' sx={{ fontWeight: 'bold', marginBottom: '16px' }}>
            {post.title}
          </Typography>
          <div className='autor'>
          <Typography variant="subtitle1" className='texto' color="text.secondary" sx={{ marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            Escrito por: <Chip className='texto chip' label={post.author} color="primary" variant="outlined" />
          </Typography>
          </div>
          <Typography variant="subtitle2" className='texto' color="text.secondary" sx={{ marginBottom: '16px' }}>
            Publicado em: {new Date(post.published).toLocaleDateString()}
          </Typography>
          <Divider sx={{ marginBottom: '16px' }} />
          <Typography variant="body1" className='texto' sx={{ lineHeight: 1.8, textAlign: 'justify' }}>
            {post.content}
          </Typography>
          <Divider sx={{ marginY: '16px' }} />
          <Box sx={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {post.tags.map((tag, index) => (
              <Chip className='texto chip' key={index} label={tag} color="primary" variant="outlined" />
            ))}
          </Box>
        </>
      ) : (
        <Typography variant="h6" color="text.secondary">
          Carregando post...
        </Typography>
      )}
    </Box>
  );
};