import { Book, EBook, QBook } from "./IBook";
import { Subjects } from "./types/Subjects";

export interface IBookCreatedPublisher extends Book {
  subject: Subjects.PBOOKCREATED;
}

export interface IBookCreatedListener extends Book {
  subject: Subjects.SBOOKCREATED;
}

export interface IQBookCreatedPublisher extends QBook {
  subject: Subjects.PQBOOKCREATED;
}

export interface IQBookCreatedListener extends QBook {
  subject: Subjects.SQBOOKCREATED;
}

export interface IEBookCreatedPublisher extends EBook {
  subject: Subjects.PEBOOKCREATED;
}

export interface IEBookCreatedListener extends EBook {
  subject: Subjects.SEBOOKCREATED;
}
