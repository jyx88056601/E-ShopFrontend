import PersonalNavBar from '@/components/Personal/PersonalNavBar';
import { Box } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';

const PersonalLayout = () => {
  return (
    <>
      <Box
        as="nav"
        position="fixed"
        top="40px"
        left="0"
        w="100%"
        zIndex="999"
        boxShadow="md"
        bg="black"
        pt="5px"
        pb="5px"
      >
        <PersonalNavBar></PersonalNavBar>
      </Box>
      <Box as="main" pt="80px">
        <Outlet />
      </Box>
    </>
  );
};

export default PersonalLayout;
