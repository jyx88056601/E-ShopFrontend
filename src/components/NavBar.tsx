import { HStack, Image } from '@chakra-ui/react'; // horizontal stack
// import image from the folder
import { Link } from 'react-router-dom';
import logo from '../assets/logo.webp';
const NavBar = () => {
  return (
    // justifyContent="space-between": move the swith to the right side and padding is to create space to the right side
    <HStack padding="10px">
      <Link to="/">
        <Image src={logo} boxSize="60px" objectFit="cover"></Image>
      </Link>
    </HStack>
  );
};

export default NavBar;
