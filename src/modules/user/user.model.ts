import { model, Schema, Document } from "mongoose";
import { Encrypt } from "../../utils/hashing.js";
import { User } from "./user.entity.js";

interface UserDoc extends User, Document {
  createdAt: Date;
  updatedAt: Date;
  active: boolean;
}

const userSchema = new Schema<UserDoc>(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    avatar: { type: String },
    active: { type: Boolean, default: true },
  },
  { timestamps: true, versionKey: false }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await Encrypt.create(this.password);
  next();
});

export const UserModel = model<UserDoc>("User", userSchema);
