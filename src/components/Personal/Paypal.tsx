import PersonalAPIClient, {
  InitializePaymentDTO,
} from '@/service/PersonalApiClient';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Spinner, VStack, Text } from '@chakra-ui/react';
import { usePathStore } from '@/data/store';

type PaypalProps = {
  orderId: string;
};

type PaymentResponseDTO = {
  paymentId: string;
  amount: string;
  paymentDate: string;
  paymentStatus: string;
  paymentMethod: string;
  links: Link[];
};

type Link = {
  href: string;
  rel: string;
  method: string;
};

const Paypal = ({ orderId }: PaypalProps) => {
  const navigate = useNavigate();
  const [paymentData, setPaymentData] = useState<PaymentResponseDTO | null>(
    null
  );
  const [paymentStatus, setPaymentStatus] = useState<
    'pending' | 'paid' | 'default'
  >('default');
  const [clickViewOrder, setClickViewOrder] = useState(false);
  const pathStatus = usePathStore();
  const createOrder = async () => {
    const customerId = localStorage.getItem('id');
    const username = localStorage.getItem('username');
    const token = localStorage.getItem('token');

    if (!username || !token || !customerId) {
      navigate('/login');
      return;
    }

    const apiClient = new PersonalAPIClient(
      `/payment/paypal/orderId/${orderId}`,
      username,
      token
    );

    const initializePaymentDTO: InitializePaymentDTO = {
      paymentMethod: 'paypal',
    };
    const response = await apiClient.createTransaction(initializePaymentDTO);
    const data = response.data as PaymentResponseDTO;

    if (!data) {
      console.error('No response data');
      return;
    }
    setPaymentStatus('paid');
    setPaymentData(data);
  };

  const handlePayment = async () => {
    try {
      setPaymentStatus('pending');
      await createOrder();
    } catch (err) {
      console.error('Error creating PayPal order:', err);
    }
  };

  const getPaymentStatus = async () => {
    const customerId = localStorage.getItem('id');
    const username = localStorage.getItem('username');
    const token = localStorage.getItem('token');

    if (!username || !token || !customerId) {
      navigate('/login');
      return;
    }

    const apiClient = new PersonalAPIClient(
      `/payment/paypal/orderId/${orderId}`,
      username,
      token
    );

    apiClient
      .getTransactionResult()
      .then((response) => console.log(response))
      .catch((err) => console.log(err));
  };

  const handleViewOrder = async () => {
    try {
      setClickViewOrder(true);
      await getPaymentStatus();
      setTimeout(() => {
        navigate('/personal/orders/user_id/' + localStorage.getItem('id'));
      }, 1250);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    pathStatus.setCurrentPath('paypal');
    if (paymentData) {
      const paymentLink = paymentData.links.find(
        (link) => link.rel === 'payer-action'
      );
      if (paymentLink) {
        window.open(paymentLink.href, '_blank');
      } else {
        console.error('No payer-action link found');
      }
    }
  }, [paymentData]);

  switch (paymentStatus) {
    case 'pending':
      return (
        <Box>
          <Spinner size="lg" />
        </Box>
      );
    case 'paid':
      return (
        <Box display="flex" justifyContent="center" alignItems="center" gap="4">
          {clickViewOrder ? (
            <VStack spacing="2" align="center">
              <Spinner
                size="xl"
                thickness="4px"
                color="teal.500"
                speed="0.65s"
              />
              <Text fontSize="lg" color="gray.600" fontWeight="semibold">
                Returning to Order Page...
              </Text>
              <Text fontSize="sm" color="gray.500">
                Please wait while we fetch your order details.
              </Text>
            </VStack>
          ) : (
            <>
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
              <Button
                onClick={() => {
                  setPaymentStatus('default');
                }}
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
            </>
          )}
        </Box>
      );

    default:
      return (
        <Box>
          <Button
            onClick={handlePayment}
            bg="#ffc439"
            color="black"
            fontWeight="bold"
            borderRadius="5px"
            px="6"
            py="3"
            boxShadow="0px 2px 5px rgba(0, 0, 0, 0.2)"
            _hover={{ bg: '#e0a800' }}
          >
            <img
              src="https://www.paypalobjects.com/webstatic/mktg/Logo/pp-logo-150px.png"
              alt="PayPal Logo"
              style={{ height: '20px', marginRight: '8px' }}
            />
            Pay with PayPal
          </Button>
        </Box>
      );
  }
};

export default Paypal;
