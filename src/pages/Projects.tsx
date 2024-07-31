import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardBody, CardFooter, Divider, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Input, Button, Chip } from '@nextui-org/react';
import { getLocalStorage, setLocalStorage } from '../utils/localStorage';
import { Project, Donation, Expense } from '../types';

const initialProjects: Project[] = [
  { id: 1, name: "Masjid Renovation", budget: 250000, startDate: "2023-04-01", endDate: "2023-09-30", status: "Running" },
  { id: 2, name: "Community Center", budget: 500000, startDate: "2022-11-01", endDate: "2023-08-31", status: "Running" },
  { id: 3, name: "Parking Lot Expansion", budget: 100000, startDate: "2023-06-15", endDate: "2023-11-30", status: "Running" },
  { id: 4, name: "Playground Upgrade", budget: 75000, startDate: "2023-02-01", endDate: "2023-05-31", status: "Completed" },
  { id: 5, name: "Roof Replacement", budget: 150000, startDate: "2022-09-01", endDate: "2023-03-31", status: "Completed" },
];

const Projects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [newProject, setNewProject] = useState<Omit<Project, 'id' | 'status'>>({
    name: '',
    budget: 0,
    startDate: '',
    endDate: ''
  });
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [projectDonations, setProjectDonations] = useState<Donation[]>([]);
  const [projectExpenses, setprojectExpenses] = useState<Expense[]>([]);

  useEffect(() => {
    const storedProjects = getLocalStorage<Project[]>('projects', initialProjects);
    setProjects(storedProjects);
  }, []);

  useEffect(() => {
    if (selectedProject) {
      const allDonations = getLocalStorage<Donation[]>('donations', []);
      const allExpenses = getLocalStorage<Expense[]>('expenses', []);
      const filteredDonations = allDonations.filter(donation => donation.project === selectedProject.id.toString());
      const filteredExpenses = allExpenses.filter(expense => expense.project === selectedProject.id.toString());
      setProjectDonations(filteredDonations);
      setprojectExpenses(filteredExpenses);
    }
  }, [selectedProject]);

  const handleShowDetails = (project: Project) => {
    setSelectedProject(project);
  };

  const handleAddNewProject = () => {
    if (!newProject.name || newProject.budget <= 0 || !newProject.startDate || !newProject.endDate) {
      alert("Please fill in all fields");
      return;
    }

    const updatedProjects: Project[] = [
      ...projects,
      {
        ...newProject,
        id: projects.length + 1,
        status: "Running"
      }
    ];

    setProjects(updatedProjects);
    setLocalStorage('projects', updatedProjects);
    setNewProject({ name: '', budget: 0, startDate: '', endDate: '' });
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="grid gap-4 md:grid-cols-2">
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
                <TableColumn>Actions</TableColumn>
              </TableHeader>
              <TableBody>
                {projects.map((project) => (
                  <TableRow key={project.id}>
                    <TableCell>{project.name}</TableCell>
                    <TableCell>${project.budget.toLocaleString()}</TableCell>
                    <TableCell>
                      <Chip color={project.status === "Running" ? "success" : "primary"}>
                        {project.status}
                      </Chip>
                    </TableCell>
                    <TableCell>
                      <Button size="sm" onPress={() => handleShowDetails(project)}>
                        Show Details
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardBody>
        </Card>
        <Card>
          <CardHeader>
            <h4 className="text-lg font-semibold">Add New Project</h4>
          </CardHeader>
          <Divider />
          <CardBody>
            <form className="flex flex-col gap-4">
              <Input
                label="Project Name"
                placeholder="Enter project name"
                value={newProject.name}
                onChange={(e) => setNewProject(prev => ({ ...prev, name: e.target.value }))}
              />
              <Input
                type="number"
                label="Budget"
                placeholder="0.00"
                value={newProject.budget.toString()}
                onChange={(e) => setNewProject(prev => ({ ...prev, budget: parseFloat(e.target.value) || 0 }))}
              />
              <Input
                type="date"
                label="Start Date"
                value={newProject.startDate}
                onChange={(e) => setNewProject(prev => ({ ...prev, startDate: e.target.value }))}
              />
              <Input
                type="date"
                label="Expected End Date"
                value={newProject.endDate}
                onChange={(e) => setNewProject(prev => ({ ...prev, endDate: e.target.value }))}
              />
            </form>
          </CardBody>
          <CardFooter>
            <div className="flex justify-between w-full">
              <Button color="danger" variant="light" onPress={() => setNewProject({ name: '', budget: 0, startDate: '', endDate: '' })}>
                Cancel
              </Button>
              <Button color="primary" onPress={handleAddNewProject}>Save Project</Button>
            </div>
          </CardFooter>
        </Card>
      </div>
      {selectedProject && (
        <Card>
          <CardHeader>
            <h4 className="text-lg font-semibold">Project Details: {selectedProject.name}</h4>
          </CardHeader>
          <Divider />
          <CardBody>
            <div className="mb-4">
              <p><strong>Budget:</strong> ${selectedProject.budget.toLocaleString()}</p>
              <p><strong>Start Date:</strong> {selectedProject.startDate}</p>
              <p><strong>End Date:</strong> {selectedProject.endDate}</p>
              <p><strong>Status:</strong> {selectedProject.status}</p>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <h5 className="text-md font-semibold">Donations</h5>
                </CardHeader>
                <CardBody>
                  <Table aria-label="Project donations table">
                    <TableHeader>
                      <TableColumn>Donor</TableColumn>
                      <TableColumn>Date</TableColumn>
                      <TableColumn>Amount</TableColumn>
                    </TableHeader>
                    <TableBody>
                      {projectDonations.map((donation, index) => (
                        <TableRow key={index}>
                          <TableCell>{donation.donor}</TableCell>
                          <TableCell>{donation.date}</TableCell>
                          <TableCell>${donation.amount}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardBody>
              </Card>
              <Card>
                <CardHeader>
                  <h5 className="text-md font-semibold">Expenses</h5>
                </CardHeader>
                <CardBody>
                  <Table aria-label="Project donations table">
                    <TableHeader>
                      <TableColumn>Date</TableColumn>
                      <TableColumn>Amount</TableColumn>
                      <TableColumn>Notes</TableColumn>
                      <TableColumn>Reciept</TableColumn>
                    </TableHeader>
                    <TableBody>
                      {projectExpenses.map((expense, index) => (
                        <TableRow key={index}>
                          <TableCell>{expense.date}</TableCell>
                          <TableCell>${expense.amount}</TableCell>
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
                  </Table>                </CardBody>
              </Card>
            </div>
          </CardBody>
        </Card>
      )}
    </div>
  );
};

export default Projects;