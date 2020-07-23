import { AdminUser } from "./admin-user";
import {UserRole} from './user-role';
import {UserDepartment} from './department';
export interface CreateUserRequest
{
   adminUserDtos :AdminUser [];
   departmentDto : UserDepartment;
   userRoleDto : UserRole;
}
