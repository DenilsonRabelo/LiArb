import React, { useEffect, useState } from "react";
import Card from "@/components/Card";
import AnimatedSection from "@/components/AnimatedSection";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useNavigate } from "react-router-dom";
import { enqueueSnackbar } from "notistack";
import { getToken } from "@/services/login";
import { config } from "../../../config/env";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";

type MemberData = {
  id: number;
  nome: string;
  cargo: string;
  descricao: string;
  fotoUrl: string;
};

const EditDeleteMembers: React.FC = () => {
  const [membros, setMembros] = useState<MemberData[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [memberToDelete, setMemberToDelete] = useState<number | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMembros = async () => {
      try {
        const response = await fetch(`${config.URL}/membros`, {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        });
        const data = await response.json();
        setMembros(data);
      } catch (error) {
        console.error("Erro ao buscar membros:", error);
        enqueueSnackbar("Erro ao carregar membros. Tente novamente.", { variant: "error" });
      }
    };

    fetchMembros();
  }, []);

  const handleOpenModal = (id: number) => {
    setMemberToDelete(id);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setMemberToDelete(null);
  };

  const handleEdit = (id: number) => {
    navigate(`/membro/editar/${id}`);
  };

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`${config.URL}/membros/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });

      if (!response.ok) {
        enqueueSnackbar("Erro ao excluir membro. Tente novamente.", { variant: "error" });
        return;
      }

      enqueueSnackbar("Membro excluído com sucesso", { variant: "success" });
      setMembros(membros.filter((member) => member.id !== id));
    } catch (error) {
      console.error("Erro ao excluir membro:", error);
      enqueueSnackbar("Erro ao excluir membro. Tente novamente.", { variant: "error" });
    }
  };

  return (
    <>
      <Navbar />
      <section id="edit-delete-members" className="mt-20 bg-gray-50 mb-20">
        <div className="container mx-auto mt-10">
          <AnimatedSection>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Gerenciar Membros</h2>
              <div className="w-20 h-1 bg-blue-gradient mx-auto rounded-full mb-6"></div>
              <p className="text-foreground/70 max-w-2xl mx-auto">
                Edite ou exclua membros da diretoria conforme necessário.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {(membros || []).length > 0 ? (
              membros.map((member, index) => (
                <AnimatedSection key={member.id} delay={index * 100}>
                  <Card className="flex flex-col items-center text-center">
                    <div className="w-24 h-24 bg-gray-200 rounded-full mb-4 overflow-hidden">
                      {member.fotoUrl ? (
                        <img
                          src={member.fotoUrl}
                          alt={member.nome}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-200"></div>
                      )}
                    </div>
                    <h4 className="text-lg font-bold">{member.nome}</h4>
                    <p className="text-liarb-blue text-sm font-medium mb-2">{member.cargo}</p>
                    <p className="text-foreground/70 text-sm">{member.descricao}</p>
                    <div className="flex justify-center gap-4 mt-4">
                      <button
                        onClick={() => handleEdit(member.id)}
                        className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded hover:bg-blue-600 transition-colors"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleOpenModal(member.id)}
                        className="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded hover:bg-red-600 transition-colors"
                      >
                        Excluir
                      </button>
                    </div>
                  </Card>
                </AnimatedSection>
              ))
            ) : (
              <p className="text-center text-foreground/70 col-span-full">
                Nenhum membro encontrado.
              </p>
            )}
          </div>
        </div>
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
            Tem certeza de que deseja excluir este membro? Esta ação não pode ser desfeita.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="primary">
            Cancelar
          </Button>
          <Button
            onClick={() => {
              if (memberToDelete !== null) {
                handleDelete(memberToDelete);
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

      <Footer />
    </>
  );
};

export default EditDeleteMembers;