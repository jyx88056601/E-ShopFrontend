import LoginForm from '@/components/LoginForm';
import { Flex } from '@chakra-ui/react';

const LoginPage = () => {
  return (
    <Flex pt={5} pl={5} justify={'space-between'} wrap={'wrap'} gap={'1'}>
      <LoginForm></LoginForm>
    </Flex>
  );
};
export default LoginPage;
