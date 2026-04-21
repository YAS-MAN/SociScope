import { create } from 'zustand';
import { theories as initialTheories, careers as initialCareers, alumniData, hmpData } from '@/data/sociologyData';
import { supabase } from '@/lib/supabase';

// Types
import type { Theory, Career, Concept } from '@/data/sociologyData';

export type AdminRole = 'Super Admin' | 'Editor Prodi';

export interface AlumniItem {
  id: number;
  name: string;
  role: string;
  agency: string;
  imgColor: string;
  linkedin?: string;
}

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

export interface KacamataCase {
  id: string;
  title: string;
  description: string;
  context: string;
  questions?: any;
}

export interface Sociologist {
  id: string;
  name: string;
  years: string;
  title: string;
  quote: string;
  contribution: string;
  bio?: string;
  image: string;
  color: string;
  accent: string;
}

export interface ChatResponse {
  keywords: string[];
  response: string;
}

export interface ReferenceItem {
  id: string;
  title: string;
  link: string;
  description: string;
}

export interface ArticleItem {
  id: number;
  title: string;
  link: string;
  thumbnail?: string;
  description: string;
  date: string;
  author: string;
}

interface AdminState {
  isAuthenticated: boolean;
  role: AdminRole;
  
  theories: Theory[];
  careers: Career[];
  alumniData: AlumniItem[];
  hmpData: string[];
  hiddenRssLinks: string[];
  kacamataCases: KacamataCase[];
  concepts: Concept[];
  teoResponses: ChatResponse[];
  sociologists: Sociologist[];
  messages: UserMessage[];
  auditLogs: AuditLog[];
  jurnals: ReferenceItem[];
  books: ReferenceItem[];
  articles: ArticleItem[];
  isLoading: boolean;

  // Initialization
  initFetch: () => Promise<void>;

  // Actions
  login: (accessKey: string) => boolean;
  logout: () => void;
  setRole: (role: AdminRole) => void;
  
  // Data Mutators
  addTheory: (theory: Theory) => void;
  updateTheory: (id: string, theory: Partial<Theory>) => void;
  deleteTheory: (id: string) => void;
  
  addCareer: (career: Career) => void;
  updateCareer: (id: string, career: Partial<Career>) => void;
  deleteCareer: (id: string) => void;

  addAlumni: (alumni: AlumniItem) => void;
  updateAlumni: (id: number, alumni: Partial<AlumniItem>) => void;
  deleteAlumni: (id: number) => void;

  addSociologist: (sociologist: Sociologist) => void;
  updateSociologist: (id: string, sociologist: Partial<Sociologist>) => void;
  deleteSociologist: (id: string) => void;
  
  toggleRssVisibility: (link: string) => void;
  
  // Kacamata Cases
  addInteractiveCase: (kasus: KacamataCase) => void;
  updateInteractiveCase: (id: string, kasus: Partial<KacamataCase>) => void;
  deleteInteractiveCase: (id: string) => void;

  // Concepts
  addConcept: (concept: Concept) => void;
  updateConcept: (id: string, concept: Partial<Concept>) => void;
  deleteConcept: (id: string) => void;

  // Jurnal
  addJurnal: (jurnal: ReferenceItem) => void;
  updateJurnal: (id: string, jurnal: Partial<ReferenceItem>) => void;
  deleteJurnal: (id: string) => void;

  // Buku
  addBook: (book: ReferenceItem) => void;
  updateBook: (id: string, book: Partial<ReferenceItem>) => void;
  deleteBook: (id: string) => void;

  // Articles
  addArticle: (article: ArticleItem) => void;
  updateArticle: (id: number, article: Partial<ArticleItem>) => void;
  deleteArticle: (id: number) => void;

  replyMessage: (id: string) => void;
  
  logAction: (action: string) => void;
}

