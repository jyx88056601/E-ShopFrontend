import { HStack } from '@chakra-ui/react'; // horizontal stack
import { AiFillHome } from 'react-icons/ai';
import UserStatus from './UserStatus';
import { useNavigate } from 'react-router-dom';

const NavBar = () => {
  const navigate = useNavigate();

  const clickHome = () => {
    const role = localStorage.getItem('role');
    if (role === null) {
      navigate('/');
      return;
    }
    const userRole = role.substring(5).toLocaleLowerCase();
    if (userRole === 'seller') {
      navigate('/business');
    } else if (userRole === 'buyer') {
      navigate('/personal');
    } else {
      navigate('/admin');
    }
  };

  return (
    <HStack
      backgroundColor={'blackAlpha.900'}
      padding={2}
      spacing="2px"
      align="center"
      justify="space-between"
      w="100%"
      px="24px"
    >
      <AiFillHome color="white" size={25} onClick={clickHome} />
      <UserStatus />
    </HStack>
  );
};

export default NavBar;
