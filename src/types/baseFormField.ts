import { Control } from "react-hook-form";

export interface IBaseFormField {
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>;
  label?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  errors?: any;
}
