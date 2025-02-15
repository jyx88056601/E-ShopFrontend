import {
  Box,
  Button,
  Menu,
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuList,
} from '@chakra-ui/react';

type AdminMenuProps = {
  setSequence: (sequence: number) => void;
};

const AdminMenu = (adminMenuProps: AdminMenuProps) => {
  const handleMenuClick = (num: number) => {
    adminMenuProps.setSequence(num);
  };
  return (
    <Box textAlign={'center'}>
      <Menu>
        <MenuButton as={Button} color={'whiteAlpha.900'}>
          Data Management Options
        </MenuButton>
        <MenuList>
          <MenuGroup title="User Management">
            <MenuItem onClick={() => handleMenuClick(1)}>
              Display registered users
            </MenuItem>
            <MenuItem onClick={() => handleMenuClick(2)}>
              Display personal accounts
            </MenuItem>
            <MenuItem onClick={() => handleMenuClick(3)}>
              Display business accounts
            </MenuItem>
          </MenuGroup>
          <MenuDivider />
          <MenuGroup title="Order Management">
            <MenuItem onClick={() => handleMenuClick(4)}>
              Display all orders
            </MenuItem>
            <MenuItem onClick={() => handleMenuClick(5)}>
              Display pending orders
            </MenuItem>
            <MenuItem onClick={() => handleMenuClick(6)}>
              Display finished orders
            </MenuItem>
          </MenuGroup>
        </MenuList>
      </Menu>
    </Box>
  );
};

export default AdminMenu;
