import { useState } from 'react';
import { useAdminStore } from '@/store/useAdminStore';
import { Eye, Plus, Edit2, Trash2, Search, X, Save, ChevronDown, ChevronUp } from 'lucide-react';
import { toast } from 'sonner';

interface KasusForm {
  title: string;
  description: string;
  context: string;
}

const emptyForm: KasusForm = {
  title: '',
  description: '',
  context: '',
};

export default function UjiAnalisisManager() {
  const { kacamataCases, role, addInteractiveCase, updateInteractiveCase, deleteInteractiveCase } = useAdminStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<KasusForm>(emptyForm);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const isEditor = role === 'Editor Prodi';

  const filteredCases = kacamataCases.filter(k =>
    k.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    k.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenAdd = () => {
    if (isEditor) {
      toast.error('Akses Ditolak: Hanya Super Admin yang dapat menambah kasus.');
      return;
    }
    setEditingId(null);
    setForm(emptyForm);
    setShowForm(true);
  };

  const handleOpenEdit = (kasus: typeof kacamataCases[0]) => {
    if (isEditor) {
      toast.error('Akses Ditolak: Hanya Super Admin yang dapat mengedit kasus.');
      return;
    }
    setEditingId(kasus.id);
    setForm({ title: kasus.title, description: kasus.description, context: kasus.context });
    setShowForm(true);
  };

  const handleDelete = (id: string, title: string) => {
    if (isEditor) {
      toast.error('Akses Ditolak: Hanya Super Admin yang dapat menghapus kasus.');
      return;
    }
    if (window.confirm(`Hapus kasus "${title}"?`)) {
      deleteInteractiveCase(id);
      toast.success('Kasus berhasil dihapus.');
    }
  };

  const handleSave = () => {
    if (!form.title.trim() || !form.description.trim()) {
      toast.error('Judul dan deskripsi kasus wajib diisi.');
      return;
    }

    if (editingId) {
      updateInteractiveCase(editingId, form);
      toast.success(`Kasus "${form.title}" berhasil diperbarui.`);
    } else {
      addInteractiveCase({ ...form, id: `case-${Date.now()}` } as any);
      toast.success(`Kasus "${form.title}" berhasil ditambahkan.`);
    }
    setShowForm(false);
    setForm(emptyForm);
    setEditingId(null);
  };

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

      {/* ======= FORM TAMBAH/EDIT (collapsible) ======= */}
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
                <p className="text-xs text-slate-500">Kasus yang ditampilkan di halaman Kacamata â†’ Uji Analisis</p>
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
          <div className="p-6 space-y-5">
            {/* Judul */}
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                Judul Kasus <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={form.title}
                onChange={(e) => setForm(f => ({ ...f, title: e.target.value }))}
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
                rows={3}
                value={form.description}
                onChange={(e) => setForm(f => ({ ...f, description: e.target.value }))}
                placeholder="Ringkasan singkat tentang kasus ini (2-3 kalimat)..."
                className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-sage focus:ring-2 focus:ring-sage/20 bg-slate-50 resize-none transition-all"
              />
            </div>

            {/* Konteks */}
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                Konteks / Latar Belakang
              </label>
              <textarea
                rows={4}
                value={form.context}
                onChange={(e) => setForm(f => ({ ...f, context: e.target.value }))}
                placeholder="Penjelasan lebih detail tentang situasi dan latar belakang kasus..."
                className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-sage focus:ring-2 focus:ring-sage/20 bg-slate-50 resize-none transition-all"
              />
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-2">
              <button
                onClick={handleSave}
                className="flex-1 flex items-center justify-center gap-2 px-5 py-3 bg-sage hover:bg-sage-light text-white font-bold rounded-xl transition-all shadow-md text-sm"
              >
                <Save className="w-4 h-4" />
                {editingId ? 'Simpan Perubahan' : 'Tambah Kasus'}
              </button>
              <button
                onClick={() => { setShowForm(false); setForm(emptyForm); setEditingId(null); }}
                className="px-5 py-3 border border-slate-200 text-slate-600 font-bold rounded-xl hover:bg-slate-50 transition-all text-sm"
              >
                Batal
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ======= KASUS LIST ======= */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
        {filteredCases.length === 0 ? (
          <div className="p-16 text-center">
            <Eye className="w-12 h-12 mx-auto mb-3 text-slate-200" />
            <p className="text-slate-500 font-medium">
              {searchTerm ? 'Kasus tidak ditemukan.' : 'Belum ada kasus. Tambahkan kasus pertama!'}
            </p>
            {!searchTerm && (
              <button
                onClick={handleOpenAdd}
                className="mt-4 text-sage font-bold text-sm hover:underline"
              >
                + Tambah sekarang
              </button>
            )}
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {filteredCases.map((kasus, i) => (
              <div key={kasus.id} className="hover:bg-slate-50/50 transition-colors">
                {/* Row header */}
                <div className="p-5 flex items-start gap-4">
                  {/* Number */}
                  <div className="w-8 h-8 rounded-lg bg-sage/10 flex items-center justify-center text-sage font-bold text-sm shrink-0 mt-0.5">
                    {i + 1}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-navy text-sm mb-1 truncate">{kasus.title}</h4>
                    <p className="text-xs text-slate-500 line-clamp-2">{kasus.description}</p>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 shrink-0">
                    {/* Expand/collapse */}
                    <button
                      onClick={() => setExpandedId(expandedId === kasus.id ? null : kasus.id)}
                      className="p-2 rounded-lg bg-slate-100 text-slate-500 hover:bg-slate-200 transition-colors"
                      title="Lihat Detail"
                    >
                      {expandedId === kasus.id
                        ? <ChevronUp className="w-4 h-4" />
                        : <ChevronDown className="w-4 h-4" />
                      }
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
                {expandedId === kasus.id && kasus.context && (
                  <div className="px-5 pb-5 pl-[72px]">
                    <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Konteks / Latar Belakang</p>
                      <p className="text-sm text-slate-600 leading-relaxed">{kasus.context}</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
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
