import { Flex, HStack } from '@chakra-ui/react';
import CartIcon from './CartIcon';
import OrderButton from './OrderButton';
import { useState } from 'react';

const PersonalNavBar = () => {
  const [currentPath, setCurrentPath] = useState('');

  return (
    <Flex bg={'blackAlpha.900'} justify={'center'}>
      <HStack pt={'10px'}>
        <OrderButton
          currentPath={currentPath}
          setCurrentPath={setCurrentPath}
        />
        <CartIcon currentPath={currentPath} setCurrentPath={setCurrentPath} />
      </HStack>
    </Flex>
  );
};

export default PersonalNavBar;
