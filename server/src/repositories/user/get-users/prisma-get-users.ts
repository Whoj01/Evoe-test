import { prisma } from "../../../api/prisma";
import { GetUsersInfo, IGetUsersRepository } from "../../../controllers/user/get-users/protocols";
import { OutputUser, UserSchema } from "../../../models/user";

export class PrismaGetUsersRepository implements IGetUsersRepository {
  async getUsers(): Promise<OutputUser[]> {
    const users = await prisma.user.findMany({})

    const usersFormatted = users.map(user => UserSchema.parse(user))
    
    return usersFormatted
  }
}