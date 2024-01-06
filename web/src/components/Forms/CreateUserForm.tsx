'use client'

import { AlertCircle, CheckCircle2, Loader2 } from "lucide-react"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { Checkbox } from "../ui/checkbox"
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useState } from "react"
import { toast } from "react-toastify"
import { useUsersAPI } from "@/services/user"
import { Alert, AlertTitle, AlertDescription } from "../ui/alert"


const schema = z.object({
  name: z.string().min(3, 'O nome deve ter no mínimo 3 caracteres').max(35, 'O nome deve ter no máximo 35 caracteres'),
  email: z.string().email('O email deve ser válido'),
})

type FormProps = z.infer<typeof schema>

interface CreateUserFormProps {
  setCreateModalIsOpen: () => void
}

export const CreateUserForm = ({ setCreateModalIsOpen }: CreateUserFormProps) => {
  const [isChecked, setIsChecked] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const { createUser } = useUsersAPI()
  const { register, handleSubmit, formState: { errors } } = useForm<FormProps>({
    resolver: zodResolver(schema)
  })

  const onSubmit = async (data: FormProps) => {
    try {
      setLoading(true)

      await createUser({
        ...data,
        supporter: isChecked
      })

      setLoading(false)
      setCreateModalIsOpen()
      toast.success('Usuário criado com sucesso!')
    } catch (error: any) {
      setLoading(false)
      setErrorMessage(error?.response?.data.msg)
    }
  }

  return (
    <form className="flex flex-col gap-3 items-center justify-start w-full" onSubmit={handleSubmit(onSubmit)}>
      {errorMessage && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Erro</AlertTitle>
          <AlertDescription>
            {errorMessage}
          </AlertDescription>
        </Alert>
      )}

      <Input
        {...register('name')}
        label="Nome do usuário"
        placeholder="Ensira o nome do usuário"
        error={!!errors.name?.message}
        helperText={errors.name?.message}
      />

      <Input
        {...register('email')}
        label="Email do usuário"
        placeholder="Ensira o Email do usuário"
        error={!!errors.name?.message}
        helperText={errors.name?.message}
      />

      <div className="flex items-center justify-start gap-3 self-start">
        <Checkbox
          checked={isChecked}
          onClick={() => setIsChecked(!isChecked)}
          id="supporter"
        />

        <label htmlFor="supporter">
          Usuário é um apoiador?
        </label>
      </div>

      <Button className="flex items-center justify-center gap-3 font-incosolata font-regular text-xl text-white border border-black-900 bg-black-900 hover:bg-white hover:text-black-900 transition-all" type="submit">
        {loading && (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Por favor, aguarde...
          </>
        )}

        {!loading && (
          <>
            <CheckCircle2 className="mr-2" />
            Criar usuário
          </>
        )}
      </Button>
    </form>
  )
}