import { useState } from 'react';
import { useAdminStore } from '@/store/useAdminStore';
import type { CommunityItem } from '@/store/useAdminStore';
import { Plus, Edit2, Trash2, X, Search, Users, Instagram, Image as ImageIcon, Building } from 'lucide-react';
import { toast } from 'sonner';

const CATEGORY_OPTIONS = [
  'Himpunan Resmi',
  'Komunitas Studi',
  'Komunitas Baca',
  'Komunitas Riset',
  'Komunitas Sosial',
  'Komunitas Lainnya',
];

const GRADIENT_COLORS = [
  { label: 'Sage', from: '#4a7c59', to: '#7fba91' },
  { label: 'Navy', from: '#1a2e4a', to: '#2d4f7a' },
  { label: 'Amber', from: '#e8a735', to: '#f5c66c' },
  { label: 'Violet', from: '#7c3aed', to: '#a78bfa' },
  { label: 'Rose', from: '#e11d48', to: '#fb7185' },
  { label: 'Teal', from: '#0f766e', to: '#2dd4bf' },
];

const defaultForm: Partial<CommunityItem> = {
  name: '',
  university: '',
  description: '',
  members: '',
  instagram: '',
  photo_url: '',
  category: 'Himpunan Resmi',
};

export default function KomunitasManager() {
  const { communities, addCommunity, updateCommunity, deleteCommunity, role } = useAdminStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<CommunityItem>>(defaultForm);
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

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
    setFormData(defaultForm);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (komunitas: CommunityItem) => {
    if (!checkRole()) return;
    setEditingId(komunitas.id);
    setFormData(komunitas);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string, name: string) => {
    if (!checkRole()) return;
    if (confirm(`Yakin ingin menghapus komunitas "${name}"?`)) {
      deleteCommunity(id);
      toast.success('Komunitas berhasil dihapus.');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name) {
      toast.error('Nama komunitas wajib diisi!');
      return;
    }
    if (editingId) {
      updateCommunity(editingId, formData);
      toast.success('Data komunitas berhasil diperbarui!');
    } else {
      const newItem: CommunityItem = {
        ...defaultForm,
        ...formData,
        id: `community-${Date.now()}`,
      } as CommunityItem;
      addCommunity(newItem);
      toast.success('Komunitas baru berhasil ditambahkan!');
    }
    setIsModalOpen(false);
  };

  const filtered = communities.filter(c =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (c.university || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-poppins font-bold text-navy">Komunitas & HMP</h2>
          <p className="text-slate-500 mt-2">
            Kelola data komunitas dan himpunan mahasiswa sosiologi
          </p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="flex items-center gap-2 px-6 py-3 bg-amber hover:bg-amber-dark text-white rounded-xl font-bold transition-all shadow-lg hover:shadow-amber/20"
        >
          <Plus className="w-5 h-5" />
          <span>Tambah Komunitas</span>
        </button>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
        <div className="flex items-center gap-3 bg-white px-4 py-3 rounded-lg border border-slate-200 shadow-sm flex-1 max-w-sm">
          <Search className="w-5 h-5 text-slate-400 shrink-0" />
          <input
            type="text"
            placeholder="Cari nama komunitas atau universitas..."
            className="bg-transparent border-none outline-none text-sm w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* View Mode Toggle */}
        <div className="flex gap-2 bg-white border border-slate-200 rounded-lg p-1 shadow-sm">
          <button
            onClick={() => setViewMode('grid')}
            className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all ${viewMode === 'grid' ? 'bg-navy text-white' : 'text-slate-500 hover:text-navy'}`}
          >
            Grid
          </button>
          <button
            onClick={() => setViewMode('table')}
            className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all ${viewMode === 'table' ? 'bg-navy text-white' : 'text-slate-500 hover:text-navy'}`}
          >
            Tabel
          </button>
        </div>

        <span className="text-sm text-slate-400 font-medium">
          {filtered.length} komunitas
        </span>
      </div>

      {/* Empty State */}
      {filtered.length === 0 && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-16 flex flex-col items-center justify-center text-center">
          <div className="w-16 h-16 bg-sage/10 rounded-2xl flex items-center justify-center mb-4">
            <Users className="w-8 h-8 text-sage" />
          </div>
          <p className="text-lg font-bold text-navy mb-2">Belum ada komunitas</p>
          <p className="text-slate-500 text-sm mb-6">Tambahkan komunitas atau HMP pertama</p>
          <button
            onClick={handleOpenAdd}
            className="flex items-center gap-2 px-5 py-2.5 bg-amber text-white rounded-xl font-bold text-sm hover:bg-amber-dark transition-all"
          >
            <Plus className="w-4 h-4" /> Tambah Sekarang
          </button>
        </div>
      )}

      {/* Grid View */}
      {viewMode === 'grid' && filtered.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((komunitas) => (
            <div
              key={komunitas.id}
              className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg hover:border-amber/40 hover:-translate-y-1 transition-all duration-300 overflow-hidden group"
            >
              {/* Photo / Avatar */}
              <div className="relative h-40 bg-gradient-to-br from-sage/20 to-navy/10 overflow-hidden">
                {komunitas.photo_url ? (
                  <img
                    src={komunitas.photo_url}
                    alt={komunitas.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Users className="w-16 h-16 text-slate-300" />
                  </div>
                )}
                {/* Category badge */}
                <span className="absolute top-3 left-3 text-xs font-bold uppercase tracking-wider text-white bg-navy/70 backdrop-blur-sm px-2.5 py-1 rounded-md">
                  {komunitas.category || 'Komunitas'}
                </span>
                {/* Action buttons hover */}
                <div className="absolute top-3 right-3 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => handleOpenEdit(komunitas)}
                    className="p-1.5 bg-white/90 backdrop-blur-sm text-amber hover:bg-amber hover:text-white rounded-lg transition-colors shadow"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(komunitas.id, komunitas.name)}
                    className="p-1.5 bg-white/90 backdrop-blur-sm text-red-500 hover:bg-red-500 hover:text-white rounded-lg transition-colors shadow"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <h4 className="font-poppins font-bold text-navy text-base leading-tight mb-1">
                  {komunitas.name}
                </h4>
                {komunitas.university && (
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-3">
                    <Building className="w-3 h-3" />
                    {komunitas.university}
                  </div>
                )}

                {komunitas.members && (
                  <div className="inline-flex items-center gap-1.5 text-xs font-bold text-sage-dark bg-sage/10 border border-sage/20 px-2.5 py-1 rounded-full mb-3">
                    <Users className="w-3 h-3" />
                    {komunitas.members}
                  </div>
                )}

                {komunitas.description && (
                  <p className="text-sm text-slate-600 leading-relaxed mb-4 line-clamp-2">
                    {komunitas.description}
                  </p>
                )}

                {komunitas.instagram && (
                  <a
                    href={komunitas.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-pink-600 hover:text-pink-700 bg-pink-50 hover:bg-pink-100 border border-pink-200 hover:border-pink-300 px-3 py-1.5 rounded-lg transition-all"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Instagram className="w-3.5 h-3.5" />
                    Instagram
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Table View */}
      {viewMode === 'table' && filtered.length > 0 && (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50 text-slate-500 text-sm">
                  <th className="p-4 font-bold">Komunitas</th>
                  <th className="p-4 font-bold">Universitas</th>
                  <th className="p-4 font-bold">Anggota</th>
                  <th className="p-4 font-bold">Kategori</th>
                  <th className="p-4 font-bold">Instagram</th>
                  <th className="p-4 font-bold">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((komunitas) => (
                  <tr key={komunitas.id} className="hover:bg-slate-50 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg overflow-hidden bg-sage/10 border border-slate-200 shrink-0">
                          {komunitas.photo_url ? (
                            <img src={komunitas.photo_url} alt={komunitas.name} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <Users className="w-5 h-5 text-slate-300" />
                            </div>
                          )}
                        </div>
                        <span className="font-bold text-navy">{komunitas.name}</span>
                      </div>
                    </td>
                    <td className="p-4 text-slate-600 text-sm">{komunitas.university || '—'}</td>
                    <td className="p-4 text-slate-600 text-sm">{komunitas.members || '—'}</td>
                    <td className="p-4">
                      <span className="text-xs font-bold bg-navy/5 text-navy border border-navy/10 px-2 py-1 rounded-md">
                        {komunitas.category || '—'}
                      </span>
                    </td>
                    <td className="p-4">
                      {komunitas.instagram ? (
                        <a href={komunitas.instagram} target="_blank" rel="noopener noreferrer"
                          className="text-pink-600 hover:text-pink-700 text-xs font-bold flex items-center gap-1"
                        >
                          <Instagram className="w-3.5 h-3.5" /> Link
                        </a>
                      ) : <span className="text-slate-400 text-xs">—</span>}
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <button onClick={() => handleOpenEdit(komunitas)} className="p-2 text-amber hover:bg-amber/10 rounded-lg transition-colors">
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button onClick={() => handleDelete(komunitas.id, komunitas.name)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modal Form */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-navy/60 backdrop-blur-sm" onClick={() => setIsModalOpen(false)} />
          <div className="bg-white rounded-3xl w-full max-w-2xl relative overflow-y-auto max-h-[90vh] shadow-2xl animate-scaleIn">
            {/* Modal Header */}
            <div className="p-8 border-b border-slate-100 flex justify-between items-center sticky top-0 bg-white/95 backdrop-blur-md z-10">
              <div>
                <h3 className="font-poppins font-bold text-2xl text-navy">
                  {editingId ? 'Edit Komunitas' : 'Tambah Komunitas'}
                </h3>
                <p className="text-sm text-slate-500 mt-1">Isi informasi komunitas atau HMP</p>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400">
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-8 space-y-5">
              {/* Nama & Universitas */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-navy mb-2">Nama Komunitas / HMP <span className="text-red-500">*</span></label>
                  <input
                    required
                    value={formData.name || ''}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-amber text-sm"
                    placeholder="Contoh: HMP Sosiologi UNESA"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-navy mb-2">Universitas / Institusi</label>
                  <input
                    value={formData.university || ''}
                    onChange={(e) => setFormData({ ...formData, university: e.target.value })}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-amber text-sm"
                    placeholder="Contoh: Universitas Negeri Surabaya"
                  />
                </div>
              </div>

              {/* Anggota & Kategori */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-navy mb-2">Jumlah Anggota</label>
                  <input
                    value={formData.members || ''}
                    onChange={(e) => setFormData({ ...formData, members: e.target.value })}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-amber text-sm"
                    placeholder="Contoh: 120+ anggota"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-navy mb-2">Kategori</label>
                  <select
                    value={formData.category || 'Himpunan Resmi'}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-amber text-sm"
                  >
                    {CATEGORY_OPTIONS.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Link Foto */}
              <div>
                <label className="block text-sm font-bold text-navy mb-2">
                  <span className="flex items-center gap-2"><ImageIcon className="w-4 h-4" /> Link Foto / Logo</span>
                </label>
                <input
                  value={formData.photo_url || ''}
                  onChange={(e) => setFormData({ ...formData, photo_url: e.target.value })}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-amber text-sm"
                  placeholder="https://example.com/foto-komunitas.jpg"
                />
                {/* Preview foto */}
                {formData.photo_url && (
                  <div className="mt-2 flex items-center gap-3">
                    <img
                      src={formData.photo_url}
                      alt="Preview"
                      className="w-16 h-16 rounded-lg object-cover border border-slate-200 bg-slate-100"
                      onError={(e) => { (e.target as HTMLImageElement).style.opacity = '0.3'; }}
                    />
                    <span className="text-xs text-slate-400">Preview foto</span>
                  </div>
                )}
              </div>

              {/* Link Instagram */}
              <div>
                <label className="block text-sm font-bold text-navy mb-2">
                  <span className="flex items-center gap-2"><Instagram className="w-4 h-4 text-pink-500" /> Link Instagram</span>
                </label>
                <input
                  value={formData.instagram || ''}
                  onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-amber text-sm"
                  placeholder="https://www.instagram.com/hmpsosiologi..."
                />
              </div>

              {/* Deskripsi */}
              <div>
                <label className="block text-sm font-bold text-navy mb-2">Deskripsi Singkat</label>
                <textarea
                  value={formData.description || ''}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl h-28 focus:outline-none focus:border-amber text-sm resize-y"
                  placeholder="Ceritakan singkat tentang komunitas ini — kegiatan, fokus, atau visi misinya..."
                />
              </div>

              {/* Actions */}
              <div className="pt-4 border-t border-slate-100 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-6 py-3 font-bold text-slate-500 hover:text-navy transition-colors"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-8 py-3 bg-navy hover:bg-navy-dark text-white rounded-xl font-bold transition-all shadow-lg hover:shadow-navy/20"
                >
                  {editingId ? 'Simpan Perubahan' : 'Tambah Komunitas'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
