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
  Badge,
  Tooltip,
  Box,
  Input,
  VStack,
} from '@chakra-ui/react';
import { useState } from 'react';
import { OrdersTableProps } from '../Personal/OrdersTable';
import BusinessAPIClient from '@/service/BusinessApiClient';
import PersonalAPIClient from '@/service/PersonalApiClient';
import BusinessOrderDetail, { OrderDetailDTO } from './BusinessOrderDetail';

export type TrackNumberDTO = { trackNumber: string };

const getAuth = () => ({
  username: localStorage.getItem('username'),
  token: localStorage.getItem('token'),
});

const BusinessOrderManagementTable = ({
  orders,
  currentPage,
  totalPages,
  loading,
  setCurrentPage,
}: OrdersTableProps) => {
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [orderDetail, setOrderDetail] = useState<OrderDetailDTO | null>(null);
  const [contact, setContact] = useState('');
  const [trackNumbers, setTrackNumbers] = useState<Record<string, string>>({});
  const [isAdded, setIsAdded] = useState<Record<string, boolean>>({});
  const [isLoading, setIsLoading] = useState<Record<string, boolean>>({});
  const [deliveryNumbers, setDeliveryNumbers] = useState<
    Record<string, string>
  >({});

  const fetchData = async <T,>(
    endpoint: string,
    method: 'GET' | 'POST' = 'GET',
    body?: unknown
  ): Promise<T | null> => {
    const { username, token } = getAuth();
    if (!username || !token) return null;

    const apiClient = new BusinessAPIClient(endpoint);
    return method === 'GET'
      ? (await apiClient.fetchShipment(username, token)).data
      : (
          await apiClient.updateShipment(
            username,
            token,
            body as TrackNumberDTO
          )
        ).data;
  };

  const fetchShipmentDetail = async (orderId: string) => {
    const data = await fetchData<{ trackingNumber: string }>(
      `/delivery/shipment/${orderId}`
    );
    if (data)
      setDeliveryNumbers((prev) => ({
        ...prev,
        [orderId]: data.trackingNumber,
      }));
  };

  const handleAddTrackingNumber = async (
    orderId: string,
    trackNumber: string
  ) => {
    if (!trackNumber) return;

    setIsLoading((prev) => ({ ...prev, [orderId]: true }));
    const data = await fetchData(
      `/delivery/order/${orderId}/addTrackingNumber`,
      'POST',
      { trackNumber }
    );

    if (data) setIsAdded((prev) => ({ ...prev, [orderId]: true }));
    setIsLoading((prev) => ({ ...prev, [orderId]: false }));
  };

  const fetchOrderDetails = async (orderId: string) => {
    const data = await fetchData<OrderDetailDTO>(`/order/${orderId}`);
    if (data) setOrderDetail(data);
  };

  const fetchMerchantContact = async (merchantId?: string) => {
    if (!merchantId) return;
    const { username, token } = getAuth();
    if (!username || !token) return;

    const apiClient = new PersonalAPIClient(
      `/seller/contact${merchantId}`,
      username,
      token
    );
    const data = await apiClient.getSellerInfo();
    setContact(data.data || '');
  };

  const handleViewDetails = async (orderId: string) => {
    if (selectedOrderId === orderId) {
      setSelectedOrderId(null);
      setOrderDetail(null);
      setContact('');
    } else {
      setSelectedOrderId(orderId);
      await fetchOrderDetails(orderId);
    }
  };

  return (
    <Flex direction="column" w="full">
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
                <Th>Order Items</Th>
                <Th>Total Price</Th>
                <Th>Order Status</Th>
                <Th>Actions</Th>
                <Th>Details</Th>
              </Tr>
            </Thead>
            <Tbody>
              {orders.map((order) => (
                <Tr key={order.orderId}>
                  <Td>{new Date(order.createdTime).toLocaleString()}</Td>
                  <Td>
                    <Flex justify="center" align="center">
                      <Tooltip
                        hasArrow
                        label={order.itemDetail.map((detail, index) => (
                          <Box key={index}>
                            <div>Item {index + 1}</div>
                            <div>Model: {detail.split('#')[0]}</div>
                            <div>Quantity: {detail.split('#')[1]}</div>
                            <div>Price: {detail.split('#')[2]}</div>
                          </Box>
                        ))}
                        bg="whiteAlpha.900"
                        color="black"
                      >
                        <SearchIcon />
                      </Tooltip>
                    </Flex>
                  </Td>
                  <Td>${parseFloat(order.totalPrice || '0').toFixed(2)}</Td>
                  <Td>
                    <Badge
                      color={
                        {
                          PAID: 'green.500',
                          UNPAID: 'orange.500',
                          PROCESSING: 'blue.500',
                          SHIPPING: 'green.400',
                        }[order.orderStatus] || 'gray.500'
                      }
                    >
                      {order.orderStatus}
                    </Badge>
                  </Td>
                  <Td>
                    {order.orderStatus === 'UNPAID' && (
                      <Badge color="orange.500">Waiting for payment</Badge>
                    )}
                    {order.orderStatus === 'PAID' && (
                      <Badge color="orange.500">
                        Awaiting customer shipment setup
                      </Badge>
                    )}
                    {order.orderStatus === 'PROCESSING' && (
                      <>
                        {isAdded[order.orderId] ? (
                          <Badge colorScheme="blue">
                            {trackNumbers[order.orderId]}
                          </Badge>
                        ) : isLoading[order.orderId] ? (
                          <Spinner size="sm" />
                        ) : (
                          <VStack>
                            <Input
                              placeholder="Enter tracking number"
                              value={trackNumbers[order.orderId] || ''}
                              onChange={(e) =>
                                setTrackNumbers((prev) => ({
                                  ...prev,
                                  [order.orderId]: e.target.value,
                                }))
                              }
                            />
                            <Button
                              color="red.500"
                              onClick={() =>
                                handleAddTrackingNumber(
                                  order.orderId,
                                  trackNumbers[order.orderId] || ''
                                )
                              }
                            >
                              Add Delivery Details
                            </Button>
                          </VStack>
                        )}
                      </>
                    )}
                    {deliveryNumbers[order.orderId] ? (
                      <Badge color="blue.500">
                        {deliveryNumbers[order.orderId]}
                      </Badge>
                    ) : (
                      order.orderStatus === 'SHIPPING' && (
                        <Button
                          color="yellow.500"
                          onClick={() => fetchShipmentDetail(order.orderId)}
                        >
                          Track Delivery
                        </Button>
                      )
                    )}
                  </Td>
                  <Td>
                    <Button
                      disabled={order.orderStatus === 'UNPAID'}
                      bgColor="blackAlpha.900"
                      color="whiteAlpha.900"
                      onClick={() => handleViewDetails(order.orderId)}
                    >
                      View Details
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
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages - 1}
          >
            Next
          </Button>
        </Flex>
      </TableContainer>
      {selectedOrderId && (
        <BusinessOrderDetail
          data={orderDetail}
          contact={contact}
          onFetchContact={fetchMerchantContact}
        />
      )}
    </Flex>
  );
};

export default BusinessOrderManagementTable;
