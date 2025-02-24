import PersonalAPIClient from '@/service/PersonalApiClient';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Button,
  Checkbox,
  Flex,
  Spinner,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tooltip,
  Tr,
} from '@chakra-ui/react';
import { CartItemRequestDTO } from '@/data/entities';
import { DeleteIcon } from '@chakra-ui/icons';
import { AiOutlineSave } from 'react-icons/ai';
import QuantityControl from './QuantityControl';
import { useCartStore } from '@/data/store';

type CartResponseDTO = {
  id: string;
  cartItemResponseDTOList: CartItemResponse[];
};

type CartItemResponse = {
  cartItemId: string;
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
  const setItemCount = useCartStore((state) => state.setItemCount);
  const [deletedCartItemIds, setDeletedCartItemIds] = useState<Set<string>>(
    new Set()
  );
  const [isSavingCart, setIsSavingCart] = useState(false);
  const [changed, setChanged] = useState(false);
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
          let newCount = 0;
          response.data.cartItemResponseDTOList.forEach(
            (cartItem: CartItemResponse) => {
              newCount += Number(cartItem.quantity);
            }
          );
          setItemCount(newCount); // 这里没有多余的括号
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

  const handleDeleteItem = (id: string) => {
    setDeletedCartItemIds((prev) => new Set(prev).add(id));
    setChanged(true);
  };

  useEffect(() => {
    setData((prevData) => ({
      ...prevData,
      cartItemResponseDTOList: prevData.cartItemResponseDTOList.filter(
        (cartItem) => !deletedCartItemIds.has(cartItem.cartItemId)
      ),
    }));
  }, [deletedCartItemIds]);

  const handleSaveChanges = async () => {
    const username = localStorage.getItem('username');
    const token = localStorage.getItem('token');
    if (!username || !token) {
      navigate('/login');
      return;
    }
    setIsSavingCart(true);
    const endpoint = '/delete-cartItems/' + data.id;
    console.log(data.id);
    const apiClient = new PersonalAPIClient(endpoint, username, token);
    apiClient
      .deleteCartItems(deletedCartItemIds)
      .then(() => getCart())
      .finally(() => {
        setChanged(false);
        setIsSavingCart(false);
      });
  };

  return (
    <>
      <TableContainer overflowX="auto">
        <Table variant="simple">
          <TableCaption placement="top" fontSize={'xx-large'}>
            Shopping Cart
          </TableCaption>
          <Thead>
            <Tr>
              <Th></Th>
              <Th></Th>
              <Th>Title</Th>
              <Th>Price</Th>
              <Th>Quantity</Th>
              <Th>Total Price</Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {data?.cartItemResponseDTOList &&
            data.cartItemResponseDTOList.length > 0 ? (
              data.cartItemResponseDTOList.map((item: CartItemResponse) => {
                const itemTotalPrice =
                  parseFloat(item.productSimplifiedResponseDTO.price) *
                  parseFloat(item.quantity);
                return (
                  <Tr key={item.cartItemId}>
                    <Td>
                      <Checkbox defaultChecked></Checkbox>
                    </Td>
                    <Td minWidth="60px">
                      <img
                        src={item.productSimplifiedResponseDTO.mainPictureUrl}
                        alt="Thumbnail of product"
                        width="50"
                        height="50"
                      />
                    </Td>
                    <Td minWidth="120px" whiteSpace="nowrap">
                      {item.productSimplifiedResponseDTO.name}
                    </Td>
                    <Td minWidth="100px">
                      ${item.productSimplifiedResponseDTO.price}
                    </Td>
                    <Td minWidth="80px">
                      <QuantityControl
                        quantity={item.quantity}
                        onChange={(newQuantity) => {
                          setData((prevData) => ({
                            ...prevData,
                            cartItemResponseDTOList:
                              prevData.cartItemResponseDTOList.map((cartItem) =>
                                cartItem.cartItemId === item.cartItemId
                                  ? { ...cartItem, quantity: newQuantity }
                                  : cartItem
                              ),
                          }));
                          setChanged(true);
                        }}
                      />
                    </Td>
                    <Td minWidth="100px">${itemTotalPrice}</Td>
                    <Td minWidth="50px">
                      <Flex align="center" justify="center" height="100%">
                        <DeleteIcon
                          cursor="pointer"
                          color="white.500"
                          onClick={() => handleDeleteItem(item.cartItemId)}
                          boxSize={6}
                        />
                      </Flex>
                    </Td>
                  </Tr>
                );
              })
            ) : (
              <Tr>
                <Td colSpan={3}>No items in the cart</Td>
              </Tr>
            )}
          </Tbody>
        </Table>
        <Flex justify="space-between" pl={'10px'} pt={'10px'} width={'96%'}>
          <Button bgColor={'green'}>Create an order</Button>
          {changed && (
            <Tooltip label="Save changes" placement="top">
              <Flex align="center" justify="center" height="100%">
                {isSavingCart ? (
                  <Spinner />
                ) : (
                  <AiOutlineSave
                    color="green"
                    style={{ cursor: 'pointer' }}
                    onClick={handleSaveChanges}
                    size={24}
                  />
                )}
              </Flex>
            </Tooltip>
          )}
        </Flex>
      </TableContainer>
    </>
  );
};

export default Cart;
