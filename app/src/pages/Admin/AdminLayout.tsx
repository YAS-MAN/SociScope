import { useState } from 'react';
import type { ReactNode } from 'react';
import { useAdminStore, type AdminRole } from '@/store/useAdminStore';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  BookOpen,
  Briefcase,
  MessageSquare,
  Newspaper,
  LogOut,
  Shield,
  Glasses,
  Eye,
  Target,
  Menu,
  X as XIcon,
  UserCircle,
  GraduationCap,
  Library,
  BookMarked
} from 'lucide-react';

interface Props {
  children: ReactNode;
}

export default function AdminLayout({ children }: Props) {
  const { role, setRole, logout } = useAdminStore();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const menuItems = [
    { path: '/admin', icon: LayoutDashboard, label: 'Analytics Dashboard' },
    { path: '/admin/teori', icon: BookOpen, label: 'Master Data Teori' },
    { path: '/admin/tokoh', icon: UserCircle, label: 'Manajemen Tokoh' },
    { path: '/admin/karir', icon: Briefcase, label: 'Career Roadmap' },
    { path: '/admin/alumni', icon: GraduationCap, label: 'Alumni Manager' },
    { path: '/admin/kacamata', icon: Glasses, label: 'Master Konsep Kacamata' },
    { path: '/admin/ujianalisis', icon: Target, label: 'Kasus Uji Analisis' },
    { path: '/admin/jurnal', icon: BookMarked, label: 'Referensi Jurnal' },
    { path: '/admin/buku', icon: Library, label: 'Referensi Buku' },
    { path: '/admin/cms', icon: Newspaper, label: 'Article CMS' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-navy/60 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`w-72 bg-navy text-white flex flex-col fixed inset-y-0 left-0 z-40 transform transition-transform duration-300 lg:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-amber rounded-xl overflow-hidden flex items-center justify-center shadow-lg shrink-0">
              <img src="/logo_sociozone_raw.png" alt="SocioZone" className="w-full h-full object-contain p-0.5" />
            </div>
            <div>
              <h1 className="font-poppins font-bold text-lg leading-tight">SocioZone</h1>
              <p className="text-[10px] text-slate-400 tracking-wider uppercase font-bold">Admin Panel</p>
            </div>
          </div>
          <button
            className="lg:hidden p-2 text-white/70 hover:text-white"
            onClick={() => setIsSidebarOpen(false)}
          >
            <XIcon className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 p-4 flex flex-col gap-2 overflow-y-auto custom-scrollbar">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${isActive
                  ? 'bg-sage/20 text-sage-light border border-sage/30'
                  : 'text-slate-400 hover:bg-white/5 hover:text-white'
                  }`}
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </Link>
            )
          })}
        </nav>

        <div className="p-4 border-t border-white/10">
          <div className="bg-navy-light rounded-xl p-4 border border-white/5">
            <div className="flex items-center gap-3 mb-3">
              <Shield className="w-5 h-5 text-amber" />
              <div className="text-sm font-bold text-white">Simulasi Role UI</div>
            </div>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value as AdminRole)}
              className="w-full bg-black/20 border border-white/10 rounded-lg text-xs p-2 text-white outline-none focus:border-amber"
            >
              <option value="Super Admin" className="text-black">Super Admin</option>
              <option value="Editor Prodi" className="text-black">Editor Prodi</option>
            </select>
          </div>

          <button
            onClick={logout}
            className="w-full mt-4 flex items-center justify-center gap-2 px-4 py-3 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-xl text-sm font-bold transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Keluar
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="lg:ml-72 flex-1 min-h-screen flex flex-col bg-slate-50/50 w-full">
        {/* Topbar */}
        <header className="h-20 bg-white border-b border-slate-200 px-4 md:px-8 flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <button
              className="lg:hidden p-2 bg-slate-100 text-navy hover:bg-amber hover:text-white rounded-lg transition-colors border border-slate-200"
              onClick={() => setIsSidebarOpen(true)}
            >
              <Menu className="w-5 h-5" />
            </button>
            <div>
              <h2 className="font-poppins font-bold text-lg md:text-xl text-navy">
                {menuItems.find(i => i.path === location.pathname)?.label || 'Admin Panel'}
              </h2>
              <p className="hidden md:block text-xs text-slate-500 font-medium">Sistem Manajemen Data SocioZone</p>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-slate-100 rounded-full px-4 py-2 border border-slate-200 shadow-sm">
            <div className="w-8 h-8 rounded-full bg-navy flex items-center justify-center text-white font-bold text-sm">
              {role === 'Super Admin' ? 'SA' : 'EP'}
            </div>
            <div className="text-sm font-bold text-navy">
              {role}
            </div>
          </div>
        </header>

        {/* Content Render */}
        <div className="p-4 md:p-8 flex-1 overflow-x-hidden">
          {children}
        </div>
      </main>
    </div>
  );
}
