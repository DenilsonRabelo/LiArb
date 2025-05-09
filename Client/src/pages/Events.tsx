import React, { useEffect, useState } from 'react';
import AnimatedSection from '../components/AnimatedSection';
import Card from '../components/Card';
import Box from '@mui/material/Box';
import { Pagination } from '@mui/material';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { URL } from '../../constants';

type Event = {
    id: number;
    title: string;
    description: string;
    date: string;
    location: string;
};

const EventsPage = () => {
    const [events, setEvents] = useState<Event[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await fetch(`${URL}/evento/buscar/paginado/${currentPage}/12`);
                const data = await response.json();
                console.log(data);
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
            <section id="events" className="mt-20 bg-gray-50">
                <div className="container mx-auto mt-10">
                    <AnimatedSection>
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">Eventos</h2>
                            <div className="w-20 h-1 bg-blue-gradient mx-auto rounded-full mb-6"></div>
                            <p className="text-foreground/70 max-w-2xl mx-auto">
                                Confira os eventos mais recentes sobre arbitragem, mediação e resolução de conflitos.
                            </p>
                        </div>
                    </AnimatedSection>

                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
                        {(events || []).map((event, index) => {
                            const day = new Date(event.date).getDate();

                            const formattedDate = new Intl.DateTimeFormat('pt-BR', {
                                day: '2-digit',
                                month: 'long',
                                year: 'numeric',
                            }).format(new Date(event.date));

                            const isPastEvent = new Date(event.date).setHours(0, 0, 0, 0) < new Date().setHours(0, 0, 0, 0);

                            return (
                                <AnimatedSection key={index} delay={index * 100}>
                                    <Card className="h-full bg-gray-50 border-none cursor-pointer">
                                        <div className="w-16 h-16 rounded-full bg-liarb-blue-light/20 flex items-center justify-center mx-auto mb-4">
                                            <span className="text-2xl font-bold text-liarb-blue">
                                                {day}
                                            </span>
                                        </div>
                                        <h4 className="text-base font-bold text-center mb-2">{event.title}</h4>
                                        <div className="text-center text-sm">
                                            <p className="text-foreground/70">{formattedDate}</p>
                                            <p className="text-liarb-blue">{event.location}</p>
                                        </div>
                                        {isPastEvent && (
                                            <div className="mt-2 text-center">
                                                <span className="px-2 py-1 text-xs font-medium text-white bg-red-500 rounded-full">
                                                    Encerrado
                                                </span>
                                            </div>
                                        )}
                                    </Card>
                                </AnimatedSection>
                            );
                        })}
                    </div>

                    <AnimatedSection delay={300} className="mt-20 text-center">
                        <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
                            <Pagination count={totalPages} color="primary" page={currentPage} onChange={handlePageChange} />
                        </Box>
                    </AnimatedSection>
                </div>
                <Footer />
            </section>
        </>
    );
};

export default EventsPage;