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
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

interface Order {
  orderId: string;
  customerId: string;
  orderNumber: string;
  orderStatus: string;
  createdTime: string;
  itemDetail: string[];
  totalPrice: string;
}

type OrdersTableProps = {
  orders: Order[];
  currentPage: number;
  totalPages: number;
  loading: boolean;
  setCurrentPage: (page: number) => void;
};

const OrdersTable = ({
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
              <Th>Created Time</Th>
              <Th>Order items</Th>
              <Th>Total Price</Th>
              <Th>Order Status</Th>
              <Th></Th>
              <Th>Content</Th>
            </Tr>
          </Thead>
          <Tbody>
            {orders.map((order) => (
              <Tr key={order.orderId}>
                <Td>{new Date(order.createdTime).toLocaleString()}</Td>
                <Td>
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
                <Td>${parseFloat(order.totalPrice || '0').toFixed(2)}</Td>
                {(() => {
                  switch (order.orderStatus) {
                    case 'UNPAID':
                      return (
                        <>
                          <Td>
                            <Badge color={'orange.500'}>
                              Waiting for Payment
                            </Badge>
                          </Td>
                          <Td>
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
                          <Td>
                            <Badge color={'green.500'}>PAID</Badge>
                          </Td>
                          <Td>
                            <Button
                              color={'green.500'}
                              _hover={{
                                bg: 'green.500',
                                transform: 'scale(1.05)',
                              }}
                              bgColor={'blackAlpha.900'}
                              textColor={'whiteAlpha.900'}
                              onClick={() =>
                                navigate(
                                  `/personal/shipping/order_id/${order.orderId}`
                                )
                              }
                            >
                              Set Shipping Address
                            </Button>
                          </Td>
                        </>
                      );

                    case 'PROCESSING':
                      return (
                        <>
                          <Td>
                            <Badge color={'blue.500'}>Seller in Process</Badge>
                          </Td>
                          <Td></Td>
                        </>
                      );

                    case 'SHIPPING':
                      return (
                        <Td>
                          <Button color={'green.500'}>
                            Track your package
                          </Button>
                        </Td>
                      );
                    case 'SHIPPED':
                      return (
                        <Td>
                          <Button color={'green.500'}>
                            Track your package
                          </Button>
                        </Td>
                      );
                    case 'COMPLETE':
                      return (
                        <Td>
                          <Button color={'green.500'}>Order detail</Button>
                        </Td>
                      );
                    default:
                      <Td>
                        return <Text color={'red.500'}>Canced</Text>;
                      </Td>;
                  }
                })()}
                <Td>
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
                    Detail
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
