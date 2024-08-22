import React, { useState } from 'react';
import { Card, CardHeader, CardBody, CardFooter, Divider, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Input, Button, Select, SelectItem } from '@nextui-org/react';
import { useAllData } from '../hooks/useHooks';
import { formatCurrency, formatDate, formatReportDate } from '../utils/functions';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { Donation, Expense, Project, Donor } from '../types';

interface ReportData {
  id: number;
  type: string;
  dateRange: string;
  format: string;
}

const reportsData: ReportData[] = [
  { id: 1, type: "Donations Report", dateRange: "2023-01-01 - 2023-06-30", format: "PDF" },
  { id: 2, type: "Expenses Report", dateRange: "2023-04-01 - 2023-06-30", format: "Excel" },
  { id: 3, type: "Projects Report", dateRange: "2022-07-01 - 2023-06-30", format: "CSV" },
  { id: 5, type: "Donors Report", dateRange: "2023-01-01 - 2023-07-31", format: "Excel" },
];

type ReportType = 'accounts' | 'donations' | 'expenses' | 'projects' | 'donors';
type ReportFormat = 'pdf' | 'excel' | 'csv';

const Reports: React.FC = () => {
  const [reportType, setReportType] = useState<ReportType>('donations');
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [reportFormat, setReportFormat] = useState<ReportFormat>('pdf');

  const { donations, expenses, projects, donors } = useAllData();

  const generateReport = () => {
    if (!reportType || !startDate || !endDate || !reportFormat) {
      alert('Please fill in all fields');
      return;
    }

    if (reportFormat !== 'pdf') {
      alert('Excel and CSV formats are not implemented in this example');
      return;
    }

    if (reportType === 'accounts') {
      const filteredDonations = filterDataByDate('donations') as Donation[];
      const filteredExpenses = filterDataByDate('expenses') as Expense[];
      generateAccountingReport(filteredDonations, filteredExpenses, startDate, endDate);
    } else {
      const filteredData = filterDataByDate(reportType);
      generatePDF(reportType, filteredData, startDate, endDate);
    }
  };



  const parseInputDate = (dateString: string): Date => {
    return new Date(dateString);
  };

  const parseDonationDate = (dateString: string): Date => {
    const [day, month, year] = dateString.split('/');
    return new Date(2000 + parseInt(year), parseInt(month) - 1, parseInt(day));
  };

  const filterDataByDate = (type: ReportType): (Donation | Expense | Project | Donor)[] => {
    const start = startDate ? parseInputDate(startDate) : new Date(0);
    const end = endDate ? parseInputDate(endDate) : new Date();
  
    const sortByDate = (a: any, b: any): number => {
      const dateA = parseDonationDate(a.date || a.startDate);
      const dateB = parseDonationDate(b.date || b.startDate);
      return dateA.getTime() - dateB.getTime();
    };
  
    switch (type) {
      case 'donations':
        return donations
          .filter(d => {
            const donationDate = parseDonationDate(d.date);
            return donationDate >= start && donationDate <= end;
          })
          .sort(sortByDate);
  
      case 'expenses':
        return expenses
          .filter(e => {
            const expenseDate = parseDonationDate(e.date);
            return expenseDate >= start && expenseDate <= end;
          })
          .sort(sortByDate);
  
      case 'projects':
        return projects
          .filter(p => {
            const projectStartDate = parseDonationDate(p.startDate);
            return projectStartDate >= start && projectStartDate <= end;
          })
          .sort(sortByDate);
  
      case 'donors':
        return donors; // Donors don't have a date, so we return all of them unsorted
  
      default:
        return [];
    }
  };
  const generatePDF = (type: ReportType, data: (Donation | Expense | Project | Donor)[], startDate: string, endDate: string) => {
    try {
      if (data.length === 0) {
        alert('No data available for the selected date range');
        return;
      }

      const doc = new jsPDF();
      const pageWidth = doc.internal.pageSize.width;
      const pageHeight = doc.internal.pageSize.height;

      // Add logo (replace with your actual logo path)
      doc.addImage('/logo.png', 'PNG', 14, 10, 40, 40);

      // Add organization name
      doc.setFontSize(18);
      doc.setTextColor(0);
      doc.text(`Jamia Muhammadi Masjid ${type.charAt(0).toUpperCase() + type.slice(1)} Report`, 60, 25);

      // Add summary information
      doc.setFontSize(10);
      doc.setTextColor(100);
      doc.text(`Report #: ${Math.floor(Math.random() * 1000000)}`, pageWidth - 14, 35, { align: 'right' });
      doc.text(`Date Range: ${formatDate(startDate)} - ${formatDate(endDate)}`, pageWidth - 14, 42, { align: 'right' });
      doc.text(`Total Entries: ${data.length}`, pageWidth - 14, 49, { align: 'right' });

      let total = 0;
      if (type === 'donations' || type === 'expenses' || type === 'projects') {
        total = data.reduce((sum, item: any) => sum + (item.amount || item.budget || 0), 0);
        doc.text(`Total Amount: ${formatCurrency(total)}`, pageWidth - 14, 56, { align: 'right' });
      }

      // Add horizontal line before the table
      doc.setDrawColor(200);
      doc.line(14, 65, pageWidth - 14, 65);

      // Set up columns and rows for the table
      let columns: string[] = [];
      let rows: (string | number)[][] = [];


      switch (type) {
        case 'donations':
          columns = ['No', 'Date', 'Donor', 'Amount', 'Type', 'Project'];
          rows = (data as Donation[])
            .sort((a, b) => parseDonationDate(a.date).getTime() - parseDonationDate(b.date).getTime())
            .map((d, index) => [
              index + 1,
              d.date,
              d.donor,
              formatCurrency(d.amount),
              d.type,
              d.project || 'N/A'
            ]);
          total = (data as Donation[]).reduce((sum, d) => sum + d.amount, 0);
          break;
        case 'expenses':
          columns = ['No', 'Date', 'Category', 'Amount', 'Notes'];
          rows = (data as Expense[])
            .sort((a, b) => parseDonationDate(a.date).getTime() - parseDonationDate(b.date).getTime())
            .map((e, index) => [
              index + 1,
              e.date,
              e.category,
              formatCurrency(e.amount),
              e.notes || 'N/A'
            ]);
          total = (data as Expense[]).reduce((sum, e) => sum + e.amount, 0);
          break;
        case 'projects':
          columns = ['No', 'Name', 'Budget', 'Start Date', 'End Date', 'Status'];
          rows = (data as Project[])
            .sort((a, b) => parseDonationDate(a.startDate).getTime() - parseDonationDate(b.startDate).getTime())
            .map((p, index) => [
              index + 1,
              p.name,
              formatCurrency(p.budget),
              p.startDate,
              p.endDate,
              p.status
            ]);
          total = (data as Project[]).reduce((sum, p) => sum + p.budget, 0);
          break;
        case 'donors':
          columns = ['No', 'Name', 'Number', 'Address'];
          rows = (data as Donor[]).map((d, index) => [
            index + 1,
            d.name,
            d.number,
            d.address
          ]);
          break;
      }

      // Add table
      (doc as any).autoTable({
        head: [columns],
        body: rows,
        startY: 75,
        headStyles: { fillColor: [0, 102, 204], textColor: 255 },
        alternateRowStyles: { fillColor: [240, 240, 240] },
        columnStyles: { 0: { cellWidth: 20 } },
        styles: {
          fontSize: 8,
          cellPadding: 3,
          valign: 'middle'
        },
      });

      // Add horizontal line after the table
      const finalY = (doc as any).lastAutoTable.finalY;
      doc.setDrawColor(200);
      doc.line(14, finalY + 5, pageWidth - 14, finalY + 5);


      // Add summary information after the table
      doc.setFontSize(10);
      doc.setTextColor(0);
      doc.text(`Total Entries: ${data.length}`, 14, finalY + 15);
      if (total > 0) {
        doc.text(`Total Amount: ${formatCurrency(total)}`, pageWidth - 14, finalY + 15, { align: 'right' });
      }

      // Add footer
      const pageCount = (doc as any).internal.getNumberOfPages();
      doc.setFontSize(8);
      for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.text(`Page ${i} of ${pageCount}`, pageWidth / 2, pageHeight - 10, { align: 'center' });
      }

      doc.save(`${type}_report.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('An error occurred while generating the PDF. Please check the console for more details.');
    }
  };
  const generateAccountingReport = (donations: Donation[], expenses: Expense[], startDate: string, endDate: string) => {
    try {
console.log(donations[0].date,parseDonationDate(donations[0].date))

      const doc = new jsPDF();
      const pageWidth = doc.internal.pageSize.width;
      const pageHeight = doc.internal.pageSize.height;

      // Add logo and header
      doc.addImage('/logo.png', 'PNG', 14, 10, 40, 40);
      doc.setFontSize(18);
      doc.setTextColor(0);
      doc.text('Jamia Muhammadi Masjid Accounting Report', 60, 25);

      // Add report information
      doc.setFontSize(10);
      doc.setTextColor(100);
      doc.text(`Report #: ${Math.floor(Math.random() * 1000000)}`, pageWidth - 14, 35, { align: 'right' });
      doc.text(`Date Range: ${formatDate(startDate)} - ${formatDate(endDate)}`, pageWidth - 14, 42, { align: 'right' });

      // Add horizontal line
      doc.setDrawColor(200);
      doc.line(14, 50, pageWidth - 14, 50);

      // Calculate totals
      const totalDonations = donations.reduce((sum, d) => sum + d.amount, 0);
      const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);
      const balance = totalDonations - totalExpenses;

      // Add summary table
      (doc as any).autoTable({
        head: [['Category', 'Amount']],
        body: [
          ['Total Donations', formatCurrency(totalDonations)],
          ['Total Expenses', formatCurrency(totalExpenses)],
          ['Balance', formatCurrency(balance)],
        ],
        startY: 60,
        headStyles: { fillColor: [0, 102, 204], textColor: 255 },
        alternateRowStyles: { fillColor: [240, 240, 240] },
        styles: { fontSize: 10, cellPadding: 5 },
      });

      // Add combined donations and expenses table
      doc.setFontSize(14);
      doc.text('Combined Donations and Expenses', 14, (doc as any).lastAutoTable.finalY + 20);

      const combinedData = [
        ...donations.map(d => ({ ...d, type: 'Donation' })),
        ...expenses.map(e => ({ ...e, type: 'Expense' }))
      ].sort((a, b) => parseDonationDate(a.date).getTime() - parseDonationDate(b.date).getTime());

      (doc as any).autoTable({
        head: [['Date', 'Type', 'Description', 'Amount']],
        body: combinedData.map(item => [
          formatReportDate(item.date),
          item.type,
          item.type === 'Donation' ? (item as Donation).donor : (item as Expense).category,
          formatCurrency(item.amount)
        ]),
        startY: (doc as any).lastAutoTable.finalY + 25,
        headStyles: { fillColor: [0, 102, 204], textColor: 255 },
        bodyStyles: (data: { type: string; }, _row: any) => {
          return {
            fillColor: data.type === 'Donation' ? [200, 230, 200] : [255, 200, 200]
          };
        },       
         alternateRowStyles: {},
        styles: { fontSize: 8, cellPadding: 3 },
      });

      // Add donations breakdown
      doc.setFontSize(14);
      doc.text('Donations Breakdown', 14, (doc as any).lastAutoTable.finalY + 20);

      (doc as any).autoTable({
        head: [['Date', 'Donor', 'Type', 'Amount']],
        body: donations.map(d => [
          formatReportDate(d.date),
          d.donor,
          d.type,
          formatCurrency(d.amount)
        ]),
        startY: (doc as any).lastAutoTable.finalY + 25,
        headStyles: { fillColor: [0, 102, 204], textColor: 255 },
        alternateRowStyles: { fillColor: [240, 240, 240] },
        styles: { fontSize: 8, cellPadding: 3 },
      });

      // Add expenses breakdown
      doc.setFontSize(14);
      doc.text('Expenses Breakdown', 14, (doc as any).lastAutoTable.finalY + 20);

      (doc as any).autoTable({
        head: [['Date', 'Category', 'Notes', 'Amount']],
        body: expenses.map(e => [
          formatReportDate(e.date),
          e.category,
          e.notes,
          formatCurrency(e.amount)
        ]),
        startY: (doc as any).lastAutoTable.finalY + 25,
        headStyles: { fillColor: [0, 102, 204], textColor: 255 },
        alternateRowStyles: { fillColor: [240, 240, 240] },
        styles: { fontSize: 8, cellPadding: 3 },
      });

      // Add footer
      const pageCount = (doc as any).internal.getNumberOfPages();
      doc.setFontSize(8);
      for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.text(`Page ${i} of ${pageCount}`, pageWidth / 2, pageHeight - 10, { align: 'center' });
      }

      doc.save('accounting_report.pdf');
    } catch (error) {
      console.error('Error generating accounting report:', error);
      alert('An error occurred while generating the accounting report. Please check the console for more details.');
    }
  };

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <h4 className="text-lg font-semibold">Generate Report</h4>
        </CardHeader>
        <Divider />
        <CardBody>
          <form className="flex flex-col gap-4">
            <Select
              label="Report Type"
              value={reportType}
              onChange={(e) => setReportType(e.target.value as ReportType)}
            >
              <SelectItem key="accounts">Accounting Report</SelectItem>
              <SelectItem key="donations">Donations Report</SelectItem>
              <SelectItem key="expenses">Expenses Report</SelectItem>
              <SelectItem key="projects">Projects Report</SelectItem>
              <SelectItem key="donors">Donors Report</SelectItem>
            </Select>
            <Input
              type="date"
              label="Start Date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
            <Input
              type="date"
              label="End Date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
            <Select
              label="Report Format"
              value={reportFormat}
              onChange={(e) => setReportFormat(e.target.value as ReportFormat)}
            >
              <SelectItem key="pdf">PDF</SelectItem>
              <SelectItem key="excel">Excel</SelectItem>
              <SelectItem key="csv">CSV</SelectItem>
            </Select>
          </form>
        </CardBody>
        <CardFooter>
          <div className="flex justify-between w-full">
            <Button color="danger" variant="light">Cancel</Button>
            <Button color="primary" onClick={generateReport}>Generate Report</Button>
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