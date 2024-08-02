// types/index.ts
export interface Donor {
  id: string;
  name: string;
  number: string;
  address: string;
}

export interface Donation {
  id: string;
  donor: string;
  date: string;
  amount: number;
  type: string;
  project: string;
  receiptImage: string | null;
  isAnonymous: boolean;
}

export interface Project {
  id: string;
  name: string;
  budget: number;
  startDate: string;
  endDate: string;
  status: string;
}

export interface Expense {
  id: string;
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
  id: string;
  name: string;
  number: string;
  salary: number;
}
