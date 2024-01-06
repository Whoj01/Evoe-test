"use client"

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function DataTable<TData, TValue,>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  })


  return (
    <div className="rounded-md border w-full">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                  </TableHead>
                )
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody >
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row, i) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                Ainda não há dados para exibir
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <div className="flex items-center justify-between space-x-2 py-4 px-3 self-start">
        <p className="font-syne font-bold text-sm text-black-900">
          Página {table.getState().pagination.pageIndex + 1} de {table.getPageCount()}
        </p>
        <div className="flex items-center justify-center gap-2">
          <ChevronLeft
            size={16} onClick={() => table.previousPage()}
            className={`${!table.getCanPreviousPage() ? 'text-black-600/15 cursor-not-allowed hover:brightness-50 pointer-events-none' : ' text-buttonBackground hover:brightness-90'} transition-all cursor-pointer`}
          />

          {Array.from({ length: table.getPageCount() }).map((_, i) => (
            <p key={i} onClick={() => table.setPageIndex(i)} className={`${table.getState().pagination.pageIndex === i ? 'text-black-900' : 'text-black-600/20'} px-2 cursor-pointer hover:brightness-75 hover:bg-label/30 transition-all font-nunitoSans font-medium text-lg `}>
              {i + 1}
            </p>
          ))}
          <ChevronRight size={16} onClick={() => table.nextPage()}
            className={`${!table.getCanNextPage() ? 'text-black-600/15 cursor-not-allowed hover:brightness-50 pointer-events-none' : ' text-buttonBackground hover:brightness-90'} transition-all cursor-pointer`} />
        </div>

        <p className="font-syne font-bold text-sm text-black-900">
          Total de {data.length} contas
        </p>
      </div>
    </div>
  )
}