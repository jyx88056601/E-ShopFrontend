import AdminAPIClient from '@/service/AdminAPIClient';
import { Button, HStack, Input, Text, VStack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

type Userprop = {
  id: string | undefined;
};

type User = {
  username: string;
  email: string;
  id: number;
  role: string;
  active: boolean;
  phoneNumber: string;
  registrationTime: string;
  lastUpdatedDate: string;
};

export type UserUpdateDTO = {
  id: string;

  oldPassword: string;

  newPassword: string;

  newUsername: string;

  newEmail: string;

  newPhoneNumber: string;
};

const UserInfo = ({ id }: Userprop) => {
  const [serverResponse, setServerResponse] = useState(200);
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  const defaultUserUpdateDTO: UserUpdateDTO = {
    id: '',
    oldPassword: '',
    newPassword: '',
    newUsername: '',
    newEmail: '',
    newPhoneNumber: '',
  };

  const [updatedUser, setUpdatedUser] =
    useState<UserUpdateDTO>(defaultUserUpdateDTO);

  useEffect(() => {
    const username = localStorage.getItem('username');
    const url = `/userinfo/${id}`;
    const token = localStorage.getItem('token');
    if (token && username) {
      const adminAPIClient = new AdminAPIClient(url, token, username);
      adminAPIClient
        .findUserById()
        .then((response) => {
          const user: User = response.data.userDTO;
          setUser(user);
          const currentUser: UserUpdateDTO = {
            id: user.id.toString(),
            oldPassword: '',
            newPassword: '',
            newUsername: user.username,
            newEmail: user.email,
            newPhoneNumber: user.phoneNumber,
          };
          setUpdatedUser(currentUser);
          setServerResponse(response.status);
        })
        .catch((error) => setServerResponse(error.status));
    }
  }, []);

  const handleUserChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setUpdatedUser((updatedUser) => ({
      ...updatedUser,
      newUsername: event.target.value,
    }));
  };

  const handleEmailChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setUpdatedUser((updatedUser) => ({
      ...updatedUser,
      newEmail: event.target.value,
    }));
  };

  const handlePassword = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setUpdatedUser((updatedUser) => ({
      ...updatedUser,
      oldPassword: event.target.value,
    }));
  };

  const handleSecondPassword = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setUpdatedUser((updatedUser) => ({
      ...updatedUser,
      newPassword: event.target.value,
    }));
  };

  const handlePhoneNumberChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setUpdatedUser((updatedUser) => ({
      ...updatedUser,
      newPhoneNumber: event.target.value,
    }));
  };

  const update = (updatedUser: UserUpdateDTO) => {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    if (token && username) {
      const adminAPIClinet = new AdminAPIClient(
        '/update-user',
        token,
        username
      );
      adminAPIClinet
        .updateUser(updatedUser)
        .then((response) => {
          setServerResponse(response.status);
        })
        .catch((error) => setServerResponse(error.status));
    }
  };

  return (
    <VStack>
      <HStack>
        <Text>id: </Text>
        <Text>{user?.id}</Text>
      </HStack>
      <HStack>
        <Text whiteSpace={'nowrap'} align={'left'}>
          User name:
        </Text>
        <Input
          placeholder={user?.username}
          value={updatedUser.newUsername}
          onChange={handleUserChange}
        ></Input>
        <Button onClick={() => update(updatedUser)}>update</Button>
      </HStack>
      <HStack>
        <Text whiteSpace={'nowrap'} align={'left'} pr={'10'}>
          Email:
        </Text>
        <Input
          placeholder={user?.email}
          value={updatedUser.newEmail}
          onChange={handleEmailChange}
        ></Input>
        <Button onClick={() => update(updatedUser)}>update</Button>
      </HStack>
      <HStack>
        <Text whiteSpace={'nowrap'} align={'left'} pr={'9'}>
          Phone:
        </Text>
        <Input
          placeholder={user?.phoneNumber}
          value={updatedUser.newPhoneNumber}
          onChange={handlePhoneNumberChange}
        ></Input>
        <Button onClick={() => update(updatedUser)}>update</Button>
      </HStack>

      <HStack>
        <Text whiteSpace={'nowrap'} align={'left'} pr={'3'}>
          Password:
        </Text>
        <Input
          placeholder={'password'}
          value={updatedUser.oldPassword}
          onChange={handlePassword}
        ></Input>

        <Text whiteSpace={'nowrap'} align={'left'} pr={'3'}>
          Repeat password
        </Text>
        <Input
          placeholder={'password'}
          value={updatedUser.newPassword}
          onChange={handleSecondPassword}
        ></Input>
      </HStack>
      <Button onClick={() => update(updatedUser)}>update password</Button>
      <HStack>
        <Text>Account type :</Text>
        <Text>{user?.role.substring(5)}</Text>
      </HStack>
      <HStack>
        <Text>Last updated date :</Text>
        <Text>{user?.lastUpdatedDate.split('T')[0]}</Text>
        <Text>{user?.lastUpdatedDate.split('T')[1].split('.')[0]}</Text>
      </HStack>
      <HStack>
        <Text>Registration date :</Text>
        <Text>{user?.registrationTime.split('T')[0]}</Text>
        <Text>{user?.registrationTime.split('T')[1].split('.')[0]}</Text>
      </HStack>
      <HStack>
        <Text whiteSpace={'nowrap'}>Server response code: </Text>
        {serverResponse === 200 ? (
          <Text color={'green.500'}>{serverResponse}</Text>
        ) : (
          <Text color={'red.500'}>{serverResponse}</Text>
        )}
      </HStack>
      <Button onClick={() => navigate('/admin')}>Back</Button>
    </VStack>
  );
};

export default UserInfo;
