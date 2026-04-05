import { useNavigate } from "react-router-dom";
import { Glasses, BookOpen, Briefcase, ChevronRight, Eye, Users, Target, ArrowDown } from "lucide-react";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      {/* HERO SECTION - Background Biru/Navy */}
      <section className="min-h-screen bg-gradient-to-br from-navy via-navy-light to-navy-dark relative overflow-hidden flex flex-col justify-center">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-sage rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-amber rounded-full blur-3xl" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center w-full">
            
            {/* Teks Sebelah Kiri */}
            <div className="text-white mt-20 lg:mt-0">
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
              
              <div className="flex flex-wrap gap-4">
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

              {/* Stats */}
              <div className="mt-12 grid grid-cols-3 gap-6 border-t border-white/10 pt-8">
                <div>
                  <div className="text-3xl font-bold text-amber">10+</div>
                  <div className="text-sm text-white/60">Teori Sosiologi</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-amber">8</div>
                  <div className="text-sm text-white/60">Profesi Karir</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-amber">4</div>
                  <div className="text-sm text-white/60">Kacamata Sosiologi</div>
                </div>
              </div>
            </div>

            {/* Hero Illustration - Animasi Bergerak di Sini */}
            <div className="hidden lg:flex justify-center">
              <div className="relative">
                <div className="w-80 h-80 bg-gradient-to-br from-sage/30 to-amber/30 rounded-full flex items-center justify-center">
                  <div className="w-64 h-64 bg-gradient-to-br from-sage/50 to-amber/50 rounded-full flex items-center justify-center">
                    {/* Lingkaran inti kacamata diberi animasi melayang (animate-float) */}
                    <div className="w-48 h-48 bg-gradient-to-br from-sage to-amber rounded-full flex items-center justify-center shadow-2xl animate-float relative z-10">
                      <Glasses className="w-24 h-24 text-white" />
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
                  <Target className="w-6 h-6 text-amber" />
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

      {/* TIGA PILAR SECTION - Background Putih */}
      <section className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-poppins font-bold text-3xl md:text-4xl text-navy mb-4">
              Tiga Pilar SociScope
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-lg">
              Bangun pemahaman sosiologi yang komprehensif melalui tiga pilar utama yang saling terhubung.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Pilar 1: Kacamata */}
            <div className="group p-8 rounded-3xl bg-gradient-to-br from-slate-50 to-white border border-slate-100 hover:border-sage/50 hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-sage to-sage-light rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-md">
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
            <div className="group p-8 rounded-3xl bg-gradient-to-br from-slate-50 to-white border border-slate-100 hover:border-amber/50 hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-amber to-amber-light rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-md">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-poppins font-bold text-2xl text-navy mb-3 group-hover:text-amber transition-colors">
                Teori Sosiologi
              </h3>
              <p className="text-slate-600 mb-8 leading-relaxed">
                Kuasai 10 teori klasik dan kontemporer dari Durkheim, Marx, Weber, hingga Wallerstein dengan kasus Indonesia.
              </p>
              <button
                onClick={() => navigate("/teori")}
                className="text-amber font-bold flex items-center gap-2 group-hover:gap-3 transition-all"
              >
                Jelajahi Teori
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Pilar 3: Karir */}
            <div className="group p-8 rounded-3xl bg-gradient-to-br from-slate-50 to-white border border-slate-100 hover:border-navy/50 hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-navy to-navy-light rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-md">
                <Briefcase className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-poppins font-bold text-2xl text-navy mb-3 group-hover:text-navy transition-colors">
                Karir Lulusan
              </h3>
              <p className="text-slate-600 mb-8 leading-relaxed">
                Temukan 8 profesi menarik untuk lulusan sosiologi: dari peneliti, analis kebijakan, hingga UX researcher.
              </p>
              <button
                onClick={() => navigate("/karir")}
                className="text-navy font-bold flex items-center gap-2 group-hover:gap-3 transition-all"
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