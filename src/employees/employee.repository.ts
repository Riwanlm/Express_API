import { Employee } from './employee.interface';
import { EmployeeModel } from './employee.model';
import { EmployeeRepository } from './employee.repository.interface';

export function employeeRepositoryFactory(): EmployeeRepository {
    return {
        getAll: async (department?: string) => {
            if (department) {
                return await EmployeeModel.find({ department });
            }
            return await EmployeeModel.find();
        },
        getById: async (EmployeeId: string) => {
            return await EmployeeModel.findById(EmployeeId);
        },
        delete: async (EmployeeId: string) => {
            await EmployeeModel.deleteOne({ _id: EmployeeId });
        },
        create: async (employee: Omit<Employee, "_id">, creatorId: string) => {
            return await EmployeeModel.create({...employee, createdBy: creatorId});
        },
    };
}