"use client";

import {
  BadgeInfo,
  CheckCircle2,
  ChevronDown,
  DollarSign,
  Hash,
  Text,
  ToggleLeft,
  ToggleRight,
  X,
} from "lucide-react";
import { FormEvent } from "react";
import FormInput from "../atoms/FormInput";
import { Provider, Sim, SimInput } from "@admin.features/sims/types/sim-types";

interface SimModalProps {
  isOpen: boolean;
  onClose: () => void;
  isLoading: boolean;
  currentSim: Sim | null;
  providers: Provider[];
  onSubmit: (data: SimInput) => Promise<boolean>;
  getFieldError: (field: string) => string | undefined;
}

const formatPriceForInput = (value?: number) =>
  typeof value === "number" ? String(value) : "";

export default function SimModal({
  isOpen,
  isLoading,
  currentSim,
  providers,
  onSubmit,
  onClose,
  getFieldError,
}: SimModalProps) {
  if (!isOpen) return null;

  const isEditMode = !!currentSim;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isLoading) return;

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    const payload: SimInput = {
      sim_number: data.sim_number?.toString().trim(),
      price: data.price?.toString().trim(),
      type: data.type?.toString().trim(),
      description: data.description?.toString().trim(),
      provider_id: data.provider_id?.toString().trim(),
      is_active: data.is_active === "on" || data.is_active === "true",
    };

    await onSubmit(payload);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-md">
      <div className="bg-white dark:bg-slate-900 w-full max-w-2xl rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] relative flex flex-col overflow-hidden max-h-[90vh] border border-slate-200/50">
        <div className="px-8 pt-8 pb-4 flex justify-between items-start shrink-0">
          <div>
            <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              {isEditMode ? `Edit SIM: ${currentSim.sim_number}` : "New SIM"}
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              {isEditMode
                ? "Update SIM information and provider."
                : "Create a new SIM record with provider mapping."}
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

        <form
          onSubmit={handleSubmit}
          className="px-8 pb-8 space-y-5 overflow-y-auto custom-scrollbar"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <FormInput
              label="SIM Number"
              name="sim_number"
              icon={Hash}
              defaultValue={currentSim?.sim_number}
              placeholder="098.123.4567"
              required
              error={getFieldError("sim_number")}
            />
            <FormInput
              label="Price"
              name="price"
              icon={DollarSign}
              defaultValue={formatPriceForInput(currentSim?.price)}
              placeholder="12000000"
              required
              error={getFieldError("price")}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <FormInput
              label="Type"
              name="type"
              icon={BadgeInfo}
              defaultValue={currentSim?.type}
              placeholder="Tứ quý, tam hoa..."
              required
              error={getFieldError("type")}
            />
            <div className="flex flex-col gap-1.5">
              <label className="block text-[0.7rem] font-bold uppercase tracking-wider px-1 text-slate-500">
                Provider
              </label>
              <div
                className={`relative flex items-center bg-slate-50 rounded-xl border-b-2 transition-all px-3.5 ${
                  getFieldError("provider_id")
                    ? "border-red-500 bg-red-50"
                    : "border-slate-200 focus-within:border-indigo-600"
                }`}
              >
                <Text
                  className={`w-5 h-5 mr-3 ${getFieldError("provider_id") ? "text-red-500" : "text-indigo-500"}`}
                />
                <select
                  name="provider_id"
                  defaultValue={currentSim?.provider_id || ""}
                  className="w-full bg-transparent border-none focus:ring-0 py-3 text-slate-900 font-medium text-sm appearance-none cursor-pointer"
                >
                  <option value="">Choose provider</option>
                  {providers.map((provider) => (
                    <option
                      key={provider.provider_id}
                      value={provider.provider_id}
                    >
                      {provider.name}
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-4 h-4 ml-2 text-slate-400" />
              </div>
              {getFieldError("provider_id") && (
                <span className="text-[11px] font-semibold text-red-500 px-1">
                  {getFieldError("provider_id")}
                </span>
              )}
            </div>
          </div>

          <FormInput
            label="Description"
            name="description"
            icon={Text}
            isTextArea
            defaultValue={currentSim?.description}
            placeholder="Notes about this SIM..."
            optional
            error={getFieldError("description")}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <div
                className={`relative flex items-center bg-slate-50 rounded-xl border-b-2 transition-all px-3.5 ${
                  getFieldError("is_active")
                    ? "border-red-500 bg-red-50"
                    : "border-slate-200 focus-within:border-indigo-600"
                }`}
              >
                {currentSim?.is_active ? (
                  <ToggleRight className="w-5 h-5 mr-3 text-emerald-500" />
                ) : (
                  <ToggleLeft className="w-5 h-5 mr-3 text-slate-400" />
                )}
                <div className="w-full py-3 flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-medium text-slate-900">
                      Is Active
                    </p>
                    <p className="text-xs text-slate-500">
                      Enable this SIM in the storefront.
                    </p>
                  </div>
                  <label className="inline-flex items-center cursor-pointer">
                    <input
                      name="is_active"
                      type="checkbox"
                      defaultChecked={currentSim?.is_active ?? true}
                      className="sr-only peer"
                    />
                    <div className="relative w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-indigo-500 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:inset-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600" />
                  </label>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-4">
              <CheckCircle2 className="w-5 h-5 text-emerald-500" />
              <div>
                <p className="text-sm font-medium text-slate-900">Metadata</p>
                <p className="text-xs text-slate-500">
                  Created and updated timestamps will be set automatically.
                </p>
              </div>
            </div>
          </div>

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
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <svg
                    className="animate-spin h-4 w-4 text-white"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                      strokeDasharray="60"
                      strokeDashoffset="20"
                    />
                  </svg>
                  {isEditMode ? "Updating..." : "Creating..."}
                </span>
              ) : (
                <>{isEditMode ? "Update Changes" : "Create SIM"}</>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
