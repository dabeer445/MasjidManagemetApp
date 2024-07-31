import { Card, CardBody, CardHeader, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Chip, Divider } from "@nextui-org/react";
import { Activity, CreditCard, DollarSign, Users, Calendar } from 'lucide-react';
import { useState, useEffect } from "react";
import {
  Donation, Project, Expense,
  // Donor, StaffMember
} from "../types";
import { getLocalStorage } from "../utils/localStorage";

export default function Dashboard() {
  const [donations, setDonations] = useState<Donation[]>([]);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [totalDonations, setTotalDonations] = useState<Number>(0);
  const [totalExpenses, setTotalExpenses] = useState<Number>(0);
  const [totalBudget, setTotalBudget] = useState<Number>(0);
  const [projects, setProjects] = useState<Project[]>([]);
  // const [donors, setDonors] = useState<Donor[]>([]);
  // const [staffMembers, setStaffMembers] = useState<StaffMember[]>([]);

  useEffect(() => {
    // const storedDonors = getLocalStorage<Donor[]>('donors', []);
    // const storedStaffMembers = getLocalStorage<StaffMember[]>('staffMembers', []);
    const storedDonations = getLocalStorage<Donation[]>('donations', []);
    const storedProjects = getLocalStorage<Project[]>('projects', []);
    const storedExpenses = getLocalStorage<Expense[]>('expenses', []);

    const totalDonations = storedDonations.reduce((acc, donation) => acc + donation.amount, 0);
    const totalExpenses = storedExpenses.reduce((acc, expense) => acc + expense.amount, 0);
    const totalBudget = storedProjects.reduce((acc, project) => acc + project.budget, 0);

    // setStaffMembers(storedStaffMembers);
    // setDonors(storedDonors);
    setExpenses(storedExpenses);
    setDonations(storedDonations);
    setProjects(storedProjects);
    setTotalDonations(totalDonations);
    setTotalExpenses(totalExpenses);
    setTotalBudget(totalBudget);
  }, []);

  return (
    <div className="flex flex-col w-full min-h-screen bg-background">
      <main className="flex min-h-[calc(100vh_-_64px)] flex-1 flex-col gap-4 p-4 md:gap-8 md:p-10">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardBody>
              <div className="flex justify-between items-center">
                <p className="text-small font-medium">Total Donations</p>
                <DollarSign className="w-4 h-4 text-default-400" />
              </div>
              <div className="flex flex-col mt-2">
                <span className="text-2xl font-semibold">PKR {totalDonations.toLocaleString()}</span>
                <span className="text-xs text-default-400">+20.1% from last year</span>
              </div>
            </CardBody>
          </Card>
          <Card>
            <CardBody>
              <div className="flex justify-between items-center">
                <p className="text-small font-medium">Zakat Donations</p>
                <Users className="w-4 h-4 text-default-400" />
              </div>
              <div className="flex flex-col mt-2">
                <span className="text-2xl font-semibold">+PKR 50,350</span>
                <span className="text-xs text-default-400">+180.1% from last year</span>
              </div>
            </CardBody>
          </Card>
          <Card>
            <CardBody>
              <div className="flex justify-between items-center">
                <p className="text-small font-medium">Expenses</p>
                <CreditCard className="w-4 h-4 text-default-400" />
              </div>
              <div className="flex flex-col mt-2">
                <span className="text-2xl font-semibold">PKR {totalExpenses.toLocaleString()}</span>
                <span className="text-xs text-default-400">+19% from last year</span>
              </div>
            </CardBody>
          </Card>
          <Card>
            <CardBody>
              <div className="flex justify-between items-center">
                <p className="text-small font-medium">Budget</p>
                <Activity className="w-4 h-4 text-default-400" />
              </div>
              <div className="flex flex-col mt-2">
                <span className="text-2xl font-semibold">PKR {totalBudget.toLocaleString()}</span>
                <span className="text-xs text-default-400">Remaining: PKR 87,766</span>
              </div>
            </CardBody>
          </Card>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <h4 className="text-lg font-semibold">Donation Tracking</h4>
            </CardHeader>
            <Divider />
            <CardBody>
              <Table aria-label="Donation tracking table">
                <TableHeader>
                  <TableColumn>Donor</TableColumn>
                  <TableColumn>Date</TableColumn>
                  <TableColumn>Amount</TableColumn>
                  <TableColumn>Type</TableColumn>
                  <TableColumn>Project</TableColumn>
                </TableHeader>
                <TableBody>
                  {donations.map((donation) => (
                    <TableRow key={donation.id}>
                      <TableCell>{donation.donor}</TableCell>
                      <TableCell>{donation.date}</TableCell>
                      <TableCell>PKR {donation.amount}</TableCell>
                      <TableCell>{donation.type}</TableCell>
                      <TableCell>{donation.project || '-'}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardBody>
          </Card>
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
                          <Button size="sm" onPress={() => console.log(`View receipt: PKR {expense.receiptFile}`)}>
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
              <h4 className="text-lg font-semibold">Recent Projects</h4>
            </CardHeader>
            <Divider />
            <CardBody>
              <Table aria-label="Projects table">
                <TableHeader>
                  <TableColumn>Name</TableColumn>
                  <TableColumn>Budget</TableColumn>
                  <TableColumn>Status</TableColumn>
                </TableHeader>
                <TableBody>
                  {projects.map((project) => (
                    <TableRow key={project.id}>
                      <TableCell>{project.name}</TableCell>
                      <TableCell>PKR {project.budget.toLocaleString()}</TableCell>
                      <TableCell>
                        <Chip color={project.status === "Running" ? "success" : "primary"}>
                          {project.status}
                        </Chip>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardBody>
          </Card>

          <Card>
            <CardHeader>
              <h4 className="text-large font-bold">Financial Reports</h4>
              <p className="text-small text-default-500">View and generate financial reports for the masjid.</p>
            </CardHeader>
            <CardBody>
              <div className="space-y-4">
                <Dropdown>
                  <DropdownTrigger>
                    <Button variant="bordered">Select report type</Button>
                  </DropdownTrigger>
                  <DropdownMenu aria-label="Report types">
                    <DropdownItem key="monthly">Monthly</DropdownItem>
                    <DropdownItem key="annual">Annual</DropdownItem>
                    <DropdownItem key="project">Project-specific</DropdownItem>
                  </DropdownMenu>
                </Dropdown>
                <Button variant="bordered" startContent={<Calendar className="w-4 h-4" />}>
                  Select period
                </Button>
                <Button color="primary">Generate Report</Button>
              </div>
            </CardBody>
          </Card>

        </div>
      </main>
    </div>
  );
}