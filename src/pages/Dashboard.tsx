import { useMemo } from "react";
import { CustomCard } from "../components/CustomCard";
import { CustomTable, Column } from "../components/CustomTable";
import { DollarSign } from 'lucide-react';
import { Donation, Project, Expense } from "../types";
import { useAllData } from "../hooks/useHooks";
import { formatCurrency } from "../utils/functions";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement } from 'chart.js';
import { Pie, Line } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement);

const StatCard = ({ title, value, icon: Icon }) => (
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

export default function Dashboard() {
  const { donations, expenses, projects } = useAllData();
  
  const totalDonations = useMemo(() => donations.reduce((acc, donation) => acc + donation.amount, 0), [donations]);
  const totalExpenses = useMemo(() => expenses.reduce((acc, expense) => acc + expense.amount, 0), [expenses]);
  // const totalBudget = useMemo(() => projects.reduce((acc, project) => acc + project.budget, 0), [projects]);
  // const atyatDonations = useMemo(() => donations.filter(donation => donation.type === 'atyat').reduce((acc, donation) => acc + donation.amount, 0), [donations]);
  const fridayDonations = useMemo(() => donations.filter(donation => donation.type === "Friday Collection"), [donations]);
  const totalBudget = useMemo(() => projects.filter(project => project.name !== 'Construction').reduce((acc, project) => acc + project.budget, 0), [projects]);

  const fridayDonationColumns: Column<Donation>[] = [
    { key: "donor", label: "Donor" },
    { key: "date", label: "Date" },
    { key: "amount", label: "Amount", render: (donation) => formatCurrency(donation.amount) },
    { key: "type", label: "Type" },
    // { key: "project", label: "Project" },
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

  const prepareDonationDistributionData = () => {
    try {
      const donationTypes = donations.reduce((acc, donation) => {
        acc[donation.type] = (acc[donation.type] || 0) + donation.amount;
        return acc;
      }, {} as Record<string, number>);

      return {
        labels: Object.keys(donationTypes),
        datasets: [{
          data: Object.values(donationTypes),
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
        }]
      };
    } catch (error) {
      console.error('Error preparing donation distribution data:', error);
      return { labels: [], datasets: [{ data: [], backgroundColor: [] }] };
    }
  };

  const prepareDonationTrendData = () => {
    try {
      const sortedDonations = [...donations].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
      const dates = sortedDonations.map(d => d.date);
      const amounts = sortedDonations.map(d => d.amount);

      return {
        labels: dates,
        datasets: [{
          label: 'Donation Amount',
          data: amounts,
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1
        }]
      };
    } catch (error) {
      console.error('Error preparing donation trend data:', error);
      return { labels: [], datasets: [{ label: '', data: [], fill: false, borderColor: '', tension: 0 }] };
    }
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div className="flex flex-col w-full min-h-screen bg-background">
      <main className="flex min-h-[calc(100vh_-_64px)] flex-1 flex-col gap-4 p-4 md:gap-8 md:p-10">
        <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard title="Total Donations" value={formatCurrency(totalDonations)} icon={DollarSign} />
          <StatCard title="Balance" value={formatCurrency(totalDonations-totalExpenses)} icon={DollarSign} />
          <StatCard title="Expenses" value={formatCurrency(totalExpenses)} icon={DollarSign} />
          <StatCard title="Total Projects" value={formatCurrency(totalBudget)} icon={DollarSign} />
        </section>
        <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <CustomCard title="Recent Donations">
            <CustomTable data={donations.slice(0, 5)} columns={[...fridayDonationColumns, { key: "project", label: "Project" }]} />
          </CustomCard>
          <CustomCard title="Friday Donations">
            <CustomTable data={fridayDonations.slice(0, 5)} columns={fridayDonationColumns} />
          </CustomCard>
          <CustomCard title="Recent Expenses">
            <CustomTable data={expenses.slice(0, 5)} columns={expenseColumns} />
          </CustomCard>
          <CustomCard title="Recent Projects">
            <CustomTable data={projects.slice(0, 5)} columns={projectColumns} />
          </CustomCard>
          <CustomCard title="Donation Distribution">
            <div style={{ height: '300px' }}>
              <Pie data={prepareDonationDistributionData()} options={chartOptions} />
            </div>
          </CustomCard>
          <CustomCard title="Donation Trends">
            <div style={{ height: '300px' }}>
              <Line data={prepareDonationTrendData()} options={chartOptions} />
            </div>
          </CustomCard>
        </section>
      </main>
    </div>
  );
}
