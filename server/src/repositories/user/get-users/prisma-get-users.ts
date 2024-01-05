import { z } from "zod";
import { prisma } from "../../../api/prisma";
import { GetUsersInfo, IGetUsersRepository, ParamsGetUsers } from "../../../controllers/user/get-users/protocols";
import { UserSchema } from "../../../models/user";

export class PrismaGetUsersRepository implements IGetUsersRepository {
  async getUsers(params: ParamsGetUsers): Promise<GetUsersInfo> {
    const totalToGet = params.limit * params.page

    const totalOfUsers = await prisma.user.count()

    const users = await prisma.user.findMany({
      take: totalToGet,
      skip: params.page,
      orderBy: {
        id: 'desc'
      }
    })

    const usersFormatted = users.map(user => UserSchema.parse(user))
    

    return {
      total: totalOfUsers,
      users: usersFormatted
    }
  }
}