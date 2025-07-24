import "@blocknote/core/fonts/inter.css";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { useCreateBlockNote } from "@blocknote/react";
import { SetStateAction, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getToken } from "../../../services/login";
import { Box, Button, TextField, Chip, Typography, FilledTextFieldProps, OutlinedTextFieldProps, StandardTextFieldProps, TextFieldVariants } from "@mui/material";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Dayjs } from "dayjs";
import { useSnackbar } from 'notistack';
import Navbar from "@/components/Navbar";
import { Section } from "lucide-react";
import Footer from "@/components/Footer";
import { config } from "../../../config/env";


const BlogAdminCreatPost: React.FC = () => {
    const navigate = useNavigate();
    const editor = useCreateBlockNote();
    const { enqueueSnackbar } = useSnackbar();
    const [html, setHTML] = useState<string>("");
    const [title, setTitle] = useState<string>("");
    const [published, setPublished] = useState<Dayjs | null>();
    const [tags, setTags] = useState<string[]>([]);
    const [tagInput, setTagInput] = useState<string>("");
    const [author, setAuthor] = useState<string>("");
    const [subtitle, setSubtitle] = useState<string>("");
    const [image, setImage] = useState<string>("");

    const handleSavePost = async () => {
        try {
            const html = await editor.blocksToHTMLLossy(editor.document);
            setHTML(html);

            if (!title.trim()) {
                enqueueSnackbar("O campo 'Título' é obrigatório.", { variant: "warning" });
                return;
            }
            if (!author.trim()) {
                enqueueSnackbar("O campo 'Autor' é obrigatório.", { variant: "warning" });
                return;
            }
            if (!subtitle.trim()) {
                enqueueSnackbar("O campo 'Subtítulo' é obrigatório.", { variant: "warning" });
                return;
            }
            if (!published) {
                enqueueSnackbar("O campo 'Data da Publicação' é obrigatório.", { variant: "warning" });
                return;
            }
            if (tags.length === 0) {
                enqueueSnackbar("Adicione pelo menos uma tag.", { variant: "warning" });
                return;
            }
            if (!html.trim()) {
                enqueueSnackbar("O campo 'Texto da Publicação' é obrigatório.", { variant: "warning" });
                return;
            }

            await fetch(`${config.URL}/post/criar`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${getToken()}`,
                },
                body: JSON.stringify({
                    published: published?.toISOString(),
                    author,
                    title,
                    image,
                    subtitle,
                    tags,
                    content: html,
                }),
            });

            enqueueSnackbar("Post criado com sucesso!", { variant: "success" });
            navigate("/admin");
        } catch (error) {
            console.error("Erro ao salvar post:", error);
            enqueueSnackbar("Erro ao criar o post. Tente novamente.", { variant: "error" });
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
                                <h2 className="text-3xl md:text-4xl font-bold mb-4">Criar Novo Post</h2>
                                <div className="w-20 h-1 bg-purple-gradient mx-auto rounded-full mb-6"></div>
                            </div>
                            <TextField
                                className="input"
                                label="Título"
                                variant="outlined"
                                fullWidth
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                            <TextField
                                variant="outlined"
                                className="input"
                                label="Autor"
                                placeholder="Adicionar Author"
                                value={author}
                                onChange={(e) => setAuthor(e.target.value)}
                                fullWidth
                                sx={{ marginBottom: 2, marginTop: 2 }}
                            />
                            <TextField
                                variant="outlined"
                                className="input"
                                label="Imagem de Capa"
                                placeholder="Adicionar imagem de capa"
                                value={image}
                                type="link"
                                onChange={(e) => setImage(e.target.value)}
                                fullWidth
                                sx={{ marginBottom: 2, marginTop: 2 }}
                            />
                            <TextField
                                variant="outlined"
                                className="input"
                                label="Adicionar Subtítulo"
                                placeholder="Adicionar Subtítulo"
                                value={subtitle}
                                onChange={(e) => setSubtitle(e.target.value)}
                                fullWidth
                                sx={{ marginBottom: 2, marginTop: 2 }}
                            />
                            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5, marginBottom: 2 }}>
                                {tags.map((tag, index) => (
                                    <Chip
                                        key={index}
                                        label={tag}
                                        onDelete={() => setTags(tags.filter((_, i) => i !== index))}
                                        className="chip"
                                        size="small"
                                    />
                                ))}
                            </Box>
                            <TextField
                                variant="outlined"
                                className="input"
                                placeholder="Adicionar Tag"
                                label="Tags"
                                value={tagInput}
                                onChange={(e) => setTagInput(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter" && tagInput.trim() && tags.length < 5) {
                                        setTags([...tags, tagInput.trim()]);
                                        setTagInput("");
                                        e.preventDefault();
                                    } else if (e.key === "Enter" && tags.length >= 5) {
                                        e.preventDefault();
                                        alert("Você só pode adicionar até 5 tags.");
                                    }
                                }}
                                onBlur={() => {
                                    if (tagInput.trim() && tags.length < 5) {
                                        setTags([...tags, tagInput.trim()]);
                                        setTagInput("");
                                    } else if (tagInput.trim() && tags.length >= 5) {
                                        alert("Você só pode adicionar até 5 tags.");
                                    }
                                }}
                                fullWidth
                                sx={{ marginBottom: 2 }}
                            />
                            <DemoContainer components={["DatePicker"]} sx={{ marginBottom: 3, width: "100%" }}>
                                <DatePicker
                                    className="input"
                                    sx={{ width: "100%" }}
                                    label="Data Da Publicação"
                                    value={published}
                                    onChange={(newValue) => setPublished(newValue)}
                                    format="DD/MM/YYYY"
                                />
                            </DemoContainer>
                            <Typography variant="subtitle1" sx={{ marginBottom: 1, marginTop: 1 }}>
                                Texto da Publicação
                            </Typography>
                            <BlockNoteView
                                aria-expanded={true}
                                editor={editor}
                                aria-placeholder="Texto do Post"
                            />
                            <Box sx={{ display: "flex", justifyContent: "space-between", marginTop: 2 }}>
                                <a
                                    href="/admin"
                                    className="cursor-pointer px-6 py-3 rounded-lg bg-liarb-blue text-white font-medium shadow-lg shadow-liarb-blue/20 hover:shadow-xl hover:shadow-liarb-blue/30 hover:-translate-y-1 transition-all duration-300"
                                >
                                    Cancelar
                                </a>
                                <a
                                    onClick={handleSavePost}
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

export default BlogAdminCreatPost;