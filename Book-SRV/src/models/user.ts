import mongoose from "mongoose";

/**
 * User schema
 * Storage for the user details
 * this is different from the Auth user model
 * this users model is conserned only in relation to some users book
 */

/**
 * the following interface
 * describes the attributes found on the User schema or tabl
 */

interface IUser {
  id: string;
  interests: String[];
}

/**
 * extending the mongoose doc for the sake
 * of adding the attributes of the User Schema,
 */

export interface UserDoc extends mongoose.Document {}

interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: IUser): UserDoc;
}

const UserSchema = new mongoose.Schema(
  {
    interests: [{ type: String }],
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);

UserSchema.statics.build = (attrs: IUser) => {
  return new User({
    _id: attrs.id,
    interests: attrs.interests,
  });
};

/**
 * Building the User model
 */

const User = mongoose.model<UserDoc, UserModel>("User", UserSchema);

// exporting the user model
export { User };
