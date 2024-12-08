import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Control, FieldValues, Path } from "react-hook-form";

interface FormFieldWrapperProps<T extends FieldValues> {
  name: Path<T>;
  label: string;
  placeholder?: string;
  control: Control<T>;
  type?: string;
  accept?: string;
}

export const FormFieldWrapper = <T extends FieldValues>({
  name,
  label,
  placeholder,
  control,
  type = "text",
  accept,
}: FormFieldWrapperProps<T>) => (
  <FormField
    control={control}
    name={name}
    render={({ field }) => (
      <FormItem>
        <FormLabel>{label}</FormLabel>
        <FormControl>
          <Input
            type={type}
            placeholder={placeholder}
            accept={accept}
            {...field}
            // Remove `value` when `type` is `file`
            value={type === "file" ? undefined : field.value}
            onChange={(e) => {
              if (type === "file") {
                const file = e.target.files?.[0];
                field.onChange(file); // Update the field value with the selected file
              } else {
                field.onChange(e); // Use the default onChange for other input types
              }
            }}
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
);
