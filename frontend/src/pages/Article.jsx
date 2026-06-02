import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import Reveal from '../components/Reveal';

function Article() {
  const [searchParams] = useSearchParams();
  const id = searchParams.get('id');
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/news.json')
      .then(r => r.json())
      .then(data => {
        const found = id ? data.find(i => String(i.id) === String(id)) : data[0];
        setArticle(found || null);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-stucco-light flex items-center justify-center">
        <div className="w-10 h-10 border-2 border-sea-dark/20 border-t-sea-dark rounded-full animate-spin" />
      </div>
    );
  }
  if (!article) {
    return (
      <div className="min-h-screen bg-stucco-light flex items-center justify-center">
        <h2 className="font-serif text-2xl text-sea-dark">Maqola topilmadi</h2>
      </div>
    );
  }

  return (
    <div className="bg-stucco-light min-h-screen pt-32 pb-24">
      <article className="max-w-[800px] mx-auto px-5 md:px-0">

        <Reveal>
          <div className="mb-12">
            <span className="font-sans text-[0.7rem] font-bold tracking-[0.16em] uppercase text-kollej-red block mb-6">Texnikum Xabarlari</span>
            <h1 className="font-serif text-[2.5rem] md:text-[4rem] font-bold leading-[1.05] tracking-[-0.025em] text-sea-dark mb-6">
              {article.title}
            </h1>
            <div className="flex items-center gap-4 text-sea-dark/40 font-sans text-sm">
              <span className="w-10 h-[1px] bg-sea-dark/20" />
              Nashr etilgan: {article.date}
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="w-full aspect-[21/9] md:aspect-[21/9] overflow-hidden mb-14 shadow-md">
            <img
              src={article.image?.startsWith('http') ? article.image : `/${article.image}`}
              alt={article.title}
              className="w-full h-full object-cover"
            />
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="font-sans text-lg font-light leading-[1.85] text-sea-dark/75 whitespace-pre-wrap">
            {article.content}
          </div>
        </Reveal>

        <Reveal delay={0.3}>
          <div className="mt-20 pt-8 border-t border-sea-dark/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <Link
              to="/news"
              className="inline-flex items-center gap-2 font-sans text-sm font-bold tracking-[0.08em] uppercase text-sea-dark/50 hover:text-sea-dark transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 18 18" fill="none" className="rotate-180">
                <path d="M3 9h12M15 9l-5-5M15 9l-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Barcha yangiliklar
            </Link>
            <Link
              to="/"
              className="inline-block font-sans text-sm font-bold tracking-[0.1em] uppercase py-3 px-8 bg-sea-dark text-stucco-light hover:bg-kollej-red transition-colors duration-300"
            >
              Bosh sahifa
            </Link>
          </div>
        </Reveal>
      </article>
    </div>
  );
}

export default Article;
