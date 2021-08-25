import { DownOutlined } from '@ant-design/icons';
import { Dropdown, Menu } from 'antd';
import React from 'react';
import styled from 'styled-components';

// function handleMenuClick() {
//   message.info('Click on menu item.');
// }

const menu = (
  // <Menu onClick={handleMenuClick}>
  <Menu>
    <Menu.Item key='1'>Completed</Menu.Item>
    <Menu.Item key='2'>Refunded (No Compensate)</Menu.Item>
    <Menu.Item key='3'>Refunded (Compensate)</Menu.Item>
  </Menu>
);

const DropdownShipping: React.FC = () => (
  <Container>
    <Dropdown.Button
      style={{ margin: '7px 0 0 15px', height: '30px' }}
      overlay={menu}
      placement='bottomCenter'
      icon={<DownOutlined />}
    >
      All
    </Dropdown.Button>
  </Container>
);

const Container = styled.div`
  margin-top: 5px;
  height: 30px;
  width: auto;
`;

export default DropdownShipping;
