import BusinessNavBar from '@/components/Business/BusinessNavBar';

import { Text } from '@chakra-ui/react';
const BusinessPage = () => {
  return (
    <>
      <BusinessNavBar></BusinessNavBar>
      <Text padding={'10px'}>Welcome to business console</Text>
    </>
  );
};

export default BusinessPage;
