import { User } from "@/types/User"
import { Button } from "../ui/button"
import { useUsersAPI } from "@/services/user"
import { useState } from "react"
import { toast } from "react-toastify"
import { Loader2, Trash } from "lucide-react"

interface EditUserFormProps {
  setDeleteModalIsOpen: () => void
  getUsers: () => void
  user: User
}

export const DeleteUser = ({ user, getUsers, setDeleteModalIsOpen }: EditUserFormProps) => {
  const [loading, setLoading] = useState<boolean>(false)
  const { deleteUser } = useUsersAPI()

  const onSubmit = async () => {
    try {
      setLoading(true)

      await deleteUser(user.id)

      setLoading(false)
      setDeleteModalIsOpen()
      getUsers()
      toast.success('Usuário deletado com sucesso!')
    } catch (error: any) {
      toast.error('Erro ao deletar usuário')
      setLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center gap-3">
      <Button
        className="flex items-center justify-center gap-3 font-incosolata font-regular text-xl text-white border border-black-900 bg-black-900 hover:bg-white hover:text-black-900 transition-all"
        onClick={() => setDeleteModalIsOpen()}
      >

        Cancelar
      </Button>

      <Button onClick={async () => await onSubmit()} className="flex items-center justify-center gap-3 font-incosolata font-regular text-xl text-white border border-red-900 bg-red-900 hover:bg-white hover:text-black-900 transition-all">
        {loading && (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Por favor, aguarde...
          </>
        )}

        {!loading && (
          <>
            <Trash className="mr-2" />
            Excluir
          </>
        )}
      </Button>
    </div>
  )
}