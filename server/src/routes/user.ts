import { FastifyInstance, FastifyRequest } from "fastify";
import { PrismaCreateUserRepository } from "../repositories/user/create-user/prisma-create-user";
import { CreateUserController } from "../controllers/user/create-user/create-user";
import { CreateUserParam } from "../controllers/user/create-user/protocols";
import { ParamsGetUsers } from "../controllers/user/get-users/protocols";
import { PrismaGetUsersRepository } from "../repositories/user/get-users/prisma-get-users";
import { GetUsersController } from "../controllers/user/get-users/get-user";
import { PrismaDeleteUserRepository } from "../repositories/user/delete-user/prisma-delete-user";
import { DeleteUserController } from "../controllers/user/delete-user/delete-user";
import { PrismaEditUserRepository } from "../repositories/user/edit-user/prisma-edit-user";
import { EditUserController } from "../controllers/user/edit-user/edit-user";
import { ParamsEditUser } from "../controllers/user/edit-user/protocols";

export async function userRoutes(app: FastifyInstance) {
  app.get("/user", async (req, res) => {
    const prismaGetUsersRepository = new PrismaGetUsersRepository()

    const getUserController = new GetUsersController(prismaGetUsersRepository)

    const { body, statusCode } = await getUserController.handle({})

    res.code(statusCode).send(body)
  });

  app.post("/user", async (req: FastifyRequest<{ Body: CreateUserParam }>, res) => {
    const prismaCreateUserRepository = new PrismaCreateUserRepository()

    const createUserController = new CreateUserController(prismaCreateUserRepository)

    const { body, statusCode } = await createUserController.handle({
      body: req.body
    })

    res.code(statusCode).send(body)
  })

  app.put("/user/:id", async (req: FastifyRequest<{ Body: Pick<ParamsEditUser, 'email' | 'name' | 'supporter'>, Params: { id: string } }>, res) => {
    const prismaEditUserRepository = new PrismaEditUserRepository()

    const editUserController = new EditUserController(prismaEditUserRepository)

    const { body, statusCode } = await editUserController.handle({
      body: {
        id: req.params.id,
        ...req.body
      }
    })

    res.code(statusCode).send(body)
  })

  app.delete("/user/:id", async (req: FastifyRequest< { Params: { id: string } } >, res) => {
    const prismaDeleteUserRepository = new PrismaDeleteUserRepository()

    const deleteUserController = new DeleteUserController(prismaDeleteUserRepository)

    const { body, statusCode } = await deleteUserController.handle({
      params: req.params.id
    })

    res.code(statusCode).send(body)
  })
}