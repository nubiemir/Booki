import {
  IUserCreatedPublisher,
  Publisher,
  Subjects,
  EUserCreatedPublisher,
} from "@booki/common";

export class UserCreatedPublisher extends Publisher<IUserCreatedPublisher> {
  subject: Subjects.PUSERCREATED = Subjects.PUSERCREATED;
}

export class ExUserCreatedPublisher extends Publisher<EUserCreatedPublisher> {
  subject: Subjects.PEUSERCREATED = Subjects.PEUSERCREATED;
}
