import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Reveal from '../components/Reveal';

function News() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/news.json')
      .then(r => r.json())
      .then(data => { setNews([...data].sort((a, b) => new Date(b.date) - new Date(a.date))); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="bg-stucco-light min-h-screen pt-36 pb-28">
      <div className="max-w-[1400px] mx-auto px-5 md:px-14">
        {/* Header */}
        <div className="mb-16 md:mb-[100px]">
          <Reveal>
            <span className="font-sans text-[0.7rem] font-bold tracking-[0.16em] uppercase text-kollej-red block mb-4">Yangiliklar Oqimi</span>
            <h1 className="font-serif text-[2.5rem] md:text-[5rem] font-bold text-sea-dark leading-[1.05] tracking-[-0.03em] mb-6">
              Texnikum hayotidagi<br />so'nggi yangiliklar
            </h1>
            <div className="w-16 h-[2px] bg-kollej-red mt-2 mb-6" />
            <p className="font-sans text-base md:text-lg font-light leading-[1.8] text-sea-dark/60 max-w-2xl">
              Ta'lim jarayonlari, o'quvchilar yutuqlari va kelajak rejalari haqida birinchi bo'lib xabardor bo'ling.
            </p>
          </Reveal>
        </div>

        {/* Grid */}
        {loading ? (
          <div className="flex justify-center py-24">
            <div className="w-10 h-10 border-2 border-sea-dark/20 border-t-sea-dark rounded-full animate-spin" />
          </div>
        ) : news.length === 0 ? (
          <div className="text-center text-sea-dark/40 py-24 font-sans">Hozircha yangiliklar yo'q.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {news.map((item, index) => (
              <Reveal key={item.id} delay={(index % 3) * 0.1}>
                <Link
                  to={`/article?id=${item.id}`}
                  className="group flex flex-col h-full bg-white/70 border border-sea-dark/8 shadow-sm hover:shadow-lg hover:-translate-y-1.5 transition-all duration-400 overflow-hidden"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={item.image?.startsWith('http') ? item.image : `/${item.image}`}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-[800ms] group-hover:scale-[1.04]"
                      loading="lazy"
                    />
                    <div className="absolute top-4 left-4 px-3 py-1 bg-stucco-light/90 backdrop-blur-md text-sea-dark font-sans text-[0.65rem] font-bold uppercase tracking-[0.1em]">
                      Yangilik
                    </div>
                  </div>
                  <div className="flex flex-col flex-1 p-8">
                    <div className="font-sans text-[0.75rem] text-sea-dark/40 font-medium tracking-[0.05em] uppercase mb-4">{item.date}</div>
                    <h3 className="font-serif text-xl font-bold text-sea-dark leading-[1.3] mb-4 group-hover:text-accent transition-colors line-clamp-3">
                      {item.title}
                    </h3>
                    <p className="font-sans text-sm font-light leading-[1.7] text-sea-dark/55 line-clamp-3 mt-auto">
                      {item.content}
                    </p>
                    <span className="inline-flex items-center gap-1.5 mt-5 font-sans text-[0.75rem] font-bold tracking-[0.08em] uppercase text-sea-dark/40 group-hover:text-sea-dark transition-colors">
                      Batafsil o'qish
                      <svg width="14" height="14" viewBox="0 0 18 18" fill="none">
                        <path d="M3 9h12M15 9l-5-5M15 9l-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default News;
