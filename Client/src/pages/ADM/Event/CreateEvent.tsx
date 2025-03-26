import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, TextField, Chip, Typography } from "@mui/material";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Dayjs } from "dayjs";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { enqueueSnackbar } from "notistack";
import { getToken } from "@/services/login";

const CreateEvent: React.FC = () => {
    const navigate = useNavigate();
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [date, setDate] = useState<Dayjs | null>(null);
    const [location, setLocation] = useState<string>("");
    const [image, setImage] = useState<string>("");

    const handleSaveEvent = async () => {
        if (!title.trim() || !description.trim() || !date || !location.trim()) {
            enqueueSnackbar("Todos os campos são obrigatorios", { variant: "warning" });
            return;
        }
        try {
            await fetch(`${process.env.URL}/evento/criar`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${getToken()}`,
                },
                body: JSON.stringify({
                    title,
                    description,
                    date: date.toISOString(),
                    location,
                }),
            });
            enqueueSnackbar("Evento criado com sucesso", { variant: "success" });
            navigate("/admin");
        } catch (error) {
            console.error("Erro ao criar evento:", error);
            alert("Erro ao criar o evento. Tente novamente.");
        }
    };

    return (
        <>
            <style>
                {`
                .button:hover {
                    background-color: #722E8E;
                    color: white;
                }

                .button2 {
                    color: white !important;
                }

                .chip {
                    background-color: #722E8E !important;
                    color: white;
                    border-color: #722E8E !important;
                    background: #722E8E !important;
                }

                .bn-editor {
                    min-height: 200px;
                }

                .input .MuiOutlinedInput-root:hover fieldset {
                    border-color: #722E8E;
                }

                .input .MuiOutlinedInput-root.Mui-focused fieldset {
                    border-color: #722E8E;
                }

                .input .MuiInputLabel-root.Mui-focused {
                    color: #722E8E;
                }
                `}
            </style>
            <Navbar />
            <section id="ADM" className="mt-20 bg-gray-50">
                <div className="container mx-auto mt-10">
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <Box sx={{ padding: 4, maxWidth: "60%", margin: "0 auto", display: "flex", flexDirection: "column" }}>
                            <div className="text-center mb-16">
                                <h2 className="text-3xl md:text-4xl font-bold mb-4">Criar Novo Evento</h2>
                                <div className="w-20 h-1 bg-purple-gradient mx-auto rounded-full mb-6"></div>
                            </div>
                            <TextField
                                label="Título"
                                variant="outlined"
                                fullWidth
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="input"
                            />
                            <TextField
                                label="Descrição"
                                variant="outlined"
                                fullWidth
                                multiline
                                rows={4}
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="input"
                                sx={{ marginTop: 2 }}
                            />
                            <DemoContainer components={["DatePicker"]} sx={{ marginBottom: 3, marginTop: 2, width: "100%" }}>
                                <DatePicker
                                    label="Data do Evento"
                                    value={date}
                                    onChange={(newValue) => setDate(newValue)}
                                    className="input"
                                    sx={{ width: "100%" }}
                                    format="DD/MM/YYYY"
                                />
                            </DemoContainer>
                            <TextField
                                label="Localização"
                                variant="outlined"
                                fullWidth
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                className="input"
                                sx={{ marginBottom: 2 }}
                            />
                            <Box sx={{ display: "flex", justifyContent: "space-between", marginTop: 2 }}>
                                <a
                                    href="/admin"
                                    className="cursor-pointer px-6 py-3 rounded-lg bg-liarb-blue text-white font-medium shadow-lg shadow-liarb-blue/20 hover:shadow-xl hover:shadow-liarb-blue/30 hover:-translate-y-1 transition-all duration-300"
                                >
                                    Cancelar
                                </a>
                                <a
                                    onClick={handleSaveEvent}
                                    className="cursor-pointer px-6 py-3 rounded-lg text-white font-medium shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                                    style={{ backgroundColor: "#28a745", boxShadow: "0px 4px 6px rgba(40, 167, 69, 0.4)" }} // Cor verde
                                >
                                    Salvar
                                </a>
                            </Box>
                        </Box>
                    </LocalizationProvider>
                </div>
            </section>
            <Footer />
        </>
    );
};

export default CreateEvent;