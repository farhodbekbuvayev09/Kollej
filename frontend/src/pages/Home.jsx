import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Reveal from '../components/Reveal';

function Home() {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.62;
    }
  }, []);

  return (
    <div className="w-full overflow-x-hidden bg-stucco-light text-sea-dark">

      {/* ══════════════════════════════════════
          HERO — Full screen video
      ══════════════════════════════════════ */}
      <section className="relative h-screen min-h-[600px] w-full flex flex-col overflow-hidden" id="hero">
        <video
          className="absolute inset-0 w-full h-full object-cover z-0"
          src="/Images/video1.mp4"
          autoPlay muted loop playsInline
        />
        {/* Warm gradient overlay — Venice style */}
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/40 via-black/15 to-black/70" />

        <div className="relative z-20 flex-1 flex flex-col justify-between pt-[108px] px-6 md:px-16 pb-16 max-w-[1600px] w-full mx-auto">
          <div />
          <div className="flex flex-col gap-4">
            <p className="text-white/70 font-sans text-sm md:text-base tracking-[0.04em] animate-fade-blur">
              Texnikumimizga xush kelibsiz
            </p>
            <h1 className="font-serif text-[3rem] md:text-[6rem] font-bold text-white leading-none tracking-[-0.03em] animate-fade-blur-200">
              Kelajagingizni<br />biz bilan quring.
            </h1>
          </div>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-10 right-8 md:right-16 z-20 flex flex-col items-center gap-2.5">
          <span className="block w-[1px] h-12 bg-white/40 scroll-hint-line" />
          <span
            className="font-sans text-[0.65rem] tracking-[0.14em] uppercase text-white/45"
            style={{ writingMode: 'vertical-rl' }}
          >
            Pastga suring
          </span>
        </div>
      </section>

      {/* ══════════════════════════════════════
          ARTICLE TEASER
      ══════════════════════════════════════ */}
      <section
        className="relative bg-cover bg-center py-20 md:py-36"
        id="about"
        style={{ backgroundImage: "url('/Images/image6.webp')" }}
      >
        <div className="absolute inset-0 bg-sea-dark/50" />
        <div className="relative z-10 max-w-[1400px] w-full mx-auto px-5 md:px-14">
          <Reveal>
            <Link to="/article" className="block group">
              <div className="grid grid-cols-1 md:grid-cols-[1.1fr_0.9fr] gap-0 bg-stucco-light overflow-hidden shadow-2xl hover:-translate-y-1 transition-transform duration-500">
                {/* Text */}
                <div className="flex flex-col justify-center gap-5 p-10 md:p-20 border-b md:border-b-0 md:border-r border-sea-dark/10">
                  <span className="font-sans text-[0.7rem] font-bold tracking-[0.16em] uppercase text-kollej-red">Yangilik</span>
                  <h2 className="font-serif text-[2rem] md:text-[3.5rem] font-normal leading-[1.1] tracking-[-0.02em] text-sea-dark">
                    1-son texnikumi o'quvchilari ish ustida
                  </h2>
                  <p className="font-sans text-base md:text-lg text-sea-dark/65 leading-relaxed font-light">
                    <em className="font-serif italic font-medium text-sea-dark/80">An'ana va texnologiyalarni birlashtirish</em> — o'quvchilar to'qimachilik sanoati bilan hamkorlikda qadimiy hunarmandchilikni raqamli davrga olib kirmoqda.
                  </p>
                  <span className="inline-flex items-center gap-2 font-sans text-sm font-semibold tracking-[0.06em] text-sea-dark/50 mt-2 group-hover:text-sea-dark transition-colors">
                    Batafsil o'qish
                    <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
                      <path d="M3 9h12M15 9l-5-5M15 9l-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                </div>
                {/* Image */}
                <div className="h-72 md:h-auto overflow-hidden">
                  <img
                    src="/Images/image7.webp"
                    alt="O'quvchilar zavodida"
                    className="w-full h-full object-cover transition-transform duration-[900ms] group-hover:scale-[1.04]"
                    loading="lazy"
                  />
                </div>
              </div>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ══════════════════════════════════════
          MARQUEE
      ══════════════════════════════════════ */}
      <div className="marquee-wrap">
        <div className="marquee-track">
          {['TA\'LIM', 'AMALIYOT', 'KELAJAK', 'INNOVATSIYA', 'TEXNOLOGIYA', 'HUNARMANDCHILIK',
            'TA\'LIM', 'AMALIYOT', 'KELAJAK', 'INNOVATSIYA', 'TEXNOLOGIYA', 'HUNARMANDCHILIK'].map((word, i) => (
            <React.Fragment key={i}>
              <span>{word}</span>
              <span className="dot">·</span>
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════
          SPLIT BANNER — Professional teachers
      ══════════════════════════════════════ */}
      <section className="flex flex-col md:flex-row items-stretch min-h-[540px]" id="teachers">
        <div className="flex-1 flex flex-col justify-center p-10 md:p-20 border-b md:border-b-0 md:border-r border-sea-dark/10 bg-stucco-light">
          <Reveal>
            <span className="font-sans text-[0.7rem] font-bold tracking-[0.16em] uppercase text-kollej-red mb-6 block">Ta'lim</span>
            <h2 className="font-serif text-[2.2rem] md:text-[3.5rem] font-bold text-sea-dark mb-6 leading-[1.1] tracking-[-0.02em]">
              Bizdagi professional<br />ustozlar bilan tahsil oling
            </h2>
            <p className="font-sans text-base md:text-lg text-sea-dark/60 mb-10 leading-relaxed font-light">
              Haliham ro'yxatdan o'tmadingizmi?<br />
              <strong className="text-sea-dark font-semibold">Unda hoziroq boshlang.</strong>
            </p>
            <a
              href="#contact"
              className="inline-block font-sans text-sm font-bold tracking-[0.1em] uppercase py-4 px-10 bg-sea-dark text-stucco-light w-max transition-all duration-300 hover:bg-kollej-red"
            >
              Ro'yxatdan o'tish
            </a>
          </Reveal>
        </div>
        <Reveal delay={0.15} className="flex-1 min-h-[360px] md:min-h-auto overflow-hidden">
          <video
            className="w-full h-full object-cover"
            src="/Images/video3.mp4"
            autoPlay muted loop playsInline
            style={{ minHeight: '360px' }}
          />
        </Reveal>
      </section>

      {/* ══════════════════════════════════════
          FAMILY BANNER
      ══════════════════════════════════════ */}
      <section className="relative w-full h-[75vh] min-h-[520px] overflow-hidden" id="family">
        <video
          className="absolute inset-0 w-full h-full object-cover"
          src="/Images/video4.mp4"
          autoPlay muted loop playsInline preload="metadata"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-sea-dark/75 via-sea-dark/35 to-transparent" />
        <Link
          to="/life"
          className="block absolute inset-0 flex flex-col justify-center px-8 md:px-20 max-w-[760px] group"
        >
          <Reveal>
            <span className="font-sans text-[0.7rem] font-bold tracking-[0.16em] uppercase text-stucco-mid mb-6 block">O'quvchilar hayoti</span>
            <h2 className="font-serif text-[2rem] md:text-[3.8rem] font-bold leading-[1.1] tracking-[-0.02em] text-white mb-8">
              Bizning Texnikumimizda darsliklarni shunchaki o'quvdek emas, balki ahil bir oila singari o'rganamiz.
            </h2>
            <span className="inline-flex items-center gap-2 font-sans text-sm font-bold tracking-[0.1em] uppercase text-white/70 group-hover:text-white transition-colors duration-300">
              Ko'proq o'rganish
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M3 9h12M15 9l-5-5M15 9l-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
          </Reveal>
        </Link>
      </section>

      {/* ══════════════════════════════════════
          INFO BOARD — Director + Qabul rejasi
      ══════════════════════════════════════ */}
      <section className="py-20 md:py-[140px] bg-stucco-light" id="info-board">
        <div className="max-w-[1400px] mx-auto px-5 md:px-14">
          <Reveal>
            <span className="font-sans text-[0.7rem] font-bold tracking-[0.18em] uppercase text-kollej-red block mb-2">Texnikum portali</span>
            <h2 className="font-serif text-[2rem] md:text-[3.5rem] font-bold text-sea-dark mb-[60px] tracking-[-0.02em]">
              Tuzilma va Yangi Qabul
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1.9fr] gap-8 md:gap-14">
            {/* Director Card */}
            <Reveal delay={0.1}>
              <div className="bg-white/60 border border-sea-dark/10 p-8 md:p-10 flex flex-col items-center text-center h-full shadow-sm">
                <div className="w-32 h-32 rounded-full overflow-hidden mb-6 border-2 border-sea-dark/10">
                  <img
                    src="/Images/director_portrait.png"
                    alt="Shuhratjon Xolmatov"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <span className="font-sans text-[0.7rem] font-bold tracking-[0.12em] uppercase text-sea-dark/45 mb-2">Texnikum Direktori</span>
                <h3 className="font-serif text-[1.5rem] font-bold leading-[1.15] mb-6 text-sea-dark">
                  Xolmatov Shuhratjon Shermamatovich
                </h3>
                <ul className="w-full text-left text-sm border-t border-b border-sea-dark/10 py-5 mb-6 space-y-3">
                  {[
                    ['Ma\'lumoti', 'Oliy (Iqtisodchi)'],
                    ['Umumiy staj', '24 yil'],
                    ['Pedagogik staj', '24 yil'],
                    ['Toifasi', 'Bosh o\'qituvchi'],
                  ].map(([k, v]) => (
                    <li key={k} className="flex justify-between gap-4">
                      <span className="text-sea-dark/40">{k}</span>
                      <span className="font-medium text-sea-dark text-right">{v}</span>
                    </li>
                  ))}
                </ul>
                <p className="font-sans text-sm text-sea-dark/55 leading-relaxed">
                  Shuhratjon Shermamatovich uzoq yillardan beri ta'lim tizimida o'zining yuksak pedagogik va boshqaruv salohiyati bilan yoshlarga saboq berib kelmoqda.
                </p>
              </div>
            </Reveal>

            <div className="flex flex-col gap-8">
              {/* Qabul rejasi */}
              <Reveal delay={0.2}>
                <div className="bg-white/60 border border-sea-dark/10 p-8 shadow-sm">
                  <h3 className="font-serif text-2xl font-bold mb-6 text-sea-dark">
                    2026–2027-o'quv yili uchun yangi qabul rejasi
                  </h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[560px] text-sm">
                      <thead>
                        <tr className="border-b-2 border-sea-dark text-sea-dark/50 font-sans">
                          <th className="pb-3 px-2 font-bold tracking-wider text-[0.7rem] uppercase">№</th>
                          <th className="pb-3 px-2 font-bold tracking-wider text-[0.7rem] uppercase">Kasb / Yo'nalish</th>
                          <th className="pb-3 px-2 font-bold tracking-wider text-[0.7rem] uppercase">Kvota</th>
                          <th className="pb-3 px-2 font-bold tracking-wider text-[0.7rem] uppercase">Grant</th>
                          <th className="pb-3 px-2 font-bold tracking-wider text-[0.7rem] uppercase">Kontrakt</th>
                        </tr>
                      </thead>
                      <tbody className="text-sea-dark">
                        {[
                          ['1', 'Buxgalteriya hisobi va audit', '30 nafar', '5 nafar', '25 nafar'],
                          ['2', 'Bank ishi', '30 nafar', '5 nafar', '25 nafar'],
                          ['3', 'Kompyuter injiniringi', '30 nafar', '6 nafar', '24 nafar'],
                          ['4', 'Tikuvchilik va tikuv-trikotaj', '30 nafar', '6 nafar', '24 nafar'],
                        ].map(([no, name, k, g, c]) => (
                          <tr key={no} className="border-b border-sea-dark/8 hover:bg-sea-dark/3 transition-colors">
                            <td className="py-4 px-2 text-sea-dark/40">{no}</td>
                            <td className="py-4 px-2 font-medium">{name}</td>
                            <td className="py-4 px-2">{k}</td>
                            <td className="py-4 px-2">{g}</td>
                            <td className="py-4 px-2">{c}</td>
                          </tr>
                        ))}
                        <tr className="bg-sea-dark/6 font-bold">
                          <td className="py-4 px-2 text-sea-dark/40">—</td>
                          <td className="py-4 px-2 text-sea-dark">JAMI QABUL REJASI</td>
                          <td className="py-4 px-2 text-sea-dark">120 nafar</td>
                          <td className="py-4 px-2 text-sea-dark">22 nafar</td>
                          <td className="py-4 px-2 text-sea-dark">98 nafar</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </Reveal>

              {/* Stats */}
              <Reveal delay={0.3}>
                <div className="bg-white/60 border border-sea-dark/10 p-8 shadow-sm">
                  <h3 className="font-serif text-2xl font-bold mb-6 text-sea-dark">
                    Kadrlar salohiyati va shtat birliklari tahlili
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {[
                      ['14', "O'qituvchilar", '2 Bosh, 4 Yetakchi, 3 Katta va 5 mutaxassis.'],
                      ['6', 'Ishlab chiqarish ustalari', 'Amaliy sohalar bo\'yicha hunar o\'rgatadi.'],
                      ['5', 'Rahbariyat', 'Direktor, 2 o\'rinbosar, bosh buxgalter va kadrlar.'],
                      ['13', 'Yordamchi tarkib', '2 kutubxonachi, 3 laborant va 8 texnik xodim.'],
                    ].map(([num, label, desc]) => (
                      <div key={label} className="flex flex-col">
                        <div className="font-serif text-4xl md:text-5xl font-bold text-kollej-red mb-1">{num}</div>
                        <div className="font-sans text-[0.75rem] font-bold uppercase tracking-wider text-sea-dark mb-2">{label}</div>
                        <div className="font-sans text-[0.8rem] text-sea-dark/50 leading-relaxed">{desc}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          NEWS CARD
      ══════════════════════════════════════ */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden bg-sea-dark">
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover z-0 opacity-70"
          src="/Images/video8.mp4"
          autoPlay muted loop playsInline preload="metadata"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-sea-dark/20 via-sea-dark/40 to-sea-dark/70 z-10" />
        <Link to="/news" className="relative z-20 text-center flex flex-col items-center justify-center w-full h-full p-8 group">
          <Reveal className="flex flex-col items-center">
            <span className="font-sans text-[0.7rem] font-bold tracking-[0.18em] uppercase text-stucco-mid mb-5">Yangiliklar</span>
            <h2 className="font-serif text-[2.2rem] md:text-[5rem] font-bold text-white mb-6 leading-tight tracking-[-0.02em] group-hover:scale-[1.02] transition-transform duration-700">
              Bizni yangiliklarimizdan<br />xabardor bo'lib turing
            </h2>
            <p className="text-white/60 max-w-xl mb-10 text-base md:text-lg font-light font-sans">
              Texnikumimizdagi so'nggi voqealar, tadbirlar va e'lonlarni kuzating.
            </p>
            <span className="inline-flex items-center gap-2.5 font-sans text-sm font-bold tracking-[0.1em] uppercase py-4 px-10 bg-white text-sea-dark group-hover:bg-stucco-light transition-colors duration-300">
              Barcha yangiliklar
              <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
                <path d="M3 9h12M15 9l-5-5M15 9l-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
          </Reveal>
        </Link>
      </section>
    </div>
  );
}

export default Home;
