import { createBrowserRouter } from 'react-router-dom';
import Homepage from '../pages/HomePage';
import ErrorPage from '../pages/ErrorPage';
import Layout from '../pages/Layout';
import AdminPage from '../pages/AdminPage';
import LoginPage from '../pages/LoginPage';
import SignupPage from '../pages/SignupPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { path: '/', element: <Homepage /> },
      { path: '/signup', element: <SignupPage /> },
      { path: '/login', element: <LoginPage /> },
      { path: '/admin', element: <AdminPage /> },
    ],
    errorElement: <ErrorPage />,
  },
]);

export default router;
