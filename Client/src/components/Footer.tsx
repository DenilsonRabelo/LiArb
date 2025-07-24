
import React from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';

const Footer = () => {

  const navigate = useNavigate();
  const location = useLocation();

  const handleLinkClick = (href: string) => {
    if (location.pathname !== '/') {
      
      navigate(`/${href}`, { replace: false });
      setTimeout(() => {
        const section = document.querySelector(href);
        section?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const section = document.querySelector(href);
      section?.scrollIntoView({ behavior: 'smooth' });
    }
  };


  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <div className="h-10 w-10 bg-liarb-purple rounded-md mr-2 flex items-center justify-center">
                <span className="text-white font-bold text-lg">L</span>
              </div>
              <span className="font-bold text-xl text-white">
                LiArb
              </span>
            </div>
            <p className="text-gray-400 mb-4 max-w-xs">
              A Liga de Arbitragem tem como missão promover a arbitragem e o esporte acadêmico, contribuindo para a formação de profissionais éticos e competentes.
            </p>
            
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Links Rápidos</h3>
            <ul className="space-y-2">
              <li><a onClick={() => handleLinkClick('#home')} className="text-gray-400 hover:text-white transition-colors cursor-pointer">Início</a></li>
              <li><a onClick={() => handleLinkClick('#about')} className="text-gray-400 hover:text-white transition-colors cursor-pointer">Conhecendo a Liga</a></li>
              <li><a onClick={() => handleLinkClick('#structure')} className="text-gray-400 hover:text-white transition-colors cursor-pointer">Estrutura</a></li>
              <li><a onClick={() => handleLinkClick('#competitions')} className="text-gray-400 hover:text-white transition-colors cursor-pointer">Competições</a></li>
              <li><a onClick={() => handleLinkClick('#academy')} className="text-gray-400 hover:text-white transition-colors cursor-pointer">LiArb Academy</a></li>
              <li><a onClick={() => handleLinkClick('#blog')} className="text-gray-400 hover:text-white transition-colors cursor-pointer">Blog</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Competições</h3>
            <ul className="space-y-2">
              <li><Link to="/competicoes/camagro" className="text-gray-400 hover:text-white transition-colors">CAMAGRO</Link></li>
              <li><Link to="/competicoes/camarb" className="text-gray-400 hover:text-white transition-colors">CAMARB</Link></li>
              <li><Link to="/competicoes/vis-moot" className="text-gray-400 hover:text-white transition-colors">VIS</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Contato</h3>
            <ul className="space-y-2">
              <li className="text-gray-400">
                <span className="block">Email:</span>
                <a href="mailto:contato@liarb.org" className="text-liarb-blue-light hover:underline">contato@liarb.org</a>
              </li>
              <li className="text-gray-400">
                <span className="block">Telefone:</span>
                <a href="tel:+551234567890" className="hover:text-white transition-colors">(12) 3456-7890</a>
              </li>
              <li className="text-gray-400 mt-4">
                <a 
                  href="https://instagram.com/ligadearbitragem" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-liarb-blue rounded-lg text-white font-medium hover:bg-liarb-blue-dark transition-colors inline-block"
                >
                  Entre em contato
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8">
          <p className="text-center text-gray-400 text-sm">
            © {new Date().getFullYear()} Liga de Arbitragem - LiArb. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
