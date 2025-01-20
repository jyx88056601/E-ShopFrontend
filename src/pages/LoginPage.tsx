import { UserLoginDTO } from '@/data/entities';
import DefaultAPIClient from '@/service/DefaultAPIClient';
import {
  Button,
  Container,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Text,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const navigate = useNavigate();
  const defaultApiClient = new DefaultAPIClient('/login');

  const [err, setErr] = useState('');
  const [user, setUser] = useState({
    username: '',
    password: '',
  });

  function handleInputUsername(
    event: React.ChangeEvent<HTMLInputElement>
  ): void {
    setUser((user) => ({
      ...user,
      username: event.target.value,
    }));
  }

  function handleInputPassword(
    event: React.ChangeEvent<HTMLInputElement>
  ): void {
    setUser((user) => ({
      ...user,
      password: event.target.value,
    }));
  }

  function handleSubmit(event: React.FormEvent): void {
    event.preventDefault();
    const UserLoginDTO: UserLoginDTO = {
      username: user.username,
      password: user.password,
    };
    defaultApiClient
      .signin(UserLoginDTO)
      .then((response) => {
        setErr('');
        localStorage.setItem('token', response.data.token);
        if (response.data.role == 'ROLE_ADMIN') {
          navigate('/admin');
        }
        if (response.data.role == 'ROLE_BUYER') {
          navigate('/personal');
        }
        if (response.data.role == 'ROLE_SELLER') {
          navigate('/business');
        }
      })
      .catch((error) => {
        if (error.status === 405) {
          setErr('Username or password is incorrect');
        }
      });
  }

  return (
    <Container pt={10}>
      <form onSubmit={handleSubmit}>
        <FormControl>
          <FormLabel>Username</FormLabel>
          <Input
            placeholder="Enter your user name..."
            value={user.username}
            onChange={handleInputUsername}
          />
          <FormLabel pt={2}>Password</FormLabel>
          <Input
            placeholder="Enter your password..."
            value={user.password}
            onChange={handleInputPassword}
          />
        </FormControl>
        <HStack pt={5}>
          <Button type="submit" bg={'blackAlpha.900'} color={'whiteAlpha.900'}>
            Sign in
          </Button>
          <Button
            bg={'blackAlpha.900'}
            color={'whiteAlpha.900'}
            onClick={() => navigate('/signup')}
          >
            Sign up
          </Button>
        </HStack>
        {err === '' ? null : <Text color={'red.300'}>{err}</Text>}
      </form>
    </Container>
  );
};

export default LoginPage;
