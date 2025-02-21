import { ProductDetailDTO } from '@/data/entities';
import PersonalAPIClient from '@/service/PersonalApiClient';
import { Flex } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ImageDisplay from './ImageDisplay';
import DescriptionDisplay from './DescriptionDisplay';

type ProductDetailProps = {
  product_id: string | undefined;
};

const ProductDetail = ({ product_id }: ProductDetailProps) => {
  const navigate = useNavigate();
  const [product, setProduct] = useState<ProductDetailDTO>();
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    if (!product_id) return;
    const username = localStorage.getItem('username');
    const token = localStorage.getItem('token');

    if (!username || !token) {
      navigate('/login');
      return;
    }

    const endpoint = '/product/' + product_id;
    const apiClient = new PersonalAPIClient(endpoint, username, token);

    apiClient
      .findProductById()
      .then((response) => {
        setProduct(response.data);
        setImages(response.data.awsUrls);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <Flex wrap="wrap" align="top" gap={'40px'}>
      <ImageDisplay images={images}></ImageDisplay>
      <DescriptionDisplay
        name={product?.name}
        price={product?.price}
        stock={product?.stock}
        category={product?.category}
        id={product?.id}
        description={product?.description}
      ></DescriptionDisplay>
    </Flex>
  );
};

export default ProductDetail;
