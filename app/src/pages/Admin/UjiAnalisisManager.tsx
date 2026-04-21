import { useState } from 'react';
import { useAdminStore } from '@/store/useAdminStore';
import {
  Eye, Plus, Edit2, Trash2, Search, X, Save,
  ChevronDown, ChevronUp, HelpCircle, PlusCircle, MinusCircle
} from 'lucide-react';
import { toast } from 'sonner';

// ─── Types ────────────────────────────────────────────────────────────────────

interface OptionForm {
  id: string;
  text: string;
  concept: string;
  analysis: string;
}

interface QuestionForm {
  id: string;
  text: string;
  options: OptionForm[];
}

interface KasusForm {
  title: string;
  description: string;
  context: string;
  questions: QuestionForm[];
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

const makeOptionId = () => `opt-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
const makeQuestionId = () => `q-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;

const emptyOption = (): OptionForm => ({ id: makeOptionId(), text: '', concept: '', analysis: '' });
const emptyQuestion = (): QuestionForm => ({
  id: makeQuestionId(),
  text: '',
  options: [emptyOption(), emptyOption(), emptyOption()],
});

const emptyForm = (): KasusForm => ({
  title: '',
  description: '',
  context: '',
  questions: [emptyQuestion()],
});

// ─── Component ────────────────────────────────────────────────────────────────

export default function UjiAnalisisManager() {
  const { kacamataCases, role, addInteractiveCase, updateInteractiveCase, deleteInteractiveCase } =
    useAdminStore();

  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<KasusForm>(emptyForm());
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const isEditor = role === 'Editor Prodi';

  const filteredCases = kacamataCases.filter(
    (k) =>
      k.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      k.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // ── Handlers: Form open/close ────────────────────────────────────────────

  const handleOpenAdd = () => {
    if (isEditor) { toast.error('Akses Ditolak: Hanya Super Admin yang dapat menambah kasus.'); return; }
    setEditingId(null);
    setForm(emptyForm());
    setShowForm(true);
  };

  const handleOpenEdit = (kasus: typeof kacamataCases[0]) => {
    if (isEditor) { toast.error('Akses Ditolak: Hanya Super Admin yang dapat mengedit kasus.'); return; }
    setEditingId(kasus.id);
    setForm({
      title: kasus.title,
      description: kasus.description,
      context: kasus.context,
      questions: Array.isArray(kasus.questions) && kasus.questions.length > 0
        ? kasus.questions
        : [emptyQuestion()],
    });
    setShowForm(true);
  };

  const handleDelete = (id: string, title: string) => {
    if (isEditor) { toast.error('Akses Ditolak: Hanya Super Admin yang dapat menghapus kasus.'); return; }
    if (window.confirm(`Hapus kasus "${title}"?`)) {
      deleteInteractiveCase(id);
      toast.success('Kasus berhasil dihapus.');
    }
  };

  // ── Handlers: Form fields ────────────────────────────────────────────────

  const setField = (key: keyof Omit<KasusForm, 'questions'>, val: string) =>
    setForm(f => ({ ...f, [key]: val }));

  // Questions
  const addQuestion = () =>
    setForm(f => ({ ...f, questions: [...f.questions, emptyQuestion()] }));

  const removeQuestion = (qIdx: number) =>
    setForm(f => ({ ...f, questions: f.questions.filter((_, i) => i !== qIdx) }));

  const setQuestionText = (qIdx: number, text: string) =>
    setForm(f => ({
      ...f,
      questions: f.questions.map((q, i) => i === qIdx ? { ...q, text } : q),
    }));

  // Options
  const addOption = (qIdx: number) =>
    setForm(f => ({
      ...f,
      questions: f.questions.map((q, i) =>
        i === qIdx ? { ...q, options: [...q.options, emptyOption()] } : q
      ),
    }));

  const removeOption = (qIdx: number, oIdx: number) =>
    setForm(f => ({
      ...f,
      questions: f.questions.map((q, i) =>
        i === qIdx ? { ...q, options: q.options.filter((_, j) => j !== oIdx) } : q
      ),
    }));

  const setOptionField = (qIdx: number, oIdx: number, key: keyof OptionForm, val: string) =>
    setForm(f => ({
      ...f,
      questions: f.questions.map((q, i) =>
        i === qIdx
          ? {
              ...q,
              options: q.options.map((o, j) => (j === oIdx ? { ...o, [key]: val } : o)),
            }
          : q
      ),
    }));

  // ── Validation & Save ────────────────────────────────────────────────────

  const handleSave = () => {
    if (!form.title.trim() || !form.description.trim()) {
      toast.error('Judul dan deskripsi kasus wajib diisi.');
      return;
    }

    for (let qi = 0; qi < form.questions.length; qi++) {
      const q = form.questions[qi];
      if (!q.text.trim()) {
        toast.error(`Pertanyaan ${qi + 1}: teks pertanyaan wajib diisi.`);
        return;
      }
      if (q.options.length < 2) {
        toast.error(`Pertanyaan ${qi + 1}: minimal 2 pilihan jawaban.`);
        return;
      }
      for (let oi = 0; oi < q.options.length; oi++) {
        const o = q.options[oi];
        if (!o.text.trim() || !o.concept.trim() || !o.analysis.trim()) {
          toast.error(`Pertanyaan ${qi + 1}, Pilihan ${oi + 1}: semua field wajib diisi.`);
          return;
        }
      }
    }

    const payload = {
      title: form.title,
      description: form.description,
      context: form.context,
      questions: form.questions,
    };

    if (editingId) {
      updateInteractiveCase(editingId, payload);
      toast.success(`Kasus "${form.title}" berhasil diperbarui.`);
    } else {
      addInteractiveCase({ ...payload, id: `case-${Date.now()}` } as any);
      toast.success(`Kasus "${form.title}" berhasil ditambahkan.`);
    }

    setShowForm(false);
    setForm(emptyForm());
    setEditingId(null);
  };

  // ── Render ───────────────────────────────────────────────────────────────

  return (
    <div className="space-y-6">
      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="relative w-full sm:w-96">
          <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Cari kasus..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-sage focus:ring-1 focus:ring-sage shadow-sm"
          />
        </div>
        <button
          onClick={handleOpenAdd}
          className="bg-sage hover:bg-sage-light text-white font-bold px-4 py-2.5 rounded-xl shadow-md transition-colors flex items-center gap-2 text-sm whitespace-nowrap"
        >
          <Plus className="w-4 h-4" /> Tambah Kasus Baru
        </button>
      </div>

      {/* ═══════════════════ FORM ═══════════════════ */}
      {showForm && (
        <div className="bg-white rounded-2xl border-2 border-sage/30 shadow-lg overflow-hidden animate-fadeIn">
          {/* Form Header */}
          <div className="bg-gradient-to-r from-sage/10 to-sage/5 px-6 py-4 flex items-center justify-between border-b border-sage/20">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-sage/20 flex items-center justify-center">
                <Eye className="w-5 h-5 text-sage" />
              </div>
              <div>
                <h3 className="font-poppins font-bold text-navy text-base">
                  {editingId ? 'Edit Uji Analisis' : 'Tambah Uji Analisis Baru'}
                </h3>
                <p className="text-xs text-slate-500">Kasus yang ditampilkan di halaman Kacamata → Uji Analisis</p>
              </div>
            </div>
            <button
              onClick={() => setShowForm(false)}
              className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:text-red-500 hover:border-red-200 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Form Body */}
          <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">

            {/* ── Info Dasar ────────────────────────────────── */}
            <div className="space-y-4">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-2">
                Informasi Dasar
              </h4>

              {/* Judul */}
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                  Judul Kasus <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => setField('title', e.target.value)}
                  placeholder="Contoh: Konflik Agraria di Jawa Tengah"
                  className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-sage focus:ring-2 focus:ring-sage/20 bg-slate-50 transition-all"
                />
              </div>

              {/* Deskripsi */}
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                  Deskripsi Singkat <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows={2}
                  value={form.description}
                  onChange={(e) => setField('description', e.target.value)}
                  placeholder="Ringkasan singkat kasus ini (2-3 kalimat)..."
                  className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-sage focus:ring-2 focus:ring-sage/20 bg-slate-50 resize-none transition-all"
                />
              </div>

              {/* Konteks */}
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                  Konteks / Latar Belakang
                </label>
                <textarea
                  rows={3}
                  value={form.context}
                  onChange={(e) => setField('context', e.target.value)}
                  placeholder="Penjelasan lebih detail tentang situasi dan latar belakang kasus..."
                  className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-sage focus:ring-2 focus:ring-sage/20 bg-slate-50 resize-none transition-all"
                />
              </div>
            </div>

            {/* ── Pertanyaan ────────────────────────────────── */}
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-sage" />
                  Pertanyaan Analisis <span className="text-red-500">*</span>
                </h4>
                <button
                  type="button"
                  onClick={addQuestion}
                  className="flex items-center gap-1.5 text-xs font-bold text-sage hover:text-sage-light transition-colors"
                >
                  <PlusCircle className="w-4 h-4" /> Tambah Pertanyaan
                </button>
              </div>

              {form.questions.map((q, qIdx) => (
                <div
                  key={q.id}
                  className="border border-slate-200 rounded-xl overflow-hidden"
                >
                  {/* Question header */}
                  <div className="bg-slate-50 px-4 py-3 flex items-center gap-3">
                    <span className="w-7 h-7 rounded-lg bg-sage/15 text-sage font-bold text-xs flex items-center justify-center shrink-0">
                      {qIdx + 1}
                    </span>
                    <input
                      type="text"
                      value={q.text}
                      onChange={(e) => setQuestionText(qIdx, e.target.value)}
                      placeholder={`Pertanyaan ${qIdx + 1}: Bagaimana kamu menganalisis...`}
                      className="flex-1 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-sage focus:ring-1 focus:ring-sage/20 bg-white transition-all"
                    />
                    {form.questions.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeQuestion(qIdx)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors shrink-0"
                        title="Hapus Pertanyaan"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                  {/* Options */}
                  <div className="p-4 space-y-4">
                    {q.options.map((opt, oIdx) => (
                      <div
                        key={opt.id}
                        className="bg-slate-50/70 border border-slate-100 rounded-xl p-4 space-y-3"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                            Pilihan {String.fromCharCode(65 + oIdx)}
                          </span>
                          {q.options.length > 2 && (
                            <button
                              type="button"
                              onClick={() => removeOption(qIdx, oIdx)}
                              className="p-1 rounded text-slate-300 hover:text-red-400 transition-colors"
                              title="Hapus Pilihan"
                            >
                              <MinusCircle className="w-4 h-4" />
                            </button>
                          )}
                        </div>

                        {/* Option text */}
                        <div>
                          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                            Teks Pilihan <span className="text-red-400">*</span>
                          </label>
                          <input
                            type="text"
                            value={opt.text}
                            onChange={(e) => setOptionField(qIdx, oIdx, 'text', e.target.value)}
                            placeholder="Ini adalah bentuk perlawanan kelas..."
                            className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-sage focus:ring-1 focus:ring-sage/20 bg-white transition-all"
                          />
                        </div>

                        {/* Concept (Lensa) */}
                        <div>
                          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                            Lensa / Konsep Sosiologi <span className="text-red-400">*</span>
                          </label>
                          <input
                            type="text"
                            value={opt.concept}
                            onChange={(e) => setOptionField(qIdx, oIdx, 'concept', e.target.value)}
                            placeholder="Contoh: Konflik Kelas (Marx), Fungsionalisme, dll."
                            className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-sage focus:ring-1 focus:ring-sage/20 bg-white transition-all"
                          />
                        </div>

                        {/* Analysis */}
                        <div>
                          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                            Penjelasan Analisis <span className="text-red-400">*</span>
                          </label>
                          <textarea
                            rows={2}
                            value={opt.analysis}
                            onChange={(e) => setOptionField(qIdx, oIdx, 'analysis', e.target.value)}
                            placeholder="Dari perspektif ini, fenomena tersebut menunjukkan..."
                            className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-sage focus:ring-1 focus:ring-sage/20 bg-white resize-none transition-all"
                          />
                        </div>
                      </div>
                    ))}

                    {/* Add option button */}
                    <button
                      type="button"
                      onClick={() => addOption(qIdx)}
                      className="w-full flex items-center justify-center gap-2 py-2.5 border border-dashed border-slate-300 rounded-xl text-xs font-bold text-slate-400 hover:border-sage hover:text-sage transition-colors"
                    >
                      <PlusCircle className="w-4 h-4" /> Tambah Pilihan
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-2 sticky bottom-0 bg-white pb-1">
              <button
                onClick={handleSave}
                className="flex-1 flex items-center justify-center gap-2 px-5 py-3 bg-sage hover:bg-sage-light text-white font-bold rounded-xl transition-all shadow-md text-sm"
              >
                <Save className="w-4 h-4" />
                {editingId ? 'Simpan Perubahan' : 'Tambah Kasus'}
              </button>
              <button
                onClick={() => { setShowForm(false); setForm(emptyForm()); setEditingId(null); }}
                className="px-5 py-3 border border-slate-200 text-slate-600 font-bold rounded-xl hover:bg-slate-50 transition-all text-sm"
              >
                Batal
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ═══════════════════ KASUS LIST ═══════════════════ */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
        {filteredCases.length === 0 ? (
          <div className="p-16 text-center">
            <Eye className="w-12 h-12 mx-auto mb-3 text-slate-200" />
            <p className="text-slate-500 font-medium">
              {searchTerm ? 'Kasus tidak ditemukan.' : 'Belum ada kasus. Tambahkan kasus pertama!'}
            </p>
            {!searchTerm && (
              <button onClick={handleOpenAdd} className="mt-4 text-sage font-bold text-sm hover:underline">
                + Tambah sekarang
              </button>
            )}
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {filteredCases.map((kasus, i) => {
              const questionsArr = Array.isArray(kasus.questions) ? kasus.questions : [];
              return (
                <div key={kasus.id} className="hover:bg-slate-50/50 transition-colors">
                  {/* Row header */}
                  <div className="p-5 flex items-start gap-4">
                    <div className="w-8 h-8 rounded-lg bg-sage/10 flex items-center justify-center text-sage font-bold text-sm shrink-0 mt-0.5">
                      {i + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-bold text-navy text-sm truncate">{kasus.title}</h4>
                        {questionsArr.length > 0 ? (
                          <span className="text-[10px] font-bold px-2 py-0.5 bg-sage/10 text-sage rounded-full border border-sage/20 shrink-0">
                            {questionsArr.length} pertanyaan
                          </span>
                        ) : (
                          <span className="text-[10px] font-bold px-2 py-0.5 bg-red-50 text-red-400 rounded-full border border-red-100 shrink-0">
                            Tanpa pertanyaan
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-500 line-clamp-2">{kasus.description}</p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => setExpandedId(expandedId === kasus.id ? null : kasus.id)}
                        className="p-2 rounded-lg bg-slate-100 text-slate-500 hover:bg-slate-200 transition-colors"
                        title="Lihat Detail"
                      >
                        {expandedId === kasus.id ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </button>
                      <button
                        onClick={() => handleOpenEdit(kasus)}
                        className="p-2 rounded-lg bg-slate-100 text-slate-500 hover:bg-amber/20 hover:text-amber-700 transition-colors"
                        title="Edit"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(kasus.id, kasus.title)}
                        className="p-2 rounded-lg bg-slate-100 text-slate-500 hover:bg-red-50 hover:text-red-500 transition-colors"
                        title="Hapus"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Expanded detail */}
                  {expandedId === kasus.id && (
                    <div className="px-5 pb-5 pl-[72px] space-y-3">
                      {kasus.context && (
                        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Konteks</p>
                          <p className="text-sm text-slate-600 leading-relaxed">{kasus.context}</p>
                        </div>
                      )}
                      {questionsArr.length > 0 && (
                        <div className="space-y-2">
                          {questionsArr.map((q: any, qi: number) => (
                            <div key={q.id || qi} className="bg-sage/5 border border-sage/20 rounded-xl p-3">
                              <p className="text-xs font-bold text-navy mb-2">P{qi + 1}: {q.text}</p>
                              {Array.isArray(q.options) && (
                                <ul className="space-y-1">
                                  {q.options.map((o: any, oi: number) => (
                                    <li key={o.id || oi} className="text-xs text-slate-500">
                                      <span className="font-bold text-slate-400">{String.fromCharCode(65 + oi)}.</span> {o.text}
                                      {o.concept && <span className="ml-2 text-sage font-semibold">({o.concept})</span>}
                                    </li>
                                  ))}
                                </ul>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Count info */}
      {filteredCases.length > 0 && (
        <p className="text-xs text-slate-400 text-right px-1">
          Menampilkan {filteredCases.length} dari {kacamataCases.length} kasus
        </p>
      )}
    </div>
  );
}
