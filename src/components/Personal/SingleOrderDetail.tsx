import PersonalAPIClient from '@/service/PersonalApiClient';
import { CheckCircleIcon, InfoIcon, WarningIcon } from '@chakra-ui/icons';
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
  const [contact, setContact] = useState('');

  useEffect(() => {
    fetchOrderDetails();
  }, [orderId]);

  const fetchContactInfo = async () => {
    const username = localStorage.getItem('username');
    const token = localStorage.getItem('token');
    if (!username || !token || !user_id) {
      navigate('/login');
      return;
    }
    try {
      const apiClient = new PersonalAPIClient(
        `/seller/contact${data?.merchantId}`,
        username,
        token
      );
      const response = await apiClient.getSellerInfo();
      setContact(response.data);
    } catch (error) {
      console.error('Error fetching contact info', error);
    }
  };

  const fetchOrderDetails = async () => {
    const username = localStorage.getItem('username');
    const token = localStorage.getItem('token');
    if (!username || !token || !user_id) {
      navigate('/login');
      return;
    }

    try {
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
    } catch (error) {
      console.error('Error fetching order details', error);
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
            {contact === '' ? (
              <Button
                width="full"
                mt={4}
                colorScheme="teal"
                onClick={fetchContactInfo}
                size="lg"
                borderRadius="md"
                boxShadow="md"
              >
                Reach Out to Seller
              </Button>
            ) : (
              <Box
                p={4}
                bg="gray.800"
                borderRadius="md"
                boxShadow="md"
                width="full"
                mt={4}
              >
                <Text fontWeight="bold" fontSize="lg" color="teal.300">
                  Merchant Contact Information
                </Text>
                <Divider my={3} borderColor="gray.600" />
                <VStack align="start" spacing={3} color="white">
                  <Text>
                    <strong>Merchant Name:</strong> {contact.split('#')[0]}
                  </Text>
                  <Text>
                    <strong>Phone Number:</strong> {contact.split('#')[1]}
                  </Text>
                  <Text>
                    <strong>Email Address:</strong> {contact.split('#')[2]}
                  </Text>
                </VStack>
              </Box>
            )}
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
              colorScheme={
                data.orderStatus === 'PAID'
                  ? 'green'
                  : data.orderStatus === 'UNPAID'
                  ? 'red'
                  : data.orderStatus === 'PROCESSING'
                  ? 'blue'
                  : 'gray'
              }
              fontSize="md"
              p={1}
              borderRadius="md"
            >
              {data.orderStatus}{' '}
              {data.orderStatus === 'PAID' ? (
                <CheckCircleIcon ml={1} />
              ) : data.orderStatus === 'PROCESSING' ? (
                <InfoIcon ml={1} />
              ) : (
                <WarningIcon ml={1} />
              )}
            </Badge>
          </HStack>

          <Divider borderColor="gray.600" />
          <Text fontWeight="bold" fontSize="xl">
            💳 Payment Details:
          </Text>

          <VStack align="start">
            {data.paymentDetail && data.paymentDetail.includes('#') ? (
              data.paymentDetail.split('#').map((detail, index) => {
                switch (index) {
                  case 0:
                    return (
                      <HStack key={index}>
                        <Text color={'whiteAlpha.900'} fontSize={'sm'}>
                          <strong>Time:</strong>
                        </Text>
                        <Text fontSize={'sm'}>{detail.split('.')[0]}</Text>
                      </HStack>
                    );
                  case 1:
                    return (
                      <HStack key={index}>
                        <Text color={'whiteAlpha.900'} fontSize={'sm'}>
                          <strong>Transaction ID:</strong>
                        </Text>
                        <Text fontSize={'sm'}>{detail}</Text>
                      </HStack>
                    );
                  case 2:
                    return (
                      <HStack key={index}>
                        <Text color={'whiteAlpha.900'} fontSize={'sm'}>
                          <strong>Transaction Status:</strong>
                        </Text>
                        <Text fontSize={'sm'}>{detail}</Text>
                      </HStack>
                    );
                  case 3:
                    return (
                      <HStack key={index}>
                        <Text color={'whiteAlpha.900'} fontSize={'sm'}>
                          <strong>Paid By:</strong>
                        </Text>
                        <Text fontSize={'sm'}>{detail}</Text>
                      </HStack>
                    );
                  default:
                    return null;
                }
              })
            ) : (
              <Text color="white.900">No payment details available</Text>
            )}
          </VStack>

          <Divider borderColor="gray.600" />
          <Text fontWeight="bold" fontSize="xl">
            🚚 Shipment Details:
          </Text>
          {data.shipmentDetail && data.shipmentDetail.includes('#') ? (
            (() => {
              const [
                shipmentTime,
                shipmentStatus,
                trackingNumber,
                addressInfo,
              ] = data.shipmentDetail.split('#');

              const addressRegex =
                /Address\{id\s*='?(\d+)'?\s*recipientName='?([^']+)'?,\s*phoneNumber='?([^']+)'?,\s*HouseNumber='?([^']+)'?,\s*buildingNumber='?([^']+)'?,\s*unitNumber='?([^']+)'?,\s*streetName='?([^']+)'?,\s*community='?([^']*)'?,\s*district='?([^']*)'?,\s*city='?([^']+)'?,\s*province='?([^']+)'?,\s*country='?([^']+)'?,\s*postalCode='?([^']+)'?\}/;
              const match = addressRegex.exec(addressInfo);

              const fieldsToDisplay = [];

              if (shipmentTime !== 'null') {
                fieldsToDisplay.push(
                  <Text fontSize="sm" key="shipmentTime">
                    <strong>Shipment Time:</strong> {shipmentTime}
                  </Text>
                );
              }

              if (shipmentStatus && shipmentStatus !== 'null') {
                fieldsToDisplay.push(
                  <Text fontSize="sm" key="shipmentStatus">
                    <strong>Shipment Status:</strong> {shipmentStatus}
                  </Text>
                );
              }

              if (trackingNumber !== 'null') {
                fieldsToDisplay.push(
                  <Text fontSize="sm" key="trackingNumber">
                    <strong>Tracking Number:</strong> {trackingNumber}
                  </Text>
                );
              }

              if (match) {
                if (match[2] !== 'null') {
                  fieldsToDisplay.push(
                    <Text fontSize="sm" key="recipientName">
                      <strong>Recipient:</strong> {match[2]}
                    </Text>
                  );
                }

                if (match[3] !== 'null') {
                  fieldsToDisplay.push(
                    <Text fontSize="sm" key="phoneNumber">
                      <strong>Phone:</strong> {match[3]}
                    </Text>
                  );
                }

                const addressParts = [
                  match[5],
                  match[4],
                  match[6],
                  match[7],
                  match[8],
                  match[9],
                  match[10],
                  match[11],
                  match[12],
                  match[13],
                ];

                const fullAddress = addressParts
                  .filter((part) => part && part !== 'null')
                  .join(' ');

                if (fullAddress) {
                  fieldsToDisplay.push(
                    <Text fontSize="sm" key="shippingAddress">
                      <strong>Address:</strong> {fullAddress}
                    </Text>
                  );
                }
              }

              return <>{fieldsToDisplay}</>;
            })()
          ) : (
            <Text color="white.900">No shipment found</Text>
          )}

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
