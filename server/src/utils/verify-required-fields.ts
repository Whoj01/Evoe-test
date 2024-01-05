import { HttpResponse } from "../controllers/protocols";

export function verifyRequiredFields(
  fields: string[],
  body: any
): HttpResponse<string> | null {
  for (const field of fields) {
    if (!body?.[field]) {
      return {
        statusCode: 206,
        body: {
          msg: `Campo ${field} é obrigatório`,
          ok: false,
          status: 206,
        },
      };
    }
  }

  return null
}