import { Flex, HStack } from '@chakra-ui/react';
import CartIcon from './CartIcon';

const PersonalNavBar = () => {
  return (
    <Flex bg={'gray.900'} justify={'center'}>
      <HStack pt={'5px'}>
        <CartIcon></CartIcon>
      </HStack>
    </Flex>
  );
};

export default PersonalNavBar;
