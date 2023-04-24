import { Book, QBook } from "./IBook";
import { Subjects } from "./types/Subjects";

export interface IQBookUpdatedPublisher extends QBook {
  subject: Subjects.PQBOOKUPDATED;
}

export interface IQBookUpdatedListener extends QBook {
  subject: Subjects.SQBOOKUPDATED;
}

export interface IBookUpdatedPublisher extends Book {
  subject: Subjects.PBOOKUPDATED;
}

export interface IBookUpdatedListener extends Book {
  subject: Subjects.SBOOKUPDATED;
}
