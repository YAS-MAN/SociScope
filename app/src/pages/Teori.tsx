import { useState, useMemo, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { BookOpen, ChevronRight, ChevronLeft, X, Lightbulb, Quote, Award, Layers } from 'lucide-react';
import { useAdminStore } from '@/store/useAdminStore';
import { supabase } from '@/lib/supabase';
import type { Theory } from '@/data/sociologyData';
import TheoryRecommender from '@/components/TheoryRecommender';

// ===============================================================
// DATA STATIS TOKOH (minimal fallback - bio via Admin Panel)
// ===============================================================
const STATIC_TOKOH = [
  {
    id: '1', name: "Auguste Comte", years: "1798 – 1857", title: "Bapak Sosiologi",
    quote: "Ketahuilah diri sendiri untuk menjadi lebih baik.",
    contribution: "Menciptakan istilah 'sosiologi' dan hukum tiga tahap perkembangan masyarakat.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Auguste_Comte.jpg/330px-Auguste_Comte.jpg",
    color: "from-amber/30 to-amber/10", accent: "#e8a735",
    categories: ['Klasik', 'Eropa'],
  },
  {
    id: '2', name: "Émile Durkheim", years: "1858 – 1917", title: "Pelopor Sosiologi Ilmiah",
    quote: "Masyarakat adalah realitas sui generis — nyata, independen dari individu.",
    contribution: "Mengembangkan konsep fakta sosial, solidaritas organik & mekanik, serta studi ilmiah tentang bunuh diri.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Emile_Durkheim.jpg/330px-Emile_Durkheim.jpg",
    color: "from-sage/30 to-sage/10", accent: "#5a8a6e",
    categories: ['Klasik', 'Eropa', 'Pendidikan'],
  },
  {
    id: '3', name: "Max Weber", years: "1864 – 1920", title: "Ahli Birokrasi & Tindakan Sosial",
    quote: "Sosiologi berusaha memahami makna dari tindakan sosial.",
    contribution: "Teori tindakan sosial, birokrasi ideal, etika Protestan & kapitalisme, serta tiga dimensi stratifikasi sosial.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/Max_Weber_1894.jpg/330px-Max_Weber_1894.jpg",
    color: "from-navy/30 to-navy/10", accent: "#1e3a5f",
    categories: ['Klasik', 'Eropa', 'Politik'],
  },
  {
    id: '4', name: "Karl Marx", years: "1818 – 1883", title: "Teoritisi Konflik Kelas",
    quote: "Sejarah semua masyarakat yang ada sejauh ini adalah sejarah perjuangan kelas.",
    contribution: "Teori konflik kelas, materialisme historis, alienasi, dan kritik kapitalisme yang menjadi landasan teori kritis.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Karl_Marx_001.jpg/330px-Karl_Marx_001.jpg",
    color: "from-red-900/30 to-red-900/10", accent: "#7f1d1d",
    categories: ['Klasik', 'Eropa', 'Kritis', 'Politik'],
  },
  {
    id: '5', name: "Talcott Parsons", years: "1902 – 1979", title: "Arsitek Fungsionalisme Struktural",
    quote: "Sistem sosial bergerak menuju ekuilibrium.",
    contribution: "Mengembangkan AGIL (Adaptation, Goal-attainment, Integration, Latency) sebagai kerangka analisis sistem sosial.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Talcott_Parsons.jpg/330px-Talcott_Parsons.jpg",
    color: "from-purple-900/30 to-purple-900/10", accent: "#581c87",
    categories: ['Modern', 'Eropa'],
  },
];

// ============================================================
// HELPERS & CONSTANTS
// ============================================================

// Category badge colors — dark (for cards with dark background)
const CATEGORY_COLORS: Record<string, string> = {
  'Klasik':       'bg-amber/20 text-amber border-amber/30',
  'Modern':       'bg-blue-500/20 text-blue-300 border-blue-500/30',
  'Kontemporer':  'bg-violet-500/20 text-violet-300 border-violet-500/30',
  'Indonesia':    'bg-red-500/20 text-red-300 border-red-500/30',
  'Islam':        'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
  'Eropa':        'bg-sky-500/20 text-sky-300 border-sky-500/30',
  'Pendidikan':   'bg-orange-500/20 text-orange-300 border-orange-500/30',
  'Politik':      'bg-slate-400/20 text-slate-300 border-slate-400/30',
  'Kritis':       'bg-rose-500/20 text-rose-300 border-rose-500/30',
  'Post Modern':  'bg-fuchsia-500/20 text-fuchsia-300 border-fuchsia-500/30',
};

// Category badge colors — light (for modal with white background)
const CATEGORY_COLORS_LIGHT: Record<string, string> = {
  'Klasik':       'bg-amber/10 text-amber-dark border-amber/20',
  'Modern':       'bg-blue-50 text-blue-700 border-blue-200',
  'Kontemporer':  'bg-violet-50 text-violet-700 border-violet-200',
  'Indonesia':    'bg-red-50 text-red-700 border-red-200',
  'Islam':        'bg-emerald-50 text-emerald-700 border-emerald-200',
  'Eropa':        'bg-sky-50 text-sky-700 border-sky-200',
  'Pendidikan':   'bg-orange-50 text-orange-700 border-orange-200',
  'Politik':      'bg-slate-100 text-slate-700 border-slate-300',
  'Kritis':       'bg-rose-50 text-rose-700 border-rose-200',
  'Post Modern':  'bg-fuchsia-50 text-fuchsia-700 border-fuchsia-200',
};

const THEORY_THEME: Record<string, { gradient: string; accent: string; label: string }> = {
  konflik: { gradient: 'from-red-950 to-red-900/60', accent: '#ef4444', label: 'Konflik' },
  konsensus: { gradient: 'from-emerald-950 to-emerald-900/60', accent: '#10b981', label: 'Konsensus' },
  makna: { gradient: 'from-purple-950 to-purple-900/60', accent: '#a855f7', label: 'Makna' },
  perubahan: { gradient: 'from-blue-950 to-blue-900/60', accent: '#3b82f6', label: 'Perubahan' },
};

const DIFF_STYLE: Record<string, string> = {
  mudah: 'bg-green-50  text-green-700  border-green-200',
  sedang: 'bg-amber-50  text-amber-700  border-amber-200',
  lanjut: 'bg-red-50    text-red-700    border-red-200',
};

function trackClick(type: 'tokoh' | 'theory', itemId: string, itemName: string) {
  supabase.from('click_events').insert([{ type, item_id: itemId, item_name: itemName }]).then(() => { });
}

function getRelatedTheories(theories: Theory[], tokohName: string): Theory[] {
  const parts = tokohName.toLowerCase().split(/\s+/).filter(p => p.length > 3);
  return theories.filter(t => {
    const f = t.founder.toLowerCase();
    return f.includes(tokohName.toLowerCase()) || parts.some(p => f.includes(p));
  });
}

function getRelatedTokoh(tokohList: any[], theory: Theory): any[] {
  const founder = theory.founder.toLowerCase();
  return tokohList.filter(t => {
    const parts = t.name.toLowerCase().split(/\s+/).filter((p: string) => p.length > 3);
    return founder.includes(t.name.toLowerCase()) || parts.some((p: string) => founder.includes(p));
  });
}

function carouselOffset(i: number, active: number, total: number): number {
  let off = (i - active) % total;
  if (off > Math.floor(total / 2)) off -= total;
  if (off < -Math.floor(total / 2)) off += total;
  return off;
}

// ============================================================
// MODAL: TOKOH
// ============================================================

function TokohModal({
  tokoh, theories, onClose, onOpenTheory,
}: {
  tokoh: any;
  theories: Theory[];
  onClose: () => void;
  onOpenTheory: (t: Theory) => void;
}) {
  const related = getRelatedTheories(theories, tokoh.name);
  const accentColor = tokoh.accent === '#1e3a5f' ? '#93c5fd' : tokoh.accent;

  return createPortal(
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative bg-navy rounded-3xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto custom-scrollbar border border-white/10"
        onClick={e => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header — photo + info */}
        <div className="flex flex-col md:flex-row gap-8 p-8 md:p-10 border-b border-white/10">
          {/* Photo */}
          <div className="flex-shrink-0">
            <div
              className="w-full md:w-52 h-64 rounded-2xl overflow-hidden border-2"
              style={{ borderColor: `${accentColor}40` }}
            >
              <img
                src={tokoh.image}
                alt={tokoh.name}
                className="w-full h-full object-cover object-top"
                onError={(e) => {
                  const t = e.target as HTMLImageElement;
                  t.parentElement!.style.background = '#1e3a5f';
                  t.style.display = 'none';
                }}
              />
            </div>
            {/* Badge: tahun */}
            <div className="mt-3 text-center">
              <span className="text-xs text-white/50 font-medium">{tokoh.years}</span>
            </div>
          </div>

          {/* Info */}
          <div className="flex-1">
            {/* Title badge */}
            <span
              className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-3 inline-block border"
              style={{ color: accentColor, borderColor: `${accentColor}40`, background: `${accentColor}15` }}
            >
              {tokoh.title}
            </span>

            <h2 className="font-poppins font-bold text-3xl text-white mb-3">{tokoh.name}</h2>

            {/* Category badges */}
            {(tokoh.categories ?? []).length > 0 && (
              <div className="flex flex-wrap gap-1.5 mb-4">
                {(tokoh.categories as string[]).map((cat: string) => (
                  <span
                    key={cat}
                    className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${CATEGORY_COLORS_LIGHT[cat] ?? 'bg-slate-100 text-slate-600 border-slate-200'}`}
                  >
                    {cat}
                  </span>
                ))}
              </div>
            )}

            {/* Quote */}
            <div className="flex gap-3 mb-6 p-4 bg-white/5 rounded-xl border border-white/10">
              <Quote className="w-5 h-5 text-amber shrink-0 mt-0.5" />
              <p className="text-sm text-white/70 italic leading-relaxed">"{tokoh.quote}"</p>
            </div>

            {/* Bio */}
            {tokoh.bio ? (
              <div className="space-y-3">
                {String(tokoh.bio).split(/\n\n+/).filter(Boolean).map((para: string, i: number) => (
                  <p key={i} className="text-sm text-slate-300 leading-relaxed">{para}</p>
                ))}
              </div>
            ) : (
              <div className="p-4 bg-white/5 border border-white/10 rounded-xl">
                <p className="text-sm text-amber/70 font-medium mb-1">⚠ Biografi belum diisi</p>
                <p className="text-xs text-white/50">{tokoh.contribution}</p>
                <p className="text-xs text-white/30 mt-2 italic">Admin dapat mengisi biografi lengkap di panel Admin → Manajemen Tokoh.</p>
              </div>
            )}
          </div>
        </div>

        {/* Related Theories */}
        <div className="p-8 md:p-10">
          <h3 className="font-poppins font-bold text-white mb-5 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-amber" />
            Teori-Teori yang Dikembangkan
          </h3>

          {related.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {related.map(t => {
                const theme = THEORY_THEME[t.focus] ?? THEORY_THEME.makna;
                return (
                  <button
                    key={t.id}
                    onClick={() => { onOpenTheory(t); trackClick('theory', t.id, t.name); }}
                    className="text-left p-5 rounded-2xl border border-white/10 bg-white/5 hover:border-white/30 hover:bg-white/10 transition-all group"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span
                        className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md border"
                        style={{ color: theme.accent, borderColor: `${theme.accent}40`, background: `${theme.accent}15` }}
                      >
                        {theme.label}
                      </span>
                      <span className="text-xs text-white/40 font-medium">{t.year.match(/\d{4}/)?.[0]}</span>
                    </div>
                    <h4 className="font-poppins font-bold text-white text-sm leading-tight group-hover:text-amber-light transition-colors mb-2">
                      {t.name}
                    </h4>
                    <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">{t.description}</p>
                    <div className="mt-3 flex items-center gap-1 text-xs font-bold text-amber/60 group-hover:text-amber transition-colors">
                      Lihat Detail →
                    </div>
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-8 text-slate-500">
              <BookOpen className="w-8 h-8 mx-auto mb-2 opacity-30" />
              <p className="text-sm">Teori dari tokoh ini belum ada dalam database.</p>
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
}

// ============================================================
// MODAL: THEORY
// ============================================================

function TheoryModal({
  theory, allTokoh, onClose, onOpenTokoh,
}: {
  theory: Theory;
  allTokoh: any[];
  onClose: () => void;
  onOpenTokoh: (t: any) => void;
}) {
  const theme = THEORY_THEME[theory.focus] ?? THEORY_THEME.makna;
  const relatedTokoh = getRelatedTokoh(allTokoh, theory);
  const startYear = theory.year.match(/\d{4}/)?.[0] ?? '';

  return createPortal(
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-3xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto custom-scrollbar border border-slate-200"
        onClick={e => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div
          className={`bg-gradient-to-br ${theme.gradient} p-8 rounded-t-3xl`}
        >
          {/* Badges */}
          <div className="flex flex-wrap gap-2 mb-4">
            <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md border ${DIFF_STYLE[theory.difficulty]}`}>
              {theory.difficulty}
            </span>
            {Array.isArray(theory.scale) ? theory.scale.map(s => (
              <span key={s} className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md bg-white/10 text-white border border-white/20">
                {s}
              </span>
            )) : (
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md bg-white/10 text-white border border-white/20">
                {theory.scale}
              </span>
            )}
            <span
              className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md border"
              style={{ color: theme.accent, borderColor: `${theme.accent}40`, background: `${theme.accent}15` }}
            >
              {theme.label}
            </span>
            {startYear && (
              <span className="text-[10px] font-bold px-2 py-1 rounded-md bg-white/10 text-white border border-white/20">
                {startYear}
              </span>
            )}
          </div>
          <h2 className="font-poppins font-bold text-2xl md:text-3xl text-white mb-2">{theory.name}</h2>
          <p className="text-sm text-white/60">oleh {theory.founder}</p>
        </div>

        {/* Body */}
        <div className="p-8 space-y-6">
          {/* Description */}
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-3">Deskripsi</span>
            <p className="text-slate-700 leading-relaxed whitespace-pre-line">{theory.description}</p>
          </div>

          {/* Key Concepts */}
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-3">Konsep Kunci</span>
            <div className="flex flex-wrap gap-2">
              {theory.keyConcepts.map((concept, i) => (
                <span
                  key={i}
                  className="text-sm px-3 py-1.5 rounded-xl border font-medium"
                  style={{ color: theme.accent, borderColor: `${theme.accent}30`, background: `${theme.accent}10` }}
                >
                  {concept}
                </span>
              ))}
            </div>
          </div>

          {/* Example Case */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
            <span className="text-[10px] font-bold text-amber-dark uppercase tracking-widest block mb-3">
              📍 Contoh Kasus Indonesia
            </span>
            <h4 className="font-poppins font-bold text-navy mb-2">{theory.exampleCase.title}</h4>
            <p className="text-sm text-slate-600 leading-relaxed mb-3 whitespace-pre-line">{theory.exampleCase.description}</p>
            <div className="pt-3 border-t border-slate-200">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Analisis</span>
              <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">{theory.exampleCase.analysis}</p>
            </div>
          </div>

          {/* Related Tokoh */}
          {relatedTokoh.length > 0 && (
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-3">
                Tokoh Pencetus
              </span>
              <div className="flex flex-wrap gap-4">
                {relatedTokoh.map((tokoh) => {
                  const accentColor = tokoh.accent === '#1e3a5f' ? '#3b82f6' : tokoh.accent;
                  return (
                    <button
                      key={tokoh.id}
                      onClick={() => onOpenTokoh(tokoh)}
                      className="flex items-center gap-3 p-3 rounded-2xl border border-slate-200 bg-white hover:border-slate-300 hover:shadow-md transition-all group"
                    >
                      <div className="w-10 h-10 rounded-xl overflow-hidden bg-slate-100 shrink-0">
                        <img
                          src={tokoh.image}
                          alt={tokoh.name}
                          className="w-full h-full object-cover object-top"
                          onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                        />
                      </div>
                      <div className="text-left">
                        <p className="text-sm font-bold text-navy group-hover:text-amber-dark transition-colors">{tokoh.name}</p>
                        <p className="text-xs text-slate-400">{tokoh.years}</p>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-amber-dark ml-1 transition-colors" />
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
}

// ============================================================
// MAIN PAGE COMPONENT
// ============================================================

export default function Teori() {
  const theories = useAdminStore((state) => state.theories);
  const storeSociologists = useAdminStore((state) => state.sociologists);
  const displaySociologists = storeSociologists.length > 0 ? storeSociologists : STATIC_TOKOH;

  // —— Modals ─────────────────────────────────────────────────
  const [selectedTokoh, setSelectedTokoh] = useState<any>(null);
  const [selectedTheory, setSelectedTheory] = useState<Theory | null>(null);

  const openTokohModal = (tokoh: any) => {
    trackClick('tokoh', String(tokoh.id), tokoh.name);
    setSelectedTokoh(tokoh);
    setSelectedTheory(null);
  };

  const openTheoryModal = (theory: Theory) => {
    trackClick('theory', theory.id, theory.name);
    setSelectedTheory(theory);
    setSelectedTokoh(null);
  };

  // —— Tokoh Carousel ──────────────────────────────────────────
  const [activeTokohSlide, setActiveTokohSlide] = useState(0);
  const [isAutoPlayingTokoh, setIsAutoPlayingTokoh] = useState(true);

  const goNextTokoh = useCallback(() => {
    setActiveTokohSlide(p => (p + 1) % displaySociologists.length);
  }, [displaySociologists.length]);

  const goPrevTokoh = useCallback(() => {
    setActiveTokohSlide(p => (p - 1 + displaySociologists.length) % displaySociologists.length);
  }, [displaySociologists.length]);

  useEffect(() => {
    if (!isAutoPlayingTokoh) return;
    const t = setInterval(goNextTokoh, 3500);
    return () => clearInterval(t);
  }, [isAutoPlayingTokoh, goNextTokoh]);

  // —— Theory Classification Filter ────────────────────────────
  const [activeFilter, setActiveFilter] = useState('Semua');

  // —— Theory Carousel ─────────────────────────────────────────
  const [activeTheorySlide, setActiveTheorySlide] = useState(0);
  const [isAutoPlayingTheory, setIsAutoPlayingTheory] = useState(true);

  const theoriesWithYear = useMemo(() => {
    return [...theories]
      .filter(t => activeFilter === 'Semua' || t.classification === activeFilter)
      .map(t => ({ ...t, startYear: parseInt(t.year.match(/\d{4}/)?.[0] || '1900') }))
      .sort((a, b) => a.startYear - b.startYear);
  }, [theories, activeFilter]);

  const goNextTheory = useCallback(() => {
    setActiveTheorySlide(p => (p + 1) % theoriesWithYear.length);
  }, [theoriesWithYear.length]);

  const goPrevTheory = useCallback(() => {
    setActiveTheorySlide(p => (p - 1 + theoriesWithYear.length) % theoriesWithYear.length);
  }, [theoriesWithYear.length]);

  useEffect(() => {
    if (!isAutoPlayingTheory || theoriesWithYear.length === 0) return;
    const t = setInterval(goNextTheory, 4000);
    return () => clearInterval(t);
  }, [isAutoPlayingTheory, goNextTheory]);

  // —— Timeline smart layout ────────────────────────────────────
  const minYear = theoriesWithYear[0]?.startYear ?? 1848;
  const maxYear = theoriesWithYear[theoriesWithYear.length - 1]?.startYear ?? 1974;
  const yearRange = maxYear - minYear || 1;

  // 4-level smart stagger: prevents labels from ever overlapping
  // Levels: 0=top-far  1=top-near  2=bottom-near  3=bottom-far
  // Connector heights per level (px): 0→64  1→40  2→40  3→64
  const { timelineLevels, timelineMinWidth } = useMemo(() => {
    const count = theoriesWithYear.length;
    // At least 120px per theory, minimum 900px
    const minW = Math.max(900, count * 120);
    // Minimum horizontal gap (px) before the same level can be reused
    const MIN_GAP = 100;
    // Cycle order: top-far → bottom-near → top-near → bottom-far
    const CYCLE = [0, 2, 1, 3];
    const levelLastX: number[] = [-999, -999, -999, -999];

    const levels = theoriesWithYear.map((theory) => {
      const xPct = 5 + ((theory.startYear - minYear) / yearRange) * 90;
      const xPx = (xPct / 100) * minW;

      // Try each level in cycle order, pick first one with enough gap
      let assigned = CYCLE[0];
      for (const l of CYCLE) {
        if (xPx - levelLastX[l] >= MIN_GAP) {
          assigned = l;
          break;
        }
      }
      // Fallback: pick level with largest gap
      if (theoriesWithYear.every((_, __)  => true)) {
        let maxGap = -1;
        for (const l of CYCLE) {
          const gap = xPx - levelLastX[l];
          if (gap > maxGap) { maxGap = gap; assigned = l; }
        }
      }
      levelLastX[assigned] = xPx;
      return assigned;
    });

    return { timelineLevels: levels, timelineMinWidth: minW };
  }, [theoriesWithYear, minYear, yearRange]);

  // Prevent body scroll when modal open
  useEffect(() => {
    document.body.style.overflow = (selectedTokoh || selectedTheory) ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [selectedTokoh, selectedTheory]);

  return (
    <div className="min-h-screen bg-white relative overflow-hidden py-24">
      {/* BG effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-sage/5 rounded-full blur-[130px] -z-0" />
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-amber/5 rounded-full blur-[100px] -z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Page header */}
        <div className="text-center mb-14 animate-fadeIn">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber/10 border border-amber/20 rounded-full text-sm text-amber-dark font-bold mb-4">
            <BookOpen className="w-4 h-4" />
            Kumpulan Teori Sosiologi
          </div>
          <h2 className="font-poppins font-bold text-4xl md:text-5xl lg:text-6xl text-navy mb-6">
            Teori Sosiologi
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg leading-relaxed">
            Pelajari teori sosiologi dari klasik hingga kontemporer, lengkap dengan tokoh, konsep kunci, dan contoh kasus di Indonesia.
          </p>
        </div>

        {/* ============================================================ */}
        {/* TOKOH CAROUSEL */}
        {/* ============================================================ */}
        <div className="mb-20 relative">
          <h3 className="text-center text-sm font-bold text-slate-500 uppercase tracking-widest mb-2">
            Tokoh-Tokoh Penting Sosiologi
          </h3>
          <p className="text-center text-xs text-slate-400 mb-8">Klik kartu aktif untuk membuka profil lengkap</p>

          <div
            className="relative flex items-center justify-center gap-4 h-[400px] select-none"
            onMouseEnter={() => setIsAutoPlayingTokoh(false)}
            onMouseLeave={() => setIsAutoPlayingTokoh(true)}
          >
            {displaySociologists.map((tokoh, i) => {
              const off = carouselOffset(i, activeTokohSlide, displaySociologists.length);
              const isCenter = off === 0;
              const isAdj = Math.abs(off) === 1;
              const isOuter = Math.abs(off) === 2;
              const isVisible = Math.abs(off) <= 2;
              const accentColor = tokoh.accent === '#1e3a5f' ? '#93c5fd' : tokoh.accent;

              return (
                <div
                  key={tokoh.id}
                  onClick={() => {
                    if (!isCenter && isVisible) { setActiveTokohSlide(i); setIsAutoPlayingTokoh(false); }
                    else if (isCenter) openTokohModal(tokoh);
                  }}
                  className={`absolute transition-all duration-700 ease-in-out rounded-3xl overflow-hidden cursor-pointer
                    ${isCenter
                      ? 'w-64 h-[380px] z-30 shadow-2xl shadow-black/50 ring-2 ring-white/20 opacity-100'
                      : isAdj
                        ? 'w-52 h-[300px] z-20 opacity-60 hover:opacity-80'
                        : isOuter
                          ? 'w-44 h-[250px] z-10 opacity-30 hover:opacity-50'
                          : 'w-44 h-[250px] -z-10 opacity-0 pointer-events-none'
                    }`}
                  style={{
                    transform: `translateX(${off * (isCenter ? 0 : isAdj ? 240 : 430)}px) scale(${isCenter ? 1 : isAdj ? 0.87 : 0.75})`,
                    visibility: isVisible ? 'visible' : 'hidden',
                  }}
                >
                  <div className={`absolute inset-0 bg-gradient-to-b ${tokoh.color} backdrop-blur-sm`} />
                  <div className="absolute inset-0 bg-navy-dark/60" />
                  {isCenter && (
                    <div className="absolute inset-0 opacity-20" style={{ boxShadow: `inset 0 0 60px ${tokoh.accent}` }} />
                  )}

                  <div className="relative z-10 h-full flex flex-col p-5">
                    <div className={`rounded-2xl overflow-hidden mb-4 bg-slate-700 border-2 transition-all ${isCenter ? 'h-48 border-white/20' : 'h-32 border-white/10'}`}>
                      <img
                        src={tokoh.image}
                        alt={tokoh.name}
                        className="w-full h-full object-cover object-top"
                        onError={(e) => {
                          const t = e.target as HTMLImageElement;
                          t.parentElement!.innerHTML = `<div class="w-full h-full flex items-center justify-center bg-white/10 text-white/30 text-4xl font-bold">${tokoh.name[0]}</div>`;
                        }}
                      />
                    </div>

                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <p className={`font-bold text-white leading-tight mb-1 ${isCenter ? 'text-xl' : 'text-base'}`}>{tokoh.name}</p>
                        {isCenter && (
                          <>
                            <p className="text-xs text-white/50 mb-1">{tokoh.years}</p>
                            <p className="text-[11px] font-bold uppercase tracking-wider mb-2" style={{ color: accentColor }}>{tokoh.title}</p>
                            {/* Category badges on card */}
                            {(tokoh.categories ?? []).length > 0 && (
                              <div className="flex flex-wrap gap-1 mb-2">
                                {(tokoh.categories as string[]).slice(0, 2).map((cat: string) => (
                                  <span
                                    key={cat}
                                    className={`text-[9px] font-bold px-1.5 py-0.5 rounded border ${CATEGORY_COLORS[cat] ?? 'bg-white/10 text-white/60 border-white/10'}`}
                                  >
                                    {cat}
                                  </span>
                                ))}
                                {(tokoh.categories as string[]).length > 2 && (
                                  <span className="text-[9px] font-bold px-1.5 py-0.5 rounded border bg-white/10 text-white/50 border-white/10">
                                    +{(tokoh.categories as string[]).length - 2}
                                  </span>
                                )}
                              </div>
                            )}
                            <p className="text-xs text-white/60 leading-relaxed line-clamp-2 italic">"{tokoh.quote}"</p>
                          </>
                        )}
                        {isAdj && <p className="text-xs text-white/40">{tokoh.years}</p>}
                      </div>
                      {isCenter && (
                        <div
                          className="mt-3 text-center text-xs font-bold py-2 rounded-xl border transition-all"
                          style={{ color: accentColor, borderColor: `${tokoh.accent}40`, background: `${tokoh.accent}20` }}
                        >
                          Lihat Profil Lengkap →
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Contribution info */}
          <div className="text-center mt-6 px-4 max-w-lg mx-auto h-12">
            <p className="text-sm text-slate-600 leading-relaxed">
              <span className="font-bold text-navy">Kontribusi: </span>
              {displaySociologists[activeTokohSlide]?.contribution}
            </p>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-6 mt-6">
            <button onClick={() => { goPrevTokoh(); setIsAutoPlayingTokoh(false); }} className="w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-navy border border-slate-200">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="flex gap-2">
              {displaySociologists.map((_, i) => (
                <button key={i} onClick={() => { setActiveTokohSlide(i); setIsAutoPlayingTokoh(false); }}
                  className={`rounded-full transition-all ${i === activeTokohSlide ? 'w-6 h-2 bg-amber' : 'w-2 h-2 bg-slate-300 hover:bg-slate-400'}`}
                />
              ))}
            </div>
            <button onClick={() => { goNextTokoh(); setIsAutoPlayingTokoh(false); }} className="w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-navy border border-slate-200">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* ============================================================ */}
        {/* TIMELINE HORIZONTAL — smart 4-level layout */}
        {/* ============================================================ */}
        
        {/* Filter Pills */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex bg-white border border-slate-200 p-1.5 rounded-full shadow-sm">
            {['Semua', 'Klasik', 'Modern', 'Post Modern'].map(f => (
              <button
                key={f}
                onClick={() => { setActiveFilter(f); setActiveTheorySlide(0); }}
                className={`px-5 py-2 rounded-full text-sm font-bold transition-all ${
                  activeFilter === f 
                    ? 'bg-amber text-navy shadow-md shadow-amber/20' 
                    : 'text-slate-500 hover:text-navy hover:bg-slate-50'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="w-full overflow-x-auto custom-scrollbar mb-20 pb-6">
          <div
            className="relative w-full h-[340px] mx-auto"
            style={{ minWidth: `${timelineMinWidth}px` }}
          >
            {/* Centre axis line */}
            <div className="absolute top-1/2 left-[5%] right-[5%] h-0.5 bg-slate-200 -translate-y-1/2 z-0" />

            {theoriesWithYear.map((theory, index) => {
              const leftPercent = 5 + ((theory.startYear - minYear) / yearRange) * 90;
              const theme = THEORY_THEME[theory.focus] ?? THEORY_THEME.makna;
              const level = timelineLevels[index] ?? 0;

              //  level 0 → top-far    (connector h-16)
              //  level 1 → top-near   (connector h-10)
              //  level 2 → bottom-near(connector h-10)
              //  level 3 → bottom-far (connector h-16)
              const isTop = level === 0 || level === 1;
              const connectorH = level === 0 || level === 3 ? 'h-16' : 'h-10';

              return (
                <div
                  key={theory.id}
                  className="absolute top-1/2 -translate-y-1/2 flex flex-col items-center"
                  style={{ left: `${leftPercent}%` }}
                >
                  {/* Dot on the axis */}
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-300 z-10 shadow-sm" />

                  {/* Label + connector — positioned relative to dot */}
                  <div className={`absolute flex flex-col items-center ${isTop ? 'bottom-1' : 'top-1'}`}>
                    {isTop ? (
                      <>
                        <div
                          className="mb-2 flex flex-col items-center cursor-pointer group"
                          onClick={() => openTheoryModal(theory)}
                        >
                          <span className="text-amber-dark font-bold text-xs mb-1 bg-white px-2 py-0.5 rounded-md border border-amber/30 shadow-sm whitespace-nowrap">
                            {theory.startYear}
                          </span>
                          <span className="text-[10px] text-slate-500 text-center w-24 leading-snug group-hover:text-navy transition-colors">
                            {theory.name}
                          </span>
                        </div>
                        <button
                          onClick={() => openTheoryModal(theory)}
                          className={`w-5 h-5 rounded-full border-[3px] transition-all z-20 bg-white border-slate-300 hover:scale-125`}
                          style={{ borderColor: theme.accent }}
                        />
                        <div className={`w-0.5 ${connectorH} bg-slate-200`} />
                      </>
                    ) : (
                      <>
                        <div className={`w-0.5 ${connectorH} bg-slate-200`} />
                        <button
                          onClick={() => openTheoryModal(theory)}
                          className="w-5 h-5 rounded-full border-[3px] transition-all z-20 bg-white border-slate-300 hover:scale-125"
                          style={{ borderColor: theme.accent }}
                        />
                        <div
                          className="mt-2 flex flex-col items-center cursor-pointer group"
                          onClick={() => openTheoryModal(theory)}
                        >
                          <span className="text-[10px] text-slate-500 text-center w-24 leading-snug group-hover:text-navy transition-colors mb-1">
                            {theory.name}
                          </span>
                          <span className="text-amber-dark font-bold text-xs bg-white px-2 py-0.5 rounded-md border border-amber/30 shadow-sm whitespace-nowrap">
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

        {/* ============================================================ */}
        {/* THEORY CAROUSEL (3D coverflow) */}
        {/* ============================================================ */}
        <div className="mb-24">
          <h3 className="text-center text-sm font-bold text-slate-500 uppercase tracking-widest mb-2">
            Teori-Teori Sosiologi
          </h3>
          <p className="text-center text-xs text-slate-400 mb-8">Klik kartu aktif untuk melihat penjelasan lengkap</p>

          <div
            className="relative flex items-center justify-center gap-4 h-[400px] select-none"
            onMouseEnter={() => setIsAutoPlayingTheory(false)}
            onMouseLeave={() => setIsAutoPlayingTheory(true)}
          >
            {theoriesWithYear.map((theory, i) => {
              const off = carouselOffset(i, activeTheorySlide, theoriesWithYear.length);
              const isCenter = off === 0;
              const isAdj = Math.abs(off) === 1;
              const isOuter = Math.abs(off) === 2;
              const isVisible = Math.abs(off) <= 2;
              const theme = THEORY_THEME[theory.focus] ?? THEORY_THEME.makna;

              return (
                <div
                  key={theory.id}
                  onClick={() => {
                    if (!isCenter && isVisible) { setActiveTheorySlide(i); setIsAutoPlayingTheory(false); }
                    else if (isCenter) openTheoryModal(theory);
                  }}
                  className={`absolute transition-all duration-700 ease-in-out rounded-3xl overflow-hidden cursor-pointer
                    ${isCenter
                      ? 'w-64 h-[380px] z-30 shadow-2xl shadow-black/50 ring-2 ring-white/20 opacity-100'
                      : isAdj
                        ? 'w-52 h-[300px] z-20 opacity-60 hover:opacity-80'
                        : isOuter
                          ? 'w-44 h-[250px] z-10 opacity-30 hover:opacity-50'
                          : 'w-44 h-[250px] -z-10 opacity-0 pointer-events-none'
                    }`}
                  style={{
                    transform: `translateX(${off * (isCenter ? 0 : isAdj ? 240 : 430)}px) scale(${isCenter ? 1 : isAdj ? 0.87 : 0.75})`,
                    visibility: isVisible ? 'visible' : 'hidden',
                  }}
                >
                  {/* Card background */}
                  <div className={`absolute inset-0 bg-gradient-to-b ${theme.gradient}`} />
                  <div className="absolute inset-0 bg-navy-dark/30" />
                  {isCenter && (
                    <div className="absolute inset-0 opacity-15" style={{ boxShadow: `inset 0 0 60px ${theme.accent}` }} />
                  )}

                  {/* Card content */}
                  <div className="relative z-10 h-full flex flex-col p-6">
                    {/* Focus badge + year */}
                    <div className="flex items-start justify-between mb-auto">
                      <div>
                        <span
                          className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md border mb-2 inline-block"
                          style={{ color: theme.accent, borderColor: `${theme.accent}40`, background: `${theme.accent}20` }}
                        >
                          {theme.label}
                        </span>
                        {isCenter && (
                          <span className={`ml-2 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md border inline-block ${DIFF_STYLE[theory.difficulty]}`}>
                            {theory.difficulty}
                          </span>
                        )}
                      </div>
                      <span className="text-xs text-white/40 font-bold">{theory.startYear}</span>
                    </div>

                    <div className="flex-1 flex flex-col justify-end">
                      <h4 className={`font-poppins font-bold text-white leading-tight mb-2 ${isCenter ? 'text-xl' : 'text-sm'}`}>{theory.name}</h4>
                      {isCenter && (
                        <>
                          <p className="text-xs font-medium mb-3" style={{ color: theme.accent }}>{theory.founder}</p>
                          <p className="text-xs text-white/60 leading-relaxed line-clamp-3">{theory.description}</p>
                        </>
                      )}
                      {isAdj && <p className="text-xs text-white/50">{theory.founder}</p>}

                      {isCenter && (
                        <div
                          className="mt-4 text-center text-xs font-bold py-2 rounded-xl border transition-all"
                          style={{ color: theme.accent, borderColor: `${theme.accent}40`, background: `${theme.accent}20` }}
                        >
                          Lihat Detail Teori →
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-6 mt-6">
            <button onClick={() => { goPrevTheory(); setIsAutoPlayingTheory(false); }} className="w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-navy border border-slate-200">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="flex gap-2 flex-wrap max-w-xs justify-center">
              {theoriesWithYear.map((_, i) => (
                <button key={i} onClick={() => { setActiveTheorySlide(i); setIsAutoPlayingTheory(false); }}
                  className={`rounded-full transition-all ${i === activeTheorySlide ? 'w-6 h-2 bg-amber' : 'w-2 h-2 bg-slate-300 hover:bg-slate-400'}`}
                />
              ))}
            </div>
            <button onClick={() => { goNextTheory(); setIsAutoPlayingTheory(false); }} className="w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-navy border border-slate-200">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Theory Recommender */}
        <div id="recommender" className="mb-20 bg-navy rounded-[32px] p-1 border border-navy/20 shadow-2xl overflow-hidden relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-sage/20 rounded-full blur-[80px]" />
          <div className="p-4 md:p-8 relative z-10">
            <TheoryRecommender />
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* MODALS */}
      {/* ============================================================ */}
      {selectedTokoh && (
        <TokohModal
          tokoh={selectedTokoh}
          theories={theories}
          onClose={() => setSelectedTokoh(null)}
          onOpenTheory={(t) => { setSelectedTokoh(null); setTimeout(() => setSelectedTheory(t), 50); }}
        />
      )}

      {selectedTheory && (
        <TheoryModal
          theory={selectedTheory}
          allTokoh={displaySociologists}
          onClose={() => setSelectedTheory(null)}
          onOpenTokoh={(t) => { setSelectedTheory(null); setTimeout(() => setSelectedTokoh(t), 50); }}
        />
      )}
    </div>
  );
}
