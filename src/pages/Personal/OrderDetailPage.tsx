import SingleOrderDetail from '@/components/Personal/SingleOrderDetail';
import { Flex } from '@chakra-ui/react';

const OrderDetailPage = () => {
  return (
    <Flex pt={'40px'} pl={'5px'} justify="center" align="center">
      <SingleOrderDetail></SingleOrderDetail>
    </Flex>
  );
};

export default OrderDetailPage;
