import React from 'react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from '@nextui-org/react';

export interface Column<T> {
  key: keyof T | 'actions' | 'receipt';
  label: string;
  render?: (item: T) => React.ReactNode;
}

interface CustomTableProps<T> {
  data: T[];
  columns: Column<T>[];
  className?: string;
}

export function CustomTable<T extends Record<string, any>>({ data, columns, className }: CustomTableProps<T>) {
  return (
    <Table aria-label="Custom table" className={className}>
      <TableHeader>
        {columns.map((column) => (
          <TableColumn key={column.key.toString()}>{column.label}</TableColumn>
        ))}
      </TableHeader>
      <TableBody>
        {data.map((item, index) => (
          <TableRow key={index}>
            {columns.map((column) => (
              <TableCell key={column.key.toString()}>
                {column.render ? column.render(item) : item[column.key]}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}