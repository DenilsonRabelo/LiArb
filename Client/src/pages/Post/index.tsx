import React, { useEffect, useState } from 'react';
import { Box, Typography, Divider, Chip, Button } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
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
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      await fetch(`http://localhost:3000/post/buscar/por-id/${id}`)
        .then((response) => response.json())
        .then((data) => {
          setPost(data);
        })
        .catch((error) => console.error('Failed to fetch post:', error));
    };
    if (id) {
      fetchPost();
    }
  }, [id]);

  return (
    <Box
      className="post"
      sx={{
        minHeight: '100%',
        margin: '0 auto',
        padding: '20px',
        backgroundColor: '#f9f9f9',
        borderRadius: '8px',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
        overflow: 'auto',
        lineBreak: 'auto',
        maxWidth: '100%', // Garantir que a largura máxima seja respeitada
      }}
    >
      {post ? (
        <>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              width: '100%',
              wordWrap: 'break-word',
            }}
          >
            <Typography
              variant="h3"
              component="h1"
              className="titulo"
              sx={{
                fontWeight: 'bold',
                marginBottom: '16px',
                textAlign: 'center', // Centralizar o título
                maxWidth: '100%', // Garantir que o título não ultrapasse os limites
              }}
            >
              {post.title}
              <Divider
                sx={{
                  width: '100%',
                  marginBottom: '16px',
                  borderColor: '#722E8E',
                  borderWidth: 1,
                  boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                }}
              />
            </Typography>
            <div className="autor">
              <Typography
                variant="subtitle2"
                className="texto"
                color="text.secondary"
                sx={{
                  marginBottom: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  flexWrap: 'wrap', // Permitir quebra de linha para conteúdo longo
                }}
              >
                Escrito por:
                <Chip
                  className="texto chip2"
                  label={post.author}
                  color="primary"
                  variant="outlined"
                />
              </Typography>
              <Typography
                variant="subtitle2"
                className="texto"
                color="text.secondary"
                sx={{
                  marginBottom: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  flexWrap: 'wrap', // Permitir quebra de linha
                }}
              >
                Publicado em:
                <Chip
                  className="texto chip2"
                  label={new Date(post.published).toLocaleDateString()}
                  color="primary"
                  variant="outlined"
                />
              </Typography>
              <Typography
                variant="subtitle2"
                className="texto"
                color="text.secondary"
                sx={{
                  marginBottom: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  flexWrap: 'wrap', // Permitir quebra de linha para tags
                }}
              >
                tags:{' '}
                {post.tags.map((tag, index) => (
                  <Chip
                    className="texto chip2"
                    key={index}
                    label={tag}
                    color="primary"
                    variant="outlined"
                    sx={{ maxWidth: '100%' }} // Garantir que cada tag respeite os limites
                  />
                ))}
              </Typography>
            </div>
            <Divider sx={{ marginBottom: '16px' }} />
            <Typography
              variant="body1"
              className="texto"
              sx={{
                lineHeight: 1.8,
                textAlign: 'justify',
                wordBreak: 'break-word',
                overflowWrap: 'break-word', // Quebrar palavras longas
                maxWidth: '100%', // Garantir que o texto não ultrapasse os limites
              }}
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
            <Divider sx={{ marginY: '16px' }} />
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'end', marginTop: '16px' }}>
            <Button
              size="medium"
              variant="outlined"
              className="button"
              onClick={() => navigate('/liArb-academy')}
            >
              Ver mais posts
            </Button>
          </Box>
        </>
      ) : (
        <Typography variant="h6" color="text.secondary">
          Carregando post...
        </Typography>
      )}
    </Box>
  );
}