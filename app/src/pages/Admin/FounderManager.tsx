import { useState } from 'react';
import { useAdminStore } from '@/store/useAdminStore';
import type { Sociologist } from '@/store/useAdminStore';
import { Plus, Edit2, Trash2, X, Search, UserCircle, Tag } from 'lucide-react';
import { toast } from 'sonner';

const SOCIOLOGIST_CATEGORIES = [
  'Klasik',
  'Modern',
  'Kontemporer',
  'Indonesia',
  'Islam',
  'Eropa',
  'Pendidikan',
  'Politik',
  'Kritis',
  'Post Modern',
];

const CATEGORY_COLORS: Record<string, string> = {
  'Klasik':        'bg-amber/10 text-amber-dark border-amber/20',
  'Modern':        'bg-blue-50 text-blue-700 border-blue-200',
  'Kontemporer':   'bg-violet-50 text-violet-700 border-violet-200',
  'Indonesia':     'bg-red-50 text-red-700 border-red-200',
  'Islam':         'bg-emerald-50 text-emerald-700 border-emerald-200',
  'Eropa':         'bg-sky-50 text-sky-700 border-sky-200',
  'Pendidikan':    'bg-orange-50 text-orange-700 border-orange-200',
  'Politik':       'bg-slate-100 text-slate-700 border-slate-300',
  'Kritis':        'bg-rose-50 text-rose-700 border-rose-200',
  'Post Modern':   'bg-fuchsia-50 text-fuchsia-700 border-fuchsia-200',
};

