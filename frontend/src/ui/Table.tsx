import styled from 'styled-components';
import { Table, TableProps } from 'antd';

type ModifiedTableProps = Partial<TableProps<any>> & {
  css?: string;
  rowClassName?: any;
};

/**
 * * Override AntTable with design style.
 * @param : css - Apply what ever css to current style
 * ? Want to use theme in css props - Please use ThemeContext exported from styled-components
 * References: https://styled-components.com/docs/advanced#theming
 */

const StyledTable = styled(Table)<ModifiedTableProps>`
  /* For Table style */

  .ant-table {
    background: ${({ theme }) => theme.surface};
    color: ${({ theme }) => theme.text};
    margin-top: 20px;
  }

  .ant-table-tbody > tr.ant-table-row:hover > td {
    background: ${({ theme }) => theme.onSurface};
    color: ${({ theme }) => theme.text};
  }

  .ant-table-thead > tr:first-child > th {
    background-color: ${({ theme }) => theme.onSurface};
    color: ${({ theme }) => theme.text} !important;
    border-bottom: 2px solid #ddd;
    border-right-width: 0;
  }
  .ant-table-thead > tr > th {
    background-color: ${({ theme }) => theme.surface};
    color: ${({ theme }) => theme.text};
    text-align: center;
    font-weight: bold;
    font-size: 20px !important;
  }
  .ant-table-thead > tr > th::before {
    width: 0 !important;
  }

  .ant-table.ant-table-bordered > .ant-table-container {
    border-color: ${({ theme }) => theme.border} !important;
  }

  table > tbody > tr > td,
  th {
    border-color: ${({ theme }) => theme.border} !important;
    text-align: center;
  }

  /* Size */

  /* Small */
  .ant-table.ant-table-small .ant-table-title,
  .ant-table.ant-table-small .ant-table-footer,
  .ant-table.ant-table-small .ant-table-thead > tr > th,
  .ant-table.ant-table-small .ant-table-tbody > tr > td,
  .ant-table.ant-table-small tfoot > tr > th,
  .ant-table.ant-table-small tfoot > tr > td {
    padding: 5px 5px;
  }

  /* Middle :  */
  .ant-table.ant-table-middle .ant-table-title,
  .ant-table.ant-table-middle .ant-table-footer,
  .ant-table.ant-table-middle .ant-table-thead > tr > th,
  .ant-table.ant-table-middle .ant-table-tbody > tr > td,
  .ant-table.ant-table-middle tfoot > tr > th,
  .ant-table.ant-table-middle tfoot > tr > td {
    padding: 16px 16px;
  }

  /* Default */
  .ant-table-thead > tr > th,
  .ant-table-tbody > tr > td,
  .ant-table tfoot > tr > th,
  .ant-table tfoot > tr > td {
    padding: 12px 8px;
  }

  .ant-table-tbody > tr:last-child > td {
    border-bottom: none;
  }

  /* For empty data styles */

  .ant-table-tbody > tr.ant-table-placeholder:hover > td {
    background: ${({ theme }) => theme.surface};
  }

  .ant-table-placeholder:hover {
    background: ${({ theme }) => theme.surface};
  }

  .ant-empty-description {
    color: ${({ theme }) => theme.text};
  }

  ${(p) => p.css && p.css};
`;

export default StyledTable;
