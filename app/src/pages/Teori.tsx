import { useState } from 'react';
import { BookOpen, ChevronRight } from 'lucide-react';
import TheoryRecommender from '@/components/TheoryRecommender';
import { theories } from '@/data/sociologyData';

export default function Teori() {
  const [selectedTheory, setSelectedTheory] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-navy relative overflow-hidden py-24">
      {/* Efek Latar Belakang */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-white/5 rounded-full blur-[130px] -z-0" />
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-amber/10 rounded-full blur-[100px] -z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Halaman */}
        <div className="text-center mb-16 animate-fadeIn">
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

        {/* Theory Recommender Engine */}
        <div className="mb-20 bg-white/5 backdrop-blur-xl rounded-[32px] p-1 border border-white/10 shadow-2xl">
          <div className="p-4 md:p-8">
             <TheoryRecommender />
          </div>
        </div>

        {/* Theory List - Kartu Glassmorphism */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {theories.map((theory, index) => {
            const isActive = selectedTheory === theory.id;
            return (
              <div
                key={theory.id}
                className={`group p-6 rounded-[32px] border transition-all duration-500 cursor-pointer backdrop-blur-md animate-fadeIn bg-white/5 ${
                  isActive
                    ? 'border-amber shadow-[0_0_25px_rgba(232,167,53,0.2)] ring-2 ring-amber/20'
                    : 'border-white/10 hover:border-amber/50 hover:bg-white/10'
                }`}
                style={{ animationDelay: `${index * 50}ms` }}
                onClick={() => setSelectedTheory(isActive ? null : theory.id)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex gap-2">
                    <span className={`text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded-md border ${
                      theory.difficulty === 'mudah' ? 'bg-green-500/20 text-green-300 border-green-500/30' :
                      theory.difficulty === 'sedang' ? 'bg-amber-500/20 text-amber-300 border-amber-500/30' : 
                      'bg-red-500/20 text-red-300 border-red-500/30'
                    }`}>
                      {theory.difficulty}
                    </span>
                    <span className="text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded-md bg-white/10 text-slate-300 border border-white/20">
                      {theory.scale}
                    </span>
                  </div>
                  <span className="text-xs text-slate-400 font-mono">{theory.year}</span>
                </div>

                <h3 className="font-poppins font-bold text-xl text-white group-hover:text-amber-light transition-colors mb-1">
                  {theory.name}
                </h3>
                <p className="text-sm text-amber/80 font-medium mb-3">
                  {theory.founder}
                </p>
                
                <p className="text-sm text-slate-300 leading-relaxed line-clamp-3 group-hover:line-clamp-none transition-all">
                  {theory.description}
                </p>

                {/* ANIMASI DETAIL EKSPANSI (Expand/Collapse Smooth) */}
                <div
                  className={`grid transition-all duration-500 ease-in-out ${
                    isActive
                      ? "grid-rows-[1fr] opacity-100 mt-5 pt-5 border-t border-white/10"
                      : "grid-rows-[0fr] opacity-0 mt-0 pt-0 border-t-0 border-transparent"
                  }`}
                >
                  <div className="overflow-hidden space-y-4">
                    <div>
                      <span className="text-[10px] font-bold text-white/50 uppercase tracking-[2px]">Konsep Kunci</span>
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {theory.keyConcepts.map((concept, i) => (
                          <span key={i} className="text-xs px-2 py-1 bg-amber/10 text-amber-light rounded-md border border-amber/20">
                            {concept}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="bg-navy-dark/60 p-4 rounded-2xl border border-white/5 shadow-inner">
                      <span className="text-[10px] font-bold text-amber-light/60 uppercase tracking-[2px]">Contoh Kasus</span>
                      <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                        {theory.exampleCase.title}
                      </p>
                    </div>
                  </div>
                </div>

                <div className={`mt-5 flex items-center gap-2 text-xs font-bold transition-all ${
                  isActive ? 'text-amber-light' : 'text-slate-400 group-hover:text-amber-light'
                }`}>
                  <span>{isActive ? 'Tutup Detail' : 'Lihat Detail Teori'}</span>
                  <ChevronRight className={`w-4 h-4 transition-transform duration-300 ${isActive ? 'rotate-90' : 'group-hover:translate-x-1'}`} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}