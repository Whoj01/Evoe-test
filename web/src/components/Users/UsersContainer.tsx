'use client'

import { User } from "@/types/User"
import { Button } from "../ui/button"
import { CheckCircle2 } from "lucide-react"
import { useState } from "react"
import { Modal } from "../ui/Modal"
import { ModalContent } from "../ui/Modal/Content"
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from "../ui/input"
import { Checkbox } from "../ui/checkbox"
import { CreateUserForm } from "../Forms/CreateUserForm"
import { DataTable } from "./DataTable"
import { getColumns } from "./Columns"
import { EditUserForm } from "../Forms/EditUserForm"
import { useUsersAPI } from "@/services/user"
import { DeleteUser } from "../Forms/DeleteUser"

interface UsersContainerProps {
  users: User[]
}

type EditModalProps = {
  user: User
  isOpen: boolean
}

type DeleteModalProps = {
  user: User
  isOpen: boolean
}

export const UsersContainer = ({ users }: UsersContainerProps) => {
  const { getUsers } = useUsersAPI()
  const [stateUsers, setStateUsers] = useState<User[]>(users)
  const [createModalIsOpen, setCreateModalIsOpen] = useState<boolean>(false)
  const [editModalIsOpen, setEditModalIsOpen] = useState<EditModalProps | null>(null)
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState<DeleteModalProps | null>(null)

  const handleCreateModalIsOpen = () => setCreateModalIsOpen(!createModalIsOpen)

  const handleEditModalIsOpen = (user: User, isOpen: boolean) => {
    setEditModalIsOpen({
      user,
      isOpen
    })
  }

  const handleDeleteModalIsOpen = (user: User, isOpen: boolean) => {
    console.log('cliquei')
    setDeleteModalIsOpen({
      user,
      isOpen
    })
  }

  const columns = getColumns({
    setDeleteModal: handleDeleteModalIsOpen,
    setEditModal: handleEditModalIsOpen
  })

  const handleGetUsers = async () => {
    const data = await getUsers()

    setStateUsers(data)
  }

  return (
    <>
      <div className="flex flex-col items-start justify-start max-w-[1237px] w-full h-full gap-6">
        <div className="flex flex-col items-start justify-between gap-3 w-full md:flex-row">
          <h1 className="text-3xl font-syne font-bold">Tabela de usuários</h1>

          <Button
            className="flex items-center justify-center gap-3 font-incosolata font-regular text-xl text-white border border-black-900 bg-black-900 hover:bg-white hover:text-black-900 transition-all"
            onClick={() => setCreateModalIsOpen(true)}
          >
            <CheckCircle2 size={16} className="mr-2" />
            Criar usuário
          </Button>
        </div>

        <DataTable data={stateUsers} columns={columns} />
      </div>
      {createModalIsOpen && (
        <Modal.Root closeModal={handleCreateModalIsOpen}>
          <Modal.Header>
            <Modal.Title>
              Vamos criar um usuário?
            </Modal.Title>

            <Modal.Description>
              Vamos inserir os principais dados do usuário para possamos o criar em nossa acessar a plataforma.
            </Modal.Description>
          </Modal.Header>

          <ModalContent>
            <CreateUserForm setCreateModalIsOpen={handleCreateModalIsOpen} />
          </ModalContent>
        </Modal.Root>
      )}

      {editModalIsOpen?.isOpen && (
        <Modal.Root closeModal={() => setEditModalIsOpen(null)}>
          <Modal.Header>
            <Modal.Title>
              Vamos editar o usuário!
            </Modal.Title>

            <Modal.Description>
              Ensira os dados desejados para atualizar o usuário.
            </Modal.Description>
          </Modal.Header>

          <ModalContent>
            <EditUserForm user={editModalIsOpen.user} setEditModalIsOpen={() => setEditModalIsOpen(null)} getUsers={handleGetUsers} />
          </ModalContent>
        </Modal.Root>
      )}

      {deleteModalIsOpen && (
        <Modal.Root closeModal={() => setDeleteModalIsOpen(null)}>
          <Modal.Header>
            <Modal.Title>
              Excluir usuário!
            </Modal.Title>

            <Modal.Description>
              Tem certeza que deseja excluir o usuário? Essa ação é irreversível.
            </Modal.Description>
          </Modal.Header>

          <ModalContent>
            <DeleteUser getUsers={handleGetUsers} setDeleteModalIsOpen={() => setDeleteModalIsOpen(null)} user={deleteModalIsOpen.user} />
          </ModalContent>
        </Modal.Root>
      )}
    </>
  )
}