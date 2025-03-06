import { ProductDetailDTO } from '@/data/entities';
import { Box, SimpleGrid } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';
import ProductContainer from './ProductContainer';
import ProductSkeleton from './ProductSkeleton';
import PersonalAPIClient from '@/service/PersonalApiClient';
import Product from './Product';

type PagedModel = {
  _embedded: {
    productDetailDTOList: ProductDetailDTO[];
  };
  page: {
    size: number;
    totalElements: number;
    totalPages: number;
    number: number;
  };
};
export const ProductGrid = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = 12;
  const [data, setData] = useState<ProductDetailDTO[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [hasNextPage, setHasNextPage] = useState(true);
  const skeletons = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const [loading, setLoading] = useState(false);
  const displayProducts = async (page: number) => {
    if (!hasNextPage) return;
    const endpoint = '/products';
    const username = localStorage.getItem('username');
    const token = localStorage.getItem('token');
    if (!username || !token) {
      navigate('/login');
      return;
    }

    const apiClient = new PersonalAPIClient(endpoint, username, token);
    try {
      setLoading(true);
      const response = await apiClient.displayProducts(
        page.toString(),
        pageSize.toString()
      );
      const data = response.data as PagedModel;
      setData((prevData) => [
        ...prevData,
        ...data._embedded.productDetailDTOList,
      ]);
      setTotalPages(data.page.totalPages);
      setHasNextPage(data.page.number + 1 < data.page.totalPages);
      setCurrentPage(page);
    } catch (err) {
      navigate('/login');
      console.log(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    displayProducts(0);
  }, [totalPages]);

  return (
    <Box padding="5px">
      <InfiniteScroll
        dataLength={data.length}
        next={() => displayProducts(currentPage + 1)}
        hasMore={hasNextPage}
        loader={<ProductSkeleton />}
      >
        {loading &&
          skeletons.map((skeleton) => (
            <ProductContainer key={skeleton}>
              <ProductSkeleton key={skeleton}></ProductSkeleton>
            </ProductContainer>
          ))}
        <SimpleGrid columns={{ sm: 1, md: 2, lg: 3, xl: 4 }} spacing={3}>
          {data.map((product) => (
            <ProductContainer key={product.id}>
              <Product key={product.id} {...product} />
            </ProductContainer>
          ))}
        </SimpleGrid>
      </InfiniteScroll>
    </Box>
  );
};
