import React, { useState } from 'react';
import { CustomModal } from '../components/CustomModal';
import { FormInput, FormSelect } from '../components/FormComponents';
import { SubmitButton, CancelButton } from '../components/ButtonComponents';
import { Expense, Project, StaffMember } from '../types';

interface ViewReceiptModalProps {
  isOpen: boolean;
  onClose: () => void;
  expense: Expense | null;
}

export const ViewReceiptModal: React.FC<ViewReceiptModalProps> = ({
  isOpen,
  onClose,
  expense
}) => {
  if (!expense) return null;

  return (
    <CustomModal 
      isOpen={isOpen}
      onClose={onClose}
      title="View Receipt" 
      footer={
        <div className="flex justify-end mt-4">
          <CancelButton onClick={onClose}>Close</CancelButton>
        </div>
      }>
      {expense.receiptFile ? (
        <img src={expense.receiptFile} alt="Receipt" className="max-w-full h-auto" />
      ) : (
        <p>No receipt available for this expense.</p>
      )}

    </CustomModal>
  );
};
