import { useNavigate } from "react-router-dom";
import { Glasses, BookOpen, Briefcase, ChevronRight, Eye, Users, ArrowDown, ExternalLink, Newspaper } from "lucide-react";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      {/* HERO SECTION - Background Biru/Navy */}
      <section className="min-h-[100svh] pt-32 pb-20 bg-gradient-to-br from-navy via-navy-light to-navy-light relative overflow-hidden flex flex-col justify-center h-auto">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-sage rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-amber rounded-full blur-3xl" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center w-full mt-4 lg:mt-0">

            {/* Teks Sebelah Kiri */}
            <div className="text-white">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm mb-6 border border-white/10">
                <span className="w-2 h-2 bg-amber rounded-full animate-pulse" />
                Platform Edukasi Sosiologi Indonesia
              </div>
              <h1 className="font-poppins font-bold text-4xl md:text-5xl lg:text-6xl leading-tight mb-6">
                Lihat Dunia dengan{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber to-amber-light">
                  Lensa Sosiologi
                </span>
              </h1>
              <p className="text-lg md:text-xl text-white/80 mb-8 max-w-lg leading-relaxed">
                Pelajari cara memahami masyarakat, menganalisis fenomena sosial,
                dan membuka peluang karir dengan perspektif sosiologi.
              </p>

              <div className="flex flex-wrap gap-4 mb-12">
                <button
                  onClick={() => navigate("/kacamata")}
                  className="px-6 py-3 bg-amber hover:bg-amber-light text-navy font-bold rounded-xl transition-all hover:shadow-[0_0_20px_rgba(232,167,53,0.4)] flex items-center gap-2"
                >
                  Mulai Belajar
                  <ChevronRight className="w-5 h-5" />
                </button>
                <button
                  onClick={() => navigate("/teori")}
                  className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl transition-all backdrop-blur-sm flex items-center gap-2 border border-white/10"
                >
                  <BookOpen className="w-5 h-5" />
                  Jelajahi Teori
                </button>
              </div>

              {/* CTA Artikel - menggantikan stats lama */}
              <div className="border-t border-white/10 pt-8">
                <p className="text-white/50 text-xs uppercase tracking-widest font-bold mb-4">Ikuti Perkembangan Terbaru</p>
                <a
                  href="/jejaring#artikel"
                  onClick={(e) => { e.preventDefault(); navigate("/jejaring"); setTimeout(() => { document.getElementById("artikel")?.scrollIntoView({ behavior: "smooth" }); }, 150); }}
                  className="inline-flex items-center gap-3 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center group-hover:bg-amber/20 transition-colors border border-white/10">
                    <Newspaper className="w-5 h-5 text-amber" />
                  </div>
                  <div>
                    <div className="text-white font-bold text-sm group-hover:text-amber-light transition-colors flex items-center gap-2">
                      Baca Artikel & Berita Sosiologi
                      <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </div>
                    <div className="text-white/40 text-xs">Live update dari UNESA Sosiologi</div>
                  </div>
                </a>
              </div>
            </div>

            {/* Hero Illustration */}
            <div className="hidden lg:flex justify-center">
              <div className="relative">
                <div className="w-80 h-80 bg-gradient-to-br from-sage/30 to-amber/30 rounded-full flex items-center justify-center">
                  <div className="w-64 h-64 bg-gradient-to-br from-sage/50 to-amber/50 rounded-full flex items-center justify-center">
                    <div className="w-48 h-48 bg-amber-300 rounded-full flex items-center justify-center shadow-2xl animate-float relative z-10 overflow-hidden">
                      <img src="/logo_sociozone_raw.png" alt="SocioZone" className="w-36 h-36 object-contain" />
                    </div>
                  </div>
                </div>

                {/* Floating Elements */}
                <div className="absolute -top-4 -left-4 w-16 h-16 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center animate-float" style={{ animationDelay: "0.5s" }}>
                  <BookOpen className="w-8 h-8 text-amber" />
                </div>
                <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center animate-float" style={{ animationDelay: "1s" }}>
                  <Users className="w-8 h-8 text-sage" />
                </div>
                <div className="absolute top-1/2 -right-8 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center animate-float" style={{ animationDelay: "1.5s" }}>
                  <Briefcase className="w-6 h-6 text-amber" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/60 animate-bounce cursor-pointer" onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}>
          <ArrowDown className="w-6 h-6" />
        </div>
      </section>

      {/* TIGA PILAR SECTION */}
      <section className="py-24 bg-white relative">
        {/* Subtle divider effect */}
        <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-navy-light/5 to-transparent pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber/10 border border-amber/20 rounded-full text-sm text-amber-dark font-medium mb-4">
              <span className="w-2 h-2 bg-amber rounded-full" />
              Fitur Utama
            </div>
            <h2 className="font-poppins font-bold text-3xl md:text-4xl text-navy mb-4">
              Tiga Pilar SocioZone
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-lg">
              Bangun pemahaman sosiologi yang komprehensif melalui tiga pilar utama yang saling terhubung.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Pilar 1: Kacamata */}
            <div className="group p-8 rounded-3xl bg-slate-50 border border-slate-200 hover:border-sage/50 hover:bg-white hover:shadow-xl hover:shadow-sage/10 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-sage to-sage-light rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-md shadow-sage/30">
                <Eye className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-poppins font-bold text-2xl text-navy mb-3 group-hover:text-sage transition-colors">
                Kacamata Sosiologi
              </h3>
              <p className="text-slate-600 mb-8 leading-relaxed">
                Pelajari cara berpikir sosiologis: imajinasi sosiologis, struktur vs agen, interseksionalitas, dan konstruksi sosial.
              </p>
              <button
                onClick={() => navigate("/kacamata")}
                className="text-sage font-bold flex items-center gap-2 group-hover:gap-3 transition-all"
              >
                Pelajari Konsep
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Pilar 2: Teori */}
            <div className="group p-8 rounded-3xl bg-slate-50 border border-slate-200 hover:border-amber/50 hover:bg-white hover:shadow-xl hover:shadow-amber/10 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-amber to-amber-light rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-md shadow-amber/30">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-poppins font-bold text-2xl text-navy mb-3 group-hover:text-amber-dark transition-colors">
                Teori Sosiologi
              </h3>
              <p className="text-slate-600 mb-8 leading-relaxed">
                Kuasai teori klasik dan kontemporer dari Durkheim, Marx, Weber, hingga Wallerstein dengan kasus Indonesia.
              </p>
              <button
                onClick={() => navigate("/teori")}
                className="text-amber-dark font-bold flex items-center gap-2 group-hover:gap-3 transition-all"
              >
                Jelajahi Teori
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Pilar 3: Karir */}
            <div className="group p-8 rounded-3xl bg-slate-50 border border-slate-200 hover:border-slate-400/50 hover:bg-white hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-slate-500 to-slate-400 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-md">
                <Briefcase className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-poppins font-bold text-2xl text-navy mb-3 group-hover:text-slate-600 transition-colors">
                Karir Lulusan
              </h3>
              <p className="text-slate-600 mb-8 leading-relaxed">
                Temukan profesi-profesi menarik untuk lulusan sosiologi: dari peneliti, analis kebijakan, hingga UX researcher.
              </p>
              <button
                onClick={() => navigate("/karir")}
                className="text-slate-500 font-bold flex items-center gap-2 group-hover:gap-3 transition-all group-hover:text-navy"
              >
                Lihat Prospek Karir
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}