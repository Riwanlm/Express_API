import {json, Router, urlencoded} from 'express';
import { logger } from '../logger.middlewares';
import { employeeControllerFactory } from './employee.controller';
import { employeeRepositoryFactory } from './employee.repository';
import { employeeServiceFactory } from './employee.service';

export const employeeRouter = Router();
const jsonParser = json();
const bodyParser = urlencoded();

const employeeRepository = employeeRepositoryFactory();
const employeeService = employeeServiceFactory(employeeRepository);
const employeeController = employeeControllerFactory(employeeService);

//localhost:3000/employees?department=IT
employeeRouter.get("/", employeeController.getAllEmployees);

employeeRouter.get("/:employeeId", employeeController.getEmployeeById);

employeeRouter.delete("/:employeeId", logger, employeeController.deleteEmployee);

employeeRouter.post("/", bodyParser, jsonParser, employeeController.createEmployee);
