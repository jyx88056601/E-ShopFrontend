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
import { useNavigate } from 'react-router-dom';

const BusinessUserPanel = () => {
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
  const navigate = useNavigate();
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
          const filteredUsers = response.data['userDTOS'].filter(
            (user: User) => user.role === 'ROLE_SELLER'
          );
          setUserData(filteredUsers);
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

  const handleClick = (id: number): void => {
    const userinfoUrl = `/admin/userinfo/${id}`;
    navigate(userinfoUrl);
  };

  const handleActiveStatusToggle = (username: string): void => {
    const token = localStorage.getItem('token');
    const url = `/set-up-activity/${username}`;

    if (token) {
      // Optimistic UI update
      const optimisticUpdatedUserData = userData.map((user) =>
        user.username === username ? { ...user, active: !user.active } : user
      );
      setUserData(optimisticUpdatedUserData);

      const adminAPIClient = new AdminAPIClient(url, token, username);

      adminAPIClient
        .toggleUser()
        .then((response) => {
          // Optional: you could validate the response here
          console.log(response.data);
        })
        .catch((error) => {
          // Rollback the optimistic update if API call fails
          console.error('Error toggling user status:', error);
          setUserData(userData);
          // Optionally show an error toast/notification
        });
    }
  };

  const handleDeleteUserEvent = (username: string) => {
    const token = localStorage.getItem('token');
    const url = `/delete-user/${username}`;
    if (token) {
      // Optimistic UI update
      const optimisticUpdatedUserData = userData.filter(
        (user) => user.username !== username
      );
      setUserData(optimisticUpdatedUserData);

      const adminAPIClient = new AdminAPIClient(url, token, username);

      adminAPIClient
        .deleteUserByUsername()
        .then((response) => {
          // Optional: you could validate the response here
          console.log(response.data);
        })
        .catch((error) => {
          // Rollback the optimistic update if API call fails
          console.error('Error toggling user status:', error);
          setUserData(userData);
          // Optionally show an error toast/notification
        });
    }
  };

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
              <Td>
                <Button onClick={() => handleClick(user.id)}>{user.id}</Button>
              </Td>
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
                <Button
                  color={'red.500'}
                  onClick={() => handleDeleteUserEvent(user.username)}
                >
                  Delete
                </Button>
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

export default BusinessUserPanel;
