import React, { use, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import './style.css';
import { Box, Link } from '@mui/material';
import { data } from 'react-router-dom';
import { Publish } from '@mui/icons-material';

interface BlogCardProps {
  title: string;
  content: string;
  id: number;
  imageUrl?: string;
  author: string;
  published: string;
  tags: string[];
  onReadMore: () => void;
  children?: React.ReactNode;
}

function truncateText(str: string, num: number) {
  if (str.length <= num) return str;
  return str.slice(0, num) + '...';
}


function parseDateTo(date: string) {
  const dateObj = new Date(date);
  const day = String(dateObj.getDate()).padStart(2, '0');
  const month = String(dateObj.getMonth() + 1).padStart(2, '0'); // Os meses começam do 0
  const year = String(dateObj.getFullYear()).slice(-2); // Pega os últimos dois dígitos do ano
  return `${day}/${month}/${year}`;
}

function stripTags(html: string): string {
  const doc = new DOMParser().parseFromString(html, 'text/html');
  return doc.body.textContent || '';
}


function BlogCard({ title, content, imageUrl, author, published, tags, onReadMore, children }: BlogCardProps) {
  return (
    <Card
      className="card"
      style={{ color: 'white' }}
      sx={{
        maxWidth: 345,
        height: 350,
        display: 'flex',
        flexDirection: 'column',
        marginBottom: 2,
      }}
    >
      <CardContent sx={{ flexGrow: 1, overflow: 'hidden' }}>
        <Typography gutterBottom variant="h5" component="div">
          <Link underline="hover" onClick={onReadMore}>
            {title}
          </Link>
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Escrito por: {author}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Tags: {tags.join(', ')}
        </Typography>
        <Typography variant="subtitle2" color="text.secondary">
          Publicado em: {parseDateTo(published)}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ marginTop: 1, whiteSpace: 'pre-line', wordBreak: 'break-word' }}>
          {truncateText(stripTags(content), 100)}
        </Typography>
      </CardContent>
      <CardActions sx={{ alignSelf: 'center' }} style={{ width: '100%', justifyContent: 'space-between'}}>

        <Button
          className="buttonReadMore"
          size="medium"
          variant="outlined"
          onClick={onReadMore}
        >
          Ler Mais
        </Button>

        <Box sx={{ display: 'flex', gap: 1 }}>
          {children}
        </Box>


      </CardActions>
    </Card>
  );
}

export default BlogCard;
