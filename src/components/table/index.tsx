/* eslint-disable @typescript-eslint/no-explicit-any */
import { Table, TableHeader, TableBody, Column, Row, Cell } from 'react-aria-components';

interface ColumnType {
  id: string;
  title: string;
  isRowHeader?: boolean;
}

interface GlobalTableProps {
  columns: ColumnType[];
  rows: any[];
  tableProps?: React.HTMLAttributes<HTMLTableElement>;
}

const GlobalTable = ({ columns, rows, tableProps }: GlobalTableProps) => {
  return (
    <Table {...tableProps} aria-label="Files" className="w-full border-collapse border border-gray-300">
      <TableHeader>
        {columns.map((column) => (
          <Column key={column.id} isRowHeader={column.isRowHeader} className="px-4 py-2 border bg-gray-100">
            {column.title}
          </Column>
        ))}
      </TableHeader>
      <TableBody>
        {rows.map((row, rowIndex) => (
          <Row key={rowIndex} className="hover:bg-gray-50">
            {columns.map((column) => (
              <Cell key={column.id} className="px-4 py-2 border">
                {row[column.id] || []} 
              </Cell>
            ))}
          </Row>
        ))}
      </TableBody>
    </Table>
  );
};

export default GlobalTable;
