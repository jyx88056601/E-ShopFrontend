import { Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const navigate = useNavigate();

  return (
    <Button colorScheme="blue" onClick={() => navigate('/signup')}>
      Button
    </Button>
  );
};
export default LoginPage;
