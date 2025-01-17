import AddressForm from '@/components/AddressForm';
import SignUpForm from '@/components/SignUpForm';
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
