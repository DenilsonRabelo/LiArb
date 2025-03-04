import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import './style.css';
import { Link } from '@mui/material';

interface BlogCardProps {
  title: string;
  content: string;
  imageUrl?: string;
  author: string;
  published: string;
  tags: string[];
  onReadMore: () => void;
}

function truncateText(str: string, num: number) {
  if (str.length <= num) return str;
  return str.slice(0, num) + '...';
}

function BlogCard({ title, content, imageUrl, author, published, tags, onReadMore }: BlogCardProps) {
  return (
    <Card className='card' style={{color: 'white'}} sx={{ maxWidth: 345, height: 300, display: 'flex', flexDirection: 'column', marginBottom: 2 }}>
      <CardContent sx={{ flexGrow: 1, overflow: 'hidden' }}>
        <Typography gutterBottom variant="h5" component="div">
          <Link underline="hover" onClick={onReadMore} >{title}</Link>
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          por {author}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Tags: {tags.join(', ')}
        </Typography>
        <Typography variant="subtitle2" color="text.secondary">
          Publicado em: {published}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ marginTop: 1 }}>
          {truncateText(content, 100)} {}
        </Typography>
      </CardContent>
      <CardActions sx={{ alignSelf: 'center' }} style={{ width: '100%' }}>
        <Button size='medium' variant='outlined' onClick={onReadMore}>Ler Mais</Button>
      </CardActions>
    </Card>
  );
}

export default BlogCard;
