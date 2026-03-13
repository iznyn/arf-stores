"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Badge, Button } from "@arfcodes/ui"
import { ArrowUpDown, MoreHorizontal, Mail, Phone } from "lucide-react"

export type Customer = {
  id: string
  name: string
  email: string
  phone: string
  totalOrders: number
  totalSpent: number
  status: "active" | "inactive" | "blocked"
  lastOrder: string
}

export const customerListColumns: ColumnDef<Customer>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="-ml-4 h-8 data-[state=open]:bg-accent"
        >
          Customer
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => (
      <div className="flex flex-col">
        <span className="font-medium">{row.getValue("name")}</span>
        <span className="text-xs text-muted-foreground">{row.original.email}</span>
      </div>
    ),
  },
  {
    accessorKey: "phone",
    header: "Contact",
    cell: ({ row }) => (
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Phone className="h-3 w-3" />
        {row.getValue("phone")}
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string
      return (
        <Badge 
          variant={
            status === "active" ? "success" : 
            status === "inactive" ? "secondary" : 
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
    accessorKey: "totalOrders",
    header: () => <div className="text-right">Orders</div>,
    cell: ({ row }) => <div className="text-right">{row.getValue("totalOrders")}</div>,
  },
  {
    accessorKey: "totalSpent",
    header: () => <div className="text-right">Total Spent</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("totalSpent"))
      const formatted = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
      }).format(amount)
 
      return <div className="text-right font-medium">{formatted}</div>
    },
  },
  {
    accessorKey: "lastOrder",
    header: "Last Order",
    cell: ({ row }) => <div className="text-sm text-muted-foreground">{row.getValue("lastOrder")}</div>,
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
