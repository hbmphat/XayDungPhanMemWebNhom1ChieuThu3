import { Rules, validateRunner, ValidationRuleFn } from "@shared/utils/validation/rules";
import { ProviderInput } from "@admin.features/providers/types/provider-types";

const commonRules: Partial<Record<keyof ProviderInput, ValidationRuleFn[]>> = {
  name: [Rules.minLength(2), Rules.maxLength(50)],
};

const combine = (field: keyof ProviderInput, extraRules: ValidationRuleFn[]) => {
  return [...extraRules, ...(commonRules[field] || [])];
};

export const validateProviderCreate = (data: ProviderInput) => {
  const schema: Partial<Record<keyof ProviderInput, ValidationRuleFn[]>> = {
    name: combine("name", [Rules.required()]),
  };

  return validateRunner(schema, data);
};

export const validateProviderUpdate = (data: ProviderInput) => {
  const schema: Partial<Record<keyof ProviderInput, ValidationRuleFn[]>> = {
    ...commonRules,
  };

  return validateRunner(schema, data);
};
