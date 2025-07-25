
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Menu, X } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { isAuthenticated, logout } from '@/services/login';
import logo from '../components/assets/logo.png';
import { AppProvider } from '@toolpad/core/AppProvider';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material';
import { useMediaQuery } from '@mui/material';
interface NavItemProps {
  href: string;
  label: string;
  active?: boolean;
  darkTheme?: boolean;
}

const NavItem = ({ href, label, active = false, darkTheme = false }: NavItemProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = () => {
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
    <li className="relative">
      <button
        onClick={handleClick}
        className={cn(
          'flex items-center px-4 py-2 text-sm font-medium transition-all duration-300',
          darkTheme 
            ? (active
                ? 'text-white font-semibold'
                : 'text-white/80 hover:text-white')
            : (active
                ? 'text-liarb-blue-dark'
                : 'text-foreground/80 hover:text-liarb-blue')
        )}
      >
        {label}
        {active && (
          <span className={cn(
            "absolute bottom-0 left-0 w-full h-0.5 rounded-full animate-fade-in",
            darkTheme ? "bg-white" : "bg-liarb-blue-dark"
          )} />
        )}
      </button>
    </li>
  );
};

interface NavbarProps {
  darkTheme?: boolean;
}

const Navbar = ({ darkTheme = false }: NavbarProps) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [modalOpen, setModalOpen] = useState(false); // State to control modal visibility
  const location = useLocation();
  const isMobile = useMediaQuery('(max-width:768px)');

  const navItems = [
    { href: '#home', label: 'Início' },
    { href: '#about', label: 'Conhecendo a Liga' },
    { href: '#structure', label: 'Estrutura' },
    { href: '#competitions', label: 'Competições' },
    { href: '#academy', label: 'LiArb Academy' },
    { href: '#blog', label: 'Blog' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setScrolled(scrollPosition > 20);

      const sections = document.querySelectorAll('section[id]');
      sections.forEach((section) => {
        const sectionTop = (section as HTMLElement).offsetTop - 100;
        const sectionHeight = (section as HTMLElement).offsetHeight;
        const sectionId = section.getAttribute('id') || '';

        if (
          scrollPosition >= sectionTop &&
          scrollPosition < sectionTop + sectionHeight
        ) {
          setActiveSection(sectionId);
        }
      });
    };

    if (location.pathname !== '/') {
      const currentPath = location.pathname.substring(1);
      setActiveSection(currentPath);
    } else {
      window.addEventListener('scroll', handleScroll);
    }

    return () => window.removeEventListener('scroll', handleScroll);
  }, [location]);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        darkTheme 
          ? 'bg-transparent py-4'
          : (scrolled ? 'bg-white/80 backdrop-blur-lg shadow-sm py-2' : 'bg-transparent py-4')
      )}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link to={'/'} className="flex items-center">
          <div className="h-10 w-10 bg-liarb-purple rounded-md mr-2 flex items-center justify-center">
            <span className="text-white font-bold text-lg">L</span>
          </div>
          <span className={cn(
            "font-bold text-xl",
            darkTheme 
              ? "text-white" 
              : "bg-clip-text text-transparent bg-dual-gradient"
          )}>
            LiArb
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:block">
          <ul className="flex space-x-1">
            {navItems.map((item) => (
              <NavItem
                key={item.href}
                href={item.href}
                label={item.label}
                active={activeSection === item.href.substring(1)}
                darkTheme={darkTheme}
              />
            ))}

            {isAuthenticated() ? (
              <>
                <button onClick={() => setModalOpen(true)}>
                  <img
                    src={logo}
                    alt="User Avatar"
                    className="mr-3 flex h-8 w-8 rounded-full object-cover cursor-pointer"
                  />
                </button>

                {/* Modal */}
                <Dialog open={modalOpen} onClose={() => setModalOpen(false)} fullWidth maxWidth="sm">
                  <Typography variant="h6" align="center" sx={{ mt: 2 }}>
                    Menu do Usuário
                  </Typography>
                  <DialogContent
                    style={{
                      display: "flex",
                      flexDirection: isMobile ? "row" : "row",
                      gap: "1rem",
                      alignItems: "center",
                      justifyContent: "center",
                      maxHeight: "calc(100vh - 200px)",
                    }}
                  >
                    <a
                      className="px-6 py-3 rounded-lg bg-liarb-blue text-white font-medium shadow-lg shadow-liarb-blue/20 hover:shadow-xl hover:shadow-liarb-blue/30 hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                      onClick={() => {
                        setModalOpen(false);
                        window.location.href = "/admin";
                      }}
                    >
                      Pagina do Admin
                    </a>
                    <a
                      className="px-6 py-3 rounded-lg bg-white border border-gray-200 text-foreground font-medium hover:bg-gray-50 hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                      onClick={() => {
                        logout();
                        window.location.href = "/";
                        setModalOpen(false);
                      }}
                    >
                      Logout
                    </a>
                  </DialogContent>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "end",
                      padding: "1rem",
                    }}
                  >
                    <Button onClick={() => setModalOpen(false)} color="primary">
                      Fechar
                    </Button>
                  </div>
                </Dialog>
              </>
            ) : (
              <Link
                to="/login"
                className={cn(
                  "px-8 py-2 text-sm font-medium rounded-full transition-all flex items-center",
                  darkTheme 
                    ? "text-liarb-blue bg-white hover:bg-gray-100"
                    : "text-white bg-liarb-blue-dark hover:bg-liarb-blue"
                )}
              >
                Login
              </Link>
            )}
          </ul>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden flex items-center"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
        >
          {mobileMenuOpen ? (
            <X className={cn("h-6 w-6", darkTheme ? "text-white" : "text-foreground")} />
          ) : (
            <Menu className={cn("h-6 w-6", darkTheme ? "text-white" : "text-foreground")} />
          )}
        </button>

        {/* Mobile Navigation */}
        <div
          className={cn(
            'fixed inset-0 z-50 flex flex-col justify-center items-center h-screen bg-white/95 backdrop-blur-lg transition-all duration-300 md:hidden',
            mobileMenuOpen
              ? 'opacity-100 translate-x-0'
              : 'opacity-0 translate-x-full pointer-events-none'
          )}
        >
          <div className="absolute top-0 right-0 p-4">
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2"
              aria-label="Close menu"
            >
              <X className="h-6 w-6 text-foreground" />
            </button>
          </div>
          <nav className="flex flex-col items-center justify-center h-full">
            <ul className="flex flex-col space-y-6 text-center">
              {navItems.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className={cn(
                      'text-xl font-medium py-2 px-4 transition-colors',
                      activeSection === item.href.substring(1)
                        ? 'text-liarb-blue font-bold'
                        : 'text-foreground hover:text-liarb-blue'
                    )}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
              {isAuthenticated() ? (
                <li>
                  <button
                    onClick={() => {
                      setModalOpen(true);
                      setMobileMenuOpen(false); // Fechar o menu ao abrir o modal
                    }}
                    className="px-4 py-2 text-lg font-medium text-white bg-liarb-blue-dark rounded-full hover:bg-liarb-blue transition-all"
                  >
                    Menu do Usuário
                  </button>
                </li>
              ) : (
                <li>
                  <Link
                    to="/login"
                    className="px-4 py-2 text-lg font-medium text-white bg-liarb-blue-dark rounded-full hover:bg-liarb-blue transition-all"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Login
                  </Link>
                </li>
              )}
            </ul>
          </nav>
        </div>

        {/* Modal (Reused) */}
        <Dialog open={modalOpen} onClose={() => setModalOpen(false)} fullWidth maxWidth="sm">
          <DialogTitle>
            <Typography variant="h5" align="center" sx={{ fontWeight: 'bold', mt: 2 }}>
              Menu do Usuário
            </Typography>
          </DialogTitle>
          <DialogContent
            style={{
              display: 'flex',
              flexDirection: isMobile ? 'column' : 'row',
              gap: '1.5rem', // Maior espaçamento entre os botões
              alignItems: 'center',
              justifyContent: 'center',
              padding: '2rem', // Espaçamento interno maior
            }}
          >
            <a
              className="px-8 py-3 rounded-lg bg-liarb-blue text-white font-medium shadow-lg shadow-liarb-blue/20 hover:shadow-xl hover:shadow-liarb-blue/30 hover:-translate-y-1 transition-all duration-300 cursor-pointer"
              onClick={() => {
                setModalOpen(false);
                window.location.href = '/admin';
              }}
            >
              Página do Admin
            </a>
            <a
              className="px-8 py-3 rounded-lg bg-white border border-gray-200 text-foreground font-medium hover:bg-gray-50 hover:-translate-y-1 transition-all duration-300 cursor-pointer"
              onClick={() => {
                logout();
                window.location.href = '/';
                setModalOpen(false);
              }}
            >
              Logout
            </a>
          </DialogContent>
          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              padding: '1rem 2rem',
            }}
          >
            <Button
              onClick={() => setModalOpen(false)}
              variant="outlined"
              color="primary"
              style={{
                padding: '0.5rem 1.5rem',
                fontWeight: 'bold',
              }}
            >
              Fechar
            </Button>
          </div>
        </Dialog>
      </div>
    </header>
  );
};

export default Navbar;
