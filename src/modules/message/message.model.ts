import { model, Schema, Document } from "mongoose";
import { Message } from "./message.entity.js";

interface MessageDoc extends Message, Document {
  senderId: Schema.Types.ObjectId;
  receiverId: Schema.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const messageSchema = new Schema<MessageDoc>(
  {
    // userId
    senderId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    receiverId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    content: { type: String, required: true },
  },
  { timestamps: true, versionKey: false }
);
export const MessageModel = model<MessageDoc>("Message", messageSchema);
