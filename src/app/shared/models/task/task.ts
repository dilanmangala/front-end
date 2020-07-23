export interface Task {
  taskId: number;
  status: string;
  addedDate: string;
  completedDate: string;
  recordCount: number;
  successCount: number;
  errorCount: number;
  failedCount: number;
  description: string;
  process_name: string;
  isExpanded?: boolean;
}
