import { Card, CardBody, CardHeader, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button, Input, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/react";
import { Activity, CreditCard, DollarSign, Users, Calendar } from 'lucide-react';

export default function Dashboard() {
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
                <span className="text-2xl font-semibold">$145,231.89</span>
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
                <span className="text-2xl font-semibold">+$50,350</span>
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
                <span className="text-2xl font-semibold">$112,234</span>
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
                <span className="text-2xl font-semibold">$200,000</span>
                <span className="text-xs text-default-400">Remaining: $87,766</span>
              </div>
            </CardBody>
          </Card>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <h4 className="text-large font-bold">Donation Tracking</h4>
              <p className="text-small text-default-500">View and manage all donations to the masjid.</p>
            </CardHeader>
            <CardBody>
              <Table aria-label="Donation tracking table">
                <TableHeader>
                  <TableColumn>Donor</TableColumn>
                  <TableColumn>Date</TableColumn>
                  <TableColumn>Amount</TableColumn>
                  <TableColumn>Type</TableColumn>
                </TableHeader>
                <TableBody>
                  <TableRow key="1">
                    <TableCell>John Doe</TableCell>
                    <TableCell>2023-06-01</TableCell>
                    <TableCell>$500</TableCell>
                    <TableCell>Zakat</TableCell>
                  </TableRow>
                  <TableRow key="2">
                    <TableCell>Jane Smith</TableCell>
                    <TableCell>2023-05-15</TableCell>
                    <TableCell>$250</TableCell>
                    <TableCell>Sadaqah</TableCell>
                  </TableRow>
                  <TableRow key="3">
                    <TableCell>Ali Khan</TableCell>
                    <TableCell>2023-04-30</TableCell>
                    <TableCell>$1,000</TableCell>
                    <TableCell>General</TableCell>
                  </TableRow>
                  <TableRow key="4">
                    <TableCell>Fatima Rahman</TableCell>
                    <TableCell>2023-03-20</TableCell>
                    <TableCell>$750</TableCell>
                    <TableCell>Specific Project</TableCell>
                  </TableRow>
                  <TableRow key="5">
                    <TableCell>Omar Malik</TableCell>
                    <TableCell>2023-02-10</TableCell>
                    <TableCell>$300</TableCell>
                    <TableCell>Zakat</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardBody>
          </Card>
          <Card>
            <CardHeader>
              <h4 className="text-large font-bold">Expense Tracking</h4>
              <p className="text-small text-default-500">View and manage all expenses for the masjid.</p>
            </CardHeader>
            <CardBody>
              <Table aria-label="Expense tracking table">
                <TableHeader>
                  <TableColumn>Date</TableColumn>
                  <TableColumn>Category</TableColumn>
                  <TableColumn>Amount</TableColumn>
                  <TableColumn>Receipt</TableColumn>
                </TableHeader>
                <TableBody>
                  <TableRow key="1">
                    <TableCell>2023-06-01</TableCell>
                    <TableCell>Utilities</TableCell>
                    <TableCell>$500</TableCell>
                    <TableCell>
                      <Button size="sm">View</Button>
                    </TableCell>
                  </TableRow>
                  <TableRow key="2">
                    <TableCell>2023-05-15</TableCell>
                    <TableCell>Maintenance</TableCell>
                    <TableCell>$1,250</TableCell>
                    <TableCell>
                      <Button size="sm">View</Button>
                    </TableCell>
                  </TableRow>
                  <TableRow key="3">
                    <TableCell>2023-04-30</TableCell>
                    <TableCell>Supplies</TableCell>
                    <TableCell>$300</TableCell>
                    <TableCell>
                      <Button size="sm">View</Button>
                    </TableCell>
                  </TableRow>
                  <TableRow key="4">
                    <TableCell>2023-03-20</TableCell>
                    <TableCell>Events</TableCell>
                    <TableCell>$750</TableCell>
                    <TableCell>
                      <Button size="sm">View</Button>
                    </TableCell>
                  </TableRow>
                  <TableRow key="5">
                    <TableCell>2023-02-10</TableCell>
                    <TableCell>Salaries</TableCell>
                    <TableCell>$5,000</TableCell>
                    <TableCell>
                      <Button size="sm">View</Button>
                    </TableCell>
                  </TableRow>
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
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <h4 className="text-large font-bold">Donation Entry</h4>
              <p className="text-small text-default-500">Record a new donation to the masjid.</p>
            </CardHeader>
            <CardBody>
              <form className="space-y-4">
                <Input label="Donor Name" placeholder="Enter donor name" />
                <Button variant="bordered" startContent={<Calendar className="w-4 h-4" />}>
                  Select date
                </Button>
                <Input label="Donation Amount" type="number" placeholder="0.00" />
                <Dropdown>
                  <DropdownTrigger>
                    <Button variant="bordered">Select donation type</Button>
                  </DropdownTrigger>
                  <DropdownMenu aria-label="Donation types">
                    <DropdownItem key="general">General</DropdownItem>
                    <DropdownItem key="zakat">Zakat</DropdownItem>
                    <DropdownItem key="sadaqah">Sadaqah</DropdownItem>
                    <DropdownItem key="project">Specific Project</DropdownItem>
                  </DropdownMenu>
                </Dropdown>
                <Input label="Notes" placeholder="Add any additional notes" />
                <div className="flex justify-between">
                  <Button color="danger" variant="light">Cancel</Button>
                  <Button color="primary">Save Donation</Button>
                </div>
              </form>
            </CardBody>
          </Card>
          <Card>
            <CardHeader>
              <h4 className="text-large font-bold">Expense Entry</h4>
              <p className="text-small text-default-500">Record a new expense for the masjid.</p>
            </CardHeader>
            <CardBody>
              <form className="space-y-4">
                <Button variant="bordered" startContent={<Calendar className="w-4 h-4" />}>
                  Select date
                </Button>
                <Dropdown>
                  <DropdownTrigger>
                    <Button variant="bordered">Select expense category</Button>
                  </DropdownTrigger>
                  <DropdownMenu aria-label="Expense categories">
                    <DropdownItem key="utilities">Utilities</DropdownItem>
                    <DropdownItem key="maintenance">Maintenance</DropdownItem>
                    <DropdownItem key="supplies">Supplies</DropdownItem>
                    <DropdownItem key="events">Events</DropdownItem>
                    <DropdownItem key="salaries">Salaries</DropdownItem>
                  </DropdownMenu>
                </Dropdown>
                <Input label="Expense Amount" type="number" placeholder="0.00" />
                <Input type="file" label="Receipt" />
                <Input label="Notes" placeholder="Add any additional notes" />
                <div className="flex justify-between">
                  <Button color="danger" variant="light">Cancel</Button>
                  <Button color="primary">Save Expense</Button>
                </div>
              </form>
            </CardBody>
          </Card>
        </div>
      </main>
    </div>
  );
}