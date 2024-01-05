import { prisma } from "../../../api/prisma";
import { IEditUserRepository, ParamsEditUser } from "../../../controllers/user/edit-user/protocols";

export class PrismaEditUserRepository implements IEditUserRepository {
  async editUser (editFieldsUser: ParamsEditUser): Promise<string> {
    const findUser = await prisma.user.findUnique({
      where: {
        id: editFieldsUser.id
      },
      select: {
        id: true,
        email: true,
        name: true,
        supporter: true
      }
    })

    if (!findUser) return 'Usuário não encontrado'

    await prisma.user.update({
      where: {
        id: editFieldsUser.id
      },
      data: {
        name: editFieldsUser?.name ?? findUser.name,
        email: editFieldsUser?.email ?? findUser.email,
        supporter: editFieldsUser?.supporter ?? findUser.supporter
      }
    })

    return 'Usuário atualizado com sucesso'
  };

}