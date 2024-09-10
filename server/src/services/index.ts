import config, { type ConfigService } from './config';
import validation, { type ValidationService } from './validation';

export type DoNotDeleteServices = {
  config: ConfigService,
  validation: ValidationService,
};

export default {
  config,
  validation,
};
