import { Navigate, Route, Routes } from 'react-router-dom';
import { Analytics } from '@/pages/Analytics';
import { Dashboard } from '@/pages/Dashboard';
import { JobDetail } from '@/pages/JobDetail';
import { KanbanBoard } from '@/pages/KanbanBoard';
import { Landing } from '@/pages/Landing';
import { Login } from '@/pages/Login';
import { Register } from '@/pages/Register';
import { ProtectedRoute, PublicOnlyRoute } from '@/routes/ProtectedRoute';

export const AppRouter = () => (
  <Routes>
    <Route element={<PublicOnlyRoute />}>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Route>

    <Route element={<ProtectedRoute />}>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/kanban" element={<KanbanBoard />} />
      <Route path="/analytics" element={<Analytics />} />
      <Route path="/jobs/:id" element={<JobDetail />} />
    </Route>

    <Route path="/" element={<Landing />} />
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
);
