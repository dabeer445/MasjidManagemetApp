import React, { useState } from 'react';
import { CustomCard } from '../components/CustomCard';
import { CustomTable, Column } from '../components/CustomTable';
import { FormInput } from '../components/FormComponents';
import { SubmitButton, CancelButton } from '../components/ButtonComponents';
import { Donor, Donation } from '../types';
import { useAllData } from '../hooks/useHooks';
import { formatCurrency, formatDate } from '../utils/functions';

const Donors: React.FC = () => {
  const { donors, addDonor, donations } = useAllData();
  const [selectedDonor, setSelectedDonor] = useState<Donor | null>(null);
  const [newDonor, setNewDonor] = useState<Omit<Donor, 'id'>>({ name: '', number: '', address: '' });

  const handleAddNewDonor = () => {
    if (!newDonor.name || !newDonor.number || !newDonor.address) {
      alert("Please fill in all fields");
      return;
    }
    addDonor(newDonor);
    setNewDonor({ name: '', number: '', address: '' });
  };

  const donorColumns: Column<Donor>[] = [
    { key: "name", label: "Name" },
    { key: "number", label: "Phone Number" },
    { key: "address", label: "Address" },
    { 
      key: "actions", 
      label: "Actions", 
      render: (donor) => (
        <SubmitButton onClick={() => setSelectedDonor(donor)}>
          Show Details
        </SubmitButton>
      )
    },
  ];

  const donorDonations = selectedDonor
    ? donations.filter(donation => donation.donor === selectedDonor.name)
    : [];

  const donationColumns: Column<Donation>[] = [
    { key: "date", label: "Date", render: (donation) => formatDate(donation.date) },
    { key: "amount", label: "Amount", render: (donation) => formatCurrency(donation.amount) },
    { key: "type", label: "Type" },
    { key: "project", label: "Project" },
    // { key: "project", label: "Project" },
  ];

  return (
    <div className="flex flex-col gap-4">
      <div className="grid gap-4 md:grid-cols-2">
        <CustomCard title="Donors List">
          <CustomTable data={donors} columns={donorColumns} />
        </CustomCard>
        <CustomCard title="Add New Donor">
          <form className="flex flex-col gap-4">
            <FormInput
              label="Donor Name"
              value={newDonor.name}
              onChange={(value: any) => setNewDonor({ ...newDonor, name: value as string })}
            />
            <FormInput
              label="Phone Number"
              value={newDonor.number}
              onChange={(value: any) => setNewDonor({ ...newDonor, number: value as string })}
            />
            <FormInput
              label="Address"
              value={newDonor.address}
              onChange={(value: any) => setNewDonor({ ...newDonor, address: value as string })}
            />
            <div className="flex justify-end mt-4">
              <CancelButton onClick={() => setNewDonor({ name: '', number: '', address: '' })}>
                Cancel
              </CancelButton>
              <SubmitButton onClick={handleAddNewDonor}>Add Donor</SubmitButton>
            </div>
          </form>
        </CustomCard>
      </div>
      
      {selectedDonor && (
        <CustomCard title={`Donor Details: ${selectedDonor.name}`}>
          <div className="mb-4">
            <p><strong>Phone Number:</strong> {selectedDonor.number}</p>
            <p><strong>Address:</strong> {selectedDonor.address}</p>
          </div>
          <div>
            <h5 className="text-lg font-semibold mb-2">Donation History</h5>
            <CustomTable data={donorDonations} columns={donationColumns} />
          </div>
        </CustomCard>
      )}
    </div>
  );
};

export default Donors;