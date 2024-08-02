import React, { useState } from 'react';
import { CustomModal } from '../components/CustomModal';
import { FormInput, FormSelect } from '../components/FormComponents';
import { SubmitButton, CancelButton } from '../components/ButtonComponents';
import { Donor, Donation, Project } from '../types';

interface NewDonorModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAddDonor: (donor: Omit<Donor, 'id'>) => void;
}

export const NewDonorModal: React.FC<NewDonorModalProps> = ({ isOpen, onClose, onAddDonor }) => {
    const [newDonor, setNewDonor] = useState<Omit<Donor, 'id'>>({ name: '', number: '', address: '' });

    return (
        <CustomModal 
            isOpen={isOpen}
            onClose={onClose}
            title="Add New Donor"
            footer={
                <div className="flex justify-end mt-4">
                    <CancelButton onClick={onClose}>Cancel</CancelButton>
                    <SubmitButton onClick={() => {
                        onAddDonor(newDonor);
                        onClose();
                    }}>Add Donor</SubmitButton>
                </div>  
            }>
            <FormInput
                label="Name"
                value={newDonor.name}
                onChange={(value: any) => setNewDonor({ ...newDonor, name: value })}
            />
            <FormInput
                label="Phone Number"
                value={newDonor.number}
                onChange={(value: any) => setNewDonor({ ...newDonor, number: value })}
            />
            <FormInput
                label="Address"
                value={newDonor.address}
                onChange={(value: any) => setNewDonor({ ...newDonor, address: value })}
            />

        </CustomModal>
    );
};

interface NewProjectModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAddProject: (project: Omit<Project, 'id'>) => void;
}

export const NewProjectModal: React.FC<NewProjectModalProps> = ({ isOpen, onClose, onAddProject }) => {
    const [newProject, setNewProject] = useState<Omit<Project, 'id'>>({ name: '', budget: 0, startDate: '', endDate: '', status: 'Running' });

    return (
        <CustomModal 
            isOpen={isOpen}
            onClose={onClose}
            title="Add New Project"
            footer={
                <div className="flex justify-end mt-4">
                    <CancelButton onClick={onClose}>Cancel</CancelButton>
                    <SubmitButton onClick={() => {
                        onAddProject(newProject);
                        onClose();
                    }}>Add Project</SubmitButton>
                </div>
            }>
            <FormInput
                label="Project Name"
                value={newProject.name}
                onChange={(value: any) => setNewProject({ ...newProject, name: value })}
            />
            <FormInput
                label="Budget"
                type="number"
                value={newProject.budget.toString()}
                onChange={(value: any) => setNewProject({ ...newProject, budget: parseFloat(value) || 0 })}
            />
            <FormInput
                label="Start Date"
                type="date"
                value={newProject.startDate}
                onChange={(value: any) => setNewProject({ ...newProject, startDate: value })}
            />
            <FormInput
                label="End Date"
                type="date"
                value={newProject.endDate}
                onChange={(value: any) => setNewProject({ ...newProject, endDate: value })}
            />
        </CustomModal>
    );
};

interface ChangeDonorModalProps {
    isOpen: boolean;
    onClose: () => void;
    onChangeDonor: (donationId: string, newDonorId: string) => void;
    donors: Donor[];
    selectedDonation: Donation | null;
}

export const ChangeDonorModal: React.FC<ChangeDonorModalProps> = ({ isOpen, onClose, onChangeDonor, donors, selectedDonation }) => {
    const [newDonorId, setNewDonorId] = useState<string>('');

    return (
        <CustomModal
            isOpen={isOpen}
            onClose={onClose}
            title="Change Donor"
            footer={
                <div className="flex justify-end mt-4">
                    <CancelButton onClick={onClose}>Cancel</CancelButton>
                    <SubmitButton onClick={() => {
                        if (selectedDonation && newDonorId) {
                            onChangeDonor(selectedDonation.id, newDonorId);
                            onClose();
                        }
                    }}>Save Changes</SubmitButton>
                </div>
            }>
            <FormSelect
                label="Select New Donor"
                value={newDonorId}
                onChange={setNewDonorId}
                options={donors.map(donor => ({ value: donor.id.toString(), label: donor.name }))}
            />
        </CustomModal>
    );
};