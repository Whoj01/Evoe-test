import { InputUser, OutputUser } from "../../../models/user";

export type CreateUserParam = Pick<InputUser, "name" | "email" | "supporter">


export interface ICreateUserRepository {
  createUser: (user: CreateUserParam) => Promise<OutputUser>
}