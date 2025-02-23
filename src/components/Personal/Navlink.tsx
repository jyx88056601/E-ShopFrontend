import { Box, useColorModeValue } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const Navlink = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  let hrefValue: string = '';

  if (typeof children === 'string') {
    hrefValue = `/personal/${children.toLowerCase()}`;
  } else {
    navigate('/login');
    return null;
  }

  const userId = localStorage.getItem('id');
  if (userId !== null) {
    hrefValue += '/user_id/';
    hrefValue += userId;
  }

  return (
    <Box
      px={2}
      py={1}
      rounded={'md'}
      _hover={{
        textDecoration: 'none',
        bg: useColorModeValue('gray.200', 'gray.700'),
      }}
      onClick={() => {
        navigate(hrefValue);
      }}
      style={{ cursor: 'pointer' }}
    >
      {children}
    </Box>
  );
};

export default Navlink;
