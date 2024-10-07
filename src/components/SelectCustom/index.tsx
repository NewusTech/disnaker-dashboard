import * as React from "react";

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

interface SelectProps {
    label: string;
    options: { label: string; value: string | number }[];
    placeholder: string;
    value: string | undefined;
    onChange: (value: string) => void;
    width?: string; // Optional prop to control width (default to 180px)
}

export const CustomSelect: React.FC<SelectProps> = ({
    label,
    options,
    placeholder,
    value,
    onChange,
    width = "w-[180px]",
}) => {
    return (
        <Select onValueChange={onChange}>
            <SelectTrigger className={width}>
                <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent className="bg-white">
                <SelectGroup>
                    <SelectLabel>{label}</SelectLabel>
                    {options.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                            {option.label}
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    );
};
