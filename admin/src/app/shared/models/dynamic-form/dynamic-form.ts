import {Validations} from './validations';
import { ErrorMessages } from './error-messages';
export interface DynamicForm  {
  formControlName: string;
  readOnly: boolean;
  label: string;
  controlType: string;
  inputType: string;
  classes: string;
  data: string;
  default: string;
  validations: Validations;
   errorMessages: ErrorMessages;
}
