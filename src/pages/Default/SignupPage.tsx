import AddressForm from '@/components/Default/AddressForm';
import SignUpForm from '@/components/Default/SignUpForm';
import { Flex } from '@chakra-ui/react';
const SignupPage = () => {
  return (
    <Flex paddingTop={10} justify={'space-between'} wrap={'wrap'} gap={'1'}>
      <SignUpForm />
      <AddressForm />
    </Flex>
  );
};
export default SignupPage;
