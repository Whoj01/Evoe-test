import { errorRequest, successesRequest } from "../../../utils/responses";
import { HttpResponse, HttpResquest, IController, statusCode } from "../../protocols";
import { IEditUserRepository, ParamsEditUser } from "./protocols";

export class EditUserController implements IController {
  constructor (private readonly editUserRepository: IEditUserRepository) {}

  #deleteUserResponses: { [key: string]: HttpResponse<string> } = {
    "Usuário não encontrado": errorRequest('Usuário não encontrado', statusCode.notFound),
    "Usuário atualizado com sucesso": successesRequest('Usuário atualizado com sucesso', statusCode.ok)
  }

  async handle(httpResquest: HttpResquest<ParamsEditUser>): Promise<HttpResponse<string>> {
    try {
      const editFieldsUser = httpResquest.body

      if(!editFieldsUser) return successesRequest('Campos não informados', statusCode.badRequest)

      const editUser = await this.editUserRepository.editUser(editFieldsUser!)

      if (editUser) return successesRequest('Usuário atualizado com sucesso', statusCode.ok)

      return errorRequest('Erro ao atualizar usuário', statusCode.internalServerError)
    } catch ({ message }: any) {
      return errorRequest(message, statusCode.internalServerError)
    }
  }
}