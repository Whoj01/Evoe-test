import { OutputUser } from "../../../models/user";
import { errorRequest, successesRequest } from "../../../utils/responses";
import { verifyRequiredFields } from "../../../utils/verify-required-fields";
import { HttpResponse, HttpResquest, IController, requiredFieldsError, statusCode } from "../../protocols";
import { CreateUserParam, ICreateUserRepository } from "./protocols";

export class CreateUserController implements IController {
  constructor (private readonly createUserRepository: ICreateUserRepository) {}

  async handle(httpResquest: HttpResquest<CreateUserParam>): Promise<HttpResponse<OutputUser | string>> {
    try {
      const user = httpResquest.body

      const requiredFields: requiredFieldsError = verifyRequiredFields(['name', 'email', 'supporter'], user)

      if ( requiredFields ) return requiredFields

      const createdUser = await this.createUserRepository.createUser(user!)

      if (createdUser) return successesRequest('Usuário criado com sucesso', statusCode.created, createdUser)

      return errorRequest('Usuário não foi criado', statusCode.tryAgainLater)
    } catch (error: any) {
      if (error.meta?.target?.[0] === "email") {
        return errorRequest("Nome já email", statusCode.notAcceptable);
      }

      return errorRequest("Erro interno", statusCode.internalServerError);
    }
  }

}