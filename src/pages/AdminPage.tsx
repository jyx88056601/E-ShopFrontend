import {
  Button,
  Menu,
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuList,
} from '@chakra-ui/react';

const AdminPage = () => {
  return (
    <>
      <Menu>
        <MenuButton as={Button} color={'whiteAlpha.900'}>
          Data Management
        </MenuButton>
        <MenuList>
          <MenuGroup title="Users">
            <MenuItem>Display registered users</MenuItem>
            <MenuItem>Display personal accounts</MenuItem>
            <MenuItem>Display business accounts </MenuItem>
          </MenuGroup>
          <MenuDivider />
          <MenuGroup title="Orders">
            <MenuItem>Display all orders</MenuItem>
            <MenuItem>Display pending orders</MenuItem>
            <MenuItem>Display finished orders</MenuItem>
          </MenuGroup>
        </MenuList>
      </Menu>
    </>
  );
};
export default AdminPage;
