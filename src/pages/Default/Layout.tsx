import { Outlet } from 'react-router-dom';
import NavBar from '../../components/Default/NavBar';
const Layout = () => {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
};

export default Layout;
