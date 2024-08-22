import  { useMemo } from "react";
import { DollarSign } from 'lucide-react';
import { Donation, Project, Expense } from "../types";
import { useAllData } from "../hooks/useHooks";
import { formatCurrency } from "../utils/functions";
import { Pie, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js';
import { StatCard, TableCard, ChartCard } from '../components/DashboardComponents';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

export default function Dashboard() {
  const { donations, expenses, projects } = useAllData();

  const memoizedData = useMemo(() => {
    const totalDonations = donations.reduce((acc, donation) => acc + donation.amount, 0);
    const totalExpenses = expenses.reduce((acc, expense) => acc + expense.amount, 0);
    const fridayDonations = donations.filter(donation => donation.type === "Friday Collection");
    const totalBudget = projects.filter(project => project.name !== 'Construction').reduce((acc, project) => acc + project.budget, 0);
    const projectDonations = donations.reduce((acc, donation) => {
      if (donation.project) {
        acc[donation.project] = (acc[donation.project] || 0) + donation.amount;
      }
      return acc;
    }, {} as Record<string, number>);

    const donationDistribution = donations.reduce((acc, donation) => {
      acc[donation.type] = (acc[donation.type] || 0) + donation.amount;
      return acc;
    }, {} as Record<string, number>);

    return { totalDonations, totalExpenses, fridayDonations, totalBudget, projectDonations, donationDistribution };
  }, [donations, expenses, projects]);

  const { totalDonations, totalExpenses, fridayDonations, totalBudget, projectDonations, donationDistribution } = memoizedData;

  const donationColumns = [
    { key: "donor", label: "Donor" },
    { key: "date", label: "Date" },
    { key: "amount", label: "Amount", render: (donation: Donation) => formatCurrency(donation.amount) },
    { key: "type", label: "Type" },
    { key: "project", label: "Project" },
  ];

  const fridayDonationColumns = donationColumns.filter(col => col.key !== "project");

  const expenseColumns = [
    { key: "date", label: "Date" },
    { key: "category", label: "Category" },
    { key: "amount", label: "Amount", render: (expense: Expense) => formatCurrency(expense.amount) },
    { key: "notes", label: "Notes" },
  ];

  const projectColumns = [
    { key: "name", label: "Name" },
    { key: "budget", label: "Budget", render: (project: Project) => formatCurrency(project.budget) },
    { key: "status", label: "Status" },
  ];

  const donationDistributionData = {
    labels: Object.keys(donationDistribution),
    datasets: [{
      data: Object.values(donationDistribution),
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
    }]
  };

  const projectProgressData = {
    labels: projects.filter(project => project.name !== 'Construction').map(project => project.name),
    datasets: [
      {
        label: 'Total Budget',
        data: projects.filter(project => project.name !== 'Construction').map(project => project.budget),
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
      {
        label: 'Donations Received',
        data: projects.filter(project => project.name !== 'Construction').map(project => projectDonations[project.name] || 0),
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
      },
    ],
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
          <StatCard title="Balance" value={formatCurrency(totalDonations - totalExpenses)} icon={DollarSign} />
          <StatCard title="Expenses" value={formatCurrency(totalExpenses)} icon={DollarSign} />
          <StatCard title="Total Projects" value={formatCurrency(totalBudget)} icon={DollarSign} />
        </section>
        <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <TableCard<Donation> title="Recent Donations" data={donations} columns={donationColumns} />
          <TableCard<Donation> title="Friday Donations" data={fridayDonations} columns={fridayDonationColumns} />
          <TableCard<Expense> title="Recent Expenses" data={expenses} columns={expenseColumns} />
          <TableCard<Project> title="Recent Projects" data={projects} columns={projectColumns} />
          
          <ChartCard title="Donation Distribution">
            <Pie data={donationDistributionData} options={chartOptions} />
          </ChartCard>
          
          <ChartCard title="Project Progress" className="lg:col-span-1">
            <Bar 
              data={projectProgressData} 
              options={{
                ...chartOptions,
                indexAxis: 'y' as const,
                plugins: {
                  legend: { position: 'bottom' as const },
                },
              }} 
            />
          </ChartCard>
        </section>
      </main>
    </div>
  );
}