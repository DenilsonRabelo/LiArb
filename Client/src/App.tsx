
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import BlogPage from "./pages/Blog";
import PostDetails from "./pages/PostDetails";
import Login from "./components/Login";
import LoginPage from "./pages/Login";
import { SnackbarProvider } from "notistack";
import AdmPage from "./pages/Adm";
import BlogAdminCreatPost from "./pages/CreatePost";

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
          <Route path="/admin" element={<AdmPage />} />
          <Route path="/post/criar" element={<BlogAdminCreatPost />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
    </SnackbarProvider>
  </QueryClientProvider>
);

export default App;
