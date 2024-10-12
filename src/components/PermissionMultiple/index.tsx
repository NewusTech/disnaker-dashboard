import React from 'react';
import Select, { MultiValue } from 'react-select';

// Define the structure of the options for Kecamatan
interface PermissionOption {
  id: number;
  name: string;
}

// Define the props for the SelectMultiplePermission component
interface SelectMultiplePermissionProps {
  placeholder?: string;
  permissionOptions: PermissionOption[];
  selectedPermission: PermissionOption[];
  onChange: (selected: PermissionOption[]) => void;
}

// Component implementation
const SelectMultiplePermission: React.FC<SelectMultiplePermissionProps> = ({
  permissionOptions,
  placeholder="Pilih Kecamatan",
  selectedPermission,
  onChange,
}) => {
  // Handle changes in selection
  const handleSelectChange = (selected: MultiValue<{ value: number; label: string; }>) => {
    const selectedPermissionList = selected
      ? permissionOptions.filter((permission) => selected.some((s) => s.value === permission.id))
      : [];
    onChange(selectedPermissionList);
  };

  // Map options to react-select format
  const options = permissionOptions.map((permission) => ({
    value: permission.id,
    label: permission.name,
  }));

  // Map selected options to react-select format
  const selectedOptions = selectedPermission.map((permission) => ({
    value: permission.id,
    label: permission.name,
  }));

  return (
    <Select
      isMulti
      options={options}
      value={selectedOptions}
      onChange={handleSelectChange}
      className="w-full"
      classNamePrefix="react-select"
      placeholder={placeholder}
    />
  );
};

export default SelectMultiplePermission;
