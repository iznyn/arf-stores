"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Badge, Button } from "@arfcodes/ui"
import { ArrowUpDown, Eye, MoreHorizontal } from "lucide-react"

export type Order = {
  id: string
  orderNumber: string
  customer: string
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled"
  total: number
  date: string
  items: number
}

export const columns: ColumnDef<Order>[] = [
  {
    accessorKey: "orderNumber",
    header: "Order",
    cell: ({ row }) => <div className="font-medium">{row.getValue("orderNumber")}</div>,
  },
  {
    accessorKey: "customer",
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
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => <div className="text-muted-foreground">{row.getValue("date")}</div>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string
      return (
        <Badge 
          variant={
            status === "delivered" ? "success" : 
            status === "shipped" ? "secondary" : 
            status === "processing" ? "warning" :
            status === "cancelled" ? "destructive" :
            "outline"
          }
          className="capitalize"
        >
          {status}
        </Badge>
      )
    },
  },
  {
    accessorKey: "items",
    header: () => <div className="text-right">Items</div>,
    cell: ({ row }) => <div className="text-right">{row.getValue("items")}</div>,
  },
  {
    accessorKey: "total",
    header: () => <div className="text-right">Total</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("total"))
      const formatted = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
      }).format(amount)
 
      return <div className="text-right font-medium">{formatted}</div>
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return (
        <div className="flex justify-end gap-2">
          <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
            <Eye className="h-4 w-4" />
          </Button>
        </div>
      )
    },
  },
]
