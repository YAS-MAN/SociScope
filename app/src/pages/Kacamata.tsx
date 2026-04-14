import { useState } from "react";
import { Eye, Lightbulb, ChevronRight, Info } from "lucide-react";
import InteractiveCase from "@/components/InteractiveCase";
import { useAdminStore } from "@/store/useAdminStore";

export default function Kacamata() {
  const concepts = useAdminStore((state) => state.concepts);
  const [selectedConcept, setSelectedConcept] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-white relative overflow-hidden py-24">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Halaman - Teks Gelap (Navy & Slate) */}
        <div className="text-center mb-16 animate-fadeIn">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-sage/10 border border-sage/20 rounded-full text-sm text-sage font-bold mb-4">
            <Eye className="w-4 h-4" />
            Perspektif Sosiologis
          </div>
          <h2 className="font-poppins font-bold text-4xl md:text-5xl lg:text-6xl text-navy mb-6">
            Kacamata Sosiologi
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg leading-relaxed">
            Empat konsep fundamental yang menjadi "lensa" utama bagi sosiolog
            untuk membedah realitas di balik fenomena masyarakat.
          </p>
        </div>

        {/* Grid Kartu Konsep - Light Clean Style */}
        <div className="grid md:grid-cols-2 gap-8 mb-24">
          {concepts.map((concept, index) => {
            const isActive = selectedConcept === concept.id;
            return (
              <div
                key={concept.id}
                className={`group p-8 rounded-[32px] border transition-all duration-500 cursor-pointer animate-fadeIn bg-white ${isActive
                    ? "border-sage shadow-xl ring-4 ring-sage/10"
                    : "border-slate-200 hover:border-sage/50 hover:shadow-lg shadow-sm"
                  }`}
                style={{ animationDelay: `${index * 100}ms` }}
                onClick={() => setSelectedConcept(isActive ? null : concept.id)}
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="space-y-1 pr-4">
                    <h3 className="font-poppins font-bold text-2xl text-navy group-hover:text-sage transition-colors">
                      {concept.name}
                    </h3>
                    <p className="text-sage font-bold tracking-wide text-sm uppercase">
                      {concept.subtitle}
                    </p>
                  </div>
                  <div
                    className={`w-14 h-14 shrink-0 rounded-2xl flex items-center justify-center transition-all duration-500 ${isActive
                        ? "bg-sage text-white rotate-12 scale-110 shadow-lg shadow-sage/30"
                        : "bg-sage/10 text-sage group-hover:scale-110 group-hover:bg-sage/20"
                      }`}
                  >
                    <Lightbulb className="w-7 h-7" />
                  </div>
                </div>

                <p className="text-slate-600 leading-relaxed mb-6 text-lg">
                  {concept.description}
                </p>

                {/* Tag Poin Kunci - Light Mode */}
                <div className="flex flex-wrap gap-2 mb-2">
                  {concept.keyPoints.map((point, i) => (
                    <span
                      key={i}
                      className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors border ${isActive
                          ? "bg-sage/10 text-sage border-sage/20"
                          : "bg-slate-50 text-slate-500 border-slate-100 group-hover:bg-sage/5 group-hover:text-sage"
                        }`}
                    >
                      {point}
                    </span>
                  ))}
                </div>

                {/* ANIMASI DETAIL KASUS (Expand/Collapse Smooth) */}
                <div
                  className={`grid transition-all duration-500 ease-in-out ${isActive
                      ? "grid-rows-[1fr] opacity-100 mt-6 pt-6 border-t border-slate-100"
                      : "grid-rows-[0fr] opacity-0 mt-0 pt-0 border-t-0 border-transparent"
                    }`}
                >
                  <div className="overflow-hidden">
                    <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                      <h4 className="font-poppins font-bold text-navy mb-4 flex items-center gap-2">
                        <Info className="w-5 h-5 text-amber" />
                        Kasus Indonesia: {concept.indonesiaCase.title}
                      </h4>
                      <div className="space-y-4 text-sm leading-relaxed text-slate-600">
                        <p>
                          <strong className="text-navy">Skenario:</strong>{" "}
                          {concept.indonesiaCase.scenario}
                        </p>
                        <p className="p-4 bg-white rounded-xl italic border-l-4 border-sage shadow-sm">
                          <strong className="text-sage font-bold not-italic block mb-1">
                            Analisis Sosiologis:
                          </strong>
                          {concept.indonesiaCase.analysis}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Indikator Klik */}
                <div
                  className={`mt-6 flex items-center gap-2 text-sm font-bold transition-all ${isActive ? "text-sage" : "text-slate-400 group-hover:text-sage"
                    }`}
                >
                  <span>
                    {isActive ? "Tutup Detail Kasus" : "Lihat Analisis Kasus"}
                  </span>
                  <ChevronRight
                    className={`w-4 h-4 transition-transform duration-300 ${isActive ? "rotate-90" : "group-hover:translate-x-1"
                      }`}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Section Kasus Interaktif - Light Mode Clean */}
        <div id="uji-analisis" className="relative mt-32">
          <div className="absolute inset-0 bg-sage/5 rounded-[40px] blur-3xl -z-10" />
          <div className="text-center mb-10">
            <h3 className="font-poppins font-bold text-3xl text-navy mb-3">
              Uji Kemampuan Analisis
            </h3>
            <p className="text-slate-600 text-lg">
              Pilih skenario di bawah ini dan gunakan kacamata sosiologimu!
            </p>
          </div>
          {/* Wrapper interaktif case dengan background putih bersih */}
          <div className="bg-white rounded-[32px] p-2 sm:p-4 border border-slate-200 shadow-xl">
            <InteractiveCase />
          </div>
        </div>
      </div>
    </div>
  );
}