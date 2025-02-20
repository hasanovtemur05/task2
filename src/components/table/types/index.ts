/* eslint-disable @typescript-eslint/no-explicit-any */
export interface ColumnType {
  id: string;
  title: string;
  isRowHeader?: boolean;
}

export interface GlobalTableProps {
  columns: ColumnType[];
  rows: any[];
  tableProps?: React.HTMLAttributes<HTMLTableElement>;
}