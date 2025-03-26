import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, TextField } from "@mui/material";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { enqueueSnackbar } from "notistack";
import { getToken } from "@/services/login";

const CreateMember: React.FC = () => {
    const navigate = useNavigate();
    const [nome, setNome] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [cargo, setCargo] = useState<string>("");
    const [descricao, setDescricao] = useState<string>("");
    const [fotoUrl, setFotoUrl] = useState<string>("");

    const handleSaveMember = async () => {
        if (!nome.trim() || !email.trim() || !cargo.trim()) {
            enqueueSnackbar("Os campos Nome,Email, Cargo são obrigatórios", { variant: "warning" });
            return;
        }
        try {
            const response = await fetch(`${process.env.URL}/membros`, {
                method: "POST",
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
                enqueueSnackbar("Erro ao criar o membro. Tente novamente.", { variant: "error" });
                return;
            }
            enqueueSnackbar("Membro criado com sucesso", { variant: "success" });
            navigate("/admin");
        } catch (error) {
            console.error("Erro ao criar membro:", error);
            enqueueSnackbar("Erro ao criar o membro. Tente novamente.", { variant: "error" });
        }
    };

    return (
        <>
            <Navbar />
            <section id="ADM" className="mt-20 bg-gray-50">
                <div className="container mx-auto mt-10">
                    <Box sx={{ padding: 4, maxWidth: "60%", margin: "0 auto", display: "flex", flexDirection: "column" }}>
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">Criar Novo Membro</h2>
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
                                href="/admin"
                                className="cursor-pointer px-6 py-3 rounded-lg bg-liarb-blue text-white font-medium shadow-lg shadow-liarb-blue/20 hover:shadow-xl hover:shadow-liarb-blue/30 hover:-translate-y-1 transition-all duration-300"
                            >
                                Cancelar
                            </a>
                            <a
                                onClick={handleSaveMember}
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

export default CreateMember;