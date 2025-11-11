import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './store/authStore';
import { Suspense, lazy } from 'react';
import Loader from './components/Loader';

const Signup = lazy(() => import('./pages/Signup'));
const Login = lazy(() => import('./pages/Login'));
const Expenses = lazy(() => import('./pages/Expenses'));
const AdminUsers = lazy(() => import('./pages/AdminUsers'));
const Home = lazy(() => import('./pages/Home'));

function App() {
  const token = useAuthStore((state) => state.token);

  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/expenses" element={token ? <Expenses /> : <Navigate to="/login" />} />
        <Route path="/admin/users" element={token ? <AdminUsers /> : <Navigate to="/login" />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Suspense>
  );
}

export default App;
