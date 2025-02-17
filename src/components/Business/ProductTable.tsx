
import {
  Box,
  Button,
  HStack,
  Spinner,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BusinessAPIClient from "@/service/BusinessApiClient";
import {ProdcutDetailDTO} from "@/data/entities";

const ProductTable = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize] = useState(5); // Items per page
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);

  const displayProductsByPages = async () => {
    const ownerId: string | null = localStorage.getItem('id');
    const token: string | null = localStorage.getItem('token');
    const username: string | null = localStorage.getItem('username');
    if (ownerId === null || token === null || username === null) {
      navigate('/login');
      return;
    }
    const businessAPIClient = new BusinessAPIClient(
      '/findProductsByOwner' + ownerId
    );
    setLoading(true);
    businessAPIClient
      .displayAllProducts(
        username,
        token,
        currentPage.toString(),
        pageSize.toString()
      )
      .then((response) => {
        setData(response.data.content);
        setTotalPages(response.data.totalPages);
        setCurrentPage(response.data.number);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    displayProductsByPages();
  }, [currentPage]);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 0 && newPage < totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <Box>
      {loading ? (
        <Spinner size="xl" />
      ) : (
        <>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>ID</Th>
                <Th>Name</Th>
                <Th>Category</Th>
                <Th>Price</Th>
                <Th>Stock</Th>
                <Th>Created time</Th>
                <Th>Last updated</Th>
                <Th>Product Detail page</Th>
              </Tr>
            </Thead>
            <Tbody>
              {data.map((item: ProdcutDetailDTO) => (
                <Tr key={item.id}>
                  <Td>{item.id}</Td>
                  <Td>{item.name}</Td>
                  <Td>{item.category}</Td>
                  <Td>{item.price}</Td>
                  <Td>{item.stock}</Td>
                  <Td>{item.createdTime}</Td>
                  <Th> {item.updatedTime}</Th>
                  <Button>Button</Button>
                </Tr>
              ))}
            </Tbody>
          </Table>
          <HStack spacing={4} mt={4} justify="center">
            <Button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 0}
            >
              Prev
            </Button>
            <Box>
              Page {currentPage + 1} of {totalPages}
            </Box>
            <Button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages - 1}
            >
              Next
            </Button>
          </HStack>
        </>
      )}
    </Box>
  );
};

export default ProductTable;
