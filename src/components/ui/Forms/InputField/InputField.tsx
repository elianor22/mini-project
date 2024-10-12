/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  FormControl,
  FormHelperText,
  FormLabel,
  OutlinedInput,
  OutlinedInputProps,
} from "@mui/material";
import { FC } from "react";
import { Control, Controller } from "react-hook-form";

interface IInputField extends OutlinedInputProps {
  name: string;
  control: Control<any>;
  label?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  errors: any;
}

const InputField: FC<IInputField> = ({
  name,
  control,
  label,
  errors,
  ...props
}) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <FormControl
          fullWidth
          sx={{
            mb: 2,
          }}
        >
          <FormLabel htmlFor={name}>{label}</FormLabel>
          <OutlinedInput
            {...field}
            id={name}
            error={!!errors[name]}
            size="small"
            fullWidth
            {...props}
          />
          {!!errors && (
            <FormHelperText error={!!errors[name]}>
              {!!errors[name] && errors[name].message}
            </FormHelperText>
          )}
        </FormControl>
      )}
    />
  );
};
export default InputField;
