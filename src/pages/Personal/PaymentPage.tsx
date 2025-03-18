import { useParams } from 'react-router-dom';
import Paypal from '@/components/Personal/Paypal';
import { Box, Flex, VStack } from '@chakra-ui/react';
import Stripe from '@/components/Personal/Stripe';

const PaymentPage = () => {
  const { orderId } = useParams();

  if (orderId === undefined) {
    console.log('Order ID is missing or undefined.');
    return <div>Error: Order ID is missing</div>;
  }

  return (
    <Flex pl={'10px'} pt={'48px'}>
      <VStack>
        <Box pt={'50px'}>
          <Paypal orderId={orderId}></Paypal>
        </Box>
        <Box pt={'50px'}>
          <Stripe orderId={orderId}></Stripe>
        </Box>
      </VStack>
    </Flex>
  );
};

export default PaymentPage;
