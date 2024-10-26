import express, {Request, Response, Router} from 'express';
import { employeeRouter } from './employees/employee.routes';
import { errorHandler } from './error.middleware';
import { connectDb } from './db';
import { authRouter } from './authentication/auth.routes';
import { authMiddleware } from './authentication/auth.middleware';

console.log("ENV", process.env.NODE_ENV);

const main = async (config: { PORT: number, DB_URI: string }) => {
    const { PORT, DB_URI } = config;

    try {
        await connectDb(DB_URI);
    } catch (error) {
        console.log('Error during connection to DB');
        console.log(error);
        process.exit(1);
    }
    
    const app = express();

    // app.use(logger);
    app.use("/employees", authMiddleware, employeeRouter);
    app.use("/auth", authRouter);
    
    app.use("/", (req:Request, res:Response)=> {
        res.end("OK");
    });
    
    app.use(errorHandler);
    
    app.listen(PORT, ()=> {
        console.log("Server started and listen on PORT", PORT);
    });
}

const PORT = 3000;
const DB_URI = 'mongodb://127.0.0.1:27017/test_db';
const config = { PORT, DB_URI}

main(config).catch(err => {
    console.log("Error during boostraping");
    console.log(err);
    process.exit(1);
});