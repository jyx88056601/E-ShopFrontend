import { Heading, Text, VStack } from '@chakra-ui/react';
import { isRouteErrorResponse, useRouteError } from 'react-router-dom';
import NavBar from '../../components/Default/NavBar';
const ErrorPage = () => {
  const error = useRouteError();
  return (
    <>
      <NavBar />
      <VStack>
        <Heading fontSize={'xxx-large'}>Oops</Heading>
        <Text fontSize={'xxx-large'}>
          {isRouteErrorResponse(error)
            ? 'This page does not exist'
            : 'unexpected error'}
        </Text>
      </VStack>
    </>
  );
};

export default ErrorPage;
