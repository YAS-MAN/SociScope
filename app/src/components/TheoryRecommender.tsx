import { useState } from 'react';
import { Search, RefreshCw, BookOpen, User, Target, Layers, BarChart3, Lightbulb } from 'lucide-react';
import { theories, type Theory } from '@/data/sociologyData';

interface FormData {
  scale: string;
  focus: string;
  objects: string[];
  difficulty: string;
}

interface Recommendation {
  theory: Theory;
  matchScore: number;
  reasons: string[];
}

export default function TheoryRecommender() {
  const [formData, setFormData] = useState<FormData>({
    scale: '',
    focus: '',
    objects: [],
    difficulty: ''
  });
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [selectedTheory, setSelectedTheory] = useState<Theory | null>(null);

  const objectOptions = [
    { id: 'individu', label: 'Individu', icon: User },
    { id: 'institusi', label: 'Institusi', icon: LandmarkIcon },
    { id: 'negara', label: 'Negara', icon: BuildingIcon },
    { id: 'ekonomi', label: 'Ekonomi', icon: TrendingUpIcon },
    { id: 'teknologi', label: 'Teknologi', icon: CpuIcon },
    { id: 'budaya', label: 'Budaya', icon: PaletteIcon }
  ];

  const handleObjectToggle = (objectId: string) => {
    setFormData(prev => ({
      ...prev,
      objects: prev.objects.includes(objectId)
        ? prev.objects.filter(o => o !== objectId)
        : [...prev.objects, objectId]
    }));
  };

  const calculateRecommendations = () => {
    const scored = theories.map(theory => {
      let score = 0;
      const reasons: string[] = [];

      // Skala match (40 poin)
      if (theory.scale === formData.scale) {
        score += 40;
        reasons.push(`Cocok dengan skala ${formData.scale}`);
      }

      // Fokus match (30 poin)
      if (theory.focus === formData.focus) {
        score += 30;
        const focusLabels: Record<string, string> = {
          konflik: 'konflik & ketidaksetaraan',
          konsensus: 'konsensus & stabilitas',
          makna: 'makna & interpretasi',
          perubahan: 'perubahan sosial'
        };
        reasons.push(`Fokus pada ${focusLabels[formData.focus]}`);
      }

      // Objek match (20 poin)
      const matchingObjects = theory.objects.filter(obj => 
        formData.objects.includes(obj)
      );
      if (matchingObjects.length > 0) {
        score += Math.min(20, matchingObjects.length * 7);
        reasons.push(`Relevan untuk ${matchingObjects.join(', ')}`);
      }

      // Tingkat kesulitan match (10 poin)
      if (theory.difficulty === formData.difficulty) {
        score += 10;
        const diffLabels: Record<string, string> = {
          mudah: 'pemula',
          sedang: 'menengah',
          lanjut: 'lanjutan'
        };
        reasons.push(`Tingkat kesulitan ${diffLabels[formData.difficulty]}`);
      } else if (
        (formData.difficulty === 'mudah' && theory.difficulty === 'sedang') ||
        (formData.difficulty === 'sedang' && theory.difficulty === 'mudah')
      ) {
        score += 5;
        reasons.push('Kesulitan mendekati preferensi');
      }

      return { theory, matchScore: score, reasons };
    });

    // Sort by score descending
    const sorted = scored.sort((a, b) => b.matchScore - a.matchScore);
    setRecommendations(sorted.slice(0, 3));
    setShowResults(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.scale && formData.focus && formData.difficulty) {
      calculateRecommendations();
    }
  };

  const resetForm = () => {
    setFormData({ scale: '', focus: '', objects: [], difficulty: '' });
    setShowResults(false);
    setSelectedTheory(null);
  };

  const isFormValid = formData.scale && formData.focus && formData.difficulty;

  return (
    <div className="w-full text-white">
      {!showResults ? (
        <div className="p-2 sm:p-6">
          <div className="text-center mb-10">
            <div className="w-16 h-16 bg-gradient-to-br from-amber to-amber-light rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-[0_0_20px_rgba(232,167,53,0.3)]">
              <Search className="w-8 h-8 text-navy-dark" />
            </div>
            <h3 className="text-2xl font-poppins font-bold text-white mb-2">
              Teori Recommender Engine
            </h3>
            <p className="text-slate-400">
              Jawab 4 pertanyaan singkat untuk mendapatkan rekomendasi teori sosiologi yang paling cocok untuk kasusmu.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Pertanyaan 1: Skala */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-white/90 mb-3">
                <Layers className="w-4 h-4 text-amber" />
                1. Skala kasus yang akan kamu analisis?
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { id: 'makro', label: 'Makro', desc: 'Negara, global' },
                  { id: 'meso', label: 'Meso', desc: 'Organisasi, komunitas' },
                  { id: 'mikro', label: 'Mikro', desc: 'Individu, interaksi' }
                ].map(option => (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, scale: option.id }))}
                    className={`p-4 rounded-xl border text-left transition-all duration-300 ${
                      formData.scale === option.id
                        ? 'border-amber bg-amber/15 shadow-[0_0_15px_rgba(232,167,53,0.15)]'
                        : 'border-white/10 bg-white/5 hover:bg-white/10 hover:border-amber/50'
                    }`}
                  >
                    <div className={`font-bold ${formData.scale === option.id ? 'text-amber-light' : 'text-white'}`}>{option.label}</div>
                    <div className="text-xs text-slate-400 mt-1">{option.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Pertanyaan 2: Fokus */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-white/90 mb-3">
                <Target className="w-4 h-4 text-amber" />
                2. Fokus analisis yang ingin kamu tekankan?
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { id: 'konflik', label: 'Konflik', desc: 'Ketidaksetaraan, dominasi' },
                  { id: 'konsensus', label: 'Konsensus', desc: 'Stabilitas, fungsi' },
                  { id: 'makna', label: 'Makna', desc: 'Interpretasi, simbol' },
                  { id: 'perubahan', label: 'Perubahan', desc: 'Transformasi sosial' }
                ].map(option => (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, focus: option.id }))}
                    className={`p-4 rounded-xl border text-left transition-all duration-300 ${
                      formData.focus === option.id
                        ? 'border-amber bg-amber/15 shadow-[0_0_15px_rgba(232,167,53,0.15)]'
                        : 'border-white/10 bg-white/5 hover:bg-white/10 hover:border-amber/50'
                    }`}
                  >
                    <div className={`font-bold ${formData.focus === option.id ? 'text-amber-light' : 'text-white'}`}>{option.label}</div>
                    <div className="text-xs text-slate-400 mt-1">{option.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Pertanyaan 3: Objek */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-white/90 mb-3">
                <BookOpen className="w-4 h-4 text-amber" />
                3. Objek apa yang terlibat? (Boleh pilih lebih dari satu)
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {objectOptions.map(option => (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => handleObjectToggle(option.id)}
                    className={`p-3 rounded-xl border text-sm transition-all duration-300 flex items-center justify-center gap-2 ${
                      formData.objects.includes(option.id)
                        ? 'border-amber bg-amber/15 text-amber-light shadow-[0_0_15px_rgba(232,167,53,0.15)] font-bold'
                        : 'border-white/10 bg-white/5 text-slate-300 hover:bg-white/10 hover:border-amber/50'
                    }`}
                  >
                    <option.icon className="w-4 h-4" />
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Pertanyaan 4: Tingkat Kesulitan */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-white/90 mb-3">
                <BarChart3 className="w-4 h-4 text-amber" />
                4. Tingkat kesulitan yang kamu inginkan?
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { id: 'mudah', label: 'Mudah', desc: 'Konsep dasar' },
                  { id: 'sedang', label: 'Sedang', desc: 'Kombinasi teori' },
                  { id: 'lanjut', label: 'Lanjut', desc: 'Abstrak & kompleks' }
                ].map(option => (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, difficulty: option.id }))}
                    className={`p-4 rounded-xl border text-left transition-all duration-300 ${
                      formData.difficulty === option.id
                        ? 'border-amber bg-amber/15 shadow-[0_0_15px_rgba(232,167,53,0.15)]'
                        : 'border-white/10 bg-white/5 hover:bg-white/10 hover:border-amber/50'
                    }`}
                  >
                    <div className={`font-bold ${formData.difficulty === option.id ? 'text-amber-light' : 'text-white'}`}>{option.label}</div>
                    <div className="text-xs text-slate-400 mt-1">{option.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={!isFormValid}
              className="w-full py-3 px-6 rounded-xl bg-gradient-to-r from-navy to-sage text-white font-medium flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-all"
            >
              <Search className="w-6 h-6" />
              Cari Teori yang Cocok
            </button>
          </form>
        </div>
      ) : (
        <div className="p-2 sm:p-6 animate-fadeIn">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 border-b border-white/10 pb-6">
            <div>
              <h3 className="text-2xl font-poppins font-bold text-white">
                Rekomendasi Teori untukmu
              </h3>
              <p className="text-sm text-slate-400 mt-1">
                Berdasarkan 4 kriteria preferensi yang kamu pilih
              </p>
            </div>
            <button
              onClick={resetForm}
              className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white transition-colors flex items-center justify-center gap-2 font-medium"
            >
              <RefreshCw className="w-4 h-4" />
              Cari Ulang
            </button>
          </div>

          <div className="space-y-4">
            {recommendations.map((rec, index) => (
              <div
                key={rec.theory.id}
                className={`p-5 rounded-2xl border cursor-pointer transition-all duration-500 bg-white/5 ${
                  selectedTheory?.id === rec.theory.id
                    ? 'border-amber shadow-[0_0_25px_rgba(232,167,53,0.15)] ring-1 ring-amber/30'
                    : 'border-white/10 hover:border-amber/50 hover:bg-white/10'
                }`}
                onClick={() => setSelectedTheory(selectedTheory?.id === rec.theory.id ? null : rec.theory)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-navy-dark font-bold text-lg shadow-lg ${
                      index === 0 ? 'bg-gradient-to-br from-amber to-amber-light' : 
                      index === 1 ? 'bg-gradient-to-br from-slate-300 to-slate-400' : 
                      'bg-gradient-to-br from-amber-900 to-amber-800 text-amber-100'
                    }`}>
                      #{index + 1}
                    </div>
                    <div>
                      <h4 className="font-poppins font-bold text-lg text-white group-hover:text-amber-light transition-colors">{rec.theory.name}</h4>
                      <p className="text-sm text-amber-light/70">{rec.theory.founder}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-amber-light">{rec.matchScore}%</div>
                    <div className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">Kecocokan</div>
                  </div>
                </div>

                {/* Alasan kecocokan */}
                <div className="mt-4 flex flex-wrap gap-2">
                  {rec.reasons.map((reason, i) => (
                    <span
                      key={i}
                      className="text-xs px-2.5 py-1 bg-amber/10 border border-amber/20 text-amber-light rounded-md font-medium"
                    >
                      {reason}
                    </span>
                  ))}
                </div>

                {/* Detail teori (expandable smoothly) */}
                <div className={`grid transition-all duration-500 ease-in-out ${
                    selectedTheory?.id === rec.theory.id 
                      ? 'grid-rows-[1fr] opacity-100 mt-5 pt-5 border-t border-white/10' 
                      : 'grid-rows-[0fr] opacity-0 mt-0 pt-0 border-t-0 border-transparent'
                }`}>
                  <div className="overflow-hidden">
                    <p className="text-sm text-slate-300 mb-5 leading-relaxed">{rec.theory.description}</p>
                    
                    <div className="mb-5">
                      <h5 className="text-[10px] font-bold text-white/50 uppercase tracking-[2px] mb-2 flex items-center gap-2">
                        <Lightbulb className="w-3 h-3 text-amber" />
                        Konsep Kunci
                      </h5>
                      <div className="flex flex-wrap gap-2">
                        {rec.theory.keyConcepts.map((concept, i) => (
                          <span
                            key={i}
                            className="text-xs px-3 py-1.5 bg-white/10 border border-white/5 text-white rounded-md"
                          >
                            {concept}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="bg-black/40 p-4 rounded-xl border border-white/5 shadow-inner">
                      <h5 className="text-[10px] font-bold text-amber-light/60 uppercase tracking-[2px] mb-2">
                        Contoh Kasus: {rec.theory.exampleCase.title}
                      </h5>
                      <p className="text-sm text-slate-300 mb-3">{rec.theory.exampleCase.description}</p>
                      <p className="text-sm text-amber-light/90 italic border-l-2 border-amber pl-3">
                        <span className="font-bold not-italic block mb-1">Analisis:</span>
                        {rec.theory.exampleCase.analysis}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// Icon components (Tetap sama)
function LandmarkIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 22h18"/><path d="M6 18v-7l6-6 6 6v7"/><path d="M9 22v-4h6v4"/><path d="M10 11h4"/>
    </svg>
  );
}

function BuildingIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 22h18"/><path d="M6 18v-8l6-4 6 4v8"/><path d="M10 22v-4h4v4"/>
    </svg>
  );
}

function TrendingUpIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M23 6l-9.5 9.5-5-5L1 18"/><path d="M17 6h6v6"/>
    </svg>
  );
}

function CpuIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><path d="M15 2v2"/><path d="M15 20v2"/><path d="M9 2v2"/><path d="M9 20v2"/><path d="M2 15h2"/><path d="M2 9h2"/><path d="M20 15h2"/><path d="M20 9h2"/>
    </svg>
  );
}

function PaletteIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><path d="M12 2a10 10 0 0 1 10 10c0 5.523-4.477 10-10 10S2 17.523 2 12"/><path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"/><path d="M12 12a4 4 0 1 0 0 8 4 4 0 0 0 0-8z"/>
    </svg>
  );
}