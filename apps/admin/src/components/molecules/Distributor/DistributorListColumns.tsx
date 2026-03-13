"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Badge, Button } from "@arfcodes/ui"
import { ArrowUpDown, MoreHorizontal, Mail, Phone, MapPin } from "lucide-react"

export type Distributor = {
  id: string
  name: string
  contactPerson: string
  email: string
  phone: string
  status: "active" | "inactive" | "pending"
  rating: number
  totalSupplied: number
}

export const distributorListColumns: ColumnDef<Distributor>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="-ml-4 h-8 data-[state=open]:bg-accent"
        >
          Distributor
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => (
      <div className="flex flex-col">
        <span className="font-medium">{row.getValue("name")}</span>
        <span className="text-xs text-muted-foreground">{row.original.contactPerson}</span>
      </div>
    ),
  },
  {
    accessorKey: "email",
    header: "Contact",
    cell: ({ row }) => (
      <div className="flex flex-col gap-1 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <Mail className="h-3 w-3" />
          {row.getValue("email")}
        </div>
        <div className="flex items-center gap-2">
          <Phone className="h-3 w-3" />
          {row.original.phone}
        </div>
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
            status === "pending" ? "warning" : 
            "secondary"
          }
          className="capitalize"
        >
          {status}
        </Badge>
      )
    },
  },
  {
    accessorKey: "rating",
    header: () => <div className="text-center">Rating</div>,
    cell: ({ row }) => {
        const rating = parseFloat(row.getValue("rating"))
        return (
            <div className="text-center font-medium flex justify-center items-center gap-1">
                <span className="text-amber-500">★</span> {rating.toFixed(1)}
            </div>
        )
    },
  },
  {
    accessorKey: "totalSupplied",
    header: () => <div className="text-right">Total Supplied</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("totalSupplied"))
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
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      )
    },
  },
]
