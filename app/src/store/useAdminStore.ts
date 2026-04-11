import { create } from 'zustand';
import { theories as initialTheories, careers as initialCareers, alumniData, hmpData } from '@/data/sociologyData';

// Types
import type { Theory, Career } from '@/data/sociologyData';

export type AdminRole = 'Super Admin' | 'Editor Prodi';

export interface AuditLog {
  id: string;
  action: string;
  timestamp: Date;
  user: AdminRole;
}

export interface UserMessage {
  id: string;
  sender: string;
  topic: string;
  content: string;
  date: string;
  status: 'Unread' | 'Replied';
}

interface AdminState {
  isAuthenticated: boolean;
  role: AdminRole;
  
  theories: Theory[];
  careers: Career[];
  alumniData: any[];
  hmpData: string[];
  hiddenRssLinks: string[]; // URLs of RSS articles hidden by admin
  messages: UserMessage[];
  auditLogs: AuditLog[];

  // Actions
  login: (accessKey: string) => boolean;
  logout: () => void;
  setRole: (role: AdminRole) => void;
  
  // Data Mutators
  addTheory: (theory: Theory) => void;
  updateTheory: (id: string, theory: Partial<Theory>) => void;
  deleteTheory: (id: string) => void;
  
  updateCareer: (id: string, career: Partial<Career>) => void;
  
  toggleRssVisibility: (link: string) => void;
  
  replyMessage: (id: string) => void;
  
  logAction: (action: string) => void;
}

export const useAdminStore = create<AdminState>((set, get) => ({
  isAuthenticated: false,
  role: 'Super Admin',
  
  theories: initialTheories,
  careers: initialCareers,
  alumniData: alumniData,
  hmpData: hmpData,
  hiddenRssLinks: [],
  messages: [
    { id: '1', sender: 'Mahasiswa Baru 2026', topic: 'Analisis Imajinasi Sosiologis', content: 'Menurut saya fenomena PHK ini...', date: '10 Apr 2026', status: 'Unread' },
    { id: '2', sender: 'HMP Sosiologi', topic: 'Jejaring', content: 'Apakah prodi bisa bantu share info seminar nasional?', date: '11 Apr 2026', status: 'Unread' },
  ],
  auditLogs: [
    { id: 'log-1', action: 'Sistem diinisiasi', timestamp: new Date(), user: 'Super Admin' }
  ],
  
  login: (accessKey) => {
    if (accessKey === 'admin123') {
      set({ isAuthenticated: true });
      get().logAction('Melakukan Login');
      return true;
    }
    return false;
  },
  
  logout: () => {
    set({ isAuthenticated: false });
  },
  
  setRole: (role) => {
    set({ role });
    get().logAction(`Berubah role menjadi ${role}`);
  },
  
  addTheory: (theory) => {
    set((state) => ({ theories: [...state.theories, theory] }));
    get().logAction(`Menambah Teori baru: ${theory.name}`);
  },
  
  updateTheory: (id, updatedFields) => {
    set((state) => ({
      theories: state.theories.map(t => t.id === id ? { ...t, ...updatedFields } : t)
    }));
    get().logAction(`Mengupdate Teori: ${updatedFields.name || id}`);
  },
  
  deleteTheory: (id) => {
    const theory = get().theories.find(t => t.id === id);
    set((state) => ({
      theories: state.theories.filter(t => t.id !== id)
    }));
    get().logAction(`Menghapus Teori: ${theory?.name || id}`);
  },
  
  updateCareer: (id, updatedFields) => {
    set((state) => ({
      careers: state.careers.map(c => c.id === id ? { ...c, ...updatedFields } : c)
    }));
    get().logAction(`Mengupdate roadmap karir: ${updatedFields.title || id}`);
  },
  
  toggleRssVisibility: (link) => {
    const hidden = get().hiddenRssLinks;
    if (hidden.includes(link)) {
      set({ hiddenRssLinks: hidden.filter(l => l !== link) });
      get().logAction(`Menampilkan artikel RSS: ${link}`);
    } else {
      set({ hiddenRssLinks: [...hidden, link] });
      get().logAction(`Menyembunyikan artikel RSS: ${link}`);
    }
  },
  
  replyMessage: (id) => {
    set((state) => ({
      messages: state.messages.map(m => m.id === id ? { ...m, status: 'Replied' } : m)
    }));
    get().logAction(`Membalas pesan ID: ${id}`);
  },
  
  logAction: (action) => {
    const newLog: AuditLog = {
      id: Date.now().toString(),
      action,
      timestamp: new Date(),
      user: get().role
    };
    set((state) => ({ auditLogs: [newLog, ...state.auditLogs].slice(0, 50) })); // Keep last 50 logs
  }
}));
