import { Types } from "mongoose";

export interface User {
    _id: Types.ObjectId;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    createdOn?: string | Date;
    active?: boolean;
}

export interface newCreatedUser {
    email: string,
    firstName: string,
    lastName: string,
}