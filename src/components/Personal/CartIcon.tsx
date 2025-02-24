import { useCartStore } from '@/data/store';
import { Badge, Box, IconButton } from '@chakra-ui/react';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const CartIcon = () => {
  const { itemCount } = useCartStore();
  const navigate = useNavigate();

  const handleCartClick = () => {
    const url = '/personal/cart/user_id/' + localStorage.getItem('id');
    navigate(url);
  };

  const [count, setCount] = useState(itemCount);

  useEffect(() => {
    setCount(itemCount);
  }, [itemCount]);

  return (
    <Box position="relative">
      <IconButton
        bg={'gray.500'}
        size={'lg'}
        aria-label="Cart"
        icon={<AiOutlineShoppingCart size={24} />}
        variant="solid"
        onClick={handleCartClick}
        _hover={{ bg: 'gray.200', transform: 'scale(1.05)' }}
        _active={{ transform: 'scale(0.95)' }}
        boxShadow="md"
      />
      {count > 0 && (
        <Badge
          bgColor={'green.500'}
          color="white"
          borderRadius="full"
          position="absolute"
          top="-6px"
          right="-6px"
          fontSize="0.8em"
          px={2}
          boxShadow="md"
        >
          {count}
        </Badge>
      )}
    </Box>
  );
};

export default CartIcon;
