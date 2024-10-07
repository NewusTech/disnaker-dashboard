// components/SelectSkill.tsx
import React from 'react';
import Select from 'react-select';

interface SkillOption {
  id: number;
  nama: string;
}

interface SelectSkillProps {
  skillOptions: SkillOption[];
  selectedSkill: SkillOption | null;
  onChange: (selected: SkillOption | null) => void;
}

const SelectSkill: React.FC<SelectSkillProps> = ({
  skillOptions,
  selectedSkill,
  onChange,
}) => {
  // Map options to react-select format
  const options = skillOptions.map((skill) => ({
    value: skill.id,
    label: skill.nama,
  }));

  // Find selected option by matching id
  const selectedOption = selectedSkill
    ? { value: selectedSkill.id, label: selectedSkill.nama }
    : null;

  return (
    <Select
      options={options}
      value={selectedOption}
      onChange={(selectedOption) =>
        onChange(
          skillOptions.find((skill) => skill.id === selectedOption?.value) || null
        )
      }
      className="w-full"
      classNamePrefix="react-select"
      placeholder="Pilih Skill"
    />
  );
};

export default SelectSkill;
