import PersonalAPIClient from '@/service/PersonalApiClient';
import { SearchIcon } from '@chakra-ui/icons';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Button,
  Flex,
  Spinner,
  Text,
  Badge,
  Tooltip,
  Box,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

export interface Order {
  orderId: string;
  customerId: string;
  orderNumber: string;
  orderStatus: string;
  createdTime: string;
  itemDetail: string[];
  totalPrice: string;
}

export type OrdersTableProps = {
  orders: Order[];
  currentPage: number;
  totalPages: number;
  loading: boolean;
  setCurrentPage: (page: number) => void;
};

export const OrdersTable = ({
  orders = [],
  currentPage,
  totalPages,
  loading,
  setCurrentPage,
}: OrdersTableProps) => {
  const navigate = useNavigate();

  const hanldePayment = (orderId: String) => {
    const user_id = localStorage.getItem('id');
    const username = localStorage.getItem('username');
    const token = localStorage.getItem('token');
    if (!username || !token || !user_id) {
      navigate('/login');
      return;
    }
    const apiClient = new PersonalAPIClient(
      `/payment/status/${orderId}`,
      username,
      token
    );

    apiClient
      .checkOrderPaymentStatus()
      .then(() => navigate(`/personal/payment/order_id/${orderId}`))
      .catch(() => {
        window.location.reload();
      });
  };

  return (
    <TableContainer>
      {loading ? (
        <Flex justify="center" my={4}>
          <Spinner size="xl" />
        </Flex>
      ) : (
        <Table>
          <Thead>
            <Tr>
              <Th textAlign="center">Created Time</Th>
              <Th textAlign="center">Order items</Th>
              <Th textAlign="center">Total Price</Th>
              <Th textAlign="center">Order Status</Th>
              <Th textAlign="center">Action</Th>
              <Th textAlign="center">Content</Th>
            </Tr>
          </Thead>
          <Tbody>
            {orders.map((order) => (
              <Tr key={order.orderId}>
                <Td textAlign="center">
                  {new Date(order.createdTime).toLocaleString()}
                </Td>
                <Td textAlign="center">
                  <Flex justify="center" align="center">
                    <Tooltip
                      key={order.orderId}
                      hasArrow
                      label={order.itemDetail.map((detail, index) => {
                        const parts = detail.split('#');
                        return (
                          <>
                            <div>item{' ' + (index + 1)}</div>
                            <div>Model: {parts[0]}</div>
                            <div>Quantity: {parts[1]}</div>
                            <div>Price: {parts[2]}</div>
                            {index !== order.itemDetail.length - 1 && (
                              <div>&nbsp;</div>
                            )}
                          </>
                        );
                      })}
                      bg="whiteAlpha.900"
                      color="black"
                    >
                      <SearchIcon />
                    </Tooltip>
                  </Flex>
                </Td>
                <Td textAlign="center">
                  ${parseFloat(order.totalPrice || '0').toFixed(2)}
                </Td>
                {(() => {
                  switch (order.orderStatus) {
                    case 'UNPAID':
                      return (
                        <>
                          <Td textAlign="center">
                            <Badge color={'orange.500'}>
                              Waiting for Payment
                            </Badge>
                          </Td>
                          <Td textAlign="center">
                            <Button
                              color={'green.500'}
                              _hover={{
                                bg: 'green.500',
                                transform: 'scale(1.05)',
                              }}
                              bgColor={'green.500'}
                              textColor={'white.500'}
                              onClick={() => hanldePayment(order.orderId)}
                            >
                              Pay Now
                            </Button>
                          </Td>
                        </>
                      );
                    case 'PAID':
                      return (
                        <>
                          <Td textAlign="center">
                            <Badge color={'green.500'}>PAID</Badge>
                          </Td>
                          <Td textAlign="center">
                            <Button
                              colorScheme="yellow"
                              bg="yellow.400"
                              _hover={{
                                bg: 'yellow.300',
                                transform: 'scale(1.1)',
                                boxShadow: '0 0 10px rgba(255, 215, 0, 0.8)',
                              }}
                              textColor="black"
                              fontSize="lg"
                              fontWeight="bold"
                              px={6}
                              py={4}
                              borderRadius="full"
                              onClick={() =>
                                navigate(
                                  `/personal/shipping/order_id/${order.orderId}`
                                )
                              }
                            >
                              <Box position="inherit" display="inline-block">
                                <Text
                                  as="span"
                                  color="red.500"
                                  fontSize="sm"
                                  position="absolute"
                                  top="-8px"
                                  left="-8px"
                                >
                                  *
                                </Text>
                                <Text>Select Address</Text>
                              </Box>
                            </Button>
                          </Td>
                        </>
                      );

                    case 'PROCESSING':
                      return (
                        <>
                          <Td textAlign="center">
                            <Badge color={'blue.500'}>Seller in Process</Badge>
                          </Td>
                          <Td textAlign="center">
                            <Badge>Please wait for shipment</Badge>
                          </Td>
                        </>
                      );

                    case 'SHIPPING':
                      return (
                        <>
                          <Td textAlign="center">
                            <Badge>SHIPPING</Badge>
                          </Td>
                          <Td textAlign="center">
                            <Button color={'green.500'}>
                              Track your package
                            </Button>
                          </Td>
                        </>
                      );
                    case 'SHIPPED':
                      return (
                        <Td textAlign="center">
                          <Button color={'green.500'}>
                            Track your package
                          </Button>
                        </Td>
                      );
                    case 'COMPLETE':
                      return (
                        <Td textAlign="center">
                          <Button color={'green.500'}>Order detail</Button>
                        </Td>
                      );
                    default:
                      return (
                        <Td textAlign="center">
                          <Text color={'red.500'}>Canced</Text>
                        </Td>
                      );
                  }
                })()}
                <Td textAlign="center">
                  <Button
                    bgColor={'blackAlpha.900'}
                    color={'whiteAlpha.900'}
                    onClick={() => {
                      const user_id = localStorage.getItem('id');
                      const orderId = order.orderId;
                      navigate(
                        `/personal/orders/user_id/${user_id}/order_id/${orderId}`
                      );
                    }}
                  >
                    Order Detail
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      )}

      <Flex justify="center" mt={4} gap={2}>
        <Button
          onClick={() => setCurrentPage(currentPage - 1)}
          isDisabled={currentPage === 0}
        >
          Prev
        </Button>

        <Button
          onClick={() => {
            setCurrentPage(currentPage + 1);
          }}
          disabled={currentPage === totalPages - 1}
        >
          Next
        </Button>
      </Flex>
    </TableContainer>
  );
};

export default OrdersTable;
