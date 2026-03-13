"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Badge, Button } from "@arfcodes/ui"
import { ArrowUpDown, MoreHorizontal, ArrowUpRight, ArrowDownLeft } from "lucide-react"

export type Transaction = {
  id: string
  date: string
  description: string
  type: "income" | "expense"
  category: string
  amount: number
  status: "completed" | "pending" | "failed"
  reference: string
}

export const financialListColumns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "date",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="-ml-4 h-8 data-[state=open]:bg-accent"
        >
          Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => <div className="text-muted-foreground">{row.getValue("date")}</div>,
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => (
      <div className="flex flex-col">
        <span className="font-medium">{row.getValue("description")}</span>
        <span className="text-xs text-muted-foreground">{row.original.reference}</span>
      </div>
    ),
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => <Badge variant="outline">{row.getValue("category")}</Badge>,
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => {
      const type = row.getValue("type") as string
      return (
        <div className={`flex items-center gap-1 font-medium ${type === 'income' ? 'text-emerald-500' : 'text-rose-500'}`}>
            {type === 'income' ? <ArrowDownLeft className="h-3 w-3" /> : <ArrowUpRight className="h-3 w-3" />}
            <span className="capitalize">{type}</span>
        </div>
      )
    },
  },
  {
    accessorKey: "amount",
    header: () => <div className="text-right">Amount</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"))
      const type = row.original.type
      const formatted = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
      }).format(amount)
 
      return (
        <div className={`text-right font-medium ${type === 'income' ? 'text-emerald-500' : 'text-rose-500'}`}>
            {type === 'income' ? '+' : '-'}{formatted}
        </div>
      )
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string
      return (
        <Badge 
          variant={
            status === "completed" ? "success" : 
            status === "pending" ? "warning" : 
            "destructive"
          }
          className="capitalize"
        >
          {status}
        </Badge>
      )
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return (
        <div className="flex justify-end gap-2">
          <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      )
    },
  },
]
