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
  error?: string;
  readOnly?: boolean;
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
  error,
  readOnly,
}: FormInputProps) {
  // Kiểm tra xem có lỗi hay không để render UI
  const hasError = !!error;
  return (
    <div className="group flex flex-col gap-1.5">
      <label
        className={`block text-[0.7rem] font-bold uppercase tracking-wider px-1 transition-colors ${
          hasError ? "text-error" : "text-on-surface-variant"
        }`}
      >
        {label}{" "}
        {optional && (
          <span className="text-[0.6rem] font-normal lowercase">
            (Optional)
          </span>
        )}
      </label>

      <div className="relative flex items-center">
        <Icon
          className={`w-4 h-4 absolute left-4 z-10 transition-colors 
              ${hasError ? "text-error" : "text-on-surface-variant group-focus-within:text-primary"} 
              ${isTextArea ? "top-4" : ""}`}
        />

        {isTextArea ? (
          <textarea
            name={name}
            placeholder={placeholder}
            defaultValue={defaultValue}
            required={required}
            readOnly={readOnly}
            rows={2}
            className={`form-input pl-11 resize-none h-auto ${
              hasError
                ? "border-error bg-error-container/20 focus:border-error"
                : ""
            }`}
          />
        ) : (
          <input
            type={type}
            name={name}
            placeholder={placeholder}
            defaultValue={defaultValue}
            required={required}
            readOnly={readOnly}
            className={`form-input pl-11 ${
              hasError
                ? "border-error bg-error-container/20 focus:border-error"
                : ""
            }`}
          />
        )}
      </div>
      {/* Hiển thị thông báo lỗi */}
      {hasError && (
        <span className="text-[0.65rem] font-semibold text-error px-1 mt-1 animate-in fade-in slide-in-from-top-1">
          {error}
        </span>
      )}
    </div>
  );
}
