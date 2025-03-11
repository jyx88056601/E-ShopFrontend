import PersonalAPIClient from '@/service/PersonalApiClient';
import { CheckCircleIcon, WarningIcon } from '@chakra-ui/icons';
import {
  Badge,
  Box,
  Divider,
  Flex,
  Heading,
  HStack,
  Text,
  VStack,
  Image,
  Button,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

interface OrderDetailDTO {
  merchantId: string;
  customerId: string;
  orderNumber: string;
  totalAmount: string;
  orderCreatedTime: string;
  orderItems: string;
  paymentDetail: string;
  shipmentDetail: string;
  orderStatus: string;
}
const SingleOrderDetail = () => {
  const navigate = useNavigate();
  const { user_id, orderId } = useParams();
  const [data, setData] = useState<OrderDetailDTO | null>(null);

  useEffect(() => {
    fetchOrderDetails();
  }, [orderId]);

  const fetchOrderDetails = async () => {
    const username = localStorage.getItem('username');
    const token = localStorage.getItem('token');
    if (!username || !token || !user_id) {
      navigate('/login');
      return;
    }

    const apiClient = new PersonalAPIClient(
      `/order/${orderId}`,
      username,
      token
    );
    const orderDetailResponse = await apiClient.fetchOrderDetail();

    if (orderDetailResponse?.data) {
      setData(orderDetailResponse.data);
      console.log(orderDetailResponse.data);
    }
  };

  return (
    <Flex
      direction="column"
      p={6}
      maxW="700px"
      mx="auto"
      bg="gray.900"
      borderRadius="lg"
      boxShadow="2xl"
      color="white"
    >
      <Heading fontSize="3xl" mb={6} textAlign="center" color="teal.300">
        🛒 Order Details
      </Heading>
      {data ? (
        <VStack align="start" spacing={5} w="full">
          <Box p={4} bg="gray.800" borderRadius="md" w="full" boxShadow="md">
            <Text fontSize="lg">
              <strong>Order Number:</strong> {data.orderNumber}
            </Text>
            <Button width="full" mt={4} colorScheme="teal">
              Reach Out to Seller
            </Button>
          </Box>

          <Text fontSize="lg">
            <strong>Order Created Time:</strong>{' '}
            {new Date(data.orderCreatedTime).toLocaleString()}
          </Text>

          <HStack>
            <Text fontWeight="bold" fontSize="lg">
              Order Status:
            </Text>
            <Badge
              colorScheme={data.orderStatus === 'PAID' ? 'green' : 'red'}
              fontSize="md"
              p={1}
              borderRadius="md"
            >
              {data.orderStatus}{' '}
              {data.orderStatus === 'PAID' ? (
                <CheckCircleIcon ml={1} />
              ) : (
                <WarningIcon ml={1} />
              )}
            </Badge>
          </HStack>

          <Divider borderColor="gray.600" />
          <Text fontWeight="bold" fontSize="xl">
            📦 Order Items:
          </Text>
          {data.orderItems.split('~').map((item, index) => {
            const [imageUrl, productName, quantity, unitPrice, totalPrice] =
              item.split('#');
            return (
              <HStack
                key={index}
                p={4}
                bg="gray.800"
                borderRadius="md"
                boxShadow="md"
                w="full"
                spacing={4}
              >
                <Image
                  src={imageUrl}
                  boxSize="60px"
                  borderRadius="md"
                  objectFit="cover"
                  alt={productName}
                />
                <VStack align="start" spacing={1} color="white">
                  <Text fontWeight="bold" fontSize="lg">
                    {productName}
                  </Text>
                  <Text fontSize="sm">
                    🛍 Qty: {quantity} | 💲{unitPrice} each
                  </Text>
                  <Text fontSize="sm" color="yellow.300">
                    💵 Total: 💲{totalPrice}
                  </Text>
                </VStack>
              </HStack>
            );
          })}

          <Box p={4} bg="gray.800" borderRadius="md" w="full" boxShadow="md">
            <Text fontSize="xl" fontWeight="bold">
              Total Amount:
            </Text>
            <Text fontSize="2xl" color="green.400">
              💰 ${data.totalAmount}
            </Text>
          </Box>

          <Box
            p={4}
            bg="gray.800"
            borderRadius="md"
            w="full"
            boxShadow="md"
            border="1px solid #444"
          >
            <Text fontWeight="bold" fontSize="lg">
              💳 Payment Detail:
            </Text>
            <VStack align="start" spacing={2}>
              {data.paymentDetail ? (
                (() => {
                  // Split payment detail into components
                  const [time, transactionId, paymentStatus, paymentMethod] =
                    data.paymentDetail.split('#');

                  // Format the payment status and method
                  const formattedPaymentStatus =
                    paymentStatus === 'null' ? 'Unknown' : paymentStatus;
                  const formattedPaymentMethod =
                    paymentMethod === 'null' ? 'Unknown' : paymentMethod;

                  return (
                    <>
                      <Text fontSize="sm">
                        <strong>Time:</strong> {time || 'Unknown'}
                      </Text>
                      <Text fontSize="sm">
                        <strong>Transaction ID:</strong>{' '}
                        {transactionId || 'Unknown'}
                      </Text>
                      <Text fontSize="sm">
                        <strong>Payment Status:</strong>{' '}
                        {formattedPaymentStatus}
                      </Text>
                      <Text fontSize="sm">
                        <strong>Payment Method:</strong>{' '}
                        {formattedPaymentMethod}
                      </Text>
                    </>
                  );
                })()
              ) : (
                <Text fontSize="sm" color="gray.500">
                  Payment details not available.
                </Text>
              )}
            </VStack>
          </Box>

          <Box p={4} bg="gray.800" borderRadius="md" w="full" boxShadow="md">
            <Text fontWeight="bold" fontSize="lg">
              🚚 Shipment Detail:
            </Text>
            <Text fontSize="sm">{data.shipmentDetail}</Text>
          </Box>
        </VStack>
      ) : (
        <Text fontSize="xl" color="gray.500">
          Loading...
        </Text>
      )}
    </Flex>
  );
};

export default SingleOrderDetail;
