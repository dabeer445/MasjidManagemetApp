import React from 'react';
import { CustomCard } from "./CustomCard";
import { CustomTable, Column } from "./CustomTable";

// StatCard Component
interface StatCardProps {
  title: string;
  value: string;
  icon: React.FC<any>;
}

export const StatCard: React.FC<StatCardProps> = ({ title, value, icon: Icon }) => (
  <CustomCard>
    <div className="flex justify-between items-center">
      <p className="text-small font-medium">{title}</p>
      <Icon className="w-4 h-4 text-default-400" />
    </div>
    <div className="flex flex-col mt-2">
      <span className="text-2xl font-semibold">{value}</span>
    </div>
  </CustomCard>
);

// TableCard Component
interface TableCardProps<T> {
  title: string;
  data: T[];
  columns: Column<T>[];
  className?: string;
}

export function TableCard<T extends Record<string, any>>({ title, data, columns, className }: TableCardProps<T>) {
  return (
    <CustomCard title={title} className={className}>
      <CustomTable<T> data={data.slice(0, 5)} columns={columns} />
    </CustomCard>
  );
}

// ChartCard Component
interface ChartCardProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

export const ChartCard: React.FC<ChartCardProps> = ({ title, children, className }) => (
  <CustomCard title={title} className={className}>
    <div style={{ height: '300px' }}>
      {children}
    </div>
  </CustomCard>
);