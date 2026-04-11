import { useState } from 'react';
import { useAdminStore } from '@/store/useAdminStore';
import { Lock, ArrowRight, Home } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

export default function AdminAccess() {
  const [accessKey, setAccessKey] = useState('');
  const login = useAdminStore(state => state.login);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const success = login(accessKey);
    if (!success) {
      toast.error('Access Key tidak valid. Petunjuk: coba "admin123"');
    } else {
      toast.success('Berhasil login ke Admin Panel');
    }
  };

  return (
    <div className="min-h-screen bg-navy flex flex-col items-center justify-center p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-sage rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-amber rounded-full blur-3xl" />
      </div>

      <Link to="/" className="absolute top-8 left-8 flex items-center gap-2 text-white/50 hover:text-white transition-colors">
        <Home className="w-5 h-5" />
        <span className="font-medium text-sm">Kembali ke Web</span>
      </Link>

      <div className="bg-navy-light/50 backdrop-blur-xl border border-white/10 p-8 sm:p-12 rounded-[2rem] w-full max-w-md relative z-10 shadow-2xl">
        <div className="w-16 h-16 bg-gradient-to-br from-amber to-amber-light rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-amber/20">
          <Lock className="w-8 h-8 text-navy" />
        </div>
        
        <h1 className="font-poppins font-bold text-3xl text-white text-center mb-2">Admin Panel</h1>
        <p className="text-slate-400 text-center text-sm mb-8">SociScope - Universitas Negeri Surabaya</p>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-xs font-bold text-white/50 uppercase tracking-widest mb-2 px-2">Access Key</label>
            <input 
              type="password" 
              value={accessKey}
              onChange={(e) => setAccessKey(e.target.value)}
              placeholder="Masukkan kunci akses..."
              className="w-full bg-black/20 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:ring-2 focus:ring-amber/50 focus:border-transparent transition-all"
            />
          </div>
          
          <button 
            type="submit"
            className="w-full bg-amber hover:bg-amber-light text-navy font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-md active:scale-95"
          >
            Masuk <ArrowRight className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  );
}
