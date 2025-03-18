import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import PersonalAPIClient from '@/service/PersonalApiClient';
import { Box, Button, HStack, Spinner, useToast } from '@chakra-ui/react';

const ReturnPage = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [returning, setReturing] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    const customerId = localStorage.getItem('id');
    const username = localStorage.getItem('username');
    const token = localStorage.getItem('token');
    if (!username || !token || !customerId) {
      navigate('/login');
      return;
    }

    const apiClient = new PersonalAPIClient('/session-status', username, token);

    if (sessionId) {
      const orderId = localStorage.getItem('currentOrderId');
      if (orderId === null) {
        alert('NO order chosen');
        return;
      }
      apiClient
        .fetchStripeSession(sessionId, orderId)
        .then((res) => {
          toast({
            title: 'Payment Successful',
            description: `Your payment status: ${res.data.status}`,
            status: 'success',
            duration: 3000,
            isClosable: true,
          });
        })
        .catch(() => {
          toast({
            title: 'Payment Failed',
            description: 'There was an error processing your payment.',
            status: 'error',
            duration: 3000,
            isClosable: true,
          });
        });
    }
  }, [sessionId, navigate, toast]);

  const handleViewOrder = async () => {
    setReturing(true);
    setTimeout(() => {
      navigate('/personal/orders/user_id/' + localStorage.getItem('id'));
    }, 2000);
  };
  const handleRetryPaymentWithStrip = () => {
    setReturing(true);
    setTimeout(() => {
      navigate(
        '/personal/payment/order_id/' + localStorage.getItem('currentOrderId')
      );
    }, 2000);
  };

  return returning ? (
    <Box pt={'80px'}>
      <Spinner size="lg" />
    </Box>
  ) : (
    <HStack pt={'80px'}>
      <>
        <Box pl={'10px'}>
          <Button
            onClick={handleViewOrder}
            bg="linear-gradient(135deg, #38A169, #2F855A)"
            color="white"
            fontWeight="bold"
            borderRadius="12px"
            px="8"
            py="4"
            boxShadow="0px 4px 12px rgba(56, 161, 105, 0.2)"
            _hover={{
              bg: 'linear-gradient(135deg, #2F855A, #38A169)',
              boxShadow: '0px 8px 16px rgba(56, 161, 105, 0.3)',
            }}
            _active={{
              bg: 'linear-gradient(135deg, #2F855A, #2B6B3E)',
              boxShadow: '0px 4px 8px rgba(56, 161, 105, 0.4)',
            }}
            transition="all 0.3s ease-in-out"
          >
            View Order
          </Button>
        </Box>
        <Box pl={'10px'}>
          <Button
            onClick={handleRetryPaymentWithStrip}
            bg="linear-gradient(135deg, #F56565, #E53E3E)"
            color="white"
            fontWeight="bold"
            borderRadius="12px"
            px="8"
            py="4"
            boxShadow="0px 4px 12px rgba(239, 56, 56, 0.2)"
            _hover={{
              bg: 'linear-gradient(135deg, #E53E3E, #F56565)',
              boxShadow: '0px 8px 16px rgba(239, 56, 56, 0.3)',
            }}
            _active={{
              bg: 'linear-gradient(135deg, #E53E3E, #C53030)',
              boxShadow: '0px 4px 8px rgba(239, 56, 56, 0.4)',
            }}
            transition="all 0.3s ease-in-out"
          >
            Retry Payment
          </Button>
        </Box>
      </>
    </HStack>
  );
};

export default ReturnPage;
