import { prisma } from "../../../api/prisma";
import { IDeleteUserRepository } from "../../../controllers/user/delete-user/protocols";

export class PrismaDeleteUserRepository implements IDeleteUserRepository {
  async deleteUser(id: string): Promise<string> {
    const findUser = await prisma.user.findUnique({
      where: {
        id
      }
    })

    if (!findUser) return 'Usuário não encontrado'

    await prisma.user.delete({
      where: {
        id
      }
    })

    return 'Usuário deletado com sucesso'
  }
    
}