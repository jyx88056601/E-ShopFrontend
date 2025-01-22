import AdminAPIClient from '@/service/AdminAPIClient';
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Button,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';

const UserDataPanel = () => {
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

  const [userData, setUserData] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');

    if (token && username) {
      const adminAPIClinet = new AdminAPIClient(
        '/display-all-users',
        token,
        username
      );

      adminAPIClinet
        .getUsers()
        .then((response) => {
          setUserData(response.data['userDTOS']);
        })
        .catch((error) => {
          console.error('Error fetching users:', error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      console.error('Token or username not found');
      setIsLoading(false);
    }
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  function handleActiveStatusToggle(username: string): void {
    const token = localStorage.getItem('token');
    const url = `/set-up-activity/${username}`;
    if (token) {
      console.log(token === localStorage.getItem('token'));
      const adminAPIClinet = new AdminAPIClient(url, token, username);
      adminAPIClinet.toggleUser().then((response) => {
        console.log(response.data);
        const updatedUserData = userData.map((user) => {
          if (user.username === username) {
            return { ...user, active: !user.active }; // 创建一个新对象，切换 active 状态
          }
          return user; // 对于其他用户，直接返回原来的用户对象
        });
        setUserData(updatedUserData);
      });
    }
  }

  return (
    <TableContainer>
      <Table variant="simple">
        <TableCaption placement="top" fontSize={'lg'}></TableCaption>
        <Thead>
          <Tr>
            <Th>Email Address</Th>
            <Th>ID</Th>
            <Th>Username</Th>
            <Th>Phone number</Th>
            <Th>Authority</Th>
            <Th>Active</Th>
            <Th>Registration Time</Th>
            <Th>Last update time</Th>
            <Th>Delete</Th>
          </Tr>
        </Thead>

        <Tbody>
          {userData.map((user: User) => (
            <Tr key={user.id}>
              <Td>{user.email}</Td>
              <Td>{user.id}</Td>
              <Td>{user.username}</Td>
              <Td>{user.phoneNumber}</Td>
              <Td>{user.role.substring(5)}</Td>
              <Td>
                {user.active ? (
                  <Button
                    color={'green.600'}
                    onClick={() => handleActiveStatusToggle(user.username)}
                  >
                    Active
                  </Button>
                ) : (
                  <Button
                    color={'red.600'}
                    onClick={() => handleActiveStatusToggle(user.username)}
                  >
                    Inactive
                  </Button>
                )}
              </Td>
              <Td>{user.registrationTime}</Td>
              <Td>{user.lastUpdatedDate}</Td>
              <Td>
                <Button color={'red.500'}>Delete</Button>
              </Td>
            </Tr>
          ))}
        </Tbody>

        <Tfoot>
          <Tr>
            <Th>Backend : http://localhost:8080</Th>
          </Tr>
        </Tfoot>
      </Table>
    </TableContainer>
  );
};

export default UserDataPanel;
