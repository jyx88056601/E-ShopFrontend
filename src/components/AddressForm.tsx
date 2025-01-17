import {
  Box,
  Container,
  FormControl,
  FormHelperText,
  FormLabel,
  HStack,
  Input,
  Select,
  Text,
} from '@chakra-ui/react';
import { useState } from 'react';

const AddressForm = () => {
  const checkNameValidity = (name: string): boolean => {
    console.log(name.length);
    console.log(name.indexOf(' ') === -1);
    return name.length !== 0 && name.indexOf(' ') === -1;
  };

  const [lastName, setLastName] = useState('');
  const [isLastNameValid, setIsLastNameValid] = useState(false);

  const handleLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLastName(e.target.value);
    setIsLastNameValid(checkNameValidity(e.target.value));
  };

  const [firstName, setFirstName] = useState('');
  const [isFirstNameValid, setIsFirstNameValid] = useState(false);
  const handleFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFirstName(e.target.value);
    setIsFirstNameValid(checkNameValidity(e.target.value));
  };

  return (
    <Container maxWidth={'5xl'}>
      <FormControl as="fieldset">
        <FormLabel fontSize={25} textAlign={'center'}>
          Address (Optional)
        </FormLabel>
        <HStack justify={'space-between'}>
          <Box whiteSpace="nowrap">Last Name</Box>
          <Input
            id="address_input_1"
            ml={3}
            w={'100%'}
            type="text"
            value={lastName}
            onChange={handleLastNameChange}
          ></Input>
          {!isLastNameValid && lastName.length !== 0 ? (
            <FormHelperText color={'red.300'}>no spaces</FormHelperText>
          ) : null}

          <Box whiteSpace="nowrap">First Name</Box>

          <Input
            id="address_input_2"
            ml={3}
            w={'100%'}
            type="text"
            value={firstName}
            onChange={handleFirstNameChange}
          />
          {!isFirstNameValid && firstName.length !== 0 ? (
            <FormHelperText color={'red.300'}>no spaces</FormHelperText>
          ) : null}
        </HStack>

        <HStack mt={3} justify={'space-between'} gap={'2'}>
          <Text>Country</Text>
          <Select ml={6} w={'100%'} p={2} value="Canada">
            <option>Canada</option>
            <option>China</option>
            <option>US</option>
          </Select>
          <Text> Province</Text>
          <Input id="address_input_3" w={'40%'} type="text"></Input>
          <Box whiteSpace="nowrap">City</Box>
          <Input id="address_input_4" w={'30%'} ml={'1'} type="text"></Input>
        </HStack>
        <HStack mt={3} justify={'space-between'} gap={'2'}>
          <Box whiteSpace="nowrap">House/Apt #</Box>
          <Input id="address_input_5" w={'100%'} type="text"></Input>
          <Box whiteSpace="nowrap">Unit #</Box>
          <Input id="address_input_6" w={'100%'} type="text"></Input>
          <Box whiteSpace="nowrap">Postal Code</Box>
          <Input id="address_input_7" ml={'1'} w={'100%'} type="text"></Input>
        </HStack>
        <HStack mt={4} justify={'space-between'} gap={'2'}>
          <Box whiteSpace="nowrap">Street Name</Box>
          <Input id="address_input_8" w={'100%'} type="text"></Input>
        </HStack>
      </FormControl>
    </Container>
  );
};
export default AddressForm;
