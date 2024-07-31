import React, { useState, useEffect, useRef } from 'react';
import { Card, CardHeader, CardBody, CardFooter, Divider, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Input, Button, Select, SelectItem, Textarea } from '@nextui-org/react';
import { getLocalStorage, setLocalStorage } from '../utils/localStorage';
import { Expense, Project, StaffMember } from '../types';

const expenseCategories = ["Utilities", "Maintenance", "Salaries", "Projects"] as const;
const utilityTypes = ["K-Electric", "Water", "Gas"] as const;

const Expenses: React.FC = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [staffMembers, setStaffMembers] = useState<StaffMember[]>([]);
  const [newExpense, setNewExpense] = useState<Omit<Expense, 'id'>>({
    date: '',
    category: 'Utilities',
    amount: 0,
    notes: '',
    utilityType: undefined,
    staffMember: undefined,
    project: undefined,
    receiptFile: undefined
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const storedExpenses = getLocalStorage<Expense[]>('expenses', []);
    const storedProjects = getLocalStorage<Project[]>('projects', []);
    const storedStaffMembers = getLocalStorage<StaffMember[]>('staffMembers', []);
    setExpenses(storedExpenses);
    setProjects(storedProjects);
    setStaffMembers(storedStaffMembers);
  }, []);

  const handleAddNewExpense = () => {
    if (!newExpense.date || !newExpense.category || newExpense.amount <= 0) {
      alert("Please fill in all required fields");
      return;
    }

    const updatedExpenses: Expense[] = [
      ...expenses,
      { ...newExpense, id: expenses.length + 1 }
    ];

    setExpenses(updatedExpenses);
    setLocalStorage('expenses', updatedExpenses);
    setNewExpense({
      date: '',
      category: 'Utilities',
      amount: 0,
      notes: '',
      utilityType: undefined,
      staffMember: undefined,
      project: undefined,
      receiptFile: undefined
    });
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
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

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setNewExpense(prev => ({ ...prev, receiptFile: file.name }));
    }
  };

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <h4 className="text-lg font-semibold">Expense Tracking</h4>
        </CardHeader>
        <Divider />
        <CardBody>
          <Table aria-label="Expense tracking table">
            <TableHeader>
              <TableColumn>Date</TableColumn>
              <TableColumn>Category</TableColumn>
              <TableColumn>Amount</TableColumn>
              <TableColumn>Notes</TableColumn>
              <TableColumn>Receipt</TableColumn>
            </TableHeader>
            <TableBody>
              {expenses.map((expense) => (
                <TableRow key={expense.id}>
                  <TableCell>{expense.date}</TableCell>
                  <TableCell>{expense.category}</TableCell>
                  <TableCell>PKR {expense.amount.toLocaleString()}</TableCell>
                  <TableCell>{expense.notes}</TableCell>
                  <TableCell>
                    {expense.receiptFile ? (
                      <Button size="sm" onPress={() => console.log(`View receipt: ${expense.receiptFile}`)}>
                        View Receipt
                      </Button>
                    ) : (
                      'No receipt'
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardBody>
      </Card>
      <Card>
        <CardHeader>
          <h4 className="text-lg font-semibold">Add New Expense</h4>
        </CardHeader>
        <Divider />
        <CardBody>
          <form className="flex flex-col gap-4">
            <Input 
              type="date" 
              label="Expense Date" 
              value={newExpense.date}
              onChange={(e) => setNewExpense(prev => ({ ...prev, date: e.target.value }))}
            />
            <Select 
              label="Expense Category"
              placeholder="Select a category"
              selectedKeys={[newExpense.category]}
              onSelectionChange={(keys) => {
                const category = Array.from(keys)[0] as Expense['category'];
                setNewExpense(prev => ({ 
                  ...prev, 
                  category,
                  utilityType: undefined,
                  staffMember: undefined,
                  project: undefined,
                  amount: 0
                }));
              }}
            >
              {expenseCategories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </Select>
            {newExpense.category === 'Utilities' && (
              <Select 
                label="Utility Type"
                placeholder="Select utility type"
                selectedKeys={newExpense.utilityType ? [newExpense.utilityType] : []}
                onSelectionChange={(keys) => {
                  const utilityType = Array.from(keys)[0] as Expense['utilityType'];
                  setNewExpense(prev => ({ ...prev, utilityType }));
                }}
              >
                {utilityTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </Select>
            )}
            {newExpense.category === 'Salaries' && (
              <Select 
                label="Staff Member"
                placeholder="Select staff member"
                selectedKeys={newExpense.staffMember ? [newExpense.staffMember] : []}
                onSelectionChange={(keys) => {
                  const staffMemberId = Array.from(keys)[0] as string;
                  handleStaffMemberChange(staffMemberId);
                }}
              >
                {staffMembers.map((member) => (
                  <SelectItem key={member.id.toString()} value={member.id.toString()}>
                    {member.name}
                  </SelectItem>
                ))}
              </Select>
            )}
            {newExpense.category === 'Projects' && (
              <Select 
                label="Project"
                placeholder="Select project"
                selectedKeys={newExpense.project ? [newExpense.project] : []}
                onSelectionChange={(keys) => {
                  const project = Array.from(keys)[0] as string;
                  setNewExpense(prev => ({ ...prev, project }));
                }}
              >
                {projects.map((project) => (
                  <SelectItem key={project.id.toString()} value={project.name}>
                    {project.name}
                  </SelectItem>
                ))}
              </Select>
            )}
            <Input 
              type="number" 
              label="Amount" 
              placeholder="0.00"
              value={newExpense.amount.toString()}
              onChange={(e) => setNewExpense(prev => ({ ...prev, amount: parseFloat(e.target.value) || 0 }))}
            />
            <Textarea
              label="Notes"
              placeholder="Enter any additional notes"
              value={newExpense.notes}
              onChange={(e) => setNewExpense(prev => ({ ...prev, notes: e.target.value }))}
            />
            <Input
              type="file"
              label="Receipt"
              placeholder="Upload receipt"
              ref={fileInputRef}
              onChange={handleFileChange}
            />
          </form>
        </CardBody>
        <CardFooter>
          <div className="flex justify-between w-full">
            <Button color="danger" variant="light" onPress={() => {
              setNewExpense({
                date: '',
                category: 'Utilities',
                amount: 0,
                notes: '',
                utilityType: undefined,
                staffMember: undefined,
                project: undefined,
                receiptFile: undefined
              });
              if (fileInputRef.current) {
                fileInputRef.current.value = '';
              }
            }}>
              Cancel
            </Button>
            <Button color="primary" onPress={handleAddNewExpense}>Save Expense</Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );

};

export default Expenses;