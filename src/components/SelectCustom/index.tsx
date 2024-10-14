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
    label?: string;
    options: { label: string; value: string | number }[];
    placeholder: string;
    value?: string | undefined | number | null | any;
    onChange: (value: string | undefined | number | null | any) => void;
    width?: string; // Optional prop to control width (default to 180px)
}

export const CustomSelect: React.FC<SelectProps> = ({
    label,
    options,
    placeholder,
    value,
    onChange,
    width = "w-[180px",
}) => {
    return (
        <Select onValueChange={onChange} value={value}>
            <SelectTrigger className={`rounded-full ${width}`}>
                <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent className="bg-white">
                <SelectGroup>
                    <SelectLabel>{label}</SelectLabel>
                    {options?.map((option) => (
                        <SelectItem key={option.value} value={String(option.value)}>
                            {option.label}
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    );
};
