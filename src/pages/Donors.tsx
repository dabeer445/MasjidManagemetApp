import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardBody, CardFooter, Divider, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Input, Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from '@nextui-org/react';
import { getLocalStorage, setLocalStorage } from '../utils/localStorage';
import { Donor, Donation } from '../types';

const Donors: React.FC = () => {
  const [donors, setDonors] = useState<Donor[]>([]);
  const [newDonor, setNewDonor] = useState<Omit<Donor, 'id'>>({ name: '', number: '', address: '' });
  const [selectedDonor, setSelectedDonor] = useState<Donor | null>(null);
  const [donorDonations, setDonorDonations] = useState<Donation[]>([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingDonor, setEditingDonor] = useState<Donor | null>(null);

  useEffect(() => {
    const storedDonors = getLocalStorage<Donor[]>('donors', []);
    setDonors(storedDonors);
  }, []);

  useEffect(() => {
    if (selectedDonor) {
      const allDonations = getLocalStorage<Donation[]>('donations', []);
      const filteredDonations = allDonations.filter(donation => donation.donor === selectedDonor.name);
      setDonorDonations(filteredDonations);
    }
  }, [selectedDonor]);

  const handleAddNewDonor = () => {
    if (!newDonor.name || !newDonor.number || !newDonor.address) {
      alert("Please fill in all fields");
      return;
    }

    const updatedDonors: Donor[] = [
      ...donors,
      { ...newDonor, id: donors.length + 1 }
    ];

    setDonors(updatedDonors);
    setLocalStorage('donors', updatedDonors);
    setNewDonor({ name: '', number: '', address: '' });
  };

  const handleShowDetails = (donor: Donor) => {
    setSelectedDonor(donor);
  };

  const handleEditDonor = (donor: Donor) => {
    setEditingDonor(donor);
    setIsEditModalOpen(true);
  };

  const handleSaveEdit = () => {
    if (!editingDonor) return;

    const updatedDonors = donors.map(donor => 
      donor.id === editingDonor.id ? editingDonor : donor
    );

    setDonors(updatedDonors);
    setLocalStorage('donors', updatedDonors);
    setIsEditModalOpen(false);
    setEditingDonor(null);

    // Update selectedDonor if it was the one being edited
    if (selectedDonor && selectedDonor.id === editingDonor.id) {
      setSelectedDonor(editingDonor);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <h4 className="text-lg font-semibold">Donors</h4>
          </CardHeader>
          <Divider />
          <CardBody>
            <Table aria-label="Donors table">
              <TableHeader>
                <TableColumn>Name</TableColumn>
                <TableColumn>Phone Number</TableColumn>
                <TableColumn>Address</TableColumn>
                <TableColumn>Actions</TableColumn>
              </TableHeader>
              <TableBody>
                {donors.map((donor) => (
                  <TableRow key={donor.id}>
                    <TableCell>{donor.name}</TableCell>
                    <TableCell>{donor.number}</TableCell>
                    <TableCell>{donor.address}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button size="sm" onPress={() => handleShowDetails(donor)}>Details</Button>
                        <Button size="sm" onPress={() => handleEditDonor(donor)}>Edit</Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardBody>
        </Card>
        <Card>
          <CardHeader>
            <h4 className="text-lg font-semibold">Add New Donor</h4>
          </CardHeader>
          <Divider />
          <CardBody>
            <form className="flex flex-col gap-4">
              <Input 
                label="Donor Name" 
                placeholder="Enter donor name"
                value={newDonor.name}
                onChange={(e) => setNewDonor(prev => ({ ...prev, name: e.target.value }))}
              />
              <Input 
                label="Phone Number" 
                placeholder="Enter phone number"
                value={newDonor.number}
                onChange={(e) => setNewDonor(prev => ({ ...prev, number: e.target.value }))}
              />
              <Input 
                label="Address" 
                placeholder="Enter address"
                value={newDonor.address}
                onChange={(e) => setNewDonor(prev => ({ ...prev, address: e.target.value }))}
              />
            </form>
          </CardBody>
          <CardFooter>
            <div className="flex justify-between w-full">
              <Button color="danger" variant="light" onPress={() => setNewDonor({ name: '', number: '', address: '' })}>
                Cancel
              </Button>
              <Button color="primary" onPress={handleAddNewDonor}>Save Donor</Button>
            </div>
          </CardFooter>
        </Card>
      </div>
      {selectedDonor && (
        <Card>
          <CardHeader>
            <h4 className="text-lg font-semibold">Donor Details: {selectedDonor.name}</h4>
          </CardHeader>
          <Divider />
          <CardBody>
            <div className="mb-4">
              <p><strong>Phone Number:</strong> {selectedDonor.number}</p>
              <p><strong>Address:</strong> {selectedDonor.address}</p>
            </div>
            <h5 className="text-md font-semibold mb-2">Donation History</h5>
            <Table aria-label="Donor donations table">
              <TableHeader>
                <TableColumn>Date</TableColumn>
                <TableColumn>Amount</TableColumn>
                <TableColumn>Type</TableColumn>
                <TableColumn>Project</TableColumn>
              </TableHeader>
              <TableBody>
                {donorDonations.map((donation, index) => (
                  <TableRow key={index}>
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
      )}
      <Modal 
        isOpen={isEditModalOpen} 
        onClose={() => {
          setIsEditModalOpen(false);
          setEditingDonor(null);
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Edit Donor</ModalHeader>
              <ModalBody>
                <Input 
                  label="Donor Name" 
                  placeholder="Enter donor name"
                  value={editingDonor?.name || ''}
                  onChange={(e) => setEditingDonor(prev => prev ? { ...prev, name: e.target.value } : null)}
                />
                <Input 
                  label="Phone Number" 
                  placeholder="Enter phone number"
                  value={editingDonor?.number || ''}
                  onChange={(e) => setEditingDonor(prev => prev ? { ...prev, number: e.target.value } : null)}
                />
                <Input 
                  label="Address" 
                  placeholder="Enter address"
                  value={editingDonor?.address || ''}
                  onChange={(e) => setEditingDonor(prev => prev ? { ...prev, address: e.target.value } : null)}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cancel
                </Button>
                <Button color="primary" onPress={handleSaveEdit}>
                  Save Changes
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default Donors;