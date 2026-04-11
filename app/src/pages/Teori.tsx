import { useState, useMemo } from 'react';
import { BookOpen, ChevronRight } from 'lucide-react';
import TheoryRecommender from '@/components/TheoryRecommender';
import { theories } from '@/data/sociologyData';

export default function Teori() {
  const [selectedTheory, setSelectedTheory] = useState<string | null>(null);

  // 1. MENGOLAH DATA TAHUN & MENGURUTKAN SECARA KRONOLOGIS
  const theoriesWithYear = useMemo(() => {
    return [...theories]
      .map(t => {
        // Ambil 4 digit angka pertama sebagai tahun mulai (startYear)
        const startYear = parseInt(t.year.match(/\d{4}/)?.[0] || "1900");
        return { ...t, startYear };
      })
      .sort((a, b) => a.startYear - b.startYear); // Urutkan dari terlama ke terbaru
  }, []);

  // 2. MENGHITUNG RENTANG WAKTU UNTUK POSISI PROPORSIONAL
  const minYear = theoriesWithYear[0].startYear;
  const maxYear = theoriesWithYear[theoriesWithYear.length - 1].startYear;
  const yearRange = maxYear - minYear;

  // 3. FUNGSI KLIK & AUTO SCROLL
  const handleNodeClick = (id: string) => {
    setSelectedTheory(id); // Buka kartunya

    // Beri sedikit jeda (150ms) agar React merender ekspansi kartu dulu, baru scroll
    setTimeout(() => {
      const element = document.getElementById(`theory-${id}`);
      if (element) {
        // Scroll dengan offset -100px agar tidak tertutup Header
        const y = element.getBoundingClientRect().top + window.scrollY - 100;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }, 150);
  };

  return (
    <div className="min-h-screen bg-navy relative overflow-hidden py-24">
      {/* Efek Latar Belakang */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-white/5 rounded-full blur-[130px] -z-0" />
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-amber/10 rounded-full blur-[100px] -z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Halaman */}
        <div className="text-center mb-10 animate-fadeIn">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber/20 border border-amber/30 rounded-full text-sm text-amber-light font-medium mb-4">
            <BookOpen className="w-4 h-4" />
            Kumpulan Teori Sosiologi
          </div>
          <h2 className="font-poppins font-bold text-4xl md:text-5xl lg:text-6xl text-white mb-6">
            Teori Sosiologi
          </h2>
          <p className="text-slate-300 max-w-2xl mx-auto text-lg leading-relaxed">
            Pelajari 10 teori sosiologi dari klasik hingga kontemporer, lengkap dengan tokoh, konsep kunci, dan contoh kasus di Indonesia.
          </p>
        </div>

        {/* TIMELINE HORIZONTAL (Desain Ranting Proporsional) */}
        <div className="w-full overflow-x-auto custom-scrollbar mb-20 pb-4">
          <div className="relative min-w-[800px] w-full h-[280px] mx-auto">
            {/* Garis Utama Tengah */}
            <div className="absolute top-1/2 left-[5%] right-[5%] h-0.5 bg-slate-500/40 -translate-y-1/2 z-0" />

            {theoriesWithYear.map((theory, index) => {
              const isActive = selectedTheory === theory.id;
              const isTop = index % 2 === 0; // Selang-seling atas bawah

              // Hitung persentase posisi kiri (Left %) berdasarkan tahun.
              // Diberi margin 5% - 95% agar titik tidak menabrak mentok ujung layar.
              const leftPercent = 5 + ((theory.startYear - minYear) / yearRange) * 90;

              return (
                <div
                  key={theory.id}
                  className="absolute top-1/2 -translate-y-1/2 flex flex-col items-center"
                  style={{ left: `${leftPercent}%` }}
                >
                  {/* Titik kecil pas di tengah garis (Seperti Referensi Gambar 2) */}
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-400 z-10 shadow-sm" />

                  {/* Wrapper Ranting & Node Utama */}
                  <div className={`absolute flex flex-col items-center ${isTop ? 'bottom-1' : 'top-1'}`}>

                    {isTop ? (
                      /* RANTING ATAS */
                      <>
                        <div className="mb-2 flex flex-col items-center cursor-pointer group" onClick={() => handleNodeClick(theory.id)}>
                          <span className="text-amber-light font-bold text-xs mb-1 bg-navy px-2 py-0.5 rounded-md border border-amber/20 shadow-sm">
                            {theory.startYear}
                          </span>
                          <span className="text-[10px] text-slate-300 text-center w-24 leading-snug group-hover:text-white transition-colors">
                            {theory.name}
                          </span>
                        </div>
                        <button
                          onClick={() => handleNodeClick(theory.id)}
                          className={`w-5 h-5 rounded-full border-[3px] transition-all z-20 ${isActive ? 'bg-amber border-white scale-125 shadow-[0_0_15px_rgba(232,167,53,0.6)]' : 'bg-navy border-slate-400 hover:border-amber hover:bg-amber/20'
                            }`}
                          aria-label={theory.name}
                        />
                        <div className="w-0.5 h-10 bg-slate-500/40" />
                      </>
                    ) : (
                      /* RANTING BAWAH */
                      <>
                        <div className="w-0.5 h-10 bg-slate-500/40" />
                        <button
                          onClick={() => handleNodeClick(theory.id)}
                          className={`w-5 h-5 rounded-full border-[3px] transition-all z-20 ${isActive ? 'bg-amber border-white scale-125 shadow-[0_0_15px_rgba(232,167,53,0.6)]' : 'bg-navy border-slate-400 hover:border-amber hover:bg-amber/20'
                            }`}
                          aria-label={theory.name}
                        />
                        <div className="mt-2 flex flex-col items-center cursor-pointer group" onClick={() => handleNodeClick(theory.id)}>
                          <span className="text-[10px] text-slate-300 text-center w-24 leading-snug group-hover:text-white transition-colors mb-1">
                            {theory.name}
                          </span>
                          <span className="text-amber-light font-bold text-xs bg-navy px-2 py-0.5 rounded-md border border-amber/20 shadow-sm">
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

        {/* Theory List - Kartu Grid (Diurutkan sesuai Timeline) */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
          {theoriesWithYear.map((theory, index) => {
            const isActive = selectedTheory === theory.id;

            return (
              <div
                key={theory.id}
                id={`theory-${theory.id}`} // Ditambahkan ID untuk target Scroll
                className={`group p-6 rounded-[24px] border transition-all duration-300 cursor-pointer backdrop-blur-md animate-fadeIn bg-white/5 flex flex-col h-full ${isActive
                    ? 'border-amber shadow-[0_0_25px_rgba(232,167,53,0.2)] ring-2 ring-amber/20'
                    : 'border-white/10 hover:border-amber/50 hover:bg-white/10'
                  }`}
                style={{ animationDelay: `${index * 50}ms` }}
                onClick={() => handleNodeClick(theory.id)} // Ubah onclick pakai handleNodeClick
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex gap-2 text-[10px]">
                    <span className={`uppercase tracking-wider font-bold px-2 py-1 rounded-md border ${theory.difficulty === 'mudah' ? 'bg-green-500/20 text-green-300 border-green-500/30' :
                        theory.difficulty === 'sedang' ? 'bg-amber-500/20 text-amber-300 border-amber-500/30' :
                          'bg-red-500/20 text-red-300 border-red-500/30'
                      }`}>
                      {theory.difficulty}
                    </span>
                    <span className="uppercase tracking-wider font-bold px-2 py-1 rounded-md bg-white/10 text-slate-300 border border-white/20">
                      {theory.scale}
                    </span>
                  </div>
                  <span className="text-xs text-amber-light font-bold bg-navy/50 px-2 py-1 rounded border border-white/5">
                    {theory.startYear}
                  </span>
                </div>

                <h3 className="font-poppins font-bold text-lg text-white group-hover:text-amber-light transition-colors mb-1 leading-tight">
                  {theory.name}
                </h3>
                <p className="text-xs text-amber/80 font-medium mb-3">
                  {theory.founder}
                </p>

                <p className={`text-sm text-slate-300 leading-relaxed transition-all flex-grow ${isActive ? '' : 'line-clamp-4'}`}>
                  {theory.description}
                </p>

                {/* ANIMASI DETAIL EKSPANSI */}
                <div
                  className={`grid transition-all duration-500 ease-in-out ${isActive
                      ? "grid-rows-[1fr] opacity-100 mt-5 pt-5 border-t border-white/10"
                      : "grid-rows-[0fr] opacity-0 mt-0 pt-0 border-t-0 border-transparent"
                    }`}
                >
                  <div className="overflow-hidden space-y-4">
                    <div>
                      <span className="text-[10px] font-bold text-white/50 uppercase tracking-[2px]">Konsep Kunci</span>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {theory.keyConcepts.map((concept, i) => (
                          <span key={i} className="text-[10px] px-2 py-1 bg-amber/10 text-amber-light rounded-md border border-amber/20">
                            {concept}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="bg-navy-dark/60 p-4 rounded-xl border border-white/5 shadow-inner">
                      <span className="text-[10px] font-bold text-amber-light/60 uppercase tracking-[2px]">Contoh Kasus</span>
                      <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                        {theory.exampleCase.title}
                      </p>
                    </div>
                  </div>
                </div>

                <div className={`mt-5 flex items-center gap-2 text-xs font-bold transition-all mt-auto ${isActive ? 'text-amber-light' : 'text-slate-400 group-hover:text-amber-light'
                  }`}>
                  <span>{isActive ? 'Tutup Detail' : 'Lihat Detail Teori'}</span>
                  <ChevronRight className={`w-3 h-3 transition-transform duration-300 ${isActive ? '-rotate-90' : 'group-hover:translate-x-1'}`} />
                </div>
              </div>
            );
          })}
        </div>

        {/* Theory Recommender Engine */}
        <div id="recommender" className="mb-20 bg-white/5 backdrop-blur-xl rounded-[32px] p-1 border border-white/10 shadow-2xl">
          <div className="p-4 md:p-8">
            <TheoryRecommender />
          </div>
        </div>

      </div>
    </div>
  );
}