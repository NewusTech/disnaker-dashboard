import React from 'react';
import Select, { MultiValue } from 'react-select';

// Define the structure of the options for Kecamatan
interface SkillOption {
  id: number;
  name: string;
}

// Define the props for the SelectMultipleSkill component
interface SelectMultipleSkillProps {
  placeholder?: string;
  skillOptions: SkillOption[];
  selectedSkill: SkillOption[];
  onChange: (selected: SkillOption[]) => void;
}

// Component implementation
const SelectMultipleSkill: React.FC<SelectMultipleSkillProps> = ({
  skillOptions,
  placeholder="Pilih Kecamatan",
  selectedSkill,
  onChange,
}) => {
  // Handle changes in selection
  const handleSelectChange = (selected: MultiValue<{ value: number; label: string; }>) => {
    const selectedSkillList = selected
      ? skillOptions.filter((skill) => selected.some((s) => s.value === skill.id))
      : [];
    onChange(selectedSkillList);
  };

  // Map options to react-select format
  const options = skillOptions.map((skill) => ({
    value: skill.id,
    label: skill.name,
  }));

  // Map selected options to react-select format
  const selectedOptions = selectedSkill.map((skill) => ({
    value: skill.id,
    label: skill.name,
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

export default SelectMultipleSkill;
