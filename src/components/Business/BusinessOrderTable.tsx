import {
  OrderResponseDTO,
  PagedModel,
} from '@/pages/Personal/CustomerOrderManagementPage';
import BusinessAPIClient from '@/service/BusinessApiClient';
import { Flex } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BusinessOrderManagementTable from './BusinessOrderManagementTable';

const BusinessOrderTable = () => {
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
    const apiClient = new BusinessAPIClient(
      `/fetchOrdersByMerchantId/${user_id}`
    );
    try {
      const response = await apiClient.fetchOrdersByMerchantId(
        username,
        token,
        String(currentPage),
        '5'
      );
      const pagedData = response.data as PagedModel;
      setData(pagedData._embedded.orderResponseDTOList);
      setTotalPages(pagedData.page.totalPages);
      console.log(pagedData);
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
      <BusinessOrderManagementTable
        orders={data}
        currentPage={currentPage}
        totalPages={totalPages}
        loading={loading}
        setCurrentPage={setCurrentPage}
      />
    </Flex>
  );
};

export default BusinessOrderTable;
