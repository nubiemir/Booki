import { User } from "./IUser";
import { Subjects } from "./types/Subjects";

export interface IUserCreatedPublisher extends User {
  subject: Subjects.PUSERCREATED;
}

export interface IUserCreatedListener extends User {
  subject: Subjects.SUSERCREATED;
}

export interface EUserCreatedPublisher extends User {
  subject: Subjects.PEUSERCREATED;
}

export interface EUserCreatedListener extends User {
  subject: Subjects.SEUSERCREATED;
}
