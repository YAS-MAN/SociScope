import { Routes, Route, Navigate } from 'react-router-dom';
import { useAdminStore } from '@/store/useAdminStore';
import AdminAccess from '@/pages/Admin/AdminAccess';
import AdminLayout from '@/pages/Admin/AdminLayout';
import DashboardAdmin from '@/pages/Admin/DashboardAdmin';
import TheoryManager from '@/pages/Admin/TheoryManager';
import CareerManager from '@/pages/Admin/CareerManager';
import AlumniManager from '@/pages/Admin/AlumniManager';
import FounderManager from '@/pages/Admin/FounderManager';
import ArticleCMS from '@/pages/Admin/ArticleCMS';
import ConceptManager from '@/pages/Admin/ConceptManager';
import UjiAnalisisManager from '@/pages/Admin/UjiAnalisisManager';
import JurnalManager from '@/pages/Admin/JurnalManager';
import BukuManager from '@/pages/Admin/BukuManager';
import KomunitasManager from '@/pages/Admin/KomunitasManager';

export default function AdminRoutes() {
  const isAuthenticated = useAdminStore((state) => state.isAuthenticated);

  if (!isAuthenticated) {
    return <AdminAccess />;
  }

  return (
    <AdminLayout>
      <Routes>
        <Route path="/" element={<DashboardAdmin />} />
        <Route path="/teori" element={<TheoryManager />} />
        <Route path="/tokoh" element={<FounderManager />} />
        <Route path="/karir" element={<CareerManager />} />
        <Route path="/alumni" element={<AlumniManager />} />
        <Route path="/kacamata" element={<ConceptManager />} />
        <Route path="/ujianalisis" element={<UjiAnalisisManager />} />
        <Route path="/jurnal" element={<JurnalManager />} />
        <Route path="/buku" element={<BukuManager />} />
        <Route path="/cms" element={<ArticleCMS />} />
        <Route path="/komunitas" element={<KomunitasManager />} />
        <Route path="*" element={<Navigate to="/admin" replace />} />
      </Routes>
    </AdminLayout>
  );
}
