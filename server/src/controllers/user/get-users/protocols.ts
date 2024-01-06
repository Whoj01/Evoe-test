import { OutputUser } from "../../../models/user"

export type ParamsGetUsers = {
  page: number
  limit: number
}

export type GetUsersInfo = {
  total: number
  users: OutputUser[]
}

export interface IGetUsersRepository {
  getUsers: () => Promise<OutputUser[]> 
}