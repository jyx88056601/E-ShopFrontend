import { useParams } from 'react-router-dom';
import Paypal from '@/components/Personal/Paypal';
import { Flex, HStack } from '@chakra-ui/react';

const PaymentPage = () => {
  const { orderId } = useParams();
  if (orderId === undefined) {
    console.log('Order ID is missing or undefined.');
    return <div>Error: Order ID is missing</div>;
  }
  return (
    <Flex pl={'10px'} pt={'20px'}>
      <HStack>
        <Paypal orderId={orderId}></Paypal>
      </HStack>
    </Flex>
  );
};

export default PaymentPage;
