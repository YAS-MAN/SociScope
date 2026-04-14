import { useState } from 'react';
import { useAdminStore } from '@/store/useAdminStore';
import type { Concept } from '@/data/sociologyData';
import { Glasses, Plus, Edit2, Trash2, Search, X, Save, ChevronDown, ChevronUp } from 'lucide-react';
import { toast } from 'sonner';

const emptyForm: Partial<Concept> = {
  name: '',
  subtitle: '',
  description: '',
  keyPoints: [],
  indonesiaCase: { title: '', scenario: '', analysis: '' }
};

export default function ConceptManager() {
  const { concepts, role, addConcept, updateConcept, deleteConcept } = useAdminStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<Partial<Concept>>(emptyForm);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // Temporary string states untuk JSONB Array
  const [keyPointsStr, setKeyPointsStr] = useState<string>('');

  const isEditor = role === 'Editor Prodi';

  const filteredConcepts = concepts.filter(c =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.subtitle.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenAdd = () => {
    if (isEditor) {
      toast.error('Akses Ditolak: Hanya Super Admin yang dapat menambah konsep.');
      return;
    }
    setEditingId(null);
    setForm(emptyForm);
    setKeyPointsStr('');
    setShowForm(true);
  };

  const handleOpenEdit = (concept: Concept) => {
    if (isEditor) {
      toast.error('Akses Ditolak: Hanya Super Admin yang dapat mengedit konsep.');
      return;
    }
    setEditingId(concept.id);
    setForm(concept);
    setKeyPointsStr(concept.keyPoints?.join(', ') || '');
    setShowForm(true);
  };

  const handleDelete = (id: string, title: string) => {
    if (isEditor) {
      toast.error('Akses Ditolak: Hanya Super Admin yang dapat menghapus konsep.');
      return;
    }
    if (window.confirm(`Hapus konsep "${title}"?`)) {
      deleteConcept(id);
      toast.success('Konsep berhasil dihapus.');
    }
  };

  const handleSave = () => {
    if (!form.name?.trim() || !form.description?.trim()) {
      toast.error('Nama dan deskripsi wajib diisi.');
      return;
    }

    const savedConcept = {
      ...form,
      id: editingId || form.id || form.name.toLowerCase().replace(/\s+/g, '-'),
      keyPoints: keyPointsStr.split(',').map(s => s.trim()).filter(s => s !== '')
    } as Concept;

    if (editingId) {
      updateConcept(editingId, savedConcept);
      toast.success(`Konsep "${savedConcept.name}" berhasil diperbarui.`);
    } else {
      addConcept(savedConcept);
      toast.success(`Konsep "${savedConcept.name}" berhasil ditambahkan.`);
    }
    setShowForm(false);
    setForm(emptyForm);
    setEditingId(null);
    setKeyPointsStr('');
  };

  return (
    <div className="space-y-6 p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-poppins font-bold text-navy">Master Konsep Kacamata</h2>
          <p className="text-slate-500 mt-2">Daftar empat kacamata perspektif sosiologi dasar</p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="flex items-center gap-2 px-6 py-3 bg-amber hover:bg-amber-dark text-white rounded-xl font-bold transition-all shadow-lg hover:shadow-amber/20"
        >
          <Plus className="w-5 h-5" />
          <span>Tambah Konsep</span>
        </button>
      </div>

      <div className="bg-white rounded-2xl border-2 border-slate-200 shadow-sm overflow-hidden mb-6">
        <div className="p-4 border-b border-slate-200">
          <div className="flex items-center gap-3 bg-slate-50 px-4 py-3 rounded-lg border border-slate-200 w-96">
            <Search className="w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Cari konsep kacamata..."
              className="bg-transparent border-none outline-none text-sm w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      {showForm && (
        <div className="bg-white rounded-2xl border-2 border-slate-200 shadow-lg overflow-hidden animate-fadeIn mb-8 relative">
          <div className="bg-gradient-to-r from-slate-100 to-slate-50 px-6 py-4 flex items-center justify-between border-b border-slate-200">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-navy/10 flex items-center justify-center">
                <Glasses className="w-5 h-5 text-navy" />
              </div>
              <div>
                <h3 className="font-poppins font-bold text-navy text-base">
                  {editingId ? 'Edit Konsep' : 'Tambah Konsep Baru'}
                </h3>
                <p className="text-xs text-slate-500">Perspektif yang akan menjadi dasar analisis</p>
              </div>
            </div>
            <button
              onClick={() => setShowForm(false)}
              className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:text-red-500 hover:border-red-200 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="p-6 grid lg:grid-cols-2 gap-6">
            <div className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Nama Konsep <span className="text-red-500">*</span></label>
                <input required type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-amber focus:ring-2 focus:ring-amber/20 bg-slate-50" />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Tokoh & Tahun (Subtitle) <span className="text-red-500">*</span></label>
                <input required type="text" value={form.subtitle} onChange={(e) => setForm({ ...form, subtitle: e.target.value })} className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-amber focus:ring-2 focus:ring-amber/20 bg-slate-50" />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Poin-Poin Utama (pisahkan dengan koma) <span className="text-red-500">*</span></label>
                <textarea required rows={3} value={keyPointsStr} onChange={(e) => setKeyPointsStr(e.target.value)} className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-amber focus:ring-2 focus:ring-amber/20 bg-slate-50 resize-none" placeholder="Contoh: Makna sosial, Habitualisasi..." />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Deskripsi <span className="text-red-500">*</span></label>
                <textarea required rows={4} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-amber focus:ring-2 focus:ring-amber/20 bg-slate-50 resize-none" />
              </div>
            </div>

            <div className="space-y-4 bg-slate-50 p-5 border border-slate-200 rounded-xl h-fit">
              <h4 className="font-bold text-navy border-b border-slate-200 pb-2 mb-2 font-poppins text-lg">Contoh Kasus Indonesia</h4>
              
              <div>
                <label className="block text-sm font-bold text-slate-600 mb-1">Judul Kasus <span className="text-red-500">*</span></label>
                <input required type="text" value={form.indonesiaCase?.title} onChange={(e) => setForm({ ...form, indonesiaCase: { ...form.indonesiaCase!, title: e.target.value }})} className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-amber" />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-600 mb-1">Skenario Lapangan <span className="text-red-500">*</span></label>
                <textarea required rows={3} value={form.indonesiaCase?.scenario} onChange={(e) => setForm({ ...form, indonesiaCase: { ...form.indonesiaCase!, scenario: e.target.value }})} className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-amber" />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-600 mb-1">Analisis <span className="text-red-500">*</span></label>
                <textarea required rows={4} value={form.indonesiaCase?.analysis} onChange={(e) => setForm({ ...form, indonesiaCase: { ...form.indonesiaCase!, analysis: e.target.value }})} className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-amber" />
              </div>
            </div>
            
            <div className="lg:col-span-2 pt-4 border-t border-slate-200 flex justify-end gap-3 mt-4">
               <button onClick={() => setShowForm(false)} className="px-6 py-3 font-bold text-slate-500 hover:text-navy transition-colors">
                 Batal
               </button>
               <button onClick={handleSave} className="px-8 py-3 bg-navy hover:bg-navy-dark text-white rounded-xl font-bold transition-all shadow-lg hover:shadow-navy/20 flex items-center gap-2">
                 <Save className="w-4 h-4"/> {editingId ? 'Simpan Perubahan' : 'Simpan Konsep'}
               </button>
            </div>
          </div>
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-6">
        {filteredConcepts.map((concept, i) => (
          <div key={concept.id} className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col justify-between hover:shadow-xl transition-shadow group">
            <div>
              <div className="flex justify-between items-start mb-4">
                 <div>
                   <h3 className="font-poppins font-bold text-xl text-navy">{concept.name}</h3>
                   <span className="text-sm text-sage font-bold uppercase tracking-wider">{concept.subtitle}</span>
                 </div>
                 <div className="w-12 h-12 rounded-2xl bg-amber/10 flex items-center justify-center text-amber group-hover:bg-amber group-hover:text-white transition-all group-hover:-rotate-12 duration-300">
                   <Glasses className="w-6 h-6" />
                 </div>
              </div>
              <p className="text-sm text-slate-600 line-clamp-3 mb-4 leading-relaxed">{concept.description}</p>
            </div>
            <div className="flex border-t border-slate-100 pt-4 justify-between items-center mt-auto">
              <span className="text-xs bg-slate-100 px-3 py-1 rounded-full font-medium text-slate-500">
                {concept.keyPoints?.length || 0} Konsep Kunci
              </span>
              <div className="flex gap-2">
                <button onClick={() => handleOpenEdit(concept)} className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
                  <Edit2 className="w-4 h-4" />
                </button>
                <button onClick={() => handleDelete(concept.id, concept.name)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
