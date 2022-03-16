import { Schema, model, Document } from "mongoose";

type AccountDocument = {
  id: Buffer;
  firstname: string;
  lastname: string;
  emailAddress: string;
  password: string;
} & Document;

const accountSchema = new Schema<AccountDocument>(
  {
    _id: { type: Buffer, alias: "id", required: true },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    emailAddress: { type: String, unique: true, required: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

const accountModel = model<AccountDocument>("accountdb", accountSchema);

export default accountModel;
