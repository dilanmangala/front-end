export interface Department {
    id:string;
    name:string;
    description:string;
    chileds?:Department[];
    // chileds?:Department[];
}
