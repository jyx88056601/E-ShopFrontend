import { Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

type OrderButtonProps = {
  currentPath: string;
  setCurrentPath: (path: string) => void;
};

const OrderButton = ({ currentPath, setCurrentPath }: OrderButtonProps) => {
  const navigate = useNavigate();
  const user_id = localStorage.getItem('id');

  return (
    <Button
      bg={currentPath === 'orders' ? 'green.500' : 'gray.500'}
      onClick={() => {
        setCurrentPath('orders');
        navigate(`orders/user_id/${user_id}`);
      }}
      _hover={{ bg: 'green.500', transform: 'scale(1.05)' }}
    >
      Orders
    </Button>
  );
};

export default OrderButton;
