import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import { CheckOutlined, CopyOutlined } from '@ant-design/icons';
import { Tooltip } from 'antd';
import { Text, ModifiedTypographyProps } from './Typography';
import Box, { BoxProps } from './Box';

interface CopyableProps {
  boxProps?: BoxProps;
  textProps?: ModifiedTypographyProps;
  children?: React.ReactChildren;
}

const Copyable: React.FC<CopyableProps> = (props: CopyableProps) => {
  const { textProps, boxProps, children } = props;
  const textRef = useRef<any>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let timeOut: any = null;
    if (copied) {
      timeOut = setTimeout(() => {
        setCopied(false);
      }, 2000);
    }

    return () => {
      if (timeOut) {
        clearTimeout(timeOut);
      }
    };
  }, [copied]);

  const copy = () => {
    const textArea = document.createElement('textarea');
    textArea.value = textRef.current.textContent;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('Copy');
    textArea.remove();
    setCopied(true);
  };

  return (
    <Box flex alignItems='center' justify='space-between' {...boxProps}>
      <Text {...textProps}>
        <span ref={textRef}>{children}</span>
      </Text>
      <Tooltip title={copied ? 'Copied' : 'Copy'}>
        <CopyButton onClick={copy}>{copied ? <CheckOutlined /> : <CopyOutlined />}</CopyButton>
      </Tooltip>
    </Box>
  );
};

Copyable.defaultProps = {
  boxProps: undefined,
  textProps: undefined,
  children: undefined
};

const CopyButton = styled.button`
  background-color: transparent;
  border: none;
  color: ${(p) => p.theme.text};
  cursor: pointer;
  font-size: 16px;
  margin-top: -2.5px;
`;

export default Copyable;
