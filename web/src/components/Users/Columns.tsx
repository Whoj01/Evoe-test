"use client"

import { User } from "@/types/User";
import { ColumnDef } from "@tanstack/react-table"
import { Pencil, Trash } from "lucide-react";

interface GetColumnsProps {
  setEditModal: (user: User, isOpen: boolean) => void
  setDeleteModal: (user: User, isOpen: boolean) => void
}

export const getColumns = ({ setEditModal, setDeleteModal }: GetColumnsProps): ColumnDef<User>[] =>
  [
    {
      accessorKey: "name",
      header: () => {
        return <p className="font-poppins font-normal text-xl text-white">Nome do usuário</p>
      },
      cell: ({ row }) => {
        return (
          <p className="font-incosolata font-normal text-lg text-black-900">{row.original.name}</p>
        )
      },
    },
    {
      accessorKey: "email",
      header: () => {
        return <p className="font-poppins font-normal text-xl text-white">Email do usuário</p>
      },
      cell: ({ row }) => {
        return (
          <p className="font-incosolata font-normal text-lg text-black-900">{row.original.email}</p>
        )
      },
    },
    {
      accessorKey: "supporter",
      header: () => {
        return <p className="font-poppins font-normal text-xl text-white">Usuário é um apoiador?</p>
      },
      cell: ({ row }) => {
        return (
          <p className="font-incosolata font-normal text-lg text-black-900">{row.original.supporter ? 'Sim' : 'Não'}</p>
        )
      },
    },
    {
      accessorKey: 'createdAt',
      header: () => {
        return <p className="font-poppins font-normal text-xl text-white">Criado em</p>
      },
      cell: ({ row }) => {
        return (
          <p className="font-nunitoSans font-light text-lg text-green-900">{row.original.createdAt}</p>
        )
      },
    },
    {
      accessorKey: 'updatedAt',
      header: () => {
        return <p className="font-poppins font-normal text-xl text-white">Atualizado em</p>
      },
      cell: ({ row }) => {
        return (
          <p className="font-nunitoSans font-light text-lg text-green-900">{row.original.updatedAt}</p>
        )
      },
    },
    {
      id: "actions",
      header: () => {
        return <p className="font-poppins font-normal text-xl text-white">Ações</p>
      },
      cell: ({ row }) => {
        return (
          <div className="flex items-center justify-start gap-3 self-end">
            <Pencil size={16}
              className="text-black-900 hover:-translate-y-[2px] hover:brightness-50 transition-all cursor-pointer"
              onClick={() => setEditModal(row.original, true)}
            />

            <Trash
              size={16}
              className="text-black-900 hover:-translate-y-[2px] hover:brightness-50 transition-all cursor-pointer"
              onClick={() => setDeleteModal(row.original, true)}
            />
          </div>
        )
      }
    },
  ]