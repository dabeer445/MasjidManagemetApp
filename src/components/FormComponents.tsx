import React from 'react';
import { Input, Select, SelectItem, Checkbox, Textarea } from '@nextui-org/react';


interface FormInputProps {
  label: string;
  value?: string | number;
  onChange: (value: string | File | null) => void;
  type?: string;
  placeholder?: string;
  className?: string;
}

export const FormInput: React.FC<FormInputProps> = ({
  label,
  value,
  onChange,
  type = 'text',
  placeholder,
  className,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (type === 'file') {
      const file = e.target.files ? e.target.files[0] : null;
      onChange(file);
    } else {
      onChange(e.target.value);
    }
  };

  return (
    <Input
      label={label}
      value={type !== 'file' ? value?.toString() : undefined}
      onChange={handleChange}
      type={type}
      accept={type == 'file' ? "image/*" : undefined}
      placeholder={placeholder}
      className={className}
    />
  );
};
interface FormTextareaProps {
  label: string;
  value: string | number;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export const FormTextarea: React.FC<FormTextareaProps> = ({
  label,
  value,
  onChange,
  placeholder,
  className,
}) => {
  return (
    <Textarea
      label={label}
      value={value.toString()}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className={className}
    />
  );
};


interface FormSelectProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  placeholder?: string;
  className?: string;
}

export const FormSelect: React.FC<FormSelectProps> = ({
  label,
  value,
  onChange,
  options,
  placeholder,
  className,
}) => {
  return (
    <Select
      label={label}
      selectedKeys={value ? [value] : []}
      onSelectionChange={(keys) => onChange(Array.from(keys)[0] as string)}
      placeholder={placeholder}
      className={className}
    >
      {options.map((option) => (
        <SelectItem key={option.value} value={option.value}>
          {option.label}
        </SelectItem>
      ))}
    </Select>
  );
};

interface FormCheckboxProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  className?: string;
}

export const FormCheckbox: React.FC<FormCheckboxProps> = ({
  label,
  checked,
  onChange,
  className,
}) => {
  return (
    <Checkbox
      isSelected={checked}
      onValueChange={onChange}
      className={className}
    >
      {label}
    </Checkbox>
  );
};
