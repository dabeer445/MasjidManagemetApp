// types/index.ts
export interface Donor {
  id: number;
  name: string;
  number: string;
  address: string;
}

export interface Donation {
  id: number;
  donor: string;
  date: string;
  amount: number;
  type: string;
  project: string;
}

export interface Project {
  id: number;
  name: string;
  budget: number;
  startDate: string;
  endDate: string;
  status: string;
}

export interface Expense {
  id: number;
  date: string;
  category: 'Utilities' | 'Maintenance' | 'Salaries' | 'Projects';
  amount: number;
  notes: string;
  utilityType?: 'K-Electric' | 'Water' | 'Gas';
  staffMember?: string;
  project?: string;
  receiptFile?: string; // This will store the file name or path
}

export interface StaffMember {
  id: number;
  name: string;
  number: string;
  salary: number;
}
