import { DetailResponse } from "./detail-response";

export interface TaskDetail {
   taskId: Number;
   status: string;
   completedDate: string;
   detailResponseDtos: DetailResponse[];
}
