import { errorRequest, successesRequest } from "../../../utils/responses";
import { verifyRequiredFields } from "../../../utils/verify-required-fields";
import { HttpResponse, HttpResquest, IController, requiredFieldsError, statusCode } from "../../protocols";
import { GetUsersInfo, IGetUsersRepository, ParamsGetUsers } from "./protocols";

export class GetUsersController implements IController {
  constructor (private readonly getUsersRepository: IGetUsersRepository) {}

  async handle(httpResquest: HttpResquest<unknown>): Promise<HttpResponse<GetUsersInfo | string>> {
    try {      
      const users = await this.getUsersRepository.getUsers()

      if (users) return successesRequest('Usuários encontrados com sucesso', statusCode.ok, users)

      return errorRequest('Usuários não encontrados', statusCode.notFound)
    } catch (error: any) {
      return errorRequest(error.message, statusCode.internalServerError)
    }
  }
}