import React from 'react';
import Reveal from '../components/Reveal';

function Life() {
  const sep = <div className="w-full h-[1px] bg-sea-dark/10" />;
  const imgCls = "w-full h-full object-cover transition-transform duration-[900ms] group-hover:scale-[1.03]";

  return (
    <div className="w-full bg-stucco-light text-sea-dark pt-20">

      {/* ══ HERO ══ */}
      <section className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
        <div className="flex flex-col justify-center px-8 md:px-24 py-20">
          <Reveal>
            <p className="font-sans text-[0.72rem] font-bold tracking-[0.16em] uppercase text-kollej-red mb-6">O'quvchilar Hayoti</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="font-sans text-[2.2rem] md:text-[3.5rem] font-extrabold leading-[1.1] tracking-[-0.03em] text-sea-dark mb-8">
              Tadbir va ijodga to'la<br />
              <span className="text-kollej-red">faol yoshlik lahzalari</span>
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="font-sans text-base md:text-lg font-light leading-[1.8] text-sea-dark/60 max-w-[540px]">
              Shahrixon tumani 1-son texnikumida o'quvchilar hayoti nafaqat auditoriyalardagi qizg'in ta'lim, balki darsdan tashqari tashkil etiladigan madaniy, ijodiy va sport tadbirlari bilan boy.
              <br /><br />
              Ushbu sahifada o'quvchilarimizning o'quvdan tashqari hayoti, ularning turli to'garaklardagi faolligi, respublika bellashuvlaridagi ishtiroki va hamjihat oilamizdagi unutilmas damlari aks etgan.
            </p>
          </Reveal>
        </div>
        <div className="bg-white/40 flex items-center justify-center p-8 md:p-20 border-l border-sea-dark/10">
          <div className="grid grid-cols-1 gap-6 w-full max-w-[580px]">
            <Reveal>
              <div className="relative overflow-hidden group shadow-sm">
                <img src="/Images/image130.webp" alt="Festival ishtirokchilari" className={`${imgCls} aspect-[16/10]`} loading="lazy" />
                <span className="absolute bottom-4 left-4 bg-sea-dark/75 backdrop-blur-md text-white px-3 py-1.5 text-[0.72rem] font-medium tracking-wide">Tarixiy liboslar festivali</span>
              </div>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="relative overflow-hidden group shadow-sm">
                <img src="/Images/image123.webp" alt="Texnikum o'quvchi qizlari" className={`${imgCls} aspect-[16/10]`} loading="lazy" />
                <span className="absolute bottom-4 left-4 bg-sea-dark/75 backdrop-blur-md text-white px-3 py-1.5 text-[0.72rem] font-medium tracking-wide">Rasmiy formadagi o'quvchilarimiz</span>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {sep}

      {/* ══ 1. TARIXIY SAHNALAR ══ */}
      <section className="py-20 md:py-[140px]">
        <div className="max-w-[1400px] mx-auto px-5 md:px-14">
          <div className="section-label">Tarixiy Sahnalar va Milliy San'at</div>
          <div className="grid grid-cols-1 md:grid-cols-[1.2fr_0.8fr] gap-8 md:gap-14 items-start">
            <Reveal>
              <div className="overflow-hidden group shadow-sm"><img src="/Images/image129.webp" className={`${imgCls} aspect-[16/9]`} loading="lazy" /></div>
              <p className="font-sans text-[0.72rem] tracking-[0.08em] text-sea-dark/40 mt-3 uppercase">Boburiylar davri intellektual bellashuvi</p>
            </Reveal>
            <div className="flex flex-col gap-8 md:pt-20">
              <Reveal delay={0.15}>
                <h2 className="font-serif text-[2rem] md:text-[3rem] font-bold leading-[1.15] text-sea-dark mb-4">Tarixiy merosga sadoqat va sahna mahorati</h2>
                <p className="font-sans text-base font-light leading-[1.8] text-sea-dark/60">
                  Texnikumimizda ma'naviy-ma'rifiy ishlar doirasida o'quvchilar buyuk ajdodlarimiz siymolarini, xususan "Boburiylar" hayotini sahnalashtirishadi. Milliy liboslar va chuqur tarixiy chiqishlar yoshlarimizda vatanga muhabbat hissini uyg'otadi.
                </p>
              </Reveal>
              <Reveal delay={0.25}>
                <div className="overflow-hidden group shadow-sm"><img src="/Images/image132.webp" className={`${imgCls} aspect-square`} loading="lazy" /></div>
                <p className="font-sans text-[0.72rem] tracking-[0.08em] text-sea-dark/40 mt-3 uppercase">Milliy libosdagi uchrashuvlar</p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {sep}

      {/* ══ 2. CULINARY ══ */}
      <section className="py-20 md:py-[140px] bg-white/40">
        <div className="max-w-[1400px] mx-auto px-5 md:px-14">
          <div className="section-label">Pazandachilik Bellashuvlari</div>
          <Reveal><h2 className="font-serif text-[2rem] md:text-[3.5rem] font-bold text-sea-dark mb-12">Milliy taomlar festivali va pazandalik mahorati</h2></Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {[['image75','Qozonda milliy palov tayyorlash'],['image76','Tajribali ustozlar nazorati'],['image77','Tayyorlanish va xizmat madaniyati']].map(([img, cap], i) => (
              <Reveal key={img} delay={i * 0.15}>
                <div className="overflow-hidden group shadow-sm"><img src={`/Images/${img}.webp`} className={`${imgCls} aspect-[3/4]`} loading="lazy" /></div>
                <p className="font-sans text-[0.72rem] tracking-[0.08em] text-sea-dark/40 mt-3 uppercase">{cap}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {sep}

      {/* ══ 3. XAMIR TAOMLARI ══ */}
      <section className="py-20 md:py-[140px]">
        <div className="max-w-[1400px] mx-auto px-5 md:px-14">
          <div className="section-label">Lazzat Sirlari: Xamir Taomlari</div>
          <div className="grid grid-cols-1 md:grid-cols-[0.8fr_1.2fr] gap-8 md:gap-14 items-start">
            <div className="flex flex-col gap-8 md:pt-20">
              <Reveal>
                <h2 className="font-serif text-[2rem] md:text-[3rem] font-bold text-sea-dark mb-4">An'anaviy xamir taomlar mahorat darslari</h2>
                <p className="font-sans text-base font-light leading-[1.8] text-sea-dark/60">
                  O'quvchi qizlarimiz milliy atlas liboslar va fartuklarda barak hamda chuchvara kabi murakkab va nozik milliy taomlarni tugish bo'yicha mahorat darslarida ishtirok etadilar. Bu to'garaklar ularni kelajak oilaviy hayotga va umumiy ovqatlanish korxonalari boshqaruviga tayyorlaydi.
                </p>
              </Reveal>
              <Reveal delay={0.2}>
                <div className="overflow-hidden group shadow-sm"><img src="/Images/image79.webp" className={`${imgCls} aspect-square`} loading="lazy" /></div>
                <p className="font-sans text-[0.72rem] tracking-[0.08em] text-sea-dark/40 mt-3 uppercase">Taom bezash sirlari</p>
              </Reveal>
            </div>
            <Reveal delay={0.1}>
              <div className="overflow-hidden group shadow-sm"><img src="/Images/image78.webp" className={`${imgCls} aspect-[3/4]`} loading="lazy" /></div>
              <p className="font-sans text-[0.72rem] tracking-[0.08em] text-sea-dark/40 mt-3 uppercase">Do'stona ijodiy muhit</p>
            </Reveal>
          </div>
        </div>
      </section>

      {sep}

      {/* ══ 4. EXHIBITIONS ══ */}
      <section className="py-20 md:py-[140px] bg-white/40">
        <div className="max-w-[1400px] mx-auto px-5 md:px-14">
          <div className="section-label">Ko'rgazmalar va Targ'ibot</div>
          <Reveal><h2 className="font-serif text-[2rem] md:text-[3.5rem] font-bold text-sea-dark mb-12">Texnikum brendini ommalashtirish va ijod ko'rgazmalari</h2></Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 gap-5 md:gap-7">
            {[
              { img:'image80', cap:"Targ'ibot stendi va buketlar", span:'md:col-span-3', ratio:'aspect-[16/9]' },
              { img:'image81', cap:"E'lonlar va qabul jarayoni", span:'md:col-span-3', ratio:'aspect-[16/9]' },
              { img:'image82', cap:'Ijod namunalari', span:'md:col-span-2', ratio:'aspect-square' },
              { img:'image83', cap:'Amaliy ishlanmalar', span:'md:col-span-2', ratio:'aspect-square' },
              { img:'image84', cap:'Madaniy festivallar', span:'md:col-span-2', ratio:'aspect-square' },
            ].map(({ img, cap, span, ratio }, i) => (
              <Reveal key={img} delay={i * 0.1} className={span}>
                <div className="overflow-hidden group shadow-sm"><img src={`/Images/${img}.webp`} className={`${imgCls} ${ratio}`} loading="lazy" /></div>
                <p className="font-sans text-[0.72rem] tracking-[0.08em] text-sea-dark/40 mt-3 uppercase">{cap}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {sep}

      {/* ══ 5. TIKUVCHILIK ══ */}
      <section className="py-20 md:py-[140px]">
        <div className="max-w-[1400px] mx-auto px-5 md:px-14">
          <div className="section-label">Tikuvchilik va Amaliy Ishlab Chiqarish</div>
          <div className="grid grid-cols-1 md:grid-cols-[1.2fr_0.8fr] gap-8 md:gap-14 items-start">
            <Reveal>
              <div className="overflow-hidden group shadow-sm"><img src="/Images/image97.webp" className={`${imgCls} aspect-[16/9]`} loading="lazy" /></div>
              <p className="font-sans text-[0.72rem] tracking-[0.08em] text-sea-dark/40 mt-3 uppercase">Zamonaviy tikuv laboratoriyasi va o'quvchi qizlar</p>
            </Reveal>
            <div className="flex flex-col gap-8 md:pt-20">
              <Reveal delay={0.1}>
                <h2 className="font-serif text-[2rem] md:text-[3rem] font-bold text-sea-dark mb-4">Kompyuterlashtirilgan tikuv uskunalari amaliyoti</h2>
                <p className="font-sans text-base font-light leading-[1.8] text-sea-dark/60">
                  Tikuvchilik yo'nalishi o'quvchilari darsdan tashqari to'garaklarda maxsus zamonaviy seximizda to'liq amaliyot o'tashadi. Tikilgan eksklyuziv modellar tashqi ko'rgazmalarga taqdim etiladi.
                </p>
              </Reveal>
              <Reveal delay={0.2}>
                <div className="overflow-hidden group shadow-sm"><img src="/Images/image120.webp" className={`${imgCls} aspect-square`} loading="lazy" /></div>
                <p className="font-sans text-[0.72rem] tracking-[0.08em] text-sea-dark/40 mt-3 uppercase">O'quvchilar qo'l mehnati ko'rgazmasi</p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ══ 6. PATRIOTISM — Dark section ══ */}
      <section className="relative bg-sea-dark py-20 md:py-[160px] overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
          <span className="font-serif font-black text-white/[0.025]" style={{ fontSize: 'clamp(6rem,18vw,18rem)', whiteSpace:'nowrap' }}>TEXNIKUM</span>
        </div>
        <div className="max-w-[1400px] w-full mx-auto px-5 md:px-14 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <Reveal>
              <div className="overflow-hidden group shadow-lg">
                <img src="/Images/image116.webp" className={`${imgCls} opacity-85 group-hover:opacity-100 aspect-[16/11]`} loading="lazy" />
              </div>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="font-sans text-[0.7rem] font-bold tracking-[0.18em] uppercase text-kollej-red mb-6">Intizom · Shijoat · G'alaba</p>
              <h2 className="font-serif text-[2.5rem] md:text-[4rem] font-bold leading-[1.1] text-white mb-8">
                "Yosh qutqaruvchi" vatanparvarlik musobaqalari g'oliblari
              </h2>
              <p className="font-sans text-base font-light leading-[1.8] text-white/60">
                Shahrixon tumani 1-son texnikumi o'quvchilari viloyat miqyosida Andijon viloyati Favqulodda vaziyatlar boshqarmasi tomonidan tashkil etilgan "Yosh qutqaruvchi" musobaqalarida faxrli o'rinlarni egallab, maxsus diplom va qimmatbaho sovg'alar bilan taqdirlanganlar.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {sep}

      {/* ══ 7. SPORT ══ */}
      <section className="py-20 md:py-[140px]">
        <div className="max-w-[1400px] mx-auto px-5 md:px-14">
          <div className="section-label">Sport va Sog'lom Turmush Tarzi</div>
          <Reveal><h2 className="font-serif text-[2rem] md:text-[3.5rem] font-bold text-sea-dark mb-12">Ichki mini-futbol chempionatlari va qizg'in o'yinlar</h2></Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[['image59','Texnikum yopiq mini-stadioni'],['image61','Guruhlararo do\'stona chempionatlar']].map(([img, cap], i) => (
              <Reveal key={img} delay={i * 0.15}>
                <div className="overflow-hidden group shadow-sm"><img src={`/Images/${img}.webp`} className={`${imgCls} aspect-[16/9]`} loading="lazy" /></div>
                <p className="font-sans text-[0.72rem] tracking-[0.08em] text-sea-dark/40 mt-3 uppercase">{cap}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {sep}

      {/* ══ 8. AHILLIK ══ */}
      <section className="py-20 md:py-[140px] bg-white/40">
        <div className="max-w-[1400px] mx-auto px-5 md:px-14">
          <div className="section-label">Ahillik va Hamjihatlik</div>
          <Reveal><h2 className="font-serif text-[2rem] md:text-[3.5rem] font-bold text-sea-dark mb-12">Ahil oila muhiti: darsdan tashqari samimiy suhbatlar</h2></Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {[['image67','Maysazor ustida mutolaa va suhbat'],['image70','Milliy taomlar va hamjihatlik sayli'],['image71','Ustozlar bilan bir dasturxon atrofida']].map(([img, cap], i) => (
              <Reveal key={img} delay={i * 0.15}>
                <div className="overflow-hidden group shadow-sm"><img src={`/Images/${img}.webp`} className={`${imgCls} aspect-[3/4]`} loading="lazy" /></div>
                <p className="font-sans text-[0.72rem] tracking-[0.08em] text-sea-dark/40 mt-3 uppercase">{cap}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 9. PARADE (Full split) ══ */}
      <section className="grid grid-cols-1 md:grid-cols-[0.85fr_1.15fr] min-h-[520px] md:min-h-[800px]">
        <img src="/Images/image26.webp" alt="Respublika sport paradi" className="w-full h-full object-cover" loading="lazy" />
        <div className="flex flex-col justify-end p-10 md:p-[90px] bg-stucco-light border-l border-sea-dark/10">
          <Reveal>
            <p className="font-sans text-[0.7rem] font-bold tracking-[0.18em] uppercase text-kollej-red mb-6">G'alaba · Respublika Paradi · Chempionlar</p>
            <h2 className="font-serif text-[2rem] md:text-[3.8rem] font-bold leading-[1.1] text-sea-dark mb-7 tracking-[-0.02em]">
              Respublika miqyosidagi yutuqlar va bayroq ostida marsh
            </h2>
            <p className="font-sans text-base font-light leading-[1.8] text-sea-dark/60 max-w-[520px] mb-8">
              O'quvchilarimiz nafaqat hududiy, balki respublika darajasidagi yirik sport va yoshlar tadbirlarida texnikumimiz hamda tumanimiz sharafini munosib himoya qiladilar.
            </p>
            <div className="overflow-hidden group shadow-sm w-full aspect-[16/7]">
              <img src="/Images/image27.webp" className={`${imgCls}`} loading="lazy" />
            </div>
          </Reveal>
        </div>
      </section>

    </div>
  );
}

export default Life;
