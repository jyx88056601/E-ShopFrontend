import {
  FormControl,
  FormLabel,
  FormHelperText,
  FormErrorMessage,
} from '@chakra-ui/form-control';
import { HStack, Input } from '@chakra-ui/react';
import { useState } from 'react';
import { Radio, RadioGroup } from '../components/ui/radio';
import Boxes from '../components/Boxes';
const SignupPage = () => {
  const [username, setUsername] = useState('');
  const noUsername = username === '';
  const tooShort = username.length < 5;
  const tooLong = username.length > 8;

  const handleChange = (e: any) => setUsername(e.target.value);
  return (
    <>
      <Boxes></Boxes>
      <FormControl>
        <FormLabel>Username</FormLabel>
        {noUsername ? (
          <FormHelperText>Please input your username</FormHelperText>
        ) : (
          <FormHelperText></FormHelperText>
        )}
        {tooLong ? (
          <FormHelperText>Too fucking long</FormHelperText>
        ) : (
          <FormHelperText></FormHelperText>
        )}
        {tooShort ? (
          <FormHelperText>Too fucking short</FormHelperText>
        ) : (
          <FormHelperText></FormHelperText>
        )}
        <Input type="username" value={username} onChange={handleChange} />

        <FormLabel>Phone number</FormLabel>
        <FormHelperText>Please input your phone number</FormHelperText>
        <Input type="username" />

        <FormLabel>Email address</FormLabel>
        <FormHelperText>Please input your Email Adress</FormHelperText>
        <Input type="email" />

        <FormLabel>Password</FormLabel>
        <FormHelperText>Please input your password</FormHelperText>
        <Input type="password" />

        <FormLabel>Password</FormLabel>
        <FormHelperText>Please confirm your password</FormHelperText>
        <Input type="password" />
      </FormControl>

      <FormControl as="fieldset">
        <FormLabel as="legend">Country</FormLabel>
        <RadioGroup defaultValue="Itachi">
          <HStack wordSpacing="24px">
            <Radio value="USA">USA</Radio>
            <Radio value="CA">CA</Radio>
            <Radio value="CHN">CHN</Radio>
          </HStack>
        </RadioGroup>
        <FormHelperText>Select country</FormHelperText>
      </FormControl>
    </>
  );
};

export default SignupPage;
