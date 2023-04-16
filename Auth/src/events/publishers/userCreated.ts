import { IUserCreatedPublisher, Publisher, Subjects } from "@booki/common";

export class UserCreatedPublisher extends Publisher<IUserCreatedPublisher> {
  subject: Subjects.PUSERCREATED = Subjects.PUSERCREATED;
}
