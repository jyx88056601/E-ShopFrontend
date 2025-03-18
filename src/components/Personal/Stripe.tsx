import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Spinner, Box, Button } from '@chakra-ui/react';
import stripeLogo from '../../assets/stripe.png';
import PersonalAPIClient from '@/service/PersonalApiClient';
import { useNavigate } from 'react-router-dom';

const stripePromise = loadStripe(
  'pk_test_51R3S62AeYfJoqDVWd5fRAtPFZKXjhzryMod3mqtJuiruNVAIdtPzhGLfhPh0XtAqmqAehhE0ET0cWLzVemCdlcmE001nvLUUMe'
);

interface StripeProps {
  orderId: string;
}

export type StripeRequestDTO = {
  orderId: string;
};

const Stripe = ({ orderId }: StripeProps) => {
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const handleCheckout = async () => {
    try {
      setLoading(true);
      const customerId = localStorage.getItem('id');
      const username = localStorage.getItem('username');
      const token = localStorage.getItem('token');

      if (!username || !token || !customerId) {
        navigate('/login');
        return;
      }

      const stripeRequestDTO: StripeRequestDTO = {
        orderId: orderId,
      };
      const stripeApi = new PersonalAPIClient(
        '/create-checkout-session',
        username,
        token
      );

      // Get the session data from the API response
      const response = (await stripeApi.createStripeSession(stripeRequestDTO))
        .data;
      console.log(response);

      // For embedded UI mode, use Elements with clientSecret
      const stripe = await stripePromise;
      if (stripe) {
        const { error } = await stripe.redirectToCheckout({
          sessionId: response.sessionId, // Use sessionId here, not clientSecret
        });

        if (error) {
          console.error(error.message);
          setStatus('failed');
        }
      }
    } catch (error) {
      setStatus('failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Show button to trigger Stripe payment */}
      {!status && !loading && (
        <Button
          width={'255px'}
          bgColor={'gray.100'}
          onClick={handleCheckout}
          style={{ display: 'flex', alignItems: 'center' }}
        >
          <img
            src={stripeLogo}
            alt="Stripe Logo"
            style={{ height: '30px', marginRight: '8px' }}
          />
        </Button>
      )}

      {/* Show loading spinner while waiting for checkout */}
      {loading && (
        <Box display="flex" justifyContent="center" alignItems="center">
          <Spinner size="lg" />
        </Box>
      )}

      {/* Show error message if checkout failed */}
      {status === 'failed' && (
        <Box color="red.500" mt={2} textAlign="center">
          Payment initialization failed. Please try again.
        </Box>
      )}
    </div>
  );
};

export default Stripe;
