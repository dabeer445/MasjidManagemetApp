// pages/Reports.jsx
import { Card, CardHeader, CardBody, CardFooter, Divider, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Input, Button, Select, SelectItem } from '@nextui-org/react';

const reportsData = [
  { id: 1, type: "Donations Report", dateRange: "2023-01-01 - 2023-06-30", format: "PDF" },
  { id: 2, type: "Expenses Report", dateRange: "2023-04-01 - 2023-06-30", format: "Excel" },
  { id: 3, type: "Projects Report", dateRange: "2022-07-01 - 2023-06-30", format: "CSV" },
  { id: 4, type: "Attendance Report", dateRange: "2023-05-01 - 2023-06-30", format: "PDF" },
  { id: 5, type: "Donors Report", dateRange: "2023-01-01 - 2023-07-31", format: "Excel" },
];

const Reports = () => {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <h4 className="text-lg font-semibold">Generate Report</h4>
        </CardHeader>
        <Divider />
        <CardBody>
          <form className="flex flex-col gap-4">
            <Select label="Report Type">
              <SelectItem key="donations">Donations Report</SelectItem>
              <SelectItem key="expenses">Expenses Report</SelectItem>
              <SelectItem key="projects">Projects Report</SelectItem>
              <SelectItem key="attendance">Attendance Report</SelectItem>
              <SelectItem key="donors">Donors Report</SelectItem>
            </Select>
            <Input type="date" label="Start Date" />
            <Input type="date" label="End Date" />
            <Select label="Report Format">
              <SelectItem key="pdf">PDF</SelectItem>
              <SelectItem key="excel">Excel</SelectItem>
              <SelectItem key="csv">CSV</SelectItem>
            </Select>
          </form>
        </CardBody>
        <CardFooter>
          <div className="flex justify-between w-full">
            <Button color="danger" variant="light">Cancel</Button>
            <Button color="primary">Generate Report</Button>
          </div>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader>
          <h4 className="text-lg font-semibold">Recent Reports</h4>
        </CardHeader>
        <Divider />
        <CardBody>
          <Table aria-label="Recent reports table">
            <TableHeader>
              <TableColumn>Report Type</TableColumn>
              <TableColumn>Date Range</TableColumn>
              <TableColumn>Format</TableColumn>
              <TableColumn>Actions</TableColumn>
            </TableHeader>
            <TableBody>
              {reportsData.map((report) => (
                <TableRow key={report.id}>
                  <TableCell>{report.type}</TableCell>
                  <TableCell>{report.dateRange}</TableCell>
                  <TableCell>{report.format}</TableCell>
                  <TableCell>
                    <Button size="sm" color="primary">Download</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardBody>
      </Card>
    </div>
  );
};

export default Reports;