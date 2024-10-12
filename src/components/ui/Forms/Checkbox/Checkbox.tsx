import { IBaseFormField } from "@/types/baseFormField";
import {
  CheckboxProps,
  FormControlLabel,
  Checkbox as MuiCheckbox,
} from "@mui/material";
import { FC } from "react";
import { Controller } from "react-hook-form";

interface ICheckbox extends IBaseFormField, CheckboxProps {
  name: string;
}

const Checkbox: FC<ICheckbox> = ({ name, control, errors, label }) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        return (
          <FormControlLabel
            control={<MuiCheckbox checked={field.value} {...field} />}
            label={label}
          />
        );
      }}
    />
  );
};
export default Checkbox;
