import { Routes, Route, Navigate } from 'react-router-dom';
import { useAdminStore } from '@/store/useAdminStore';
import AdminAccess from './AdminAccess';
import AdminLayout from './AdminLayout';
import DashboardAdmin from './DashboardAdmin';
import TheoryManager from './TheoryManager';
import CareerManager from './CareerManager';
import MessageManager from './MessageManager';
import ArticleCMS from './ArticleCMS';

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
        <Route path="/karir" element={<CareerManager />} />
        <Route path="/pesan" element={<MessageManager />} />
        <Route path="/cms" element={<ArticleCMS />} />
        <Route path="*" element={<Navigate to="/admin" replace />} />
      </Routes>
    </AdminLayout>
  );
}
