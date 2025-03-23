import React, { useEffect, useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Avatar,
  Typography,
  Link,
  useTheme,
  IconButton,
} from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import PageTitle from '../../components/Tittle';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import membroFoto from '../../assets/membro.jpg';

interface Membro {
  id: number;
  nome: string;
  email: string;
  cargo?: string;
  fotoUrl?: string;
  createdAt?: string;
}

async function fetchMembros() {
  const response = await fetch(`http://localhost:3000/membros`);
  if (!response.ok) {
    throw new Error('Erro ao buscar membros');
  }
  return response.json();
}

export default function MembersPage() {
  const [membros, setMembros] = useState<Membro[]>([]);

  useEffect(() => {
    fetchMembros()
      .then((data) => setMembros(data))
      .catch((error) => console.error(error));
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 960,
        settings: { slidesToShow: 2, slidesToScroll: 2 },
      },
      {
        breakpoint: 600,
        settings: { slidesToShow: 1, slidesToScroll: 1 },
      },
    ],
  };

  return (
    <Box sx={{ flexGrow: 1, position: 'relative', py: 4 }}>
      <PageTitle
        title="Nossos Membros"
        content="Conheça as pessoas que fazem parte da nossa equipe."
      />
      {membros.length > 0 && (
        <Box sx={{ mx: 4 }}>
          <Slider {...settings}>
            {membros.map((membro) => (
              <Box
                key={membro.id}
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '70vh',
                  p: 2,
                }}
              >
                <MemberCard membro={membro} />
              </Box>
            ))}
          </Slider>
        </Box>
      )}
    </Box>
  );
}

function MemberCard({ membro }: { membro: Membro }) {
  return (
    <Card
      sx={{
        width: { xs: '90%', md: '80%' },
        maxWidth: 600,
        mx: 'auto',
        p: 3,
        boxShadow: 3,
        borderRadius: 2,
        display: 'flex',
        flexDirection: 'column',
        cursor: 'pointer',
        transition: 'transform 0.3s, box-shadow 0.3s',
        '&:hover': {
          boxShadow: '0 0 15px rgba(0,0,0,0.3)',
          transform: 'scale(1.03)',
        },
      }}
    >
      <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
        <Avatar
          src={membro.fotoUrl || membroFoto}
          alt={membro.nome}
          sx={{ width: 100, height: 100, mx: 'auto', mb: 2 }}
        />
        <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>
          <Link underline="hover" color="primary">
            {membro.nome}
          </Link>
        </Typography>
        {membro.cargo && (
          <Typography variant="h6" sx={{ mb: 2 }}>
            {membro.cargo}
          </Typography>
        )}
        <Typography variant="body1">{membro.email}</Typography>
      </CardContent>
    </Card>
  );
}

function SampleNextArrow(props: any) {
  const { onClick } = props;
  const theme = useTheme();
  const arrowColor = theme.palette.mode === 'dark' ? '#fff' : '#000';
  return (
    <IconButton
      onClick={onClick}
      sx={{
        position: 'absolute',
        right: 10,
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 2,
        color: arrowColor,
      }}
    >
      <ArrowForwardIosIcon fontSize="large" />
    </IconButton>
  );
}

function SamplePrevArrow(props: any) {
  const { onClick } = props;
  const theme = useTheme();
  const arrowColor = theme.palette.mode === 'dark' ? '#fff' : '#000';
  return (
    <IconButton
      onClick={onClick}
      sx={{
        position: 'absolute',
        left: 10,
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 2,
        color: arrowColor,
      }}
    >
      <ArrowBackIosNewIcon fontSize="large" />
    </IconButton>
  );
}
