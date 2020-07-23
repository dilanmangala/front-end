import {Permission} from './permission';
import {Restriction} from './restriction';

export interface CreateUserRoleRequest {
  name: string;
  description: string;
  modifiedReason?: any;
  permission: Permission[];
  restrictionDtos: Restriction[];
}
