import { InputType } from "./enum";

export interface InputField {
    type: InputType;
    label: string;
    fieldTitle: string;
    value: any;
    options?: string[]; // Only for 'select' type
  }