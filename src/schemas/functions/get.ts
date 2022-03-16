import jwt from "jsonwebtoken";
import { Document } from "mongoose";
import { v4 as uuidv4 } from "uuid";
import accountModel from "../../models/accounts";
import productModel from "../../models/products";

//Display all Accounts
export async function getAccounts() {
  return accountModel.find({});
}

//Display all Products
export async function getProducts() {
  return productModel.find({});
}

// Find Account
export async function getAccount(userid: Buffer) {
  return accountModel.findById(userid);
}

// Find Product
export async function getProduct(productID: Buffer) {
  return productModel.findById(productID);
}

//Check if account email exist
export async function checkEmail(email: string) {
  return accountModel.findOne({ emailAddress: email });
}

// Issue a JWT
export async function issueToken(id: Buffer, email: string) {
  return jwt.sign({ user_id: id, email }, "RANDOM_STRING", {
    expiresIn: "1h",
  });
}

// Get unique ID
export function getID(identifier: string) {
  return Buffer.from(uuidv4().replaceAll("-", "").concat(identifier));
}

// Check if ID exist
export async function checkID(id: Buffer) {
  if (id.toString().includes("product", 32)) {
    return productModel.findById(id);
  } else if (id.toString().includes("account", 32)) {
    return accountModel.findById(id);
  } else {
    return null;
  }
}

// Get paginated products
export async function getPaginatedProducts(paginateOptions: {
  first: number;
  after: Buffer;
  filter: any;
  sort: { name: number };
}) {
  const cursorKey = "cursor";
  const sort = {
    [cursorKey]: paginateOptions.sort ? paginateOptions.sort.name : 1,
  };
  const filter = { ...(paginateOptions.filter || {}) };

  const transform = (document: Document) => document.toJSON();

  const criteria = (field: Buffer) => ({ $gt: field });

  const addCursorFilter = (initialFilter: any, afterCursor: Buffer) => ({
    ...initialFilter,
    [cursorKey]: criteria(afterCursor),
  });

  const query =
    Object.keys(paginateOptions.after || filter).length !== 0
      ? addCursorFilter(filter, paginateOptions.after)
      : {};

  const documents = await productModel
    .find(query)
    .limit(paginateOptions.first)
    .sort(sort);

  const edges = await Promise.all(
    documents.map(async (item) => ({
      node: await transform(item),
      cursor: item.cursor,
    }))
  );

  const endCursor = edges.length > 0 ? edges[edges.length - 1].cursor : null;

  let hasNextPage = false;

  if (edges.length >= paginateOptions.first && endCursor) {
    hasNextPage =
      (await productModel
        .countDocuments(addCursorFilter(filter, endCursor))
        .limit(1)
        .sort(sort)) > 0;
  }

  return {
    edges,
    pageInfo: {
      hasNextPage,
      endCursor,
    },
  };
}
