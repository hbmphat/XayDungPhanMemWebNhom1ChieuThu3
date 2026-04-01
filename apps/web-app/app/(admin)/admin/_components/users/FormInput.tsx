import { LucideIcon } from "lucide-react";

interface FormInputProps {
  label: string;
  name: string;
  icon: LucideIcon;
  placeholder?: string;
  type?: string;
  optional?: boolean;
  isTextArea?: boolean;
  defaultValue?: string;
  required?: boolean;
  disabled?: boolean;
}

export default function FormInput({
  label,
  name,
  icon: Icon,
  placeholder,
  type = "text",
  optional,
  isTextArea,
  defaultValue,
  required,
  disabled,
}: FormInputProps) {
  return (
    <div className="group flex flex-col gap-1.5">
      <label className="block text-[0.7rem] font-bold uppercase tracking-wider text-on-surface-variant px-1">
        {label}{" "}
        {optional && (
          <span className="text-[0.6rem] font-normal lowercase">
            (Optional)
          </span>
        )}
      </label>

      <div className="relative flex items-center">
        <Icon
          className={`w-4 h-4 absolute left-4 z-10 text-on-surface-variant transition-colors 
          group-focus-within:text-primary ${isTextArea ? "top-4" : ""}`}
        />

        {isTextArea ? (
          <textarea
            name={name}
            placeholder={placeholder}
            defaultValue={defaultValue}
            disabled={disabled}
            required={required}
            rows={2}
            className="form-input pl-11 resize-none h-auto"
          />
        ) : (
          <input
            type={type}
            name={name}
            placeholder={placeholder}
            defaultValue={defaultValue}
            disabled={disabled}
            required={required}
            className="form-input pl-11"
          />
        )}
      </div>
    </div>
  );
}
