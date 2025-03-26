import AnimatedSection from "@/components/AnimatedSection";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

const AdmPage = () => {
    return (
        <>
            <Navbar />
            <section id="ADM" className="mt-20 bg-gray-50">
                <div className="container mx-auto mt-10">
                    <AnimatedSection>
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">Administração</h2>
                            <div className="w-20 h-1 bg-purple-gradient mx-auto rounded-full mb-6"></div>
                            <p className="text-foreground/70 max-w-2xl mx-auto">
                                Gerencie os posts do blog, os membros da equipe e as competições com os botões abaixo.
                            </p>
                            <hr className="border-t border-gray-300 my-3" />
                        </div>
                    </AnimatedSection>

                    <AnimatedSection>
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">Blog</h2>
                            <div className="w-20 h-1 bg-purple-gradient mx-auto rounded-full mb-6"></div>
                            <div className="flex flex-wrap gap-4 justify-center">
                                <a
                                    href="/post/criar"
                                    className="px-6 py-3 rounded-lg bg-liarb-blue text-white font-medium shadow-lg shadow-liarb-blue/20 hover:shadow-xl hover:shadow-liarb-blue/30 hover:-translate-y-1 transition-all duration-300"
                                >
                                    Criar Post
                                </a>
                                <a
                                    href="/post/editar"
                                    className="px-6 py-3 rounded-lg bg-white border border-gray-200 text-foreground font-medium hover:bg-gray-50 hover:-translate-y-1 transition-all duration-300"
                                >
                                    Editar/Excluir Post
                                </a>
                            </div>
                        </div>
                    </AnimatedSection>


                    <AnimatedSection>
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">Eventos</h2>
                            <div className="w-20 h-1 bg-purple-gradient mx-auto rounded-full mb-6"></div>
                            <div className="flex flex-wrap gap-4 justify-center">
                                <a
                                    href="/evento/criar"
                                    className="px-6 py-3 rounded-lg bg-liarb-blue text-white font-medium shadow-lg shadow-liarb-blue/20 hover:shadow-xl hover:shadow-liarb-blue/30 hover:-translate-y-1 transition-all duration-300"
                                >
                                    Criar Evento
                                </a>
                                <a
                                    href="/evento/editar"
                                    className="px-6 py-3 rounded-lg bg-white border border-gray-200 text-foreground font-medium hover:bg-gray-50 hover:-translate-y-1 transition-all duration-300"
                                >
                                    Editar/Excluir Evento
                                </a>
                            </div>
                        </div>
                    </AnimatedSection>


                    <AnimatedSection>
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">Membros</h2>
                            <div className="w-20 h-1 bg-purple-gradient mx-auto rounded-full mb-6"></div>
                            <div className="flex flex-wrap gap-4 justify-center">
                                <a
                                    href="/membro/criar"
                                    className="px-6 py-3 rounded-lg bg-liarb-blue text-white font-medium shadow-lg shadow-liarb-blue/20 hover:shadow-xl hover:shadow-liarb-blue/30 hover:-translate-y-1 transition-all duration-300"
                                >
                                    Criar Membro
                                </a>
                                <a
                                    href="/membro/editar"
                                    className="px-6 py-3 rounded-lg bg-white border border-gray-200 text-foreground font-medium hover:bg-gray-50 hover:-translate-y-1 transition-all duration-300"
                                >
                                    Editar/Excluir Membro
                                </a>
                            </div>
                        </div>
                    </AnimatedSection>
                </div>
                
                <Footer />
            </section>
        </>
    );
};

export default AdmPage;