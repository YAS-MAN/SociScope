import { useState, useMemo, useEffect, useCallback } from 'react';
import { BookOpen, ChevronRight, ChevronLeft } from 'lucide-react';
import useEmblaCarousel from "embla-carousel-react";
import TheoryRecommender from '@/components/TheoryRecommender';
import { useAdminStore } from '@/store/useAdminStore';

// ===================== DATA TOKOH SOSIOLOGI =====================
const tokohSosiologi = [
  {
    id: 1,
    name: "Auguste Comte",
    years: "1798 – 1857",
    title: "Bapak Sosiologi",
    quote: "Ketahuilah diri sendiri untuk menjadi lebih baik.",
    contribution: "Menciptakan istilah 'sosiologi' dan hukum tiga tahap perkembangan masyarakat: teologis, metafisik, dan positif.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Auguste_Comte.jpg/330px-Auguste_Comte.jpg",
    color: "from-amber/30 to-amber/10",
    accent: "#e8a735",
  },
  {
    id: 2,
    name: "Émile Durkheim",
    years: "1858 – 1917",
    title: "Pelopor Sosiologi Ilmiah",
    quote: "Masyarakat adalah realitas sui generis — nyata, independen dari individu.",
    contribution: "Mengembangkan konsep fakta sosial, solidaritas organik & mekanik, serta studi ilmiah tentang bunuh diri.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Emile_Durkheim.jpg/330px-Emile_Durkheim.jpg",
    color: "from-sage/30 to-sage/10",
    accent: "#5a8a6e",
  },
  {
    id: 3,
    name: "Max Weber",
    years: "1864 – 1920",
    title: "Ahli Birokrasi & Tindakan Sosial",
    quote: "Sosiologi berusaha memahami makna dari tindakan sosial.",
    contribution: "Teori tindakan sosial, birokrasi ideal, etika Protestan & kapitalisme, serta tiga dimensi stratifikasi sosial.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/Max_Weber_1894.jpg/330px-Max_Weber_1894.jpg",
    color: "from-navy/30 to-navy/10",
    accent: "#1e3a5f",
  },
  {
    id: 4,
    name: "Karl Marx",
    years: "1818 – 1883",
    title: "Teoritisi Konflik Kelas",
    quote: "Sejarah semua masyarakat yang ada sejauh ini adalah sejarah perjuangan kelas.",
    contribution: "Teori konflik kelas, materialisme historis, alienasi, dan kritik kapitalisme yang menjadi landasan teori kritis.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Karl_Marx_001.jpg/330px-Karl_Marx_001.jpg",
    color: "from-red-900/30 to-red-900/10",
    accent: "#7f1d1d",
  },
  {
    id: 5,
    name: "Talcott Parsons",
    years: "1902 – 1979",
    title: "Arsitek Fungsionalisme Struktural",
    quote: "Sistem sosial bergerak menuju ekuilibrium.",
    contribution: "Mengembangkan AGIL (Adaptation, Goal-attainment, Integration, Latency) sebagai kerangka analisis sistem sosial.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Talcott_Parsons.jpg/330px-Talcott_Parsons.jpg",
    color: "from-purple-900/30 to-purple-900/10",
    accent: "#581c87",
  },
];

