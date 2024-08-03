import React, { useState } from 'react';
import { CustomCard } from '../components/CustomCard';
import { CustomTable, Column } from '../components/CustomTable';
import { FormCheckbox, FormInput, FormSelect } from '../components/FormComponents';
import { SubmitButton, CancelButton } from '../components/ButtonComponents';
import { Donation } from '../types';
import { NewDonorModal, NewProjectModal, ChangeDonorModal } from '../components/DonationModals';
import { useAllData } from '../hooks/useHooks';
import { DonationTypes } from '../utils/const';
import ImageUpload from '../components/ImageUpload';

const Donations: React.FC = () => {
  const {
    donors, addDonor,
    donations, addDonation, updateDonation,
    projects, addProject
  } = useAllData();

  const [isNewDonorModalOpen, setIsNewDonorModalOpen] = useState(false);
  const [isNewProjectModalOpen, setIsNewProjectModalOpen] = useState(false);
  const [isChangeDonorModalOpen, setIsChangeDonorModalOpen] = useState(false);
  const [newDonation, setNewDonation] = useState<Omit<Donation, 'id'>>({ donor: '', date: '', amount: 0, type: '', project: '', receiptImage: null, isAnonymous: false });
  const [selectedDonorId, setSelectedDonorId] = useState<string | null>(null);
  const [selectedDonationForChange, setSelectedDonationForChange] = useState<Donation | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const handleAddNewDonation = () => {
    if (!selectedDonorId || !newDonation.date || newDonation.amount <= 0 || !newDonation.type) {
      alert("Please fill in all required fields");
      return;
    }

    const selectedDonor = donors.find(donor => donor.id.toString() === selectedDonorId);
    if (!selectedDonor) {
      alert("Invalid donor selection");
      return;
    }
    addDonation({
      ...newDonation,
      donor: selectedDonor.id
    });

    setNewDonation({ donor: '', date: '', amount: 0, type: '', project: '', receiptImage: null, isAnonymous: false });
    setSelectedDonorId(null);
  };

  const handleChangeDonor = (donationId: string, newDonorId: string) => {
    const donationToUpdate = donations.find(d => d.id === donationId);
    const newDonor = donors.find(d => d.id.toString() === newDonorId);

    if (donationToUpdate && newDonor) {
      updateDonation({ ...donationToUpdate, donor: newDonor.name });
    }
  };
  
  const donationColumns: Column<Donation>[] = [
    { key: "donor", label: "Donor" },
    { key: "date", label: "Date" },
    { key: "amount", label: "Amount", render: (donation) => `PKR ${donation.amount.toLocaleString()}` },
    { key: "type", label: "Type" },
    { key: "project", label: "Project" },
    {
      key: "actions",
      label: "Actions",
      render: (donation) => (
        <SubmitButton onClick={() => {
          setSelectedDonationForChange(donation);
          setIsChangeDonorModalOpen(true);
        }}>
          Change Donor
        </SubmitButton>
      )
    },
  ];
  const handleUploadSuccess = (url: string) => {
    setNewDonation(prev => ({ ...prev, receiptImage: url }));
    setUploadError(null);
  };

  const handleUploadError = (error: Error) => {
    console.error('Upload error:', error);
    setUploadError('Failed to upload receipt. Please try again.');
  };

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <CustomCard title="Donation Tracking">
        <CustomTable data={donations} columns={donationColumns} />
      </CustomCard>
      <CustomCard title="Donation Entry">
        <form className="flex flex-col gap-4">
          <FormSelect
            label="Donor Name"
            value={selectedDonorId || ''}
            onChange={(value: any) => {
              if (value === 'new-donor') {
                setIsNewDonorModalOpen(true);
              } else {
                setSelectedDonorId(value);
                const selectedDonor = donors.find(donor => donor.id.toString() === value);

                if (selectedDonor) {
                  setNewDonation(prev => ({ ...prev, donor: selectedDonor.id }));
                }
              }
            }}
            options={[
              { value: "new-donor", label: "+ Add New Donor" },
              ...donors.map(donor => ({ value: donor.id.toString(), label: donor.name }))
            ]}
          />
          <FormInput
            label="Donation Date"
            value={newDonation.date}
            onChange={(value: any) => setNewDonation(prev => ({ ...prev, date: value }))}
            type="date"
          />
          <FormInput
            label="Amount"
            value={newDonation.amount.toString()}
            onChange={(value: any) => setNewDonation(prev => ({ ...prev, amount: parseFloat(value) || 0 }))}
            type="number"
          />
          <FormSelect
            label="Donation Type"
            value={newDonation.type}
            onChange={(value: any) => setNewDonation(prev => ({ ...prev, type: value, project: value !== 'project' ? '' : prev.project }))}
            options={DonationTypes}
          />
          {newDonation.type === 'project' && (
            <FormSelect
              label="Project"
              value={newDonation.project}
              onChange={(value: any) => {
                if (value === 'new-project') {
                  setIsNewProjectModalOpen(true);
                } else {
                  setNewDonation(prev => ({ ...prev, project: value }));
                }
              }}
              options={[
                { value: "new-project", label: "+ Add New Project" },
                ...projects.map(project => ({ value: project.id.toString(), label: project.name }))
              ]}
            />
          )}
          <ImageUpload
            onUploadSuccess={handleUploadSuccess}
            onUploadError={handleUploadError}
            type="donation"
          />
          {uploadError && <p className="text-red-500">{uploadError}</p>}
          {newDonation.receiptImage && <p>Receipt uploaded successfully!</p>}
          <FormCheckbox
            label="Make this donation anonymous"
            checked={newDonation.isAnonymous}
            onChange={(checked) => setNewDonation(prev => ({ ...prev, isAnonymous: checked }))}
          />
        </form>
        <div className="flex justify-between mt-4">
          <CancelButton onClick={() => {
            setNewDonation({ donor: '', date: '', amount: 0, type: '', project: '', receiptImage: null, isAnonymous: false });
            setSelectedDonorId(null);
          }}>
            Cancel
          </CancelButton>
          <SubmitButton onClick={handleAddNewDonation}>Save Donation</SubmitButton>
        </div>
      </CustomCard>

      <NewDonorModal
        isOpen={isNewDonorModalOpen}
        onClose={() => setIsNewDonorModalOpen(false)}
        onAddDonor={addDonor}
      />

      <NewProjectModal
        isOpen={isNewProjectModalOpen}
        onClose={() => setIsNewProjectModalOpen(false)}
        onAddProject={addProject}
      />

      <ChangeDonorModal
        isOpen={isChangeDonorModalOpen}
        onClose={() => setIsChangeDonorModalOpen(false)}
        onChangeDonor={handleChangeDonor}
        donors={donors}
        selectedDonation={selectedDonationForChange}
      />
    </div>
  );
};

export default Donations;