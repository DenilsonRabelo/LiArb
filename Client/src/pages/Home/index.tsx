import React from 'react';
import { Box, Typography, Button, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ReactTyped } from 'react-typed';
import './style.css';

const Home: React.FC = () => {
    const navigate = useNavigate();
    const theme = useTheme();

    React.useEffect(() => {
        const root = document.documentElement;
        root.style.setProperty('--background-color', theme.palette.background.default);
        root.style.setProperty('--text-color', theme.palette.mode === 'dark' ? 'white' : 'black');
    }, [theme]);

    return (
        <Box className="home">
            <Typography variant="h3" component="h1" gutterBottom>
                <ReactTyped
                    strings={['Bem-vindo ao <strong><span class="highlight">LiArb!</span></strong>']}
                    typeSpeed={50}
                    backSpeed={30}
                    loop={true}
                />
            </Typography>
            <Typography variant="h6" component="p" gutterBottom>
                Explore nossos artigos, conheça nossos membros e fique por dentro das novidades.
            </Typography>
            <Box sx={{ marginTop: 4 }}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => navigate('/liArb-academy')}
                    sx={{ marginRight: 2 }}
                >
                    Ver Blog
                </Button>
                <Button
                    className='button'
                    variant="outlined"
                    color="secondary"
                    onClick={() => navigate('/estrutura')}
                >
                    Conheça os Membros
                </Button>
            </Box>
        </Box>
    );
};

export default Home;