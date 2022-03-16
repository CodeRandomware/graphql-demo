import { UserInputError } from "apollo-server-core";
import bycrypt from "bcryptjs";
import accountModel from "../../models/accounts";
import productModel from "../../models/products";
import { checkEmail, getID, issueToken } from "./get";
import { CreateProduct } from "./producttypes";
import { LoginUser, CreateUser } from "./usertypes";

//ACCOUNTS

// Add a new User Account
export async function addUser(user: CreateUser["input"]): Promise<string> {
  //console.log(user);
  if (await checkEmail(user.emailAddress)) {
    throw new UserInputError("Email address already used.");
  }

  const { id, email, hashedPassword, token } = await getUserInfo(user);

  const newUser = new accountModel({
    _id: id,
    firstname: user.firstname.trim(),
    lastname: user.lastname.trim(),
    emailAddress: email,
    password: hashedPassword,
  });

  await newUser.save();

  return token;
}

//User Login
export async function login(userLogin: LoginUser["input"]) {
  const userInfo = await checkEmail(userLogin.emailAddress);
  if (
    userInfo &&
    (await bycrypt.compare(userLogin.password, userInfo.password))
  ) {
    return issueToken(userInfo.id, userInfo.emailAddress);
  } else {
    throw new UserInputError("Invalid credentials.");
  }
}

//User
async function getUserInfo(user: CreateUser["input"]) {
  const id = getID("account");
  const hashedPassword = await bycrypt.hash(user.password, 10);
  const email = user.emailAddress;
  const token = await issueToken(id, email);

  return { id, email, hashedPassword, token };
}

/*************************************************************************** */
// PRODUCTS

//Add Product
export async function addProduct(
  productInfo: CreateProduct["input"],
  userID: Buffer
) {
  const id = getID("product");
  const newProduct = new productModel({
    _id: id,
    name: productInfo.name,
    description: productInfo.description,
    owner: userID,
  });

  return newProduct.save();
}
