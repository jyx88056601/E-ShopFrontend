import PersonalAPIClient from '@/service/PersonalApiClient';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { CartItemRequestDTO } from '@/data/entities';

type CartResponseDTO = {
  id: string;
  cartItemResponseDTOList: CartItemResponse[];
};

type CartItemResponse = {
  quantity: string;
  productSimplifiedResponseDTO: ProductSimplifiedResponseDTO;
};

type ProductSimplifiedResponseDTO = {
  product_id: string;
  name: string;
  price: string;
  mainPictureUrl: string;
};

const Cart = () => {
  const [data, setData] = useState<CartResponseDTO>({
    id: '',
    cartItemResponseDTOList: [],
  });
  const navigate = useNavigate();
  const { user_id } = useParams<{ user_id: string }>();

  const uploadCartItemsToDatabase = async () => {
    const username = localStorage.getItem('username');
    const token = localStorage.getItem('token');
    const user_id = localStorage.getItem('id');
    if (!username || !token || !user_id) {
      navigate('/login');
      return;
    }
    const cartItems: CartItemRequestDTO[] = JSON.parse(
      localStorage.getItem('cartitems') || '[]'
    );
    if (cartItems.length === 0) {
      return;
    }
    const endpoint = '/cart/add-to-cart/user_id=' + user_id;
    const apiClient = new PersonalAPIClient(endpoint, username, token);
    apiClient
      .addCartItemsToCart(cartItems)
      .then((response) => {
        if (response.status === 200) {
          console.log('Cart items added to the database successfully');
          localStorage.removeItem('cartitems');
        }
      })
      .then(getCart)
      .catch((err) => console.log('Error adding cart items:', err));
  };

  const getCart = async () => {
    const username = localStorage.getItem('username');
    const token = localStorage.getItem('token');
    if (!username || !token) {
      navigate('/login');
      return;
    }
    const endpoint = `/cart/user_id=${user_id}`;
    const apiClient = new PersonalAPIClient(endpoint, username, token);
    apiClient
      .findCartById()
      .then((response) => {
        if (response.status === 204) {
          navigate('/personal');
        } else {
          console.log('API Response:', response.data);
          setData(response.data);
        }
      })
      .catch((err) => {
        console.error('Error fetching cart:', err);
        setData({ id: '', cartItemResponseDTOList: [] });
      });
  };

  useEffect(() => {
    const fetchData = async () => {
      await uploadCartItemsToDatabase();
      await getCart();
    };
    fetchData();
  }, []);

  return (
    <>
      <TableContainer>
        <Table variant="simple">
          <TableCaption>Your Shopping Cart</TableCaption>
          <Thead>
            <Tr>
              <Th></Th>
              <Th>Title</Th>
              <Th>Quantity</Th>
              <Th isNumeric>Price</Th>
              <Th isNumeric>Total Price</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data?.cartItemResponseDTOList &&
            data.cartItemResponseDTOList.length > 0 ? (
              data.cartItemResponseDTOList.map(
                (item: CartItemResponse, index) => {
                  const itemTotalPrice =
                    parseFloat(item.productSimplifiedResponseDTO.price) *
                    parseFloat(item.quantity);
                  return (
                    <Tr
                      key={`${item.productSimplifiedResponseDTO.product_id}-${index}`}
                    >
                      <Td>
                        <img
                          src={item.productSimplifiedResponseDTO.mainPictureUrl}
                          alt={`Thumbnail of product`}
                          width="50"
                          height="50"
                        />
                      </Td>
                      <Td>{item.productSimplifiedResponseDTO.name}</Td>
                      <Td>{item.quantity}</Td>
                      <Td isNumeric>
                        {item.productSimplifiedResponseDTO.price}
                      </Td>
                      <Td isNumeric>${itemTotalPrice.toFixed(2)}</Td>
                    </Tr>
                  );
                }
              )
            ) : (
              <Tr>
                <Td colSpan={3}>No items in the cart</Td>
              </Tr>
            )}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
};

export default Cart;
