import { Schema, model, Document } from "mongoose";

type ProductDocument = {
  id: Buffer;
  name: string;
  description: string;
  owner: Buffer;
  cursor: Buffer;
} & Document;

const productSchema = new Schema<ProductDocument>(
  {
    _id: { type: Buffer, alias: "id", required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    owner: { type: Buffer, required: true },
    cursor: {
      type: Buffer,
      required: true,
      default(this) {
        const buffer = Buffer.alloc(6, 0);

        buffer.writeUIntBE(new Date().getTime(), 0, 6);

        return Buffer.concat([buffer, Buffer.from(this.id).slice(0, 4)]);
      },
    },
  },
  { timestamps: true }
);

const productModel = model<ProductDocument>("productdb", productSchema);

export default productModel;
