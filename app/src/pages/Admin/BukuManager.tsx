import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Search, X, Book, ExternalLink, Save } from 'lucide-react';
import { useAdminStore } from '@/store/useAdminStore';
import { toast } from 'sonner';

export default function BukuManager() {
  const { books, addBook, updateBook, deleteBook } = useAdminStore();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const [form, setForm] = useState({
    title: '',
    link: '',
    description: ''
  });

  const filteredBooks = books.filter(b => 
    b.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    b.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.link) {
      toast.error('Judul dan Tautan wajib diisi!');
      return;
    }

    if (editingId) {
      updateBook(editingId, form);
      toast.success('Referensi Buku berhasil diperbarui!');
    } else {
      addBook({ ...form, id: `buku-${Date.now()}` });
      toast.success('Referensi Buku berhasil ditambahkan!');
    }

    setShowForm(false);
    setForm({ title: '', link: '', description: '' });
    setEditingId(null);
  };

  const handleEdit = (book: any) => {
    setForm({
      title: book.title,
      link: book.link,
      description: book.description
    });
    setEditingId(book.id);
    setShowForm(true);
  };

  const handleDelete = (id: string, title: string) => {
    if (window.confirm(`Yakin ingin menghapus referensi buku "${title}"?`)) {
      deleteBook(id);
      toast.success('Referensi Buku berhasil dihapus!');
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto mb-20 animate-fadeIn">
      {/* Header Area */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-navy flex items-center gap-2">
            <Book className="w-6 h-6 text-amber" />
            Manajemen Referensi Buku
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Kelola daftar buku sosiologi sebagai bahan referensi bacaan mahasiswa.
          </p>
        </div>
        
        {!showForm && (
          <button
            onClick={() => {
              setForm({ title: '', link: '', description: '' });
              setEditingId(null);
              setShowForm(true);
            }}
            className="flex items-center gap-2 px-4 py-2 bg-amber hover:bg-amber-dark text-white rounded-lg transition-colors shadow-sm font-medium"
          >
            <Plus className="w-5 h-5" />
            Tambah Buku
          </button>
        )}
      </div>

      {/* Form Area */}
      {showForm && (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden mb-8 animate-slideDown">
          <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex justify-between items-center">
            <h2 className="font-semibold text-navy flex items-center gap-2">
              {editingId ? <Edit2 className="w-4 h-4 text-amber" /> : <Plus className="w-4 h-4 text-amber" />}
              {editingId ? 'Edit Referensi Buku' : 'Tambah Buku Baru'}
            </h2>
            <button 
              onClick={() => setShowForm(false)}
              className="text-slate-400 hover:text-red-500 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <form onSubmit={handleSubmit} className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-slate-700 mb-1">Judul Buku <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  required
                  value={form.title}
                  onChange={e => setForm({...form, title: e.target.value})}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber/20 focus:border-amber outline-none transition-all"
                  placeholder="Contoh: Sosiologi Suatu Pengantar"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-slate-700 mb-1">Tautan Pembelian / E-Book (URL) <span className="text-red-500">*</span></label>
                <input
                  type="url"
                  required
                  value={form.link}
                  onChange={e => setForm({...form, link: e.target.value})}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber/20 focus:border-amber outline-none transition-all text-blue-600"
                  placeholder="https://"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-slate-700 mb-1">Deskripsi & Nama Penulis</label>
                <textarea
                  required
                  rows={3}
                  value={form.description}
                  onChange={e => setForm({...form, description: e.target.value})}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber/20 focus:border-amber outline-none transition-all"
                  placeholder="Buku oleh Soerjono Soekanto yang membahas tentang..."
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-6 py-2 border border-slate-300 text-slate-700 hover:bg-slate-50 rounded-lg transition-colors font-medium"
              >
                Batal
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-navy hover:bg-navy-light text-white rounded-lg transition-colors flex items-center gap-2 font-medium"
              >
                <Save className="w-4 h-4" />
                {editingId ? 'Simpan Perubahan' : 'Simpan Buku'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* List Area */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
          <div className="relative w-72">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Cari buku..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber/20 focus:border-amber outline-none transition-all text-sm"
            />
          </div>
          <div className="text-sm text-slate-500 font-medium">
            Total: {filteredBooks.length} Buku
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-100/50 text-slate-600 text-sm">
                <th className="px-6 py-4 font-semibold w-1/4">Judul Buku</th>
                <th className="px-6 py-4 font-semibold w-2/4">Deskripsi / Penulis</th>
                <th className="px-6 py-4 font-semibold w-1/4">Tautan</th>
                <th className="px-6 py-4 font-semibold text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredBooks.length > 0 ? (
                filteredBooks.map((book) => (
                  <tr key={book.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="font-medium text-navy">{book.title}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-slate-600 line-clamp-2">{book.description}</div>
                    </td>
                    <td className="px-6 py-4">
                      <a href={book.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-blue-600 hover:text-blue-800 text-sm bg-blue-50 px-2 py-1 rounded-md transition-colors">
                        Buka Tautan <ExternalLink className="w-3 h-3" />
                      </a>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => handleEdit(book)}
                          className="p-1.5 text-blue-600 hover:bg-blue-50 rounded"
                          title="Edit"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(book.id, book.title)}
                          className="p-1.5 text-red-600 hover:bg-red-50 rounded"
                          title="Hapus"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-slate-500">
                    <div className="flex flex-col items-center gap-3">
                      <Book className="w-8 h-8 text-slate-300" />
                      <p>Tidak ada referensi buku yang ditemukan.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
