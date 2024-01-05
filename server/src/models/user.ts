import moment from "moment";
import { z } from "zod";

export const UserSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  supporter: z.boolean(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
}).transform((data) => {
  return {
    ...data,
    createdAt: moment(data.createdAt).format("DD/MM/YYYY"),
    updatedAt: moment(data.updatedAt).format("DD/MM/YYYY"),
  }
})

export type InputUser = z.input<typeof UserSchema>

export type OutputUser = z.output<typeof UserSchema>