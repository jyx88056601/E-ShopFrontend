import ProductDetail from '@/components/Personal/ProductDetail';
import { useParams } from 'react-router-dom';

const ProductDetailPage = () => {
  const { product_id } = useParams();
  console.log(product_id);
  return <ProductDetail product_id={product_id}></ProductDetail>;
};

export default ProductDetailPage;
