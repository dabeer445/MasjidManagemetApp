import { useState, useEffect } from "react";
import { CustomCard } from "../components/CustomCard";
import { CustomTable, Column } from "../components/CustomTable";
import { FormInput, FormSelect } from "../components/FormComponents";
import { SubmitButton } from "../components/ButtonComponents";
import { DollarSign } from 'lucide-react';
import { Donation, Project, Expense } from "../types";
import { getLocalStorage } from "../utils/localStorage";

export default function Dashboard() {
  const [donations, setDonations] = useState<Donation[]>([]);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [totalDonations, setTotalDonations] = useState<number>(0);
  const [totalExpenses, setTotalExpenses] = useState<number>(0);
  const [totalBudget, setTotalBudget] = useState<number>(0);
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const storedDonations = getLocalStorage<Donation[]>('donations', []);
    const storedProjects = getLocalStorage<Project[]>('projects', []);
    const storedExpenses = getLocalStorage<Expense[]>('expenses', []);

    const totalDonations = storedDonations.reduce((acc, donation) => acc + donation.amount, 0);
    const totalExpenses = storedExpenses.reduce((acc, expense) => acc + expense.amount, 0);
    const totalBudget = storedProjects.reduce((acc, project) => acc + project.budget, 0);

    setExpenses(storedExpenses);
    setDonations(storedDonations);
    setProjects(storedProjects);
    setTotalDonations(totalDonations);
    setTotalExpenses(totalExpenses);
    setTotalBudget(totalBudget);
  }, []);

  const donationColumns: Column<Donation>[] = [
    { key: "donor", label: "Donor" },
    { key: "date", label: "Date" },
    { key: "amount", label: "Amount" },
    { key: "type", label: "Type" },
    { key: "project", label: "Project" },
  ];

  const expenseColumns: Column<Expense>[] = [
    { key: "date", label: "Date" },
    { key: "category", label: "Category" },
    { key: "amount", label: "Amount" },
    { key: "notes", label: "Notes" },
    {
      key: "receiptFile", label: "Receipt", render: (expense: Expense) =>
        expense.receiptFile ? <SubmitButton onClick={() => console.log(`View receipt: ${expense.receiptFile}`)}>View Receipt</SubmitButton> : 'No receipt'
    },
  ];

  const projectColumns: Column<Project>[] = [
    { key: "name", label: "Name" },
    { key: "budget", label: "Budget" },
    { key: "status", label: "Status" },
  ];

  return (
    <div className="flex flex-col w-full min-h-screen bg-background">
      <main className="flex min-h-[calc(100vh_-_64px)] flex-1 flex-col gap-4 p-4 md:gap-8 md:p-10">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <CustomCard>
            <div className="flex justify-between items-center">
              <p className="text-small font-medium">Total Donations</p>
              <DollarSign className="w-4 h-4 text-default-400" />
            </div>
            <div className="flex flex-col mt-2">
              <span className="text-2xl font-semibold">PKR {totalDonations.toLocaleString()}</span>
              <span className="text-xs text-default-400">+20.1% from last year</span>
            </div>
          </CustomCard>
          <CustomCard>
            <div className="flex justify-between items-center">
              <p className="text-small font-medium">Zakat Donations</p>
              <DollarSign className="w-4 h-4 text-default-400" />
            </div>
            <div className="flex flex-col mt-2">
              <span className="text-2xl font-semibold">PKR {totalDonations.toLocaleString()}</span>
              <span className="text-xs text-default-400">+20.1% from last year</span>
            </div>
          </CustomCard>
          <CustomCard>
            <div className="flex justify-between items-center">
              <p className="text-small font-medium">Expenses</p>
              <DollarSign className="w-4 h-4 text-default-400" />
            </div>
            <div className="flex flex-col mt-2">
              <span className="text-2xl font-semibold">PKR {totalExpenses.toLocaleString()}</span>
              <span className="text-xs text-default-400">+20.1% from last year</span>
            </div>
          </CustomCard>
          <CustomCard>
            <div className="flex justify-between items-center">
              <p className="text-small font-medium">Total Projects</p>
              <DollarSign className="w-4 h-4 text-default-400" />
            </div>
            <div className="flex flex-col mt-2">
              <span className="text-2xl font-semibold">PKR {totalBudget.toLocaleString()}</span>
              <span className="text-xs text-default-400">+20.1% from last year</span>
            </div>
          </CustomCard>
          {/* Similar CustomCard components for other statistics */}
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <CustomCard title="Donation Tracking">
            <CustomTable data={donations} columns={donationColumns} />
          </CustomCard>
          <CustomCard title="Expense Tracking">
            <CustomTable data={expenses} columns={expenseColumns} />
          </CustomCard>
          <CustomCard title="Recent Projects">
            <CustomTable data={projects} columns={projectColumns} />
          </CustomCard>
          <CustomCard title="Financial Reports">
            <div className="space-y-4">
              <FormSelect
                label="Select report type"
                value=""
                onChange={() => { }}
                options={[
                  { value: "monthly", label: "Monthly" },
                  { value: "annual", label: "Annual" },
                  { value: "project", label: "Project-specific" },
                ]}
              />
              <FormInput
                label="Select period"
                value=""
                onChange={() => { }}
                type="date"
              />
              <SubmitButton onClick={() => console.log("Generate Report")}>Generate Report</SubmitButton>
            </div>
          </CustomCard>
        </div>
      </main>
    </div>
  );
}