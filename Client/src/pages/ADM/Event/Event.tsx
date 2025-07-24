import React, { useEffect, useState } from 'react';
import { config } from '../../../config/env';
import AnimatedSection from '@/components/AnimatedSection';
import Card from '@/components/Card';
import Box from '@mui/material/Box';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Pagination } from '@mui/material';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { enqueueSnackbar } from 'notistack';
import { getToken } from '@/services/login';

type Event = {
    id: number;
    title: string;
    description: string;
    date: string;
    location: string;
};

const EditDeleteEventsPage = () => {
    const [events, setEvents] = useState<Event[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [openModal, setOpenModal] = useState(false);
    const [eventToDelete, setEventToDelete] = useState<number | null>(null);
    const navigate = useNavigate();


    const handleOpenModal = (eventId: number) => {
        setEventToDelete(eventId);
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
        setEventToDelete(null);
    };

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await fetch(`${config.URL}/evento/buscar/paginado/${currentPage}/12`);
                const data = await response.json();
                setEvents(data.events);
                setTotalPages(data.totalPages);
            } catch (error) {
                console.error('Failed to fetch events:', error);
            }
        };

        fetchEvents();
    }, [currentPage]);

    const handlePageChange = (event: any, value: number) => {
        setCurrentPage(value);
    };

    const handleEdit = (eventId: number) => {
        navigate(`/evento/editar/${eventId}`);
    };

    const handleDelete = async (eventId: number) => {
            try {
                const response = await fetch(`${config.URL}/evento/deletar/${eventId}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${getToken()}`,
                    },
                });

                if (!response.ok) {
                    enqueueSnackbar('Erro ao excluir evento. Tente novamente.', { variant: 'error' });
                    return;
                }
                enqueueSnackbar('Evento excluído com sucesso', { variant: 'success' });
                setEvents(events.filter(event => event.id !== eventId));
            } catch (error) {
                console.error('Erro ao excluir evento:', error);
                enqueueSnackbar('Erro ao excluir evento. Tente novamente.', { variant: 'error' });
            }
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
            <section id="edit-delete-events" className="mt-20 bg-gray-50">
                <div className="container mx-auto mt-10">
                    <AnimatedSection>
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">Editar/Excluir Eventos</h2>
                            <div className="w-20 h-1 bg-blue-gradient mx-auto rounded-full mb-6"></div>
                            <p className="text-foreground/70 max-w-2xl mx-auto">
                                Gerencie os eventos cadastrados. Edite ou exclua eventos conforme necessário.
                            </p>
                        </div>
                    </AnimatedSection>

                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
                        {(events || []).map((event, index) => (
                            <AnimatedSection key={index} delay={index * 100}>
                                <Card className="h-full bg-gray-50 border-none cursor-pointer">
                                    <div className="w-16 h-16 rounded-full bg-liarb-blue-light/20 flex items-center justify-center mx-auto mb-4">
                                        <span className="text-2xl font-bold text-liarb-blue">
                                            {new Date(event.date).getDate()}
                                        </span>
                                    </div>
                                    <h4 className="text-base font-bold text-center mb-2">{event.title}</h4>
                                    <div className="text-center text-sm">
                                        <p className="text-foreground/70">{formatDate(event.date)}</p>
                                        <p className="text-liarb-blue">{event.location}</p>
                                    </div>
                                    <div className="flex justify-center gap-4 mt-4">
                                        <button
                                            onClick={() => handleEdit(event.id)}
                                            className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded hover:bg-blue-600 transition-colors"
                                        >
                                            Editar
                                        </button>
                                        <button
                                            onClick={() => handleOpenModal(event.id)}
                                            className="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded hover:bg-red-600 transition-colors"
                                        >
                                            Excluir
                                        </button>
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
                        Tem certeza de que deseja excluir este evento? Esta ação não pode ser desfeita.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseModal} color="primary">
                        Cancelar
                    </Button>
                    <Button
                        onClick={() => {
                            if (eventToDelete !== null) {
                                handleDelete(eventToDelete);
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

export default EditDeleteEventsPage;