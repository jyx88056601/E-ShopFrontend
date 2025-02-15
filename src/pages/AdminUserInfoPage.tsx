import UserInfo from '@/components/AdminPage/UserInfo';
import { useParams } from 'react-router-dom';
const AdminUserInfoPage = () => {
  const { id } = useParams();

  return (
    <div>
      <UserInfo id={id}></UserInfo>
    </div>
  );
};

export default AdminUserInfoPage;
