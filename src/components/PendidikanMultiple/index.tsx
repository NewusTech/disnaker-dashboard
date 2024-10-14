import React from 'react';
import Select, { MultiValue } from 'react-select';

// Define the structure of the options for Kecamatan
interface PendidikanOption {
    id: number;
    level: string;
}

// Define the props for the SelectMultiplePendidikan component
interface SelectMultiplePendidikanProps {
    placeholder?: string;
    pendidikanOptions: PendidikanOption[];
    selectedPendidikan: PendidikanOption[];
    onChange: (selected: PendidikanOption[]) => void;
}

// Component implementation
const SelectMultiplePendidikan: React.FC<SelectMultiplePendidikanProps> = ({
    pendidikanOptions,
    placeholder = "Pilih Kecamatan",
    selectedPendidikan,
    onChange,
}) => {
    // Handle changes in selection
    const handleSelectChange = (selected: MultiValue<{ value: number; label: string; }>) => {
        const selectedPendidikanList = selected
            ? pendidikanOptions.filter((pendidikan) => selected.some((s) => s.value === pendidikan.id))
            : [];
        onChange(selectedPendidikanList);
    };

    // Map options to react-select format
    const options = pendidikanOptions.map((pendidikan) => ({
        value: pendidikan.id,
        label: pendidikan.level,
    }));

    // Map selected options to react-select format
    const selectedOptions = selectedPendidikan.map((pendidikan) => ({
        value: pendidikan.id,
        label: pendidikan.level,
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

export default SelectMultiplePendidikan;
