import { Book, CBook, QBook } from "./IBook";
import { Subjects } from "./types/Subjects";

export interface ICBookCreatedPublisher extends CBook {
  subject: Subjects.PCBOOKCREATED;
}

export interface ICBookCreatedListener extends CBook {
  subject: Subjects.SCBOOKCREATED;
}

export interface IQBookCreatedPublisher extends QBook {
  subject: Subjects.PQBOOKCREATED;
}

export interface IQBookCreatedListener extends QBook {
  subject: Subjects.SQBOOKCREATED;
}

export interface IBookCreatedPublisher extends Book {
  subject: Subjects.PBOOKCREATED;
}

export interface IBookCreatedListener extends Book {
  subject: Subjects.SBOOKCREATED;
}
