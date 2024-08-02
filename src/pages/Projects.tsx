import React, { useState } from 'react';
import { CustomCard } from '../components/CustomCard';
import { CustomTable, Column } from '../components/CustomTable';
import { FormInput, FormSelect } from '../components/FormComponents';
import { SubmitButton, CancelButton } from '../components/ButtonComponents';
import { Project, Donation, Expense } from '../types';
import { useAllData } from '../hooks/useHooks';
import { formatCurrency, formatDate } from '../utils/functions';

const Projects: React.FC = () => {
  const { projects, addProject, donations, expenses } = useAllData();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [newProject, setNewProject] = useState<Omit<Project, 'id'>>({
    name: '',
    budget: 0,
    startDate: '',
    endDate: '',
    status: 'Running'
  });

  const handleAddNewProject = () => {
    if (!newProject.name || newProject.budget <= 0 || !newProject.startDate || !newProject.endDate) {
      alert("Please fill in all fields");
      return;
    }
    addProject(newProject);
    setNewProject({ name: '', budget: 0, startDate: '', endDate: '', status: 'Running' });
  };

  const projectColumns: Column<Project>[] = [
    { key: "name", label: "Name" },
    { key: "budget", label: "Budget", render: (project) => formatCurrency(project.budget) },
    { key: "status", label: "Status" },
    { 
      key: "actions", 
      label: "Actions", 
      render: (project) => (
        <SubmitButton onClick={() => setSelectedProject(project)}>
          Show Details
        </SubmitButton>
      )
    },
  ];

  const projectDonations = selectedProject
    ? donations.filter(donation => donation.project === selectedProject.id.toString())
    : [];
  const projectExpenses = selectedProject
    ? expenses.filter(expense => expense.project === selectedProject.name)
    : [];

  const donationColumns: Column<Donation>[] = [
    { key: "donor", label: "Donor" },
    { key: "date", label: "Date", render: (donation) => formatDate(donation.date) },
    { key: "amount", label: "Amount", render: (donation) => formatCurrency(donation.amount) },
  ];

  const expenseColumns: Column<Expense>[] = [
    { key: "date", label: "Date", render: (expense) => formatDate(expense.date) },
    { key: "amount", label: "Amount", render: (expense) => formatCurrency(expense.amount) },
    { key: "notes", label: "Notes" },
  ];

  return (
    <div className="flex flex-col gap-4">
      <div className="grid gap-4 md:grid-cols-2">
        <CustomCard title="Recent Projects">
          <CustomTable data={projects} columns={projectColumns} />
        </CustomCard>
        <CustomCard title="Add New Project">
          <form className="flex flex-col gap-4">
            <FormInput
              label="Project Name"
              value={newProject.name}
              onChange={(value: any) => setNewProject({ ...newProject, name: value as string })}
            />
            <FormInput
              label="Budget"
              type="number"
              value={newProject.budget}
              onChange={(value: any) => setNewProject({ ...newProject, budget: parseFloat(value as string) || 0 })}
            />
            <FormInput
              label="Start Date"
              type="date"
              value={newProject.startDate}
              onChange={(value: any) => setNewProject({ ...newProject, startDate: value as string })}
            />
            <FormInput
              label="Expected End Date"
              type="date"
              value={newProject.endDate}
              onChange={(value: any) => setNewProject({ ...newProject, endDate: value as string })}
            />
            <FormSelect
              label="Status"
              value={newProject.status}
              onChange={(value: any) => setNewProject({ ...newProject, status: value as string })}
              options={[
                { value: "Running", label: "Running" },
                { value: "Completed", label: "Completed" },
                { value: "On Hold", label: "On Hold" }
              ]}
            />
            <div className="flex justify-end mt-4">
              <CancelButton onClick={() => setNewProject({ name: '', budget: 0, startDate: '', endDate: '', status: 'Running' })}>
                Cancel
              </CancelButton>
              <SubmitButton onClick={handleAddNewProject}>Add Project</SubmitButton>
            </div>
          </form>
        </CustomCard>
      </div>
      
      {selectedProject && (
        <CustomCard title={`Project Details: ${selectedProject.name}`}>
          <div className="mb-4">
            <p><strong>Budget:</strong> {formatCurrency(selectedProject.budget)}</p>
            <p><strong>Start Date:</strong> {formatDate(selectedProject.startDate)}</p>
            <p><strong>End Date:</strong> {formatDate(selectedProject.endDate)}</p>
            <p><strong>Status:</strong> {selectedProject.status}</p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <h5 className="text-lg font-semibold mb-2">Donations</h5>
              <CustomTable data={projectDonations} columns={donationColumns} />
            </div>
            <div>
              <h5 className="text-lg font-semibold mb-2">Expenses</h5>
              <CustomTable data={projectExpenses} columns={expenseColumns} />
            </div>
          </div>
        </CustomCard>
      )}
    </div>
  );
};

export default Projects;