import { CartItemRequestDTO } from '@/data/entities';
import { Button } from '@chakra-ui/react';

type AddToCartButtonProps = {
  count: number;
  product_id: string;
};

const AddToCartButton = ({ count, product_id }: AddToCartButtonProps) => {
  const handleAddToCart = () => {
    let cartItems: CartItemRequestDTO[] = JSON.parse(
      localStorage.getItem('cartitems') || '[]'
    );

    const existingIndex = cartItems.findIndex(
      (item: CartItemRequestDTO) => item.product_id === product_id
    );

    if (existingIndex > -1) {
      cartItems[existingIndex].quantity = count.toString();
    } else {
      const cartItemRequestDTO: CartItemRequestDTO = {
        product_id: product_id,
        quantity: count.toString(),
      };
      cartItems.push(cartItemRequestDTO);
    }

    localStorage.setItem('cartitems', JSON.stringify(cartItems));
  };

  return (
    <Button
      bg={'black'}
      color={'white'}
      width={'100%'}
      onClick={handleAddToCart}
    >
      Add to Cart
    </Button>
  );
};

export default AddToCartButton;
