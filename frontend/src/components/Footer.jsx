import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-sea-dark text-white" id="contact">
      <div className="max-w-[1400px] mx-auto px-6 md:px-14 pt-20 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_1fr] gap-12 pb-16 border-b border-white/10">
          {/* Brand */}
          <div>
            <h2 className="font-serif text-4xl font-bold mb-5 leading-tight">1-son<br />texnikumi</h2>
            <p className="text-white/55 text-sm leading-relaxed max-w-xs">
              Shahrixon tumani 1-son texnikumi — Andijon viloyati. Ta'lim sifatini birgalikda oshiramiz.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-sans text-[0.72rem] font-bold tracking-[0.14em] uppercase text-white/40 mb-6">Havolalar</h4>
            <ul className="space-y-3">
              {[
                { label: 'Biz haqimizda', to: '/#about' },
                { label: 'Yangiliklar', to: '/news' },
                { label: "O'quvchilar Hayoti", to: '/life' },
              ].map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="text-white/60 hover:text-white text-sm transition-colors duration-200">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-sans text-[0.72rem] font-bold tracking-[0.14em] uppercase text-white/40 mb-6">Bog'lanish</h4>
            <div className="space-y-3 text-sm text-white/60">
              <p>Andijon viloyati,<br />Shahrixon tumani</p>
              <p>
                <a href="tel:+998741234567" className="hover:text-white transition-colors">+998 (74) 123-45-67</a>
              </p>
              <p>
                <a href="mailto:info@shahrixon-texnikum.uz" className="hover:text-white transition-colors break-all">
                  info@shahrixon-texnikum.uz
                </a>
              </p>
            </div>
          </div>

          {/* Socials */}
          <div>
            <h4 className="font-sans text-[0.72rem] font-bold tracking-[0.14em] uppercase text-white/40 mb-6">Ijtimoiy tarmoqlar</h4>
            <div className="flex gap-3">
              {[
                {
                  label: 'Telegram',
                  icon: (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.248-1.97 9.289c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12l-6.871 4.326-2.962-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.833.932z"/>
                    </svg>
                  )
                },
                {
                  label: 'Instagram',
                  icon: (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  )
                },
                {
                  label: 'Facebook',
                  icon: (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  )
                }
              ].map(({ label, icon }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="w-10 h-10 flex items-center justify-center rounded-full border border-white/12 text-white/50 hover:text-white hover:border-white/30 hover:bg-white/8 transition-all duration-200"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-white/35 text-xs font-sans">
          <p>© {new Date().getFullYear()} 1-son texnikumi. Barcha huquqlar himoyalangan.</p>
          <p className="italic font-serif text-white/25 text-sm">Bilim — kelajak kaliti</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
