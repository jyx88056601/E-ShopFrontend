import UserInfo from '@/components/Admin/UserInfo';
import { Box } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
const AdminUserInfoPage = () => {
  const { id } = useParams();

  return (
    <Box pt={'60px'}>
      <UserInfo id={id}></UserInfo>
    </Box>
  );
};

export default AdminUserInfoPage;