export const useAdminStore = create<AdminState>((set, get) => ({
  isAuthenticated: false,
  role: 'Super Admin',
  isLoading: false,
  
  theories: initialTheories,
  careers: initialCareers,
  alumniData: alumniData,
  hmpData: hmpData,
  hiddenRssLinks: (() => { try { return JSON.parse(localStorage.getItem('sz_hiddenRss') || '[]'); } catch { return []; } })() as string[],
  concepts: [],
  teoResponses: [],
  sociologists: [],
  jurnals: [],
  books: [],
  articles: [],
  kacamataCases: [],
  messages: [
    { id: '1', sender: 'Mahasiswa Baru 2026', topic: 'Analisis Imajinasi Sosiologis', content: 'Menurut saya fenomena PHK ini...', date: '10 Apr 2026', status: 'Unread' },
    { id: '2', sender: 'HMP Sosiologi', topic: 'Jejaring', content: 'Apakah prodi bisa bantu share info seminar nasional?', date: '11 Apr 2026', status: 'Unread' },
  ],
  auditLogs: [
    { id: 'log-1', action: 'Sistem SocioZone diinisiasi', timestamp: new Date(), user: 'Super Admin' }
  ],
  
  initFetch: async () => {
    set({ isLoading: true });
    try {
      // Helper untuk fetch dengan penanganan error tanpa menggagalkan semuanya
      const fetchSafe = async (tableName: string) => {
        const { data, error } = await supabase.from(tableName).select('*');
        if (error) {
          console.error(`Error fetching table ${tableName}:`, error);
          return null; // biarkan fallback (statis) digunakan
        }
        return data;
      };

      const theoriesData = await fetchSafe('theories');
      const careersData = await fetchSafe('careers');
      const alumniDataRes = await fetchSafe('alumni');
      const casesData = await fetchSafe('interactive_cases');
      const conceptsData = await fetchSafe('concepts');
      const teoData = await fetchSafe('teo_responses');
      const sociologistsData = await fetchSafe('sociologists');
      const jurnalsData = await fetchSafe('jurnals');
      const booksData = await fetchSafe('books');
      const articlesData = await fetchSafe('articles');

      set({
        theories: theoriesData || initialTheories,
        careers: careersData || initialCareers,
        alumniData: (alumniDataRes as AlumniItem[]) || alumniData,
        kacamataCases: casesData || [],
        concepts: conceptsData || [],
        teoResponses: teoData || [],
        sociologists: sociologistsData || [],
        jurnals: jurnalsData || [],
        books: booksData || [],
        articles: articlesData || [],
        isLoading: false
      });
      get().logAction('Memuat data dari database Supabase.');
    } catch (error) {
      console.error('Fatal error in initFetch:', error);
      set({ isLoading: false });
    }
  },
  
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
  
  addTheory: async (theory) => {
    try {
      const { data, error } = await supabase.from('theories').insert([theory]).select();
      if (error) throw error;
      set((state) => ({ theories: [...state.theories, data[0]] }));
      get().logAction(`Menambah Teori baru: ${theory.name}`);
    } catch (err) {
      console.error(err);
    }
  },
  
  updateTheory: async (id, updatedFields) => {
    try {
      const { error } = await supabase.from('theories').update(updatedFields).eq('id', id);
      if (error) throw error;
      set((state) => ({
        theories: state.theories.map(t => t.id === id ? { ...t, ...updatedFields } : t)
      }));
      get().logAction(`Mengupdate Teori: ${updatedFields.name || id}`);
    } catch (err) {
      console.error(err);
    }
  },
  
  deleteTheory: async (id) => {
    try {
      const theory = get().theories.find(t => t.id === id);
      const { error } = await supabase.from('theories').delete().eq('id', id);
      if (error) throw error;
      set((state) => ({
        theories: state.theories.filter(t => t.id !== id)
      }));
      get().logAction(`Menghapus Teori: ${theory?.name || id}`);
    } catch (err) {
      console.error(err);
    }
  },
  
  addCareer: async (career) => {
    try {
      const { data, error } = await supabase.from('careers').insert([career]).select();
      if (error) throw error;
      set((state) => ({ careers: [data[0], ...state.careers] }));
      get().logAction(`Menambah Karir: ${career.title}`);
    } catch (err) {
      console.error(err);
    }
  },
  
  updateCareer: async (id, updatedFields) => {
    try {
      const { error } = await supabase.from('careers').update(updatedFields).eq('id', id);
      if (error) throw error;
      set((state) => ({
        careers: state.careers.map(c => c.id === id ? { ...c, ...updatedFields } : c)
      }));
      get().logAction(`Mengupdate roadmap karir: ${updatedFields.title || id}`);
    } catch (err) {
      console.error(err);
    }
  },

  deleteCareer: async (id) => {
    try {
      const { error } = await supabase.from('careers').delete().eq('id', id);
      if (error) throw error;
      set((state) => ({
        careers: state.careers.filter(c => c.id !== id)
      }));
      get().logAction(`Menghapus Karir ID: ${id}`);
    } catch (err) {
      console.error(err);
    }
  },

  addAlumni: async (alumni) => {
    try {
      const { data, error } = await supabase.from('alumni').insert([alumni]).select();
      if (error) throw error;
      set((state) => ({ alumniData: [data[0], ...state.alumniData] }));
      get().logAction(`Menambah Alumni: ${alumni.name}`);
    } catch (err) {
      console.error(err);
    }
  },
  
  updateAlumni: async (id, updatedFields) => {
    try {
      const { error } = await supabase.from('alumni').update(updatedFields).eq('id', id);
      if (error) throw error;
      set((state) => ({
        alumniData: state.alumniData.map(a => a.id === id ? { ...a, ...updatedFields } : a)
      }));
      get().logAction(`Mengupdate Alumni: ${updatedFields.name || id}`);
    } catch (err) {
      console.error(err);
    }
  },

  deleteAlumni: async (id) => {
    try {
      const { error } = await supabase.from('alumni').delete().eq('id', id);
      if (error) throw error;
      set((state) => ({
        alumniData: state.alumniData.filter(a => a.id !== id)
      }));
      get().logAction(`Menghapus Alumni ID: ${id}`);
    } catch (err) {
      console.error(err);
    }
  },

  addSociologist: async (sociologist) => {
    try {
      const { data, error } = await supabase.from('sociologists').insert([sociologist]).select();
      if (error) throw error;
      set((state) => ({ sociologists: [...state.sociologists, data[0]] }));
      get().logAction(`Menambah Tokoh Sosiologi: ${sociologist.name}`);
    } catch (err) {
      console.error(err);
    }
  },
  
  updateSociologist: async (id, updatedFields) => {
    try {
      const { error } = await supabase.from('sociologists').update(updatedFields).eq('id', id);
      if (error) throw error;
      set((state) => ({
        sociologists: state.sociologists.map(s => s.id === id ? { ...s, ...updatedFields } : s)
      }));
      get().logAction(`Mengupdate Tokoh Sosiologi: ${updatedFields.name || id}`);
    } catch (err) {
      console.error(err);
    }
  },

  deleteSociologist: async (id) => {
    try {
      const { error } = await supabase.from('sociologists').delete().eq('id', id);
      if (error) throw error;
      set((state) => ({
        sociologists: state.sociologists.filter(s => s.id !== id)
      }));
      get().logAction(`Menghapus Tokoh Sosiologi ID: ${id}`);
    } catch (err) {
      console.error(err);
    }
  },
  
  toggleRssVisibility: (link) => {
    const hidden = get().hiddenRssLinks;
    const normalize = (l: string) => l.split('?')[0].split('#')[0].trim().replace(/\/$/, '').toLowerCase();
    const target = normalize(link);
    
    let newHidden: string[];
    if (hidden.some(l => normalize(l) === target)) {
      newHidden = hidden.filter(l => normalize(l) !== target);
      get().logAction(`Menampilkan artikel RSS: ${link}`);
    } else {
      newHidden = [...hidden, link];
      get().logAction(`Menyembunyikan artikel RSS: ${link}`);
    }
    
    set({ hiddenRssLinks: newHidden });
    try { localStorage.setItem('sz_hiddenRss', JSON.stringify(newHidden)); } catch {}
  },

  // Interactive Cases CRUD
  addInteractiveCase: async (kasus) => {
    try {
      const { data, error } = await supabase.from('interactive_cases').insert([kasus]).select();
      if (error) throw error;
      set((state) => ({ kacamataCases: [data[0], ...state.kacamataCases] }));
      get().logAction(`Menambah Kasus Uji Analisis: ${kasus.title}`);
    } catch (err) {
      console.error(err);
    }
  },

  updateInteractiveCase: async (id, updatedFields) => {
    try {
      const { error } = await supabase.from('interactive_cases').update(updatedFields).eq('id', id);
      if (error) throw error;
      set((state) => ({
        kacamataCases: state.kacamataCases.map(k => k.id === id ? { ...k, ...updatedFields } : k)
      }));
      get().logAction(`Mengupdate Kasus Uji Analisis: ${updatedFields.title || id}`);
    } catch (err) {
      console.error(err);
    }
  },

  deleteInteractiveCase: async (id) => {
    try {
      const kasus = get().kacamataCases.find(k => k.id === id);
      const { error } = await supabase.from('interactive_cases').delete().eq('id', id);
      if (error) throw error;
      set((state) => ({
        kacamataCases: state.kacamataCases.filter(k => k.id !== id)
      }));
      get().logAction(`Menghapus Kasus Uji Analisis: ${kasus?.title || id}`);
    } catch (err) {
      console.error(err);
    }
  },

  // Concepts CRUD
  addConcept: async (concept) => {
    try {
      const { data, error } = await supabase.from('concepts').insert([concept]).select();
      if (error) throw error;
      set((state) => ({ concepts: [...state.concepts, data[0]] }));
      get().logAction(`Menambah Konsep: ${concept.name}`);
    } catch (err) {
      console.error(err);
    }
  },
  
  updateConcept: async (id, updatedFields) => {
    try {
      const { error } = await supabase.from('concepts').update(updatedFields).eq('id', id);
      if (error) throw error;
      set((state) => ({
        concepts: state.concepts.map(c => c.id === id ? { ...c, ...updatedFields } : c)
      }));
      get().logAction(`Mengupdate Konsep: ${updatedFields.name || id}`);
    } catch (err) {
      console.error(err);
    }
  },

  deleteConcept: async (id) => {
    try {
      const { error } = await supabase.from('concepts').delete().eq('id', id);
      if (error) throw error;
      set((state) => ({
        concepts: state.concepts.filter(c => c.id !== id)
      }));
      get().logAction(`Menghapus Konsep ID: ${id}`);
    } catch (err) {
      console.error(err);
    }
  },
  
  // === JURNAL CRUD === 
  addJurnal: async (jurnal) => {
    try {
      const { id, ...payload } = jurnal; // Supabase autogenerates ID
      const { data, error } = await supabase.from('jurnals').insert([payload]).select();
      if (error) throw error;
      set((state) => ({ jurnals: [...state.jurnals, data[0]] }));
      get().logAction('Menambahkan Referensi Jurnal: ' + jurnal.title);
    } catch(e: any) { console.error('Add Jurnal Error:', e); }
  },
  updateJurnal: async (id, jurnal) => {
    try {
      const { data, error } = await supabase.from('jurnals').update(jurnal).eq('id', id).select();
      if (error) throw error;
      if (data && data.length > 0) {
         set((state) => ({ jurnals: state.jurnals.map(j => j.id === id ? data[0] : j) }));
      }
      get().logAction('Memperbarui Referensi Jurnal: ' + (jurnal.title || ''));
    } catch(e: any) { console.error(e); }
  },
  deleteJurnal: async (id) => {
    try {
      const { error } = await supabase.from('jurnals').delete().eq('id', id);
      if (error) throw error;
      set((state) => ({ jurnals: state.jurnals.filter(j => j.id !== id) }));
      get().logAction('Menghapus Referensi Jurnal');
    } catch(e: any) { console.error(e); }
  },

  // === BUKU CRUD === 
  addBook: async (book) => {
    try {
      const { id, ...payload } = book; // Supabase autogenerates ID
      const { data, error } = await supabase.from('books').insert([payload]).select();
      if (error) throw error;
      set((state) => ({ books: [...state.books, data[0]] }));
      get().logAction('Menambahkan Referensi Buku: ' + book.title);
    } catch(e: any) { console.error('Add Book Error:', e); }
  },
  updateBook: async (id, book) => {
    try {
      const { data, error } = await supabase.from('books').update(book).eq('id', id).select();
      if (error) throw error;
      if (data && data.length > 0) {
         set((state) => ({ books: state.books.map(b => b.id === id ? data[0] : b) }));
      }
      get().logAction('Memperbarui Referensi Buku: ' + (book.title || ''));
    } catch(e: any) { console.error(e); }
  },
  deleteBook: async (id) => {
    try {
      const { error } = await supabase.from('books').delete().eq('id', id);
      if (error) throw error;
      set((state) => ({ books: state.books.filter(b => b.id !== id) }));
      get().logAction('Menghapus Referensi Buku');
    } catch(e: any) { console.error(e); }
  },

  // === ARTICLE CRUD === 
  addArticle: async (article) => {
    try {
      // Hapus 'id' agar Supabase BIGSERIAL auto-generate id yg valid
      const { id: _id, ...insertData } = article;
      const { data, error } = await supabase.from('articles').insert([insertData]).select();
      if (error) throw error;
      set((state) => ({ articles: [...state.articles, data[0]] }));
      get().logAction('Menambahkan Artikel: ' + article.title);
    } catch(e: any) { console.error('addArticle error:', e); }
  },
  updateArticle: async (id, article) => {
    try {
      const { data, error } = await supabase.from('articles').update(article).eq('id', id).select();
      if (error) throw error;
      if (data && data.length > 0) {
         set((state) => ({ articles: state.articles.map(a => a.id === id ? data[0] : a) }));
      }
      get().logAction('Memperbarui Artikel: ' + (article.title || ''));
    } catch(e: any) { console.error(e); }
  },
  deleteArticle: async (id) => {
    try {
      const { error } = await supabase.from('articles').delete().eq('id', id);
      if (error) throw error;
      set((state) => ({ articles: state.articles.filter(a => a.id !== id) }));
      get().logAction('Menghapus Artikel ID: ' + id);
    } catch(e: any) { console.error(e); }
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
    set((state) => ({ auditLogs: [newLog, ...state.auditLogs].slice(0, 50) }));
  }
}));
