import React, { useState } from 'react';
import { CustomCard } from '../components/CustomCard';
import { CustomTable, Column } from '../components/CustomTable';
import { FormInput, FormSelect, FormTextarea } from '../components/FormComponents';
import { SubmitButton, CancelButton } from '../components/ButtonComponents';
import { Expense } from '../types';
import { useAllData } from '../hooks/useHooks';
import { formatCurrency, formatDateLocal } from '../utils/functions';
import { ViewReceiptModal } from '../components/ExpenseModals';
import ImageUpload from '../components/ImageUpload';
import { NewStaffMemberModal } from '../components/DonationModals';


const expenseCategories = ["Maintenance", "Utilities", "Salaries", "Projects"] as const;
const utilityTypes = ["K-Electric", "Water", "Gas"] as const;

const Expenses: React.FC = () => {
  const { expenses, addExpense, projects, staffMembers, addStaffMember } = useAllData();
  const [isViewReceiptModalOpen, setIsViewReceiptModalOpen] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState<Expense | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [isNewStaffModalOpen, setIsNewStaffModalOpen] = useState(false);
  const [newExpense, setNewExpense] = useState<Omit<Expense, 'id'>>({
    date: '',
    category: 'Maintenance',
    amount: 0,
    notes: '',
    utilityType: undefined,
    staffMember: undefined,
    project: undefined,
    receiptFile: undefined
  });

  const handleAddNewExpense = () => {
    if (!newExpense.date || !newExpense.category || newExpense.amount <= 0) {
      alert("Please fill in all required fields");
      return;
    }
    addExpense(newExpense);
    setNewExpense({
      date: '',
      category: 'Maintenance',
      amount: 0,
      notes: '',
      utilityType: undefined,
      staffMember: undefined,
      project: undefined,
      receiptFile: undefined
    });
  };

  const handleStaffMemberChange = (selectedStaffMemberId: string) => {
    const selectedStaff = staffMembers.find(staff => staff.id.toString() === selectedStaffMemberId);
    if (selectedStaff) {
      setNewExpense(prev => ({
        ...prev,
        staffMember: selectedStaff.name,
        amount: selectedStaff.salary
      }));
    }
  };

  const expenseColumns: Column<Expense>[] = [
    { key: "date", label: "Date" },
    { key: "category", label: "Category" },
    { key: "amount", label: "Amount", render: (expense) => formatCurrency(expense.amount) },
    { key: "notes", label: "Notes" },
    {
      key: "receipt",
      label: "Receipt",
      render: (expense) => expense.receiptFile ? (
        <SubmitButton onClick={() => {
          setSelectedExpense(expense);
          setIsViewReceiptModalOpen(true);
        }}>
          View Receipt
        </SubmitButton>
      ) : 'No receipt'
    },
  ];
  const handleUploadSuccess = (url: string) => {
    setNewExpense(prev => ({ ...prev, receiptFile: url }));
    setUploadError(null);
  };

  const handleUploadError = (error: Error) => {
    console.error('Upload error:', error);
    setUploadError('Failed to upload receipt. Please try again.');
  };
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <CustomCard title="Recent Expenses">
        <CustomTable data={expenses.slice(0, 6)} columns={expenseColumns} />
      </CustomCard>
      <CustomCard title="Add New Expense">
        <form className="flex flex-col gap-4">
          <FormInput
            label="Expense Date"
            type="date"
            value={newExpense.date}
            onChange={(value: any) => setNewExpense(prev => ({ ...prev, date: value }))}
          />
          <FormSelect
            label="Expense Category"
            value={newExpense.category}
            onChange={(value: string) => setNewExpense(prev => ({
              ...prev,
              category: value as Expense['category'],
              utilityType: undefined,
              staffMember: undefined,
              project: undefined,
              amount: 0
            }))}
            options={expenseCategories.map(category => ({ value: category, label: category }))}
          />
          {newExpense.category === 'Utilities' && (
            <FormSelect
              label="Utility Type"
              value={newExpense.utilityType || ''}
              onChange={(value: any) => setNewExpense(prev => ({ ...prev, utilityType: value }))}
              options={utilityTypes.map(type => ({ value: type, label: type }))}
            />
          )}
          {newExpense.category === 'Salaries' && (
            <FormSelect
              label="Staff Member"
              value={newExpense.staffMember || ''}
              // onChange={(value: string) => handleStaffMemberChange(value)}
              onChange={(value: any) => {
                if (value === 'new-staff') {
                  setIsNewStaffModalOpen(true);
                } else {
                  // setSelectedDonorId(value);
                  const selectedStaffMember = staffMembers.find(staff => staff.id.toString() === value);

                  if (selectedStaffMember) {
                    setNewExpense(prev => ({ ...prev, staffMember: selectedStaffMember.id, amount: selectedStaffMember.salary, notes: `${selectedStaffMember.name}'s Salary` }));
                  }
                }
              }}

              options={[
                { value: "new-staff", label: "+ Add New Staff" },
                ...staffMembers.map(staff => ({ value: staff.id.toString(), label: staff.name }))
              ]}
            />
          )}
          {newExpense.category === 'Projects' && (
            <FormSelect
              label="Project"
              value={newExpense.project || ''}
              onChange={(value: any) => setNewExpense(prev => ({ ...prev, project: value }))}
              options={projects.map(project => ({ value: project.name, label: project.name }))}
            />
          )}
          <FormInput
            label="Amount"
            type="number"
            value={newExpense.amount.toString()}
            onChange={(value: any) => setNewExpense(prev => ({ ...prev, amount: parseFloat(value) || 0 }))}
          />
          <FormTextarea
            label="Notes"
            value={newExpense.notes}
            onChange={(value: any) => setNewExpense(prev => ({ ...prev, notes: value }))}
          />
          <ImageUpload
            onUploadSuccess={handleUploadSuccess}
            onUploadError={handleUploadError}
            type="expense"
          />
          {uploadError && <p className="text-red-500">{uploadError}</p>}
          {newExpense.receiptFile && <p>Receipt uploaded successfully!</p>}

          <div className="flex justify-end mt-4">
            <CancelButton onClick={() => setNewExpense({
              date: '',
              category: 'Utilities',
              amount: 0,
              notes: '',
              utilityType: undefined,
              staffMember: undefined,
              project: undefined,
              receiptFile: undefined
            })}>
              Cancel
            </CancelButton>
            <SubmitButton onClick={handleAddNewExpense}>Add Expense</SubmitButton>
          </div>
        </form>
      </CustomCard>


      <CustomCard title="All Expenses" className="md:col-span-2">
        <CustomTable data={expenses} columns={expenseColumns} />
      </CustomCard>

      <NewStaffMemberModal
        isOpen={isNewStaffModalOpen}
        onClose={() => setIsNewStaffModalOpen(false)}
        onAddStaff={addStaffMember }
      />

      <ViewReceiptModal
        isOpen={isViewReceiptModalOpen}
        onClose={() => setIsViewReceiptModalOpen(false)}
        expense={selectedExpense}
      />
    </div>
  );
};

export default Expenses;