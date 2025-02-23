import ProductDetail from '@/components/Personal/ProductDetail';
import { useNavigate, useParams } from 'react-router-dom';

const ProductDetailPage = () => {
  const { product_id } = useParams();
  const navigate = useNavigate();
  if (product_id === undefined) {
    navigate('/error');
    return;
  }

  return <ProductDetail product_id={product_id}></ProductDetail>;
};

export default ProductDetailPage;
