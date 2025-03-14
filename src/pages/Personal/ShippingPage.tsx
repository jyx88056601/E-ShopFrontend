import AddressForm from '@/components/Default/AddressForm';
import AddressSelection from '@/components/Personal/AddressSelection';
import PersonalAPIClient from '@/service/PersonalApiClient';
import { Flex, VStack, Button, Box } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ShippingPage = () => {
  const [selectedMenu, setSelectedMenu] = useState<'create' | 'add'>('create');
  const navigate = useNavigate();
  const [addressList, setAddressList] = useState();

  useEffect(() => {
    fetchAddress();
  }, [selectedMenu]);

  const fetchAddress = async () => {
    const user_id = localStorage.getItem('id');
    const username = localStorage.getItem('username');
    const token = localStorage.getItem('token');
    if (!username || !token) {
      navigate('/login');
      return;
    }
    const apiClient = new PersonalAPIClient(
      `/address/${user_id}`,
      username,
      token
    );

    try {
      const response = await apiClient.fetchAddressList();
      if (response && response.data && Array.isArray(response.data.addresses)) {
        setAddressList(response.data.addresses);
      } else {
        console.error('Invalid response structure');
      }
    } catch (err) {
      console.log('Error fetching addresses:', err);
    }
  };

  return (
    <Flex pt="30" color="white" gap={50} wrap={'wrap'}>
      <VStack
        pt={'90px'}
        pl={'10px'}
        spacing={4}
        align="stretch"
        minWidth="200px"
        bg="gray.800"
        borderRadius="md"
        boxShadow="md"
        height="fit-content"
      >
        <Button
          colorScheme={selectedMenu === 'create' ? 'blue' : 'gray'}
          onClick={() => {
            setSelectedMenu('create');
            fetchAddress();
          }}
          justifyContent="flex-start"
          width="full"
        >
          Select Address
        </Button>
        <Button
          colorScheme={selectedMenu === 'add' ? 'blue' : 'gray'}
          onClick={() => setSelectedMenu('add')}
          justifyContent="flex-start"
          width="full"
        >
          Create new Address
        </Button>
      </VStack>

      <Box
        flex="1"
        display="flex"
        flexDirection="column"
        justifyContent="flex-start"
        pt={0}
        mt={0}
      >
        {selectedMenu === 'add' && <AddressForm />}
        {selectedMenu === 'create' && (
          <AddressSelection addressList={addressList} />
        )}
      </Box>
    </Flex>
  );
};

export default ShippingPage;
