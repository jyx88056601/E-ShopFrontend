import { AiOutlineUser } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { Button, HStack, Text } from '@chakra-ui/react';
import DefaultAPIClient from '@/service/DefaultAPIClient';
import { useUser } from '../../context/UserContext';

const UserStatus = () => {
  const navigate = useNavigate();
  const defaultApiClient = new DefaultAPIClient('/logout');
  const { username, setUsername } = useUser();
  const handleClick = (): void => {
    navigate('/login');
  };

  const handleLogout = () => {
    localStorage.clear();
    setUsername(null);
    defaultApiClient.logout().then((response) => {
      console.log(response.data);
      navigate('/');
    });
  };

  return username === null ? (
    <AiOutlineUser
      onClick={handleClick}
      color="white"
      size={28}
      style={{ cursor: 'pointer' }}
    />
  ) : (
    <HStack>
      <Text color={'whiteAlpha.900'}>{'Hi, ' + username}</Text>
      <Button
        size={'sm'}
        color={'whiteAlpha.900'}
        bg={'blackAlpha.900'}
        onClick={handleLogout}
      >
        Log out
      </Button>
    </HStack>
  );
};

export default UserStatus;
