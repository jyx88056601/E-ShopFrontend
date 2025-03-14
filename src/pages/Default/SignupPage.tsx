import SignUpForm from '@/components/Default/SignUpForm';
import { Flex } from '@chakra-ui/react';
const SignupPage = () => {
  return (
    <Flex paddingTop={'70px'} justify={'space-between'} wrap={'wrap'} gap={'1'}>
      <SignUpForm />
    </Flex>
  );
};
export default SignupPage;
