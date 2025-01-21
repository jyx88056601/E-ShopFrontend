import { HStack, Image } from '@chakra-ui/react'; // horizontal stack
import { Link } from 'react-router-dom';
import logo from '../assets/logo.webp';
import UserStatus from './UserStatus';

const NavBar = () => {
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
      <Link to="/">
        <Image src={logo} boxSize={35} objectFit="cover" />
      </Link>
      <UserStatus />
    </HStack>
  );
};

export default NavBar;
