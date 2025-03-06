import BusinessNavBar from '@/components/Business/BusinessNavBar';

import { Box, Text } from '@chakra-ui/react';
const BusinessPage = () => {
  return (
    <Box pt={'60px'}>
      <BusinessNavBar></BusinessNavBar>
      <Text padding={'10px'}>Welcome to business console</Text>
    </Box>
  );
};

export default BusinessPage;
