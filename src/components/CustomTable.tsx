import React, { useState, useMemo } from 'react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Input, SortDescriptor } from '@nextui-org/react';

export interface Column<T> {
  key: keyof T | 'actions' | 'receipt' | 'no';
  label: string;
  render?: (item: T, index: number) => React.ReactNode;
  sortable?: boolean;
}

interface CustomTableProps<T> {
  data: T[];
  columns: Column<T>[];
  className?: string;
}

export function CustomTable<T extends Record<string, any>>({ data, columns, className }: CustomTableProps<T>) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({ column: 'no', direction: 'ascending' });

  const filteredData = useMemo(() => {
    return data.filter((item) =>
      Object.values(item).some(
        (value) =>
          value &&
          value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [data, searchTerm]);

  const sortedData = useMemo(() => {
    return [...filteredData].sort((a, b) => {
      const first = a[sortDescriptor.column as keyof T];
      const second = b[sortDescriptor.column as keyof T];
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === 'descending' ? -cmp : cmp;
    });
  }, [filteredData, sortDescriptor]);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
  };

  const handleSortChange = (descriptor: SortDescriptor) => {
    setSortDescriptor(descriptor);
  };

  const allColumns: Column<T>[] = [
    { key: 'no' as keyof T, label: 'No', render: (_, index) => index + 1, sortable: true },
    ...columns
  ];

  return (
    <div>
      <Input
        placeholder="Search..."
        value={searchTerm}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleSearch(e.target.value)}
        className="mb-4"
      />
      <Table
        aria-label="Custom table"
        className={className}
        sortDescriptor={sortDescriptor}
        onSortChange={handleSortChange}
      >
        <TableHeader>
          {allColumns.map((column) => (
            <TableColumn
              key={column.key as string}
              allowsSorting={column.sortable}
            >
              {column.label}
            </TableColumn>
          ))}
        </TableHeader>
        <TableBody>
          {sortedData.map((item, index) => (
            <TableRow key={index}>
              {allColumns.map((column) => (
                <TableCell key={column.key as string}>
                  {column.render && typeof column.render === 'function'
                    ? column.render(item, index)
                    : item[column.key] as React.ReactNode}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
