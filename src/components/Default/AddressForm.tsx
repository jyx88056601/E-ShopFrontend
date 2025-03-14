import PersonalAPIClient from '@/service/PersonalApiClient';
import {
  Box,
  Button,
  Container,
  FormControl,
  FormHelperText,
  FormLabel,
  HStack,
  Input,
  Select,
  useToast,
  VStack,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export type CreatingAddressRequestDTO = {
  firstName: string;
  lastName: string;
  country: string;
  province: string;
  city: string;
  houseNumber: string;
  unitNumber?: string;
  postalCode: string;
  streetName: string;
  buildingNumber?: string;
  community?: string;
  district?: string;
};

const AddressForm = () => {
  const checkNameValidity = (name: string): boolean => {
    return name.length !== 0 && name.indexOf(' ') === -1;
  };
  const navigate = useNavigate();
  const toast = useToast();
  const [creatingAddressRequestDTO, setCreatingAddressRequestDTO] =
    useState<CreatingAddressRequestDTO>({
      firstName: '',
      lastName: '',
      country: 'Canada',
      province: '',
      city: '',
      houseNumber: '',
      unitNumber: '',
      postalCode: '',
      streetName: '',
      buildingNumber: '',
      community: '',
      district: '',
    });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setCreatingAddressRequestDTO((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    const user_id = localStorage.getItem('id');
    const username = localStorage.getItem('username');
    const token = localStorage.getItem('token');
    if (!username || !token || !user_id) {
      navigate('/login');
      return;
    }

    const apiClient = new PersonalAPIClient(
      `/address/${user_id}`,
      username,
      token
    );

    const response = await apiClient.storeNewAddress(creatingAddressRequestDTO);
    toast({
      description: response.data,
      status: 'success',
      isClosable: true,
    });
  };

  return (
    <Container maxWidth={'5xl'}>
      <FormControl
        as="fieldset"
        p={6}
        boxShadow="lg"
        borderRadius="lg"
        bg="gray.900"
        color="white"
      >
        <FormLabel fontSize={25} textAlign={'center'} mb={4} fontWeight="bold">
          Address
        </FormLabel>
        <VStack spacing={5} align="stretch">
          <HStack>
            <Box w="35%">Last Name</Box>
            <Input
              bg="gray.800"
              color="white"
              name="lastName"
              value={creatingAddressRequestDTO.lastName}
              onChange={handleChange}
            />
          </HStack>
          {!checkNameValidity(creatingAddressRequestDTO.lastName) &&
            creatingAddressRequestDTO.lastName.length !== 0 && (
              <FormHelperText color={'red.400'}>
                No spaces allowed
              </FormHelperText>
            )}

          <HStack>
            <Box w="35%">First Name</Box>
            <Input
              bg="gray.800"
              color="white"
              name="firstName"
              value={creatingAddressRequestDTO.firstName}
              onChange={handleChange}
            />
          </HStack>
          {!checkNameValidity(creatingAddressRequestDTO.firstName) &&
            creatingAddressRequestDTO.firstName.length !== 0 && (
              <FormHelperText color={'red.400'}>
                No spaces allowed
              </FormHelperText>
            )}

          <HStack>
            <Box w="35%">Country</Box>
            <Select
              bg="gray.800"
              color="white"
              name="country"
              value={creatingAddressRequestDTO.country}
              onChange={handleChange}
            >
              <option value="Canada">Canada</option>
              <option value="China">China</option>
              <option value="US">US</option>
            </Select>
          </HStack>

          <HStack>
            <Box w="35%">Province</Box>
            <Input
              bg="gray.800"
              color="white"
              name="province"
              value={creatingAddressRequestDTO.province}
              onChange={handleChange}
            />
          </HStack>

          <HStack>
            <Box w="35%">City</Box>
            <Input
              bg="gray.800"
              color="white"
              name="city"
              value={creatingAddressRequestDTO.city}
              onChange={handleChange}
            />
          </HStack>

          <HStack>
            <Box w="35%">House/Apt #</Box>
            <Input
              bg="gray.800"
              color="white"
              name="houseNumber"
              value={creatingAddressRequestDTO.houseNumber}
              onChange={handleChange}
            />
          </HStack>

          <HStack>
            <Box w="35%">Unit #</Box>
            <Input
              bg="gray.800"
              color="white"
              name="unitNumber"
              value={creatingAddressRequestDTO.unitNumber}
              onChange={handleChange}
            />
          </HStack>

          <HStack>
            <Box w="35%">Postal Code</Box>
            <Input
              bg="gray.800"
              color="white"
              name="postalCode"
              value={creatingAddressRequestDTO.postalCode}
              onChange={handleChange}
            />
          </HStack>

          <HStack>
            <Box w="35%">Street Name</Box>
            <Input
              bg="gray.800"
              color="white"
              name="streetName"
              value={creatingAddressRequestDTO.streetName}
              onChange={handleChange}
            />
          </HStack>

          <HStack>
            <Box w="35%">Building Number</Box>
            <Input
              bg="gray.800"
              color="white"
              name="buildingNumber"
              value={creatingAddressRequestDTO.buildingNumber}
              onChange={handleChange}
            />
          </HStack>

          <HStack>
            <Box w="35%">Community</Box>
            <Input
              placeholder="optional"
              bg="gray.800"
              color="white"
              name="community"
              value={creatingAddressRequestDTO.community}
              onChange={handleChange}
            />
          </HStack>

          <HStack>
            <Box w="35%">District</Box>
            <Input
              placeholder="optional"
              bg="gray.800"
              color="white"
              name="district"
              value={creatingAddressRequestDTO.district}
              onChange={handleChange}
            />
          </HStack>
        </VStack>

        <Button
          colorScheme="blue"
          mt={6}
          w="full"
          onClick={handleSubmit}
          fontWeight="bold"
        >
          Add to address list
        </Button>
      </FormControl>
    </Container>
  );
};

export default AddressForm;
