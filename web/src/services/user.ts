import { api } from "@/api/axios";
import { User } from "@/types/User";

type EditUserParams = {
  id: string,
  name: string,
  email: string | undefined,
  supporter: boolean,
}

export const useUsersAPI = () => {
  const getUsers = async () => {
    const { data: { data } } = await api.get(`/user`);

    return data;
  };

  const createUser = async (user: Pick<User, 'email' | 'name' | 'supporter'>) => {
    const { data } = await api.post('/user', user);

    return data.data;
  }

  const editUser = async (user: EditUserParams & { id: string }) => {
    const { data } = await api.put(`/user/${user.id}`, user);

    return data.data;
  }

  const deleteUser = async (id: string) => {
    const { data } = await api.delete(`/user/${id}`);

    return data.data;
  }

  return { 
    getUsers, 
    createUser,
    editUser,
    deleteUser
  };
}