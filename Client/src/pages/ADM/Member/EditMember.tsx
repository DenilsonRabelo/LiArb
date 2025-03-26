import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box, TextField } from "@mui/material";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { enqueueSnackbar } from "notistack";
import { getToken } from "@/services/login";

const EditMember: React.FC = () => {
    const { id } = useParams<{ id: string }>(); // Pega o ID do membro da URL
    const navigate = useNavigate();
    const [nome, setNome] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [cargo, setCargo] = useState<string>("");
    const [descricao, setDescricao] = useState<string>("");
    const [fotoUrl, setFotoUrl] = useState<string>("");

    useEffect(() => {
        const fetchMember = async () => {
            try {
                const response = await fetch(`http://localhost:3000/membros/${id}`, {
                    headers: {
                        Authorization: `Bearer ${getToken()}`,
                    },
                });
                if (!response.ok) {
                    enqueueSnackbar("Membro não encontrado", { variant: "error" });
                    return;
                }
                const data = await response.json();
                setNome(data.nome);
                setEmail(data.email);
                setCargo(data.cargo);
                setDescricao(data.descricao);
                setFotoUrl(data.fotoUrl || "");
            } catch (error) {
                console.error("Erro ao buscar membro:", error);
                enqueueSnackbar("Erro ao carregar o membro. Tente novamente.", { variant: "error" });
            }
        };

        fetchMember();
    }, [id]);

    const handleUpdateMember = async () => {
        if (!nome.trim() || !email.trim() || !cargo.trim()) {
            enqueueSnackbar("Os campos Nome, Email e Cargo são obrigatórios", { variant: "warning" });
            return;
        }
        try {
            const response = await fetch(`http://localhost:3000/membros/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${getToken()}`,
                },
                body: JSON.stringify({
                    nome,
                    email,
                    cargo,
                    descricao,
                    fotoUrl,
                }),
            });

            if (!response.ok) {
                enqueueSnackbar("Erro ao atualizar membro. Tente novamente.", { variant: "error" });
                return;
            }
            enqueueSnackbar("Membro atualizado com sucesso", { variant: "success" });
            navigate("/membro/editar");
        } catch (error) {
            console.error("Erro ao atualizar membro:", error);
            enqueueSnackbar("Erro ao atualizar o membro. Tente novamente.", { variant: "error" });
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
                    <Box sx={{ padding: 4, maxWidth: "60%", margin: "0 auto", display: "flex", flexDirection: "column" }}>
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">Editar Membro</h2>
                            <div className="w-20 h-1 bg-blue-gradient mx-auto rounded-full mb-6"></div>
                        </div>
                        <TextField
                            label="Nome"
                            variant="outlined"
                            fullWidth
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                            className="input"
                        />
                        <TextField
                            label="Email"
                            variant="outlined"
                            fullWidth
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="input"
                            sx={{ marginTop: 2 }}
                        />
                        <TextField
                            label="Cargo"
                            variant="outlined"
                            fullWidth
                            value={cargo}
                            onChange={(e) => setCargo(e.target.value)}
                            className="input"
                            sx={{ marginTop: 2 }}
                        />
                        <TextField
                            label="Descrição"
                            variant="outlined"
                            fullWidth
                            multiline
                            rows={4}
                            value={descricao}
                            onChange={(e) => setDescricao(e.target.value)}
                            className="input"
                            sx={{ marginTop: 2 }}
                        />
                        <TextField
                            label="URL da Foto"
                            variant="outlined"
                            fullWidth
                            value={fotoUrl}
                            onChange={(e) => setFotoUrl(e.target.value)}
                            className="input"
                            sx={{ marginTop: 2 }}
                        />
                        <Box sx={{ display: "flex", justifyContent: "space-between", marginTop: 2 }}>
                            <a
                                href="/membro/editar"
                                className="cursor-pointer px-6 py-3 rounded-lg bg-liarb-blue text-white font-medium shadow-lg shadow-liarb-blue/20 hover:shadow-xl hover:shadow-liarb-blue/30 hover:-translate-y-1 transition-all duration-300"
                            >
                                Cancelar
                            </a>
                            <a
                                onClick={handleUpdateMember}
                                className="cursor-pointer px-6 py-3 rounded-lg text-white font-medium shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                                style={{ backgroundColor: "#28a745", boxShadow: "0px 4px 6px rgba(40, 167, 69, 0.4)" }} // Cor verde
                            >
                                Salvar
                            </a>
                        </Box>
                    </Box>
                </div>
            </section>
            <Footer />
        </>
    );
};

export default EditMember;