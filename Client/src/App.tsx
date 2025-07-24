
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import BlogPage from "./pages/Blog";
import PostDetails from "./pages/PostDetails";
import LoginPage from "./pages/Login";
import { SnackbarProvider } from "notistack";
import AdmPage from "./pages/ADM/Adm";
import BlogAdminCreatPost from "./pages/ADM/Blog/CreatePost";
import EditPostPage from "./pages/ADM/Blog/PostEdit";
import PostPage from "./pages/ADM/Blog/Post";
import CreateEvent from "./pages/ADM/Event/CreateEvent";
import EventsPage from "./pages/Events";
import EditDeleteEventsPage from "./pages/ADM/Event/Event";
import EditEvent from "./pages/ADM/Event/EditEvent";
import CreateMember from "./pages/ADM/Member/CreateMember";
import EditDeleteMembers from "./pages/ADM/Member/Member";
import EditMember from "./pages/ADM/Member/EditMember";
import CamarbPage from "./pages/Competitions/Camarb";
import CamagroPage from "./pages/Competitions/Camagro";
import VisMootPage from "./pages/Competitions/VisMoot";
import LiarbAcademyPage from "./pages/Academy/LiarbAcademy";
import { isAuthenticated } from "../src/services/login";

const queryClient = new QueryClient();


const App = () => (
  <QueryClientProvider client={queryClient}>
    <SnackbarProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/post/:id" element={<PostDetails />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/competicoes/camarb" element={<CamarbPage />} />
            <Route path="/competicoes/camagro" element={<CamagroPage />} />
            <Route path="/competicoes/vis-moot" element={<VisMootPage />} />
            <Route path="/liarb-academy" element={<LiarbAcademyPage />} />

            (// Rotas ADM)
            {isAuthenticated() && (
              <>
                <Route path="/admin" element={<AdmPage />} />
                <Route path="/post/criar" element={<BlogAdminCreatPost />} />
                <Route path="/post/editar" element={<PostPage />} />
                <Route path="/post/editar/:id" element={<EditPostPage />} />
                <Route path="/evento/criar" element={<CreateEvent />} />
                <Route path="/eventos" element={<EventsPage />} />
                <Route path="/evento/editar" element={<EditDeleteEventsPage />} />
                <Route path="/evento/editar/:id" element={<EditEvent />} />
                <Route path="/membro/criar" element={<CreateMember />} />
                <Route path="/membro/editar" element={<EditDeleteMembers />} />
                <Route path="/membro/editar/:id" element={<EditMember />} />
              </>
            )}
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </SnackbarProvider>
  </QueryClientProvider>
);

export default App;
