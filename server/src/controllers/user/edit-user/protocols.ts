export type ParamsEditUser = {
  id: string, 
  name?: string, 
  email?: string, 
  supporter?: boolean
} 

export interface IEditUserRepository {
  editUser: (editFieldsUser: ParamsEditUser ) => Promise<string>
}