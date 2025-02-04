import validation, { type ValidationService } from './validation';

export type DoNotDeleteServices = {
  validation: ValidationService;
};

export default {
  validation,
};
