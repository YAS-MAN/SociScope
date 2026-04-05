import { useState, useRef, useEffect } from "react";
import "./App.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ChatbotTeo from "@/components/ChatbotTeo";
import TheoryRecommender from "@/components/TheoryRecommender";
import CareerMap from "@/components/CareerMap";
import InteractiveCase from "@/components/InteractiveCase";
import { theories, concepts, careers } from "@/data/sociologyData";
import {
  Glasses,
  BookOpen,
  Briefcase,
  ChevronRight,
  ArrowDown,
  Lightbulb,
  Users,
  Target,
  Eye,
  Microscope,
  Landmark,
  RefreshCw,
  Megaphone,
  Smartphone,
  BarChart3,
  MessageCircle,
  CheckCircle,
} from "lucide-react";

function App() {
  const [activeSection, setActiveSection] = useState("home");
  const [selectedTheory, setSelectedTheory] = useState<string | null>(null);
  const [selectedConcept, setSelectedConcept] = useState<string | null>(null);
  const [selectedCareer, setSelectedCareer] = useState<string | null>(null);

  const homeRef = useRef<HTMLDivElement>(null);
  const kacamataRef = useRef<HTMLDivElement>(null);
  const teoriRef = useRef<HTMLDivElement>(null);
  const karirRef = useRef<HTMLDivElement>(null);

  const sectionRefs: Record<string, React.RefObject<HTMLDivElement | null>> = {
    home: homeRef,
    kacamata: kacamataRef,
    teori: teoriRef,
    karir: karirRef,
  };

  const handleNavigate = (section: string) => {
    setActiveSection(section);
    const ref = sectionRefs[section];
    if (ref?.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Intersection Observer untuk tracking section aktif
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionId = entry.target.getAttribute("data-section");
            if (sectionId) {
              setActiveSection(sectionId);
            }
          }
        });
      },
      { threshold: 0.3 },
    );

    Object.values(sectionRefs).forEach((ref) => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    return () => observer.disconnect();
  }, []);

  // Scroll to section on load if hash exists
  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (hash && sectionRefs[hash]) {
      setTimeout(() => handleNavigate(hash), 100);
    }
  }, []);

  return (
    <div className="min-h-screen bg-slate-50">
      <Header activeSection={activeSection} onNavigate={handleNavigate} />

      {/* Chatbot Teo */}
      <ChatbotTeo />

      {/* HOME SECTION */}
      <section
        ref={homeRef}
        data-section="home"
        className="min-h-screen bg-gradient-to-br from-navy via-navy-light to-navy-dark relative overflow-hidden"
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-sage rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-amber rounded-full blur-3xl" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20 min-h-screen flex items-center">
          <div className="grid lg:grid-cols-2 gap-12 items-center w-full">
            <div className="text-white">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm mb-6">
                <span className="w-2 h-2 bg-amber rounded-full animate-pulse" />
                Platform Edukasi Sosiologi Indonesia
              </div>
              <h1 className="font-poppins font-bold text-4xl md:text-5xl lg:text-6xl leading-tight mb-6">
                Lihat Dunia dengan{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber to-amber-light">
                  Lensa Sosiologi
                </span>
              </h1>
              <p className="text-lg md:text-xl text-white/80 mb-8 max-w-lg">
                Pelajari cara memahami masyarakat, menganalisis fenomena sosial,
                dan membuka peluang karir dengan perspektif sosiologi.
              </p>
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => handleNavigate("kacamata")}
                  className="px-6 py-3 bg-amber hover:bg-amber-light text-navy font-semibold rounded-xl transition-all hover:shadow-lg flex items-center gap-2"
                >
                  Mulai Belajar
                  <ChevronRight className="w-5 h-5" />
                </button>
                <button
                  onClick={() => handleNavigate("teori")}
                  className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl transition-all backdrop-blur-sm flex items-center gap-2"
                >
                  <BookOpen className="w-5 h-5" />
                  Jelajahi Teori
                </button>
              </div>

              {/* Stats */}
              <div className="mt-12 grid grid-cols-3 gap-6">
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
                  <div className="text-sm text-white/60">
                    Kacamata Sosiologi
                  </div>
                </div>
              </div>
            </div>

            {/* Hero Illustration */}
            <div className="hidden lg:flex justify-center">
              <div className="relative">
                <div className="w-80 h-80 bg-gradient-to-br from-sage/30 to-amber/30 rounded-full flex items-center justify-center">
                  <div className="w-64 h-64 bg-gradient-to-br from-sage/50 to-amber/50 rounded-full flex items-center justify-center">
                    <div className="w-48 h-48 bg-gradient-to-br from-sage to-amber rounded-full flex items-center justify-center">
                      <Glasses className="w-24 h-24 text-white" />
                    </div>
                  </div>
                </div>
                {/* Floating Elements */}
                <div className="absolute -top-4 -left-4 w-16 h-16 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center animate-float">
                  <BookOpen className="w-8 h-8 text-amber" />
                </div>
                <div
                  className="absolute -bottom-4 -right-4 w-16 h-16 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center animate-float"
                  style={{ animationDelay: "1s" }}
                >
                  <Users className="w-8 h-8 text-sage" />
                </div>
                <div
                  className="absolute top-1/2 -right-8 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center animate-float"
                  style={{ animationDelay: "0.5s" }}
                >
                  <Target className="w-6 h-6 text-amber" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/60 animate-bounce">
          <ArrowDown className="w-6 h-6" />
        </div>
      </section>

      {/* 3 Pillars Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-poppins font-bold text-3xl md:text-4xl text-navy mb-4">
              Tiga Pilar SociScope
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Bangun pemahaman sosiologi yang komprehensif melalui tiga pilar
              utama yang saling terhubung.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Pilar 1: Kacamata Sosiologi */}
            <div className="group p-8 rounded-2xl bg-gradient-to-br from-slate-50 to-white border border-slate-100 hover:border-sage/30 hover:shadow-xl transition-all card-hover">
              <div className="w-16 h-16 bg-gradient-to-br from-sage to-sage-light rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Eye className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-poppins font-bold text-xl text-navy mb-3">
                Kacamata Sosiologi
              </h3>
              <p className="text-slate-600 mb-6">
                Pelajari cara berpikir sosiologis: imajinasi sosiologis,
                struktur vs agen, interseksionalitas, dan konstruksi sosial.
              </p>
              <button
                onClick={() => handleNavigate("kacamata")}
                className="text-sage font-medium flex items-center gap-2 group-hover:gap-3 transition-all"
              >
                Pelajari
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Pilar 2: Teori Sosiologi */}
            <div className="group p-8 rounded-2xl bg-gradient-to-br from-slate-50 to-white border border-slate-100 hover:border-amber/30 hover:shadow-xl transition-all card-hover">
              <div className="w-16 h-16 bg-gradient-to-br from-amber to-amber-light rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-poppins font-bold text-xl text-navy mb-3">
                Teori Sosiologi
              </h3>
              <p className="text-slate-600 mb-6">
                Kuasai 10 teori klasik dan kontemporer dari Durkheim, Marx,
                Weber, hingga Wallerstein dengan contoh kasus Indonesia.
              </p>
              <button
                onClick={() => handleNavigate("teori")}
                className="text-amber font-medium flex items-center gap-2 group-hover:gap-3 transition-all"
              >
                Jelajahi Teori
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Pilar 3: Karir */}
            <div className="group p-8 rounded-2xl bg-gradient-to-br from-slate-50 to-white border border-slate-100 hover:border-navy/30 hover:shadow-xl transition-all card-hover">
              <div className="w-16 h-16 bg-gradient-to-br from-navy to-navy-light rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Briefcase className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-poppins font-bold text-xl text-navy mb-3">
                Karir Lulusan
              </h3>
              <p className="text-slate-600 mb-6">
                Temukan 8 profesi menarik untuk lulusan sosiologi: dari
                peneliti, analis kebijakan, hingga UX researcher.
              </p>
              <button
                onClick={() => handleNavigate("karir")}
                className="text-navy font-medium flex items-center gap-2 group-hover:gap-3 transition-all"
              >
                Lihat Karir
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* KACAMATA SOSIOLOGI SECTION */}
      <section
        ref={kacamataRef}
        data-section="kacamata"
        className="py-20 bg-slate-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-sage/10 rounded-full text-sm text-sage mb-4">
              <Eye className="w-4 h-4" />
              Cara Berpikir Sosiologis
            </div>
            <h2 className="font-poppins font-bold text-3xl md:text-4xl text-navy mb-4">
              Kacamata Sosiologi
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Empat konsep fundamental yang membentuk cara sosiolog memandang
              dan menganalisis dunia sosial.
            </p>
          </div>

          {/* Concepts Grid */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {concepts.map((concept) => (
              <div
                key={concept.id}
                className={`p-6 rounded-2xl border-2 cursor-pointer transition-all ${
                  selectedConcept === concept.id
                    ? "border-sage bg-sage/5"
                    : "border-slate-200 bg-white hover:border-sage/50"
                }`}
                onClick={() =>
                  setSelectedConcept(
                    selectedConcept === concept.id ? null : concept.id,
                  )
                }
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-poppins font-bold text-xl text-navy mb-1">
                      {concept.name}
                    </h3>
                    <p className="text-sm text-sage">{concept.subtitle}</p>
                  </div>
                  <div className="w-10 h-10 bg-sage/10 rounded-lg flex items-center justify-center">
                    <Lightbulb className="w-5 h-5 text-sage" />
                  </div>
                </div>

                <p className="text-slate-600 mb-4">{concept.description}</p>

                {/* Key Points */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {concept.keyPoints.map((point, i) => (
                    <span
                      key={i}
                      className="text-xs px-3 py-1 bg-slate-100 text-slate-600 rounded-full"
                    >
                      {point}
                    </span>
                  ))}
                </div>

                {/* Expanded Content */}
                {selectedConcept === concept.id && (
                  <div className="mt-4 pt-4 border-t border-slate-200 animate-fadeIn">
                    <div className="bg-slate-50 p-4 rounded-xl">
                      <h4 className="font-semibold text-navy mb-2 flex items-center gap-2">
                        <span className="w-2 h-2 bg-amber rounded-full" />
                        Kasus Indonesia: {concept.indonesiaCase.title}
                      </h4>
                      <p className="text-sm text-slate-600 mb-3">
                        <span className="font-medium">Skenario:</span>{" "}
                        {concept.indonesiaCase.scenario}
                      </p>
                      <p className="text-sm text-sage">
                        <span className="font-medium">Analisis:</span>{" "}
                        {concept.indonesiaCase.analysis}
                      </p>
                    </div>
                  </div>
                )}

                <div className="mt-4 text-sm text-sage font-medium flex items-center gap-2">
                  {selectedConcept === concept.id
                    ? "Tutup detail"
                    : "Lihat kasus Indonesia"}
                  <ChevronRight
                    className={`w-4 h-4 transition-transform ${selectedConcept === concept.id ? "rotate-90" : ""}`}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Interactive Case */}
          <div className="mb-8">
            <h3 className="font-poppins font-bold text-2xl text-navy mb-6 text-center">
              Coba Pakai Kacamata Sosiologi
            </h3>
            <InteractiveCase />
          </div>
        </div>
      </section>

      {/* TEORI SOSIOLOGI SECTION */}
      <section ref={teoriRef} data-section="teori" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber/10 rounded-full text-sm text-amber mb-4">
              <BookOpen className="w-4 h-4" />
              Kumpulan Teori
            </div>
            <h2 className="font-poppins font-bold text-3xl md:text-4xl text-navy mb-4">
              Teori Sosiologi
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Pelajari 10 teori sosiologi dari klasik hingga kontemporer,
              lengkap dengan tokoh, konsep kunci, dan contoh kasus Indonesia.
            </p>
          </div>

          {/* Theory Recommender */}
          <div className="mb-12">
            <TheoryRecommender />
          </div>

          {/* Theory List */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {theories.map((theory) => (
              <div
                key={theory.id}
                className={`p-5 rounded-xl border-2 cursor-pointer transition-all ${
                  selectedTheory === theory.id
                    ? "border-amber bg-amber/5"
                    : "border-slate-200 hover:border-amber/50"
                }`}
                onClick={() =>
                  setSelectedTheory(
                    selectedTheory === theory.id ? null : theory.id,
                  )
                }
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        theory.difficulty === "mudah"
                          ? "bg-green-100 text-green-700"
                          : theory.difficulty === "sedang"
                            ? "bg-amber-100 text-amber-700"
                            : "bg-red-100 text-red-700"
                      }`}
                    >
                      {theory.difficulty}
                    </span>
                    <span className="text-xs px-2 py-1 rounded-full bg-slate-100 text-slate-600 ml-2">
                      {theory.scale}
                    </span>
                  </div>
                  <span className="text-xs text-slate-400">{theory.year}</span>
                </div>

                <h3 className="font-poppins font-bold text-navy mb-1">
                  {theory.name}
                </h3>
                <p className="text-sm text-slate-500 mb-3">{theory.founder}</p>

                <p className="text-sm text-slate-600 line-clamp-2">
                  {theory.description}
                </p>

                {selectedTheory === theory.id && (
                  <div className="mt-4 pt-4 border-t border-slate-200 animate-fadeIn">
                    <div className="mb-3">
                      <span className="text-xs font-medium text-navy">
                        Konsep Kunci:
                      </span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {theory.keyConcepts.map((concept, i) => (
                          <span
                            key={i}
                            className="text-xs px-2 py-1 bg-navy/10 text-navy rounded"
                          >
                            {concept}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="bg-slate-50 p-3 rounded-lg">
                      <span className="text-xs font-medium text-navy">
                        Contoh Kasus:
                      </span>
                      <p className="text-xs text-slate-600 mt-1">
                        {theory.exampleCase.title}
                      </p>
                    </div>
                  </div>
                )}

                <div className="mt-3 text-sm text-amber font-medium flex items-center gap-1">
                  {selectedTheory === theory.id ? "Tutup" : "Lihat detail"}
                  <ChevronRight
                    className={`w-4 h-4 transition-transform ${selectedTheory === theory.id ? "rotate-90" : ""}`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* KARIR SECTION */}
      <section
        ref={karirRef}
        data-section="karir"
        className="py-20 bg-slate-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-navy/10 rounded-full text-sm text-navy mb-4">
              <Briefcase className="w-4 h-4" />
              Prospek Karir
            </div>
            <h2 className="font-poppins font-bold text-3xl md:text-4xl text-navy mb-4">
              Karir Lulusan Sosiologi
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Sosiologi membuka berbagai peluang karir yang menarik dan
              berdampak. Temukan profesi yang sesuai dengan passion dan
              skill-mu.
            </p>
          </div>

          {/* Career Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {careers.map((career) => {
              const IconComponent =
                {
                  Microscope,
                  Landmark,
                  Users,
                  RefreshCw,
                  Megaphone,
                  Smartphone,
                  BarChart3,
                  MessageCircle,
                }[career.icon] || Briefcase;

              return (
                <div
                  key={career.id}
                  className={`p-5 rounded-xl border-2 bg-white cursor-pointer transition-all ${
                    selectedCareer === career.id
                      ? "border-navy shadow-lg"
                      : "border-slate-200 hover:border-navy/50 hover:shadow-md"
                  }`}
                  onClick={() =>
                    setSelectedCareer(
                      selectedCareer === career.id ? null : career.id,
                    )
                  }
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-navy to-navy-light rounded-xl flex items-center justify-center mb-4">
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-poppins font-bold text-navy mb-2">
                    {career.title}
                  </h3>
                  <p className="text-sm text-slate-500 mb-3">
                    {career.salaryRange}
                  </p>
                  <p className="text-sm text-slate-600 line-clamp-2">
                    {career.description}
                  </p>

                  {selectedCareer === career.id && (
                    <div className="mt-4 pt-4 border-t border-slate-200 animate-fadeIn">
                      <div className="mb-3">
                        <span className="text-xs font-medium text-navy">
                          Skill yang Dibutuhkan:
                        </span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {career.skills.map((skill, i) => (
                            <span
                              key={i}
                              className="text-xs px-2 py-1 bg-sage/10 text-sage rounded"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <span className="text-xs font-medium text-navy">
                          Persyaratan:
                        </span>
                        <ul className="mt-1 space-y-1">
                          {career.requirements.map((req, i) => (
                            <li
                              key={i}
                              className="text-xs text-slate-600 flex items-center gap-1"
                            >
                              <CheckCircle className="w-3 h-3 text-sage" />
                              {req}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Career Map */}
          <CareerMap />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-navy to-navy-light">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-poppins font-bold text-3xl md:text-4xl text-white mb-6">
            Siap Melihat Dunia dengan Lensa Sosiologi?
          </h2>
          <p className="text-lg text-white/80 mb-8">
            Mulai perjalananmu memahami masyarakat, menganalisis fenomena
            sosial, dan membangun karir yang berdampak.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => handleNavigate("kacamata")}
              className="px-8 py-4 bg-amber hover:bg-amber-light text-navy font-semibold rounded-xl transition-all hover:shadow-lg"
            >
              Mulai Belajar Sekarang
            </button>
            <button
              onClick={() => handleNavigate("karir")}
              className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl transition-all backdrop-blur-sm"
            >
              Eksplorasi Karir
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default App;
