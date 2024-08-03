import  { useMemo } from "react";
import { CustomCard } from "../components/CustomCard";
import { CustomTable, Column } from "../components/CustomTable";
import { FormInput, FormSelect } from "../components/FormComponents";
import { SubmitButton } from "../components/ButtonComponents";
import { DollarSign } from 'lucide-react';
import { Donation, Project, Expense } from "../types";
import { useAllData } from "../hooks/useHooks";
import { formatCurrency } from "../utils/functions";

export default function Dashboard() {
  const { donations, expenses, projects } = useAllData();

  const totalDonations = useMemo(() => donations.reduce((acc, donation) => acc + donation.amount, 0), [donations]);
  const totalExpenses = useMemo(() => expenses.reduce((acc, expense) => acc + expense.amount, 0), [expenses]);
  const totalBudget = useMemo(() => projects.reduce((acc, project) => acc + project.budget, 0), [projects]);
  const atyatDonations = useMemo(() => donations.filter(donation => donation.type === 'atyat').reduce((acc, donation) => acc + donation.amount, 0), [donations]);

  const donationColumns: Column<Donation>[] = [
    { key: "donor", label: "Donor" },
    { key: "date", label: "Date" },
    { key: "amount", label: "Amount", render: (donation) => formatCurrency(donation.amount) },
    { key: "type", label: "Type" },
    { key: "project", label: "Project" },
  ];
  const expenseColumns: Column<Expense>[] = [
    { key: "date", label: "Date"},
    { key: "category", label: "Category" },
    { key: "amount", label: "Amount", render: (expense) => formatCurrency(expense.amount) },
    { key: "notes", label: "Notes" },
    // {
    //   key: "receiptFile", label: "Receipt", render: (expense: Expense) =>
    //     expense.receiptFile ? <a href={expense.receiptFile} target="_blank" rel="noopener noreferrer">View Receipt</a> : 'No receipt'
    // },
  ];

  const projectColumns: Column<Project>[] = [
    { key: "name", label: "Name" },
    { key: "budget", label: "Budget", render: (project) => formatCurrency(project.budget) },
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
              <span className="text-2xl font-semibold">{formatCurrency(totalDonations)}</span>
            </div>
          </CustomCard>
          <CustomCard>
            <div className="flex justify-between items-center">
              <p className="text-small font-medium">Atyat Donations</p>
              <DollarSign className="w-4 h-4 text-default-400" />
            </div>
            <div className="flex flex-col mt-2">
              <span className="text-2xl font-semibold">{formatCurrency(atyatDonations)}</span>
            </div>
          </CustomCard>
          <CustomCard>
            <div className="flex justify-between items-center">
              <p className="text-small font-medium">Expenses</p>
              <DollarSign className="w-4 h-4 text-default-400" />
            </div>
            <div className="flex flex-col mt-2">
              <span className="text-2xl font-semibold">{formatCurrency(totalExpenses)}</span>
            </div>
          </CustomCard>
          <CustomCard>
            <div className="flex justify-between items-center">
              <p className="text-small font-medium">Total Projects</p>
              <DollarSign className="w-4 h-4 text-default-400" />
            </div>
            <div className="flex flex-col mt-2">
              <span className="text-2xl font-semibold">{formatCurrency(totalBudget)}</span>
            </div>
          </CustomCard>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <CustomCard title="Recent Donations">
            <CustomTable data={donations.slice(0, 5)} columns={donationColumns} />
          </CustomCard>
          <CustomCard title="Recent Expenses">
            <CustomTable data={expenses.slice(0, 5)} columns={expenseColumns} />
          </CustomCard>
          <CustomCard title="Recent Projects">
            <CustomTable data={projects.slice(0, 5)} columns={projectColumns} />
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