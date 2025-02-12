import mongoose from 'mongoose';
import { Department, Level, Employee } from './employee.interface';
import { EmployeeRepository } from './employee.repository.interface';

export interface EmployeeService {
    getEmployees: (department?: string) => Promise<Employee[]>;
    getEmployee: (employeeId: string) => Promise<Employee | null>;
    deleteEmployee: (employeeId: string) => Promise<void>;
    createEmployee: (employeeData: {
        department: Department;
        name: string;
        level: Level;
    }, creatorId: string) => Promise<Employee | null>;
}

export function employeeServiceFactory(employeeRepository: EmployeeRepository): EmployeeService {
    return {
        getEmployees: async (department?: string)=>{
            return await employeeRepository.getAll(department);
        },
        getEmployee: async(employeeId: string)=>{
            if (mongoose.Types.ObjectId.isValid(employeeId)) {
            }
            const employee = await employeeRepository.getById(employeeId);
            return employee;
        },
        deleteEmployee: async (employeeId: string)=>{
            await employeeRepository.delete(employeeId);
        },
        createEmployee: async (employeeData: {department: Department, name: string, level: Level}, creatorId: string)=>{
            console.log();
            const { department, name, level } = employeeData;
            const employee = { department, name, level };
            const newEmployee = await employeeRepository.create(employee, creatorId);
            return newEmployee;
        },
    }
}