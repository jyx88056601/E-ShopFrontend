import { createBrowserRouter } from 'react-router-dom';
import Homepage from '../pages/Default/HomePage';
import ErrorPage from '../pages/Default/ErrorPage';
import Layout from '../pages/Default/Layout';
import AdminPage from '../pages/Admin/AdminPage';
import LoginPage from '../pages/Default/LoginPage';
import SignupPage from '../pages/Default/SignupPage';
import AdminUserInfoPage from '@/pages/Admin/AdminUserInfoPage';
import BusinessPage from '@/pages/Business/BusinessPage';
import PersonalPage from '@/pages/Personal/PersonalPage';
import ProductDetailPage from '@/pages/Personal/ProductDetailPage';
import PersonalLayout from '@/pages/Personal/PersonalLayout';
import CartDetailPage from '@/pages/Personal/CartDetailPage';
import PaymentPage from '@/pages/Personal/PaymentPage';
import CustomerOrderManagementPage from '@/pages/Personal/CustomerOrderManagementPage';
import OrderDetailPage from '@/pages/Personal/OrderDetailPage';
import ShippingPage from '@/pages/Personal/ShippingPage';
import ReturnPage from '@/pages/Personal/ReturnPage';
const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Homepage /> },
      { path: 'signup', element: <SignupPage /> },
      { path: 'login', element: <LoginPage /> },
      { path: 'admin', element: <AdminPage /> },
      { path: 'admin/userinfo/:id', element: <AdminUserInfoPage /> },
      { path: 'business', element: <BusinessPage /> },
      {
        path: 'personal',
        element: <PersonalLayout />,
        children: [
          { index: true, element: <PersonalPage /> },
          { path: 'product/:product_id', element: <ProductDetailPage /> },
          { path: 'cart/user_id/:user_id', element: <CartDetailPage /> },
          {
            path: 'orders/user_id/:user_id',
            element: <CustomerOrderManagementPage />,
          },
          {
            path: 'payment/order_id/:orderId',
            element: <PaymentPage />,
          },
          {
            path: 'orders/user_id/:user_id/order_id/:orderId',
            element: <OrderDetailPage />,
          },
          {
            path: 'shipping/order_id/:orderId',
            element: <ShippingPage />,
          },
          {
            path: 'return',
            element: <ReturnPage />,
          },
        ],
      },
    ],
  },
]);

export default router;
