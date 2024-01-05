export interface ParamsDeleteUser {
  id: string
}

export interface IDeleteUserRepository {
  deleteUser: (id: string) => Promise<string>
}