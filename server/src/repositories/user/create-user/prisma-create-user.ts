import moment from "moment"
import { prisma } from "../../../api/prisma"
import { CreateUserParam, ICreateUserRepository } from "../../../controllers/user/create-user/protocols"
import { OutputUser } from "../../../models/user"

export class PrismaCreateUserRepository implements ICreateUserRepository {
  async createUser(user: CreateUserParam): Promise<OutputUser> {
    const { name, email, supporter } = user

    const createdUser = await prisma.user.create({
      data: {
        name,
        email,
        supporter,
      }
    })

    return {
      ...createdUser,
      createdAt: moment(createdUser.createdAt).format("DD/MM/YYYY"),
      updatedAt: moment(createdUser.updatedAt).format("DD/MM/YYYY"),
    }
  }
}