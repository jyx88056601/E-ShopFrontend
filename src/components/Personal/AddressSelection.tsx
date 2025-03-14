import { useState } from 'react';
import {
  Box,
  Text,
  Stack,
  VStack,
  Divider,
  Badge,
  HStack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from '@chakra-ui/react';
import { useNavigate, useParams } from 'react-router-dom';
import PersonalAPIClient from '@/service/PersonalApiClient';

type Addresses = {
  addressList: string[] | undefined;
};

export type ShipmentRequestDTO = {
  addressId: string;
  orderId: string;
};

const AddressSelection = ({ addressList }: Addresses) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(
    null
  );
  const { orderId } = useParams();
  const openModal = (addressId: string) => {
    setSelectedAddressId(addressId);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };
  const navigate = useNavigate();
  const handleConfirm = () => {
    if (selectedAddressId) {
      if (orderId == null) {
        alert("order_id can't be find");
        return;
      }
      console.log('Confirmed for address ID:', selectedAddressId);
      const userId = localStorage.getItem('id');
      const username = localStorage.getItem('username');
      const token = localStorage.getItem('token');
      if (!username || !token) {
        navigate('/login');
        return;
      }
      const shipmentRequestDTO: ShipmentRequestDTO = {
        addressId: selectedAddressId,
        orderId: orderId,
      };

      const apiClient = new PersonalAPIClient(
        '/shipment/buildShipment',
        username,
        token
      );
      apiClient
        .initializeShipment(shipmentRequestDTO)
        .then(() => navigate('/personal/orders/user_id/' + userId))
        .catch((err) => console.log(err));

      closeModal();
    }
  };

  const handleDelete = () => {
    if (selectedAddressId) {
      console.log('Deleted address ID:', selectedAddressId);
      closeModal();
    }
  };

  const parseAddressString = (addressString: string) => {
    const regex = /(\w+)\s*=\s*\'([^\']+)\'/g;
    const result: { [key: string]: string | null } = {};
    let match;

    while ((match = regex.exec(addressString)) !== null) {
      result[match[1]] = match[2] === 'null' ? null : match[2];
    }

    return result;
  };

  return (
    <VStack spacing={4} align="stretch">
      {addressList === undefined || addressList.length === 0 ? (
        <Text color="white">No address found</Text>
      ) : (
        addressList.map((address) => {
          const parsedAddress = parseAddressString(address);
          const addressId = parsedAddress['id'];
          if (addressId === null) return null;

          return (
            <Box
              key={addressId}
              p={5}
              shadow="md"
              borderWidth="1px"
              borderRadius="md"
              bg="gray.700"
              _hover={{ bg: 'gray.600' }}
              onClick={() => openModal(addressId)}
            >
              <Stack spacing={3}>
                <HStack justify="space-between" align="start">
                  <Text fontSize="xl" fontWeight="bold" color="teal.300">
                    {parsedAddress['recipientName']}
                  </Text>
                  <Badge colorScheme="green">{parsedAddress['city']}</Badge>
                </HStack>

                <Text fontSize="sm" color="gray.200">
                  {parsedAddress['streetName']}, {parsedAddress['HouseNumber']}{' '}
                  {parsedAddress['unitNumber'] &&
                    `Unit: ${parsedAddress['unitNumber']}`}
                </Text>

                <Text fontSize="sm" color="gray.200">
                  {parsedAddress['community'] &&
                    `Community: ${parsedAddress['community']}`}{' '}
                  {parsedAddress['district'] &&
                    `District: ${parsedAddress['district']}`}
                </Text>

                <HStack>
                  <Text fontSize="sm" color="gray.200">
                    {parsedAddress['city']}, {parsedAddress['province']},{' '}
                    {parsedAddress['country']}
                  </Text>
                  <Text fontSize="sm" color="gray.200">
                    {parsedAddress['postalCode']}
                  </Text>
                </HStack>

                <Divider borderColor="gray.500" />

                <HStack>
                  <Text fontSize="sm" color="gray.200">
                    Phone: {parsedAddress['phoneNumber']}
                  </Text>
                </HStack>
              </Stack>
            </Box>
          );
        })
      )}

      <Modal isOpen={isOpen} onClose={closeModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirm selected Address?</ModalHeader>
          <ModalCloseButton />
          <ModalBody>Click Confirm to selet the address for shipment</ModalBody>
          <ModalBody>
            Click Delete to remove the address from the list
          </ModalBody>
          <ModalFooter>
            <HStack spacing={4}>
              <Button colorScheme="blue" onClick={handleConfirm}>
                Confirm
              </Button>
              <Button colorScheme="red" onClick={handleDelete}>
                Delete
              </Button>
              <Button variant="ghost" onClick={closeModal}>
                Cancel
              </Button>
            </HStack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </VStack>
  );
};

export default AddressSelection;
