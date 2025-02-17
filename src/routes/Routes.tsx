import { createBrowserRouter } from 'react-router-dom';
import Homepage from '../pages/Default/HomePage';
import ErrorPage from '../pages/Default/ErrorPage';
import Layout from '../pages/Default/Layout';
import AdminPage from '../pages/Admin/AdminPage';
import LoginPage from '../pages/Default/LoginPage';
import SignupPage from '../pages/Default/SignupPage';
import AdminUserInfoPage from '@/pages/Admin/AdminUserInfoPage';
import BusinessPage from "@/pages/Business/BusinessPage";

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { path: '/', element: <Homepage /> },
      { path: '/signup', element: <SignupPage /> },
      { path: '/login', element: <LoginPage /> },
      { path: '/admin', element: <AdminPage /> },
      { path: '/admin/userinfo/:id', element: <AdminUserInfoPage /> },
      { path: '/business', element: <BusinessPage /> },
    ],
    errorElement: <ErrorPage />,
  },
]);

export default router;