export default function FounderManager() {
  const { sociologists, addSociologist, updateSociologist, deleteSociologist, role } = useAdminStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('');
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const [formData, setFormData] = useState<Partial<Sociologist>>({
    name: '',
    years: '',
    title: '',
    quote: '',
    contribution: '',
    bio: '',
    image: '',
    color: 'from-amber/30 to-amber/10',
    accent: '#e8a735',
    categories: [],
  });

  const checkRole = () => {
    if (role !== 'Super Admin') {
      toast.error('Hanya Super Admin yang dapat mengubah data!');
      return false;
    }
    return true;
  };

  const handleOpenAdd = () => {
    if (!checkRole()) return;
    setEditingId(null);
    setFormData({
      name: '', years: '', title: '', quote: '', contribution: '', bio: '', image: '',
      color: 'from-amber/30 to-amber/10', accent: '#e8a735', categories: [],
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (tokoh: Sociologist) => {
    if (!checkRole()) return;
    setEditingId(tokoh.id);
    setFormData({ ...tokoh, categories: tokoh.categories ?? [] });
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (!checkRole()) return;
    if (confirm('Yakin ingin menghapus tokoh ini?')) {
      deleteSociologist(id);
      toast.success('Tokoh berhasil dihapus');
    }
  };

  const toggleCategory = (cat: string) => {
    const current = formData.categories ?? [];
    if (current.includes(cat)) {
      setFormData({ ...formData, categories: current.filter(c => c !== cat) });
    } else {
      setFormData({ ...formData, categories: [...current, cat] });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.title || !formData.contribution) {
      toast.error('Nama, Gelar, dan Kontribusi wajib diisi!');
      return;
    }

    if (editingId) {
      updateSociologist(editingId, formData);
      toast.success('Data tokoh berhasil diperbarui!');
    } else {
      const newTokoh = { ...formData, id: Math.floor(Math.random() * 1000000) };
      addSociologist(newTokoh as any);
      toast.success('Tokoh baru berhasil ditambahkan!');
    }
    setIsModalOpen(false);
  };

  const filteredTokoh = sociologists.filter(s => {
    const matchSearch = s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchCat = !filterCategory || (s.categories ?? []).includes(filterCategory);
    return matchSearch && matchCat;
  });

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-poppins font-bold text-navy">Manajemen Tokoh Sosiologi</h2>
          <p className="text-slate-500 mt-2">Daftar ahli, sosiolog, dan kontributor ilmu</p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="flex items-center gap-2 px-6 py-3 bg-amber hover:bg-amber-dark text-white rounded-xl font-bold transition-all shadow-lg hover:shadow-amber/20"
        >
          <Plus className="w-5 h-5" />
          <span>Tambah Tokoh</span>
        </button>
      </div>

      {/* Filter & Search */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex flex-col sm:flex-row gap-3">
          <div className="flex items-center gap-3 bg-slate-50 px-4 py-3 rounded-lg border border-slate-200 flex-1 max-w-sm">
            <Search className="w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Cari nama tokoh..."
              className="bg-transparent border-none outline-none text-sm w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Category Filter */}
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => setFilterCategory('')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${!filterCategory ? 'bg-navy text-white border-navy' : 'bg-white text-slate-600 border-slate-200 hover:border-navy/30'}`}
            >
              Semua
            </button>
            {SOCIOLOGIST_CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setFilterCategory(filterCategory === cat ? '' : cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${filterCategory === cat ? 'bg-amber text-white border-amber' : `${CATEGORY_COLORS[cat]} hover:opacity-80`}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-sm">
                <th className="p-4 font-bold">Profil Tokoh</th>
                <th className="p-4 font-bold">Tahun Hidup</th>
                <th className="p-4 font-bold">Klasifikasi</th>
                <th className="p-4 font-bold max-w-sm">Kontribusi Utama</th>
                <th className="p-4 font-bold">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredTokoh.map((tokoh) => (
                <tr key={tokoh.id} className="hover:bg-slate-50 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <img src={tokoh.image} alt={tokoh.name} className="w-12 h-12 rounded-lg object-cover object-top border border-slate-200 bg-slate-100" />
                      <div>
                        <span className="font-bold text-navy block">{tokoh.name}</span>
                        <span className="text-xs text-amber-dark font-bold uppercase tracking-wider">{tokoh.title}</span>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-slate-600 font-medium">{tokoh.years}</td>
                  <td className="p-4">
                    <div className="flex flex-wrap gap-1">
                      {(tokoh.categories ?? []).length === 0 ? (
                        <span className="text-slate-400 text-xs">—</span>
                      ) : (
                        (tokoh.categories ?? []).map(cat => (
                          <span key={cat} className={`text-xs font-bold px-2 py-0.5 rounded-md border ${CATEGORY_COLORS[cat] ?? 'bg-slate-100 text-slate-600 border-slate-200'}`}>
                            {cat}
                          </span>
                        ))
                      )}
                    </div>
                  </td>
                  <td className="p-4 text-slate-600 text-sm max-w-sm truncate" title={tokoh.contribution}>
                    {tokoh.contribution}
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => handleOpenEdit(tokoh)}
                        className="p-2 text-amber hover:bg-amber/10 rounded-lg transition-colors"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDelete(tokoh.id)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              
              {filteredTokoh.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-slate-500">
                    <div className="flex flex-col items-center justify-center">
                      <UserCircle className="w-12 h-12 text-slate-300 mb-3" />
                      <p>Belum ada data tokoh sosiologi.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Form */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-navy/60 backdrop-blur-sm" onClick={() => setIsModalOpen(false)} />
          <div className="bg-white rounded-3xl w-full max-w-2xl relative hidden-scrollbar overflow-y-auto max-h-[90vh] shadow-2xl animate-scaleIn">
            <div className="p-8 border-b border-slate-100 flex justify-between items-center sticky top-0 bg-white/90 backdrop-blur-md z-10">
              <div>
                <h3 className="font-poppins font-bold text-2xl text-navy">
                  {editingId ? 'Edit Tokoh' : 'Tambah Tokoh'}
                </h3>
                <p className="text-sm text-slate-500 mt-1">Lengkapi informasi sejarah dan karya tokoh.</p>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400">
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-8 space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-navy mb-2">Nama Lengkap</label>
                    <input required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-amber text-sm" placeholder="Contoh: Auguste Comte" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-navy mb-2">Tahun / Masa Hidup</label>
                    <input required value={formData.years} onChange={(e) => setFormData({...formData, years: e.target.value})} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-amber text-sm" placeholder="Contoh: 1798 - 1857" />
                  </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-navy mb-2">Gelar Teori / Title</label>
                    <input required value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-amber text-sm" placeholder="Contoh: Bapak Sosiologi" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-navy mb-2">URL Gambar (Image Link)</label>
                    <input required value={formData.image} onChange={(e) => setFormData({...formData, image: e.target.value})} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-amber text-sm" placeholder="Contoh: https://example.com/photo.jpg" />
                  </div>
              </div>

              {/* Klasifikasi Multi-Checkbox */}
              <div>
                <label className="block text-sm font-bold text-navy mb-3 flex items-center gap-2">
                  <Tag className="w-4 h-4 text-amber" />
                  Klasifikasi Tokoh
                  <span className="text-xs font-normal text-slate-400 ml-1">(bisa lebih dari satu)</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {SOCIOLOGIST_CATEGORIES.map((cat) => {
                    const isSelected = (formData.categories ?? []).includes(cat);
                    return (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => toggleCategory(cat)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all select-none ${
                          isSelected
                            ? `${CATEGORY_COLORS[cat]} ring-2 ring-offset-1 ring-amber/40 scale-105`
                            : 'bg-slate-50 text-slate-500 border-slate-200 hover:border-slate-300 hover:bg-slate-100'
                        }`}
                      >
                        {isSelected && <span className="mr-1">✓</span>}
                        {cat}
                      </button>
                    );
                  })}
                </div>
                {(formData.categories ?? []).length > 0 && (
                  <p className="text-xs text-slate-400 mt-2">
                    Dipilih: {(formData.categories ?? []).join(', ')}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-bold text-navy mb-2">Kutipan Terkenal (Quote)</label>
                <textarea required value={formData.quote} onChange={(e) => setFormData({...formData, quote: e.target.value})} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl h-20 focus:outline-none focus:border-amber text-sm" placeholder="Kutipan berkesan dari tokoh..."></textarea>
              </div>

              <div>
                <label className="block text-sm font-bold text-navy mb-2">Kontribusi Spesifik</label>
                <textarea required value={formData.contribution} onChange={(e) => setFormData({...formData, contribution: e.target.value})} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl h-24 focus:outline-none focus:border-amber text-sm" placeholder="Jelaskan kontribusi tokoh pada sosiologi (ringkas, 1-2 kalimat)..."></textarea>
              </div>

              <div>
                <label className="block text-sm font-bold text-navy mb-2">
                  Biografi Lengkap
                  <span className="ml-2 text-xs font-normal text-slate-400">(Ditampilkan di halaman Teori — profil tokoh)</span>
                </label>
                <textarea
                  value={formData.bio ?? ''}
                  onChange={(e) => setFormData({...formData, bio: e.target.value})}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl h-40 focus:outline-none focus:border-amber text-sm resize-y"
                  placeholder="Tulis biografi panjang tokoh di sini. Ceritakan latar belakang, pemikiran utama, karya-karya penting, dan warisan intelektualnya (3-5 paragraf)..."
                />
              </div>

              <div className="pt-6 border-t border-slate-100 flex justify-end gap-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-6 py-3 font-bold text-slate-500 hover:text-navy transition-colors">
                  Batal
                </button>
                <button type="submit" className="px-8 py-3 bg-navy hover:bg-navy-dark text-white rounded-xl font-bold transition-all shadow-lg hover:shadow-navy/20">
                  Simpan Tokoh
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
