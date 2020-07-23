import {DepartmentResponse} from '../../models/department';

export interface TvItem {
  text: String;
  value: DepartmentResponse;
  children?: TvItem[];
}
