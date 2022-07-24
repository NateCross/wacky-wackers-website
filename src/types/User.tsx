import { ObjectId } from "mongodb"

export default interface User {
  _id?: ObjectId,
  email: string,
  password: string,
  name: string,
};
