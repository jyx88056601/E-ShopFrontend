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

export interface OrderDetailDTO {
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

interface BusinessOrderDetailProps {
  data: OrderDetailDTO | null;
  contact: string;
  onFetchContact: () => void;
}

const BusinessOrderDetail = ({
  data,
  contact,
  onFetchContact,
}: BusinessOrderDetailProps) => {
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
                onClick={onFetchContact}
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
                  const [time, transactionId, paymentStatus, paymentMethod] =
                    data.paymentDetail.split('#');
                  const formattedPaymentStatus =
                    paymentStatus === 'null' ? 'Unknown' : paymentStatus;
                  const formattedPaymentMethod =
                    paymentMethod === 'null' ? 'Unknown' : paymentMethod;

                  return (
                    <>
                      <Text fontSize="sm">
                        <strong>Time:</strong>{' '}
                        {time.split('T')[0] +
                          ' ' +
                          time.split('T')[1].split('.')[0] || 'Unknown'}
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
            <VStack align="start" spacing={2}>
              {data.shipmentDetail ? (
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

                  return (
                    <>
                      <Text fontSize="sm">
                        <strong>Shipment Time:</strong>{' '}
                        {shipmentTime === 'null'
                          ? 'Not Available'
                          : shipmentTime}
                      </Text>
                      <Text fontSize="sm">
                        <strong>Shipment Status:</strong>{' '}
                        {shipmentStatus || 'Unknown'}
                      </Text>
                      <Text fontSize="sm">
                        <strong>Tracking Number:</strong>{' '}
                        {trackingNumber === 'null'
                          ? 'Not Available'
                          : trackingNumber}
                      </Text>

                      {match ? (
                        <Box p={3} bg="gray.700" borderRadius="md" w="full">
                          <Text fontWeight="bold" fontSize="md">
                            📍 Shipping Address:
                          </Text>
                          {match[2] !== 'null' && (
                            <Text fontSize="sm">
                              <strong>Recipient:</strong> {match[2]}
                            </Text>
                          )}
                          {match[3] !== 'null' && (
                            <Text fontSize="sm">
                              <strong>Phone:</strong> {match[3]}
                            </Text>
                          )}
                          <Text fontSize="sm">
                            <strong>Address:</strong>{' '}
                            {[
                              match[4] !== 'null' ? match[4] : '',
                              match[6] !== 'null' ? `Unit ${match[6]}` : '',
                              match[5] !== 'null' ? match[5] : '',
                              match[7] !== 'null' ? match[7] : '',
                              match[8] !== 'null' ? match[8] : '',
                              match[9] !== 'null' ? match[9] : '',
                              match[10] !== 'null' ? match[10] : '',
                              match[11] !== 'null' ? match[11] : '',
                              match[12] !== 'null' ? match[12] : '',
                              match[13] !== 'null' ? match[13] : '',
                            ]
                              .filter(Boolean)
                              .join(', ')}
                          </Text>
                        </Box>
                      ) : (
                        <Text fontSize="sm" color="gray.500">
                          Address information not available.
                        </Text>
                      )}
                    </>
                  );
                })()
              ) : (
                <Text fontSize="sm" color="gray.500">
                  Shipment details not available.
                </Text>
              )}
            </VStack>
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

export default BusinessOrderDetail;
