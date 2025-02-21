import { Box } from '@chakra-ui/react';
import { ReactNode } from 'react';

type ProductContainerProps = {
  children: ReactNode;
};

const ProductContainer = ({ children }: ProductContainerProps) => {
  return (
    <Box
      _hover={{
        transform: 'scale(1.05)',
        transition: 'transform .15s ease-in',
      }}
      width="100%"
      borderRadius={10}
      overflow="hidden"
    >
      {children}
    </Box>
  );
};

export default ProductContainer;
