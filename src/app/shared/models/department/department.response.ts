export interface DepartmentResponse{
    id: string;
    name: string;
    description: string;
    scopeParamRequired: boolean;
    composite: boolean;
    clientRole: boolean;
    containerId: string;
}