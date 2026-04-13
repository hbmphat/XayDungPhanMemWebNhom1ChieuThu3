import { Rules, validateRunner, ValidationRuleFn } from "@shared/utils/validation/rules";
import { SimInput } from "@admin.features/sims/types/sim-types";

const PRICE_PATTERN = /^(?:\d+)(?:\.\d{1,2})?$/;

const priceRule: ValidationRuleFn = (value) => {
  const raw = String(value ?? "").trim();

  if (!raw) {
    return "This field is required.";
  }

  if (!PRICE_PATTERN.test(raw)) {
    return "Price must be a valid decimal number.";
  }

  return Number(raw) > 0 || "Price must be greater than 0.";
};

export const validateSimCreate = (data: SimInput) => {
  const schema: Partial<Record<keyof SimInput, ValidationRuleFn[]>> = {
    sim_number: [Rules.required(), Rules.minLength(6), Rules.maxLength(20)],
    price: [priceRule],
    type: [Rules.required(), Rules.minLength(2), Rules.maxLength(50)],
    description: [Rules.maxLength(500)],
    provider_id: [Rules.required()],
  };

  return validateRunner(schema, data);
};

export const validateSimUpdate = (data: SimInput) => {
  const schema: Partial<Record<keyof SimInput, ValidationRuleFn[]>> = {
    sim_number: [Rules.minLength(6), Rules.maxLength(20)],
    price: [priceRule],
    type: [Rules.minLength(2), Rules.maxLength(50)],
    description: [Rules.maxLength(500)],
  };

  return validateRunner(schema, data);
};
