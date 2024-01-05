import { HttpResponse, HttpResquest, IController, statusCode } from "../../protocols";
import { IDeleteUserRepository, ParamsDeleteUser } from "./protocols";
import { errorRequest, successesRequest } from "../../../utils/responses";

export class DeleteUserController implements IController {
  constructor (private readonly deleteUserRepository: IDeleteUserRepository) {}
  
  #deleteUserResponses: { [key: string]: HttpResponse<string> } = {
    "Usuário não encontrado": errorRequest('Usuário não encontrado', statusCode.notFound),
    "Usuário deletado com sucesso": successesRequest('Usuário deletado com sucesso', statusCode.ok)
  }

  async handle(httpResquest: HttpResquest<string>): Promise<HttpResponse<string>> {
    try {
      const id  = httpResquest.params

      if(!id) return errorRequest('Id não informado', statusCode.badRequest)

      const deleteUser = await this.deleteUserRepository.deleteUser(id!)

      if (deleteUser) return this.#deleteUserResponses[deleteUser as string]

      return errorRequest('Erro ao deletar usuário', statusCode.internalServerError)
    } catch ({ message }: any) {
      return errorRequest(message, statusCode.internalServerError)
    } 
  }
}