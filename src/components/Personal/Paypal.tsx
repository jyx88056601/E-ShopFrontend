import PersonalAPIClient, {
  InitializePaymentDTO,
} from '@/service/PersonalApiClient';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@chakra-ui/react';

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

  const createOrder = async () => {
    const customerId = localStorage.getItem('id');
    const username = localStorage.getItem('username');
    const token = localStorage.getItem('token');

    if (!username || !token || !customerId) {
      navigate('/login');
      return;
    }

    const apiClient = new PersonalAPIClient(
      `/payment/paypal/order_id=${orderId}`,
      username,
      token
    );

    const initializePaymentDTO: InitializePaymentDTO = {
      paymentMethod: 'paypal',
    };
    const response = await apiClient.makePayment(initializePaymentDTO);
    console.log('Response from API:', response.data);

    if (!response.data) {
      console.error('No response data');
      return;
    }
    setPaymentData(response.data);
  };

  const handlePayment = async () => {
    try {
      await createOrder();
    } catch (err) {
      console.error('Error creating PayPal order:', err);
    }
  };

  // useEffect to watch paymentData and trigger the payment link if data is ready
  useEffect(() => {
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

  return (
    <div>
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
    </div>
  );
};

export default Paypal;
