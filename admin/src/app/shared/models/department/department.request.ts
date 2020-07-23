import {Department} from './department';
export interface DepartmentRequest {
    name: string;
    modifiedReason?: any;
    permission: Department[];
}
