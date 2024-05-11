import React from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { UseFormReturn } from "react-hook-form";

interface FormInputProps {
  name: string;
  form: UseFormReturn<any>;
  label?: string;
  placeholder?: string;
  type: "email" | "password" | "text" | "number";
}

const FormInput = ({
  form,
  name,
  type,
  label,
  placeholder,
}: FormInputProps) => {
  return (
    <FormField
      name={name}
      control={form.control}
      render={({ field }) => {
        return (
          <FormItem>
            <FormLabel>{label}</FormLabel>
            <FormControl>
              <Input placeholder={placeholder} type={type} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
};

export default FormInput;
