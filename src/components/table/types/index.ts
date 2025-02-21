/* eslint-disable @typescript-eslint/no-explicit-any */
export interface ColumnType {
  render?: any;
  id: string;
  title: string;
  isRowHeader?: boolean;
  key?: string; 
}

export interface GlobalTableProps {
  columns: ColumnType[];
  rows: any[];
  tableProps?: React.HTMLAttributes<HTMLTableElement>;
}