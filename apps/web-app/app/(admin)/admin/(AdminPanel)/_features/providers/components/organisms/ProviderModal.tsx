"use client";

import { FormEvent } from "react";
import { Building2, X } from "lucide-react";
import FormInput from "@admin.features/sims/components/atoms/FormInput";
import { Provider, ProviderInput } from "@admin.features/providers/types/provider-types";

interface ProviderModalProps {
  isOpen: boolean;
  onClose: () => void;
  isLoading: boolean;
  currentProvider: Provider | null;
  onSubmit: (data: ProviderInput) => Promise<boolean>;
  getFieldError: (field: string) => string | undefined;
}

export default function ProviderModal({
  isOpen,
  isLoading,
  currentProvider,
  onSubmit,
  onClose,
  getFieldError,
}: ProviderModalProps) {
  if (!isOpen) return null;

  const isEditMode = !!currentProvider;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isLoading) return;

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    await onSubmit({
      name: data.name?.toString().trim(),
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-md">
      <div className="bg-white dark:bg-slate-900 w-full max-w-xl rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] relative flex flex-col overflow-hidden max-h-[90vh] border border-slate-200/50">
        <div className="px-8 pt-8 pb-4 flex justify-between items-start shrink-0">
          <div>
            <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              {isEditMode ? `Edit Provider: ${currentProvider.name}` : "New Provider"}
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              {isEditMode ? "Update provider details." : "Create a new network provider."}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="px-8 pb-8 space-y-5 overflow-y-auto custom-scrollbar">
          <FormInput
            label="Provider Name"
            name="name"
            icon={Building2}
            defaultValue={currentProvider?.name}
            placeholder="Viettel"
            required
            error={getFieldError("name")}
          />

          <div className="flex flex-col-reverse md:flex-row gap-3 pt-4 shrink-0">
            <button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className={`btn-primary flex-[1.5] ${isLoading ? "opacity-70 cursor-not-allowed" : ""}`}
            >
              Cancel
            </button>
            <button
              disabled={isLoading}
              type="submit"
              className={`btn-primary flex-[1.5] ${isLoading ? "opacity-70 cursor-not-allowed" : ""}`}
            >
              {isEditMode ? "Update Provider" : "Create Provider"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
