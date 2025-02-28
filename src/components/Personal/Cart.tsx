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
  Text,
  HStack,
  Tfoot,
} from '@chakra-ui/react';
import {
  CartItemRequestDTO,
  OrderItemRequestDTO,
  OrderRequestDTO,
} from '@/data/entities';
import { DeleteIcon } from '@chakra-ui/icons';
import { AiOutlineSave } from 'react-icons/ai';
import QuantityControl from './QuantityControl';
import { useCartStore } from '@/data/store';
import AlertMessage from '../Default/AlertMessage';

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
  stock: string;
  merchantId: string;
};

const Cart = () => {
  const cartState = useCartStore();

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
          console.log('upload cartitems to cart');
          localStorage.removeItem('cartitems');
        }
      })
      .then(() => getCart())
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
          setData(response.data);
          let newCount = 0;
          response.data.cartItemResponseDTOList.forEach(
            (cartItem: CartItemResponse) => {
              newCount += Number(cartItem.quantity);
            }
          );
          cartState.setItemCount(newCount);
        }
      })
      .catch((err) => {
        console.error('Error fetching cart:', err);
        setData({ id: '', cartItemResponseDTOList: [] });
      });
  };

  useEffect(() => {
    getCart();
    const syncCart = async () => {
      await uploadCartItemsToDatabase();
    };
    syncCart();
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
    const apiClient = new PersonalAPIClient(endpoint, username, token);
    apiClient
      .deleteCartItems(deletedCartItemIds)
      .then(() => getCart())
      .finally(() => {
        setChanged(false);
        setIsSavingCart(false);
      });
  };

  const handleCheck = (cartItemId: string) => {
    setSelectedCartItemIds((prevIds) => {
      const updatedIds = new Set(prevIds);
      if (updatedIds.has(cartItemId)) {
        updatedIds.delete(cartItemId);
      } else {
        updatedIds.add(cartItemId);
      }
      return updatedIds;
    });
  };

  const selectAll = () => {
    setSelectedCartItemIds((prevIds) => {
      if (prevIds.size === data.cartItemResponseDTOList.length) {
        return new Set();
      }
      let allCartIds: Set<string> = new Set();
      data.cartItemResponseDTOList.forEach((cartItem) => {
        allCartIds.add(cartItem.cartItemId);
      });
      return allCartIds;
    });
  };

  const [isBuildingOrder, setIsBuildingOrder] = useState(false);
  const [selectedCartItemIds, setSelectedCartItemIds] = useState<Set<string>>(
    new Set()
  );

  const [checkedItems, setCheckedItems] = useState([false, false]);

  const allChecked =
    data.cartItemResponseDTOList.length > 0 &&
    data.cartItemResponseDTOList.every((item) =>
      selectedCartItemIds.has(item.cartItemId)
    );

  const isIndeterminate =
    data.cartItemResponseDTOList.some((item) =>
      selectedCartItemIds.has(item.cartItemId)
    ) && !allChecked;

  useEffect(() => {}, [selectedCartItemIds]);

  const handlePlaceOrder = () => {
    setIsBuildingOrder(true);
    const selectedCartItems: CartItemResponse[] =
      data.cartItemResponseDTOList.filter(
        (cartItemResponse: CartItemResponse) =>
          selectedCartItemIds.has(cartItemResponse.cartItemId)
      );
    const customer_id = localStorage.getItem('id');

    if (!customer_id) {
      setIsBuildingOrder(false);
      return;
    }

    let orderRequestDTO: OrderRequestDTO = {
      orderItemRequestDTOList: [],
    };

    selectedCartItems.forEach((cartItem: CartItemResponse) => {
      const orderItemRequestDTO: OrderItemRequestDTO = {
        productId: cartItem.productSimplifiedResponseDTO.product_id,
        quantity: cartItem.quantity,
        merchantId: cartItem.productSimplifiedResponseDTO.merchantId,
      };
      orderRequestDTO.orderItemRequestDTOList.push(orderItemRequestDTO);
    });

    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    if (!username || !token) {
      navigate('/login');
      return;
    }
    const endpoint = '/create-order/user_id=' + customer_id;
    const apiClient = new PersonalAPIClient(endpoint, username, token);
    console.log(
      'items ready to access order OrderReqestDTO: ' +
        orderRequestDTO.orderItemRequestDTOList
    );
    apiClient
      .placeOrder(orderRequestDTO)
      .then((response) => {
        setIsBuildingOrder(false);
        console.log(response);
        selectedCartItemIds.forEach((item) => deletedCartItemIds.add(item));
        setSelectedCartItemIds(new Set());
      })
      .then(() => {
        handleSaveChanges();
        navigate('/personal/orders/user_id/' + localStorage.getItem('id'));
      })
      .catch((err) => {
        setMessage(err.response.data);
        console.log(err);
      })
      .finally(() => setIsBuildingOrder(false));
  };

  const [message, setMessage] = useState('');

  return (
    <>
      {message && <AlertMessage message={message} status="error" />}
      <TableContainer overflowX="auto">
        <Table variant="simple">
          <TableCaption placement="top" fontSize={'xx-large'}>
            Shopping Cart
          </TableCaption>
          <Thead>
            <Tr>
              <Th>
                <Checkbox
                  borderColor="green"
                  onChange={(e) => {
                    const isChecked = e.target.checked;
                    setCheckedItems([isChecked, isChecked]);
                    selectAll();
                  }}
                  isIndeterminate={isIndeterminate}
                />
              </Th>
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
              data.cartItemResponseDTOList.map(
                (item: CartItemResponse, index: number) => {
                  const itemTotalPrice =
                    parseFloat(item.productSimplifiedResponseDTO.price) *
                    parseFloat(item.quantity);
                  return (
                    <Tr key={item.cartItemId}>
                      <Td>
                        <Checkbox
                          key={index}
                          isChecked={selectedCartItemIds.has(item.cartItemId)}
                          onChange={(e) => {
                            setCheckedItems([
                              e.target.checked,
                              checkedItems[index],
                            ]);
                            handleCheck(item.cartItemId);
                          }}
                        />
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
                                prevData.cartItemResponseDTOList.map(
                                  (cartItem) =>
                                    cartItem.cartItemId === item.cartItemId
                                      ? { ...cartItem, quantity: newQuantity }
                                      : cartItem
                                ),
                            }));
                          }}
                          stock={item.productSimplifiedResponseDTO.stock}
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
                }
              )
            ) : (
              <Tr>
                <Td colSpan={7}>
                  <HStack pl={'10px'}>
                    <Button
                      color={'green.500'}
                      onClick={() => {
                        navigate('/personal');
                      }}
                    >
                      Back
                    </Button>
                    <Text>No item in the cart</Text>
                  </HStack>
                </Td>
              </Tr>
            )}
          </Tbody>
          <Tfoot>
            <Tr>
              <Td colSpan={7}>
                <Flex
                  justify="space-between"
                  pl={'10px'}
                  pt={'10px'}
                  width={'96%'}
                >
                  {cartState.itemCount === 0 ? (
                    <Text></Text>
                  ) : isBuildingOrder ? (
                    <Spinner />
                  ) : (
                    <Button
                      bgColor={'green'}
                      disabled={selectedCartItemIds.size === 0}
                      onClick={handlePlaceOrder}
                    >
                      Place Order
                    </Button>
                  )}
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
              </Td>
            </Tr>
          </Tfoot>
        </Table>
      </TableContainer>
    </>
  );
};

export default Cart;
