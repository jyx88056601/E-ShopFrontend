import { Flex, HStack } from '@chakra-ui/react';
import CartIcon from './CartIcon';
import OrderButton from './OrderButton';
import { useState } from 'react';

const PersonalNavBar = () => {
  const [currentPath, setCurrentPath] = useState('');

  return (
    <Flex bg={'gray.900'} justify={'center'}>
      <HStack pt={'5px'}>
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
