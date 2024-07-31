// pages/Donations.tsx
import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardBody, CardFooter, Divider, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Input, Button, Select, SelectItem, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from '@nextui-org/react';
import { getLocalStorage, setLocalStorage } from '../utils/localStorage';
import { Donor, Donation, Project } from '../types';

const Donations: React.FC = () => {
  const [donors, setDonors] = useState<Donor[]>([]);
  const [donations, setDonations] = useState<Donation[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [isNewDonorModalOpen, setIsNewDonorModalOpen] = useState<boolean>(false);
  const [isNewProjectModalOpen, setIsNewProjectModalOpen] = useState<boolean>(false);
  const [newDonor, setNewDonor] = useState<Omit<Donor, 'id'>>({ name: '', number: '', address: '' });
  const [newProject, setNewProject] = useState<Omit<Project, 'id'>>({ name: '', budget: 0, startDate: '', endDate: '', status: '' });
  const [newDonation, setNewDonation] = useState<Omit<Donation, 'id'>>({ donor: '', date: '', amount: 0, type: '', project: '' });
  const [selectedDonorId, setSelectedDonorId] = useState<string | null>(null);
  const [isChangeDonorModalOpen, setIsChangeDonorModalOpen] = useState<boolean>(false);
  const [selectedDonationForChange, setSelectedDonationForChange] = useState<Donation | null>(null);
  const [newDonorIdForChange, setNewDonorIdForChange] = useState<string | null>(null);

  useEffect(() => {
    const storedDonors = getLocalStorage<Donor[]>('donors', []);
    const storedDonations = getLocalStorage<Donation[]>('donations', []);
    const storedProjects = getLocalStorage<Project[]>('projects', []);
    setDonors(storedDonors);
    setDonations(storedDonations);
    setProjects(storedProjects);
  }, []);

  const handleAddNewDonor = () => {
    const updatedDonors: Donor[] = [...donors, { ...newDonor, id: donors.length + 1 }];
    setDonors(updatedDonors);
    setLocalStorage('donors', updatedDonors);
    setNewDonor({ name: '', number: '', address: '' });
    setIsNewDonorModalOpen(false);
  };

  const handleAddNewProject = () => {
    const updatedProjects: Project[] = [...projects, { ...newProject, id: projects.length + 1 }];
    setProjects(updatedProjects);
    setLocalStorage('projects', updatedProjects);
    setNewProject({ name: '', budget: 0, startDate: '', endDate: '', status: '' });
    setIsNewProjectModalOpen(false);
  };

  const handleAddNewDonation = () => {
    if (!selectedDonorId || !newDonation.date || newDonation.amount <= 0 || !newDonation.type) {
      // Show an error message to the user
      console.log(selectedDonorId, newDonation)
      alert("Please fill in all required fields");
      return;
    }

    const selectedDonor = donors.find(donor => donor.id.toString() === selectedDonorId);
    if (!selectedDonor) {
      alert("Invalid donor selection");
      return;
    }

    const updatedDonations: Donation[] = [
      ...donations,
      {
        ...newDonation,
        id: donations.length + 1,
        donor: selectedDonor.name
      }
    ];

    setDonations(updatedDonations);
    setLocalStorage('donations', updatedDonations);

    // Reset the form
    setNewDonation({ donor: '', date: '', amount: 0, type: '', project: '' });
    setSelectedDonorId(null);
  };
  const handleChangeDonor = (donation: Donation) => {
    setSelectedDonationForChange(donation);
    setIsChangeDonorModalOpen(true);
  };

  const handleSaveChangeDonor = () => {
    if (!selectedDonationForChange || !newDonorIdForChange) return;

    const newDonor = donors.find(donor => donor.id.toString() === newDonorIdForChange);
    if (!newDonor) return;

    const updatedDonations = donations.map(donation =>
      donation.id === selectedDonationForChange.id
        ? { ...donation, donor: newDonor.name }
        : donation
    );

    setDonations(updatedDonations);
    setLocalStorage('donations', updatedDonations);
    setIsChangeDonorModalOpen(false);
    setSelectedDonationForChange(null);
    setNewDonorIdForChange(null);
  };
  return (
    <div className="grid gap-4 md:grid-cols-2">
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
              <TableColumn>Actions</TableColumn>
            </TableHeader>
            <TableBody>
              {donations.map((donation) => (
                <TableRow key={donation.id}>
                  <TableCell>{donation.donor}</TableCell>
                  <TableCell>{donation.date}</TableCell>
                  <TableCell>PKR {donation.amount}</TableCell>
                  <TableCell>{donation.type}</TableCell>
                  <TableCell>{donation.project || '-'}</TableCell>
                  <TableCell>
                    <Button size="sm" onPress={() => handleChangeDonor(donation)}>
                      Change Donor
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
          <h4 className="text-lg font-semibold">Donation Entry</h4>
        </CardHeader>
        <Divider />
        <CardBody>
          <form className="flex flex-col gap-4">
            <Select
              label="Donor Name"
              placeholder="Select a donor"
              selectedKeys={selectedDonorId ? [selectedDonorId] : []}
              onSelectionChange={(keys) => {
                const selected = Array.from(keys)[0] as string;
                if (selected === 'new-donor') {
                  setIsNewDonorModalOpen(true);
                } else {
                  setSelectedDonorId(selected);
                  const selectedDonor = donors.find(donor => donor.id.toString() === selected);
                  if (selectedDonor) {
                    setNewDonation(prev => ({ ...prev, donor: selectedDonor.name }));
                  }
                }
              }}
            >
              {[
                <SelectItem key="new-donor" textValue="+ Add New Donor">
                  <span className="text-primary">+ Add New Donor</span>
                </SelectItem>,
                ...donors.map((donor) => (
                  <SelectItem key={donor.id} textValue={donor.name}>
                    {donor.name}
                  </SelectItem>
                ))
              ]}
            </Select>
            <Input
              type="date"
              label="Donation Date"
              value={newDonation.date}
              onChange={(e) => setNewDonation(prev => ({ ...prev, date: e.target.value }))}
            />
            <Input
              type="number"
              label="Amount"
              placeholder="0.00"
              value={newDonation.amount.toString()}
              onChange={(e) => setNewDonation(prev => ({ ...prev, amount: parseFloat(e.target.value) || 0 }))}
            />
            <Select
              label="Donation Type"
              selectedKeys={newDonation.type ? [newDonation.type] : []}
              onSelectionChange={(keys) => {
                const type = Array.from(keys)[0] as string;
                setNewDonation(prev => ({ ...prev, type, project: type !== 'project' ? '' : prev.project }));
              }}
            >
              <SelectItem key="general">General</SelectItem>
              <SelectItem key="zakat">Zakat</SelectItem>
              <SelectItem key="sadaqah">Sadaqah</SelectItem>
              <SelectItem key="project">Project Specific</SelectItem>
            </Select>
            {newDonation.type === 'project' && (
              <div className="flex gap-2">
                <Select
                  label="Project"
                  placeholder="Select a project"
                  selectedKeys={newDonation.project ? [newDonation.project] : []}
                  onSelectionChange={(keys) => {
                    const selected = Array.from(keys)[0] as string;
                    if (selected === 'new-project') {
                      setIsNewProjectModalOpen(true);
                    }
                    const projectName = Array.from(keys)[0] as string;
                    setNewDonation(prev => ({ ...prev, project: projectName }));
                  }}
                  className="flex-grow"
                >
                  {[
                    <SelectItem key="new-project" textValue="+ Add New Project">
                      <span className="text-primary">+ Add New Project</span>
                    </SelectItem>,
                    ...projects.map((project) => (
                      <SelectItem key={project.id.toString()} textValue={project.name}>
                        {project.name}
                      </SelectItem>
                    ))
                  ]}
                </Select>
              </div>
            )}
          </form>
        </CardBody>
        <CardFooter>
          <div className="flex justify-between w-full">
            <Button color="danger" variant="light" onPress={() => {
              setNewDonation({ donor: '', date: '', amount: 0, type: '', project: '' });
              setSelectedDonorId(null);
            }}>
              Cancel
            </Button>
            <Button color="primary" onPress={handleAddNewDonation}>Save Donation</Button>
          </div>
        </CardFooter>
      </Card>


      {/* New Donor Modal */}
      <Modal
        isOpen={isNewDonorModalOpen}
        onClose={() => setIsNewDonorModalOpen(false)}
      >
        <ModalContent>
          <ModalHeader>Add New Donor</ModalHeader>
          <ModalBody>
            <Input
              label="Name"
              placeholder="Enter donor name"
              value={newDonor.name}
              onChange={(e) => setNewDonor({ ...newDonor, name: e.target.value })}
            />
            <Input
              label="Phone Number"
              placeholder="Enter phone number"
              value={newDonor.number}
              onChange={(e) => setNewDonor({ ...newDonor, number: e.target.value })}
            />
            <Input
              label="Address"
              placeholder="Enter address"
              value={newDonor.address}
              onChange={(e) => setNewDonor({ ...newDonor, address: e.target.value })}
            />
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="light" onPress={() => setIsNewDonorModalOpen(false)}>
              Cancel
            </Button>
            <Button color="primary" onPress={handleAddNewDonor}>
              Add Donor
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* New Project Modal */}
      <Modal
        isOpen={isNewProjectModalOpen}
        onClose={() => setIsNewProjectModalOpen(false)}
      >
        <ModalContent>
          <ModalHeader>Add New Project</ModalHeader>
          <ModalBody>
            <Input
              label="Name"
              placeholder="Enter project name"
              value={newProject.name}
              onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
            />
            <Input
              type="number"
              label="Budget"
              placeholder="Enter project budget"
              value={newProject.budget.toString()}
              onChange={(e) => setNewProject({ ...newProject, budget: parseFloat(e.target.value) })}
            />
            <Input
              type="date"
              label="Start Date"
              value={newProject.startDate}
              onChange={(e) => setNewProject({ ...newProject, startDate: e.target.value })}
            />
            <Input
              type="date"
              label="Expected End Date"
              value={newProject.endDate}
              onChange={(e) => setNewProject({ ...newProject, endDate: e.target.value })}
            />
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="light" onPress={() => setIsNewProjectModalOpen(false)}>
              Cancel
            </Button>
            <Button color="primary" onPress={handleAddNewProject}>
              Add Project
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Change Donor Modal */}
      <Modal
        isOpen={isChangeDonorModalOpen}
        onClose={() => {
          setIsChangeDonorModalOpen(false);
          setSelectedDonationForChange(null);
          setNewDonorIdForChange(null);
        }}
      >
        <ModalContent>
          <ModalHeader>Change Donor</ModalHeader>
          <ModalBody>
            <Select
              label="Select New Donor"
              placeholder="Choose a new donor"
              selectedKeys={newDonorIdForChange ? [newDonorIdForChange] : []}
              onSelectionChange={(keys) => {
                const selected = Array.from(keys)[0] as string;
                setNewDonorIdForChange(selected);
              }}
            >
              {donors.map((donor) => (
                <SelectItem key={donor.id.toString()} textValue={donor.name}>
                  {donor.name}
                </SelectItem>
              ))}
            </Select>
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="light" onPress={() => setIsChangeDonorModalOpen(false)}>
              Cancel
            </Button>
            <Button color="primary" onPress={handleSaveChangeDonor}>
              Save Changes
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default Donations;