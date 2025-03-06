import OrdersTable from '@/components/Personal/OrdersTable';
import PersonalAPIClient from '@/service/PersonalApiClient';
import { Flex } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

type OrderResponseDTO = {
  orderId: string;
  customerId: string;
  orderNumber: string;
  orderStatus: string;
  createdTime: string;
  itemDetail: string[];
  totalPrice: string;
};

type PagedModel = {
  _embedded: {
    orderResponseDTOList: OrderResponseDTO[];
  };
  page: {
    size: number;
    totalElements: number;
    totalPages: number;
    number: number;
  };
};

const CustomerOrderManagementPage = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<OrderResponseDTO[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const user_id = localStorage.getItem('id');
  const username = localStorage.getItem('username');
  const token = localStorage.getItem('token');

  const fetchOrders = async () => {
    if (!username || !token || !user_id) {
      navigate('/login');
      return;
    }
    setLoading(true);
    const apiClient = new PersonalAPIClient(
      `/fetchOrders/user_id=${user_id}`,
      username,
      token
    );
    try {
      const response = await apiClient.fetchOrders(String(currentPage), '5');
      const pagedData = response.data as PagedModel;
      console.log(pagedData);
      setData(pagedData._embedded.orderResponseDTOList);
      setTotalPages(pagedData.page.totalPages);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [currentPage]);

  return (
    <Flex direction="column" align="center" w="100%" pt={'20px'}>
      <OrdersTable
        orders={data}
        currentPage={currentPage}
        totalPages={totalPages}
        loading={loading}
        setCurrentPage={setCurrentPage}
      />
    </Flex>
  );
};

export default CustomerOrderManagementPage;
