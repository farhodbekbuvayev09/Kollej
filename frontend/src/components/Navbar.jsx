import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => { setMobileMenuOpen(false); }, [location.pathname]);

  const navLinks = [
    { label: 'Biz Haqimizda', to: '/#about' },
    { label: 'Yangiliklar', to: '/news' },
    { label: "O'quvchilar Hayoti", to: '/life' },
    { label: "Bog'lanish", to: '/#contact' },
  ];

  const isActive = (to) => location.pathname === to || (to !== '/' && location.pathname.startsWith(to.split('#')[0]));

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          scrolled || !isHome
            ? 'border-b border-sea-dark/10 bg-stucco-light/90 backdrop-blur-xl shadow-sm py-3'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 flex justify-between items-center">
          {/* Brand */}
          <Link
            to="/"
            className={`font-serif text-lg font-bold tracking-tight leading-tight transition-colors duration-300 max-w-[200px] md:max-w-none ${
              scrolled || !isHome ? 'text-sea-dark' : 'text-white'
            }`}
          >
            1-son texnikumi
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`relative px-4 py-2 text-sm font-medium tracking-[0.01em] rounded-full transition-all duration-200 ${
                  scrolled || !isHome
                    ? isActive(link.to)
                      ? 'text-sea-dark bg-sea-dark/8'
                      : 'text-sea-dark/65 hover:text-sea-dark hover:bg-sea-dark/6'
                    : isActive(link.to)
                      ? 'text-white bg-white/15'
                      : 'text-white/75 hover:text-white hover:bg-white/12'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Mobile burger */}
          <button
            className={`md:hidden flex flex-col justify-center items-center w-9 h-9 gap-[5px] focus:outline-none z-50`}
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Menu"
          >
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className={`block w-6 h-[1.5px] rounded-full transition-all duration-300 ${
                  scrolled || !isHome ? 'bg-sea-dark' : 'bg-white'
                }`}
              />
            ))}
          </button>
        </div>
      </nav>

      {/* Mobile overlay */}
      <div
        className={`fixed inset-0 z-[60] transition-all duration-500 ease-out ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        style={{ background: '#eeede4' }}
      >
        <button
          className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center text-sea-dark text-2xl rounded-full border border-sea-dark/15 hover:bg-sea-dark/6 transition-colors"
          onClick={() => setMobileMenuOpen(false)}
          aria-label="Close"
        >
          ✕
        </button>
        <div className="flex flex-col justify-center items-center h-full gap-8 text-center">
          <span className="font-serif text-3xl font-bold text-sea-dark mb-4">1-son texnikumi</span>
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setMobileMenuOpen(false)}
              className="font-serif text-2xl text-sea-dark/70 hover:text-sea-dark transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}

export default Navbar;