export default function Teori() {
  const theories = useAdminStore((state) => state.theories);
  const storeSociologists = useAdminStore((state) => state.sociologists);
  // Gunakan data dari store jika sudah ada, jika tidak fallback ke statis untuk migrator.
  const displaySociologists = storeSociologists.length > 0 ? storeSociologists : tokohSosiologi;
  
  const [selectedTheory, setSelectedTheory] = useState<string | null>(null);
  
  // TOKOH CAROUSEL STATE
  const [activeSlide, setActiveSlide] = useState(1); 
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // THEORY CAROUSEL STATE
  const [activeTheorySlide, setActiveTheorySlide] = useState(0);
  const [isAutoPlayingTheory, setIsAutoPlayingTheory] = useState(true);

  // ==================== TOKOH CAROUSEL LOGIC ====================
  const goNext = useCallback(() => {
    setActiveSlide(prev => (prev + 1) % displaySociologists.length);
  }, [displaySociologists.length]);

  const goPrev = useCallback(() => {
    setActiveSlide(prev => (prev - 1 + displaySociologists.length) % displaySociologists.length);
  }, [displaySociologists.length]);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(goNext, 3500);
    return () => clearInterval(timer);
  }, [isAutoPlaying, goNext]);

  const getCardIndex = (offset: number) => {
    return (activeSlide + offset + displaySociologists.length) % displaySociologists.length;
  };

  // ==================== TIMELINE LOGIC ====================
  const theoriesWithYear = useMemo(() => {
    return [...theories]
      .map(t => {
        const startYear = parseInt(t.year.match(/\d{4}/)?.[0] || "1900");
        return { ...t, startYear };
      })
      .sort((a, b) => a.startYear - b.startYear);
  }, [theories]);
  
  // THEORY CAROUSEL LOGIC
  
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'start', skipSnaps: false });

  // THEORY CAROUSEL LOGIC
  const goNextTheory = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const goPrevTheory = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    
    const onSelect = () => {
      setActiveTheorySlide(emblaApi.selectedScrollSnap());
    };
    
    emblaApi.on('select', onSelect);
    onSelect();
    
    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi]);

  useEffect(() => {
    if (!isAutoPlayingTheory) return;
    const timer = setInterval(goNextTheory, 6000); // 6 detik per slide
    return () => clearInterval(timer);
  }, [isAutoPlayingTheory, goNextTheory]);

  const minYear = theoriesWithYear[0]?.startYear ?? 1848;
  const maxYear = theoriesWithYear[theoriesWithYear.length - 1]?.startYear ?? 1974;
  const yearRange = maxYear - minYear || 1;

  const handleNodeClick = (id: string) => {
    const isClosing = selectedTheory === id;
    setSelectedTheory(isClosing ? null : id);
    
    if (!isClosing) {
      // Sinkronasikan Carousel ke teori yang diklik jika sedang membuka
      const theoryIndex = theoriesWithYear.findIndex(t => t.id === id);
      if (theoryIndex !== -1 && emblaApi) {
        emblaApi.scrollTo(theoryIndex);
        setIsAutoPlayingTheory(false);
      }
      
      setTimeout(() => {
        const element = document.getElementById(`theory-${id}`);
        if (element) {
          const y = element.getBoundingClientRect().top + window.scrollY - 100;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      }, 150);
    }
  };

  return (
    <div className="min-h-screen bg-white relative overflow-hidden py-24">
      {/* Efek Latar Belakang */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-sage/5 rounded-full blur-[130px] -z-0" />
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-amber/5 rounded-full blur-[100px] -z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Halaman */}
        <div className="text-center mb-14 animate-fadeIn">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber/10 border border-amber/20 rounded-full text-sm text-amber-dark font-bold mb-4">
            <BookOpen className="w-4 h-4" />
            Kumpulan Teori Sosiologi
          </div>
          <h2 className="font-poppins font-bold text-4xl md:text-5xl lg:text-6xl text-navy mb-6">
            Teori Sosiologi
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg leading-relaxed">
            Pelajari 10 teori sosiologi dari klasik hingga kontemporer, lengkap dengan tokoh, konsep kunci, dan contoh kasus di Indonesia.
          </p>
        </div>

        {/* ==================== TOKO CAROUSEL ==================== */}
        <div className="mb-20 relative">
          <h3 className="text-center text-sm font-bold text-slate-500 uppercase tracking-widest mb-8">Tokoh-Tokoh Penting Sosiologi</h3>

          {/* Carousel Container */}
          <div
            className="relative flex items-center justify-center gap-4 h-[380px] select-none"
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
          >
            {/* Ghost cards untuk layout (mendukung smooth dom swap) */}
            {displaySociologists.map((tokoh, i) => {
              const n = displaySociologists.length;
              let offset = (i - activeSlide) % n;
              
              if (offset > Math.floor(n / 2)) offset -= n;
              if (offset < -Math.floor(n / 2)) offset += n;

              const isCenter = offset === 0;
              const isAdjacent = Math.abs(offset) === 1;
              const isOuter = Math.abs(offset) === 2;
              const isVisible = Math.abs(offset) <= 2;

              return (
                <div
                  key={tokoh.id}
                  onClick={() => {
                    if (!isCenter && isVisible) {
                      setActiveSlide(i);
                      setIsAutoPlaying(false);
                    }
                  }}
                  className={`
                    absolute transition-all duration-700 ease-in-out rounded-3xl overflow-hidden cursor-pointer
                    ${isCenter
                      ? 'w-64 h-[360px] z-30 shadow-2xl shadow-black/60 ring-2 ring-white/20 opacity-100'
                      : isAdjacent
                        ? 'w-52 h-[290px] z-20 opacity-70 hover:opacity-90'
                        : isOuter
                           ? 'w-44 h-[240px] z-10 opacity-40 hover:opacity-60'
                           : 'w-44 h-[240px] -z-10 opacity-0 pointer-events-none'
                    }
                  `}
                  style={{
                    transform: `translateX(${offset * (isCenter ? 0 : isAdjacent ? 240 : 430)}px) scale(${isCenter ? 1 : isAdjacent ? 0.88 : 0.76})`,
                    visibility: isVisible ? 'visible' : 'hidden'
                  }}
                >
                  {/* Card Background */}
                  <div className={`absolute inset-0 bg-gradient-to-b ${tokoh.color} backdrop-blur-sm`} />
                  <div className="absolute inset-0 bg-navy-dark/60" />

                  {/* Glow effect for center */}
                  {isCenter && (
                    <div
                      className="absolute inset-0 opacity-20 pointer-events-none"
                      style={{ boxShadow: `inset 0 0 60px ${tokoh.accent}` }}
                    />
                  )}

                  {/* Content */}
                  <div className="relative z-10 h-full flex flex-col p-5">
                    {/* Photo */}
                    <div className={`rounded-2xl overflow-hidden mb-4 bg-slate-700 border-2 transition-all ${isCenter ? 'h-44 border-white/20' : 'h-32 border-white/10'}`}>
                      <img
                        src={tokoh.image}
                        alt={tokoh.name}
                        className="w-full h-full object-cover object-top"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          target.parentElement!.innerHTML = `<div class="w-full h-full flex items-center justify-center bg-white/10"><svg xmlns="http://www.w3.org/2000/svg" class="w-12 h-12 text-white/40" viewBox="0 0 24 24" fill="currentColor"><path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/></svg></div>`;
                        }}
                      />
                    </div>

                    {/* Info */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <p className={`font-bold text-white leading-tight mb-1 ${isCenter ? 'text-xl' : 'text-base'}`}>{tokoh.name}</p>
                        {isCenter && (
                          <>
                            <p className="text-xs text-white/50 font-medium mb-1">{tokoh.years}</p>
                            <p className="text-[11px] font-bold uppercase tracking-wider mb-3" style={{ color: tokoh.accent === '#1e3a5f' ? '#93c5fd' : tokoh.accent }}>{tokoh.title}</p>
                            <p className="text-xs text-white/60 leading-relaxed line-clamp-3 italic">"{tokoh.quote}"</p>
                          </>
                        )}
                        {isAdjacent && (
                          <p className="text-xs text-white/40">{tokoh.years}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Contribution badge (center only) */}
          <div className="text-center mt-6 px-4 max-w-lg mx-auto h-16">
            <p className="text-sm text-slate-600 leading-relaxed transition-all duration-500">
              <span className="font-bold text-navy">Kontribusi: </span>
              {displaySociologists[activeSlide]?.contribution}
            </p>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-center gap-6 mt-6">
            <button
              onClick={() => { goPrev(); setIsAutoPlaying(false); }}
              className="w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-navy transition-all border border-slate-200 hover:border-slate-300"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Dot indicators */}
            <div className="flex gap-2 justify-center flex-wrap max-w-sm">
              {displaySociologists.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setActiveSlide(i); setIsAutoPlaying(false); }}
                  className={`rounded-full transition-all ${i === activeSlide ? 'w-6 h-2 bg-amber' : 'w-2 h-2 bg-slate-300 hover:bg-slate-400'}`}
                />
              ))}
            </div>

            <button
              onClick={() => { goNext(); setIsAutoPlaying(false); }}
              className="w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-navy transition-all border border-slate-200 hover:border-slate-300"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* TIMELINE HORIZONTAL */}
        <div className="w-full overflow-x-auto custom-scrollbar mb-20 pb-4">
          <div className="relative min-w-[800px] w-full h-[280px] mx-auto">
            {/* Garis Utama Tengah */}
            <div className="absolute top-1/2 left-[5%] right-[5%] h-0.5 bg-slate-200 -translate-y-1/2 z-0" />

            {theoriesWithYear.map((theory, index) => {
              const isActive = selectedTheory === theory.id;
              const isTop = index % 2 === 0;
              const leftPercent = 5 + ((theory.startYear - minYear) / yearRange) * 90;

              return (
                <div
                  key={theory.id}
                  className="absolute top-1/2 -translate-y-1/2 flex flex-col items-center"
                  style={{ left: `${leftPercent}%` }}
                >
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-300 z-10 shadow-sm" />

                  <div className={`absolute flex flex-col items-center ${isTop ? 'bottom-1' : 'top-1'}`}>
                    {isTop ? (
                      <>
                        <div className="mb-2 flex flex-col items-center cursor-pointer group" onClick={() => handleNodeClick(theory.id)}>
                          <span className="text-amber-dark font-bold text-xs mb-1 bg-white px-2 py-0.5 rounded-md border border-amber/30 shadow-sm">
                            {theory.startYear}
                          </span>
                          <span className="text-[10px] text-slate-500 text-center w-24 leading-snug group-hover:text-navy transition-colors">
                            {theory.name}
                          </span>
                        </div>
                        <button
                          onClick={() => handleNodeClick(theory.id)}
                          className={`w-5 h-5 rounded-full border-[3px] transition-all z-20 ${isActive ? 'bg-amber border-white scale-125 shadow-md' : 'bg-white border-slate-300 hover:border-amber hover:bg-slate-50'}`}
                          aria-label={theory.name}
                        />
                        <div className="w-0.5 h-10 bg-slate-200" />
                      </>
                    ) : (
                      <>
                        <div className="w-0.5 h-10 bg-slate-200" />
                        <button
                          onClick={() => handleNodeClick(theory.id)}
                          className={`w-5 h-5 rounded-full border-[3px] transition-all z-20 ${isActive ? 'bg-amber border-white scale-125 shadow-md' : 'bg-white border-slate-300 hover:border-amber hover:bg-slate-50'}`}
                          aria-label={theory.name}
                        />
                        <div className="mt-2 flex flex-col items-center cursor-pointer group" onClick={() => handleNodeClick(theory.id)}>
                          <span className="text-[10px] text-slate-500 text-center w-24 leading-snug group-hover:text-navy transition-colors mb-1">
                            {theory.name}
                          </span>
                          <span className="text-amber-dark font-bold text-xs bg-white px-2 py-0.5 rounded-md border border-amber/30 shadow-sm">
                            {theory.startYear}
                          </span>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* THEORY CAROUSEL (EMBLA) */}
        <div 
          className="mb-24 relative"
          onMouseEnter={() => setIsAutoPlayingTheory(false)}
          onMouseLeave={() => setIsAutoPlayingTheory(true)}
        >
          {/* Nav Prev */}
          <button
            onClick={() => { goPrevTheory(); setIsAutoPlayingTheory(false); }}
            className="absolute -left-16 z-20 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full hidden xl:flex bg-white shadow-lg border border-slate-100/50 hover:bg-slate-50 items-center justify-center text-navy transition-all hover:scale-110"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <div className="overflow-hidden relative rounded-3xl" ref={emblaRef}>
            <div className="flex select-none touch-pan-y -ml-6">
              {theoriesWithYear.map((theory, index) => {
                const isActive = selectedTheory === theory.id;

                return (
                  <div
                    key={`${theory.id}-${index}`}
                    id={`theory-${theory.id}`}
                    className="flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_25%] min-w-0 pl-6"
                  >
                    <div
                      className={`group p-6 rounded-[24px] border transition-all duration-700 cursor-pointer backdrop-blur-md bg-white flex flex-col h-full ${isActive
                        ? 'border-amber shadow-lg ring-2 ring-amber/20 scale-[1.02]'
                        : 'border-slate-200 hover:border-amber/50 hover:shadow-xl hover:-translate-y-1'
                        }`}
                      onClick={() => {
                        handleNodeClick(theory.id);
                        setIsAutoPlayingTheory(false);
                      }}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex gap-2 text-[10px]">
                      <span className={`uppercase tracking-wider font-bold px-2 py-1 rounded-md border ${theory.difficulty === 'mudah' ? 'bg-green-100 text-green-700 border-green-200' :
                        theory.difficulty === 'sedang' ? 'bg-amber-100 text-amber-700 border-amber-200' :
                          'bg-red-100 text-red-700 border-red-200'
                        }`}>
                        {theory.difficulty}
                      </span>
                      <span className="uppercase tracking-wider font-bold px-2 py-1 rounded-md bg-slate-100 text-slate-600 border border-slate-200">
                        {theory.scale}
                      </span>
                    </div>
                    <span className="text-xs text-navy font-bold bg-slate-50 px-2 py-1 rounded border border-slate-200">
                      {theory.startYear}
                    </span>
                  </div>

                  <h3 className="font-poppins font-bold text-lg text-navy group-hover:text-amber-dark transition-colors mb-1 leading-tight">
                    {theory.name}
                  </h3>
                  <p className="text-xs text-amber-dark font-medium mb-3">
                    {theory.founder}
                  </p>

                  <p className={`text-sm text-slate-600 leading-relaxed transition-all flex-grow ${isActive ? '' : 'line-clamp-4'}`}>
                    {theory.description}
                  </p>

                  {/* ANIMASI DETAIL EKSPANSI */}
                  <div
                    className={`grid transition-all duration-500 ease-in-out ${isActive
                      ? "grid-rows-[1fr] opacity-100 mt-5 pt-5 border-t border-slate-100"
                      : "grid-rows-[0fr] opacity-0 mt-0 pt-0 border-t-0 border-transparent"
                      }`}
                  >
                    <div className="overflow-hidden space-y-4">
                      <div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[2px]">Konsep Kunci</span>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {theory.keyConcepts.map((concept, i) => (
                            <span key={i} className="text-[10px] px-2 py-1 bg-amber/10 text-amber-dark rounded-md border border-amber/20">
                              {concept}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 shadow-inner">
                        <span className="text-[10px] font-bold text-amber-dark uppercase tracking-[2px]">Contoh Kasus</span>
                        <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                          {theory.exampleCase.title}
                        </p>
                      </div>
                    </div>
                  </div>

                      <div className={`mt-5 flex items-center gap-2 text-xs font-bold transition-all mt-auto ${isActive ? 'text-amber-dark' : 'text-slate-500 group-hover:text-amber-dark'}`}>
                        <span>{isActive ? 'Tutup Detail' : 'Lihat Detail Teori'}</span>
                        <ChevronRight className={`w-3 h-3 transition-transform duration-300 ${isActive ? '-rotate-90' : 'group-hover:translate-x-1'}`} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Nav Next */}
          <button
            onClick={() => { goNextTheory(); setIsAutoPlayingTheory(false); }}
            className="absolute -right-16 z-20 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full hidden xl:flex bg-white shadow-lg border border-slate-100/50 hover:bg-slate-50 items-center justify-center text-navy transition-all hover:scale-110"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
          
          {/* Theory Carousel Dots Indicator */}
          <div className="flex justify-center mt-10 gap-2">
            {theoriesWithYear.map((_, i) => (
              <button
                key={i}
                onClick={() => { 
                  if (emblaApi) emblaApi.scrollTo(i);
                  setIsAutoPlayingTheory(false); 
                }}
                className={`rounded-full transition-all duration-300 ${i === activeTheorySlide ? 'w-8 h-2.5 bg-amber' : 'w-2.5 h-2.5 bg-slate-200 hover:bg-slate-300'}`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
        {/* Theory Recommender Engine */}
        <div id="recommender" className="mb-20 bg-navy rounded-[32px] p-1 border border-navy/20 shadow-2xl overflow-hidden relative">
          {/* Subtle background glow for recommender block */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-sage/20 rounded-full blur-[80px]" />
          <div className="p-4 md:p-8 relative z-10">
            <TheoryRecommender />
          </div>
        </div>

      </div>
    </div>
  );
}