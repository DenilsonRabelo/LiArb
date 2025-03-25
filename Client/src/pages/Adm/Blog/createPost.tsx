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
import './style.css';


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

    const handleSavePost = async () => {
        try {
            const html = await editor.blocksToHTMLLossy(editor.document);
            setHTML(html);

            if(title !== "" && author !== "" && published && tags.length > 0 && html !== "") {
                await fetch("http://localhost:3000/post/criar", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${getToken()}`,
                    },
                    body: JSON.stringify({
                        published: published?.toISOString(),
                        author,
                        title,
                        tags,
                        content: html,
                    }),
                });
                enqueueSnackbar("Post criado com sucesso!", { variant: "success" });
                navigate("/administrar-blog");
            }
            else {
                enqueueSnackbar("Preencha todos os campos para criar o post.", { variant: "warning" });
            }
        } catch (error) {
            console.error("Erro ao salvar post:", error);
            enqueueSnackbar("Erro ao criar o post. Tente novamente.", { variant: "error" });
        }
    };

    return (
        <Box sx={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Box sx={{ padding: 4, width: "100%", margin: "0 auto"}}>
                    <Typography variant="h4" sx={{ marginBottom: 2 }}>
                        Criar Novo Post
                    </Typography>
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
                            if (e.key === "Enter" && tagInput.trim()) {
                                setTags([...tags, tagInput.trim()]);
                                setTagInput("");
                                e.preventDefault();
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
                    <Typography variant="subtitle1" sx={{ marginBottom: 1, marginTop: 2 }}>
                        Texto da Publicação
                    </Typography>
                    <BlockNoteView
                        aria-expanded={true}
                        editor={editor}
                        aria-placeholder="Texto do Post"
                    />
                    <Box sx={{ display: "flex", justifyContent: "space-between", marginTop: 2 }}>
                        <Button variant="outlined" color="secondary" onClick={() => navigate("/administrar-blog")}>
                            Cancelar
                        </Button>
                        <Button variant="contained" color="primary" onClick={handleSavePost}>
                            Salvar
                        </Button>
                    </Box>
                </Box>
            </LocalizationProvider>
        </Box>
    );
};

export default BlogAdminCreatPost;