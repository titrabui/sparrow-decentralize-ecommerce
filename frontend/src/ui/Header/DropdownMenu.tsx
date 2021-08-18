import React from 'react';
import { Dropdown, Menu, Switch } from 'antd';
import Box from 'ui/Box';
import { DownOutlined } from '@ant-design/icons';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { useDarkMode } from 'hooks';

const DropdownMenu: React.FC = ({ children }) => {
  const [theme, toggleTheme] = useDarkMode();

  const menu = (
    <Container>
      <MenuItem key='0'>
        <StyledLink to='/'>Menu 1</StyledLink>
      </MenuItem>
      <MenuItem key='1'>
        <StyledLink to='/'>Menu 2</StyledLink>
      </MenuItem>
      <MenuItem key='2'>
        <StyledLink to='#'>
          Night Mode <Switch checked={theme === 'dark'} onChange={() => toggleTheme()} />
        </StyledLink>
      </MenuItem>
    </Container>
  );

  return (
    <DropdownContainer overlay={menu}>
      <Box flex>
        {children}
        <DropdownIconContainer role='presentation' onClick={(e) => e.preventDefault()}>
          <DropDownIcon />
        </DropdownIconContainer>
      </Box>
    </DropdownContainer>
  );
};

const Container = styled(Menu)`
  background-color: ${(p) => p.theme.background};
  width: 180px;
  top: -5px;
  .ant-dropdown-menu-item,
  .ant-dropdown-menu-submenu-title {
    &:hover {
      background-color: #1c2c65;
    }
  }
  a {
    padding: 0 10px;
    display: flex;
    justify-content: space-between;
  }
`;

const StyledLink = styled(NavLink)`
  color: ${(p) => p.theme.grayText};
`;

const MenuItem = styled(Menu.Item)`
  padding: 10px 10px 10px 20px;
`;

const DropdownContainer = styled(Dropdown)`
  padding: 10px 0;
`;

const DropdownIconContainer = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  margin-left: 5px;
`;

const DropDownIcon = styled(DownOutlined)`
  color: white;
`;

export default DropdownMenu;
