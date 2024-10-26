import { Employee } from "./employee.interface";

export interface EmployeeRepository {
    getAll: (department?: string) => Promise<Employee[]>;
    getById: (userId: string) => Promise<Employee | null>;
    delete: (userId: string) => Promise<void>;
    create: (employee: Omit<Employee, "_id">, creatorId: string) => Promise<Employee>;
}