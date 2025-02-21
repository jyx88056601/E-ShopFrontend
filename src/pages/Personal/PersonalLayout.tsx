import PersonalNavBar from '@/components/Personal/PersonalNavBar';
import { Outlet } from 'react-router-dom';

const PersonalLayout = () => {
  return (
    <>
      <PersonalNavBar></PersonalNavBar>
      <Outlet></Outlet>
    </>
  );
};

export default PersonalLayout;
