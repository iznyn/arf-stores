"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Badge, Button } from "@arfcodes/ui"
import { ArrowUpDown, AlertTriangle, MoreHorizontal } from "lucide-react"

export type InventoryItem = {
  id: string
  sku: string
  name: string
  stock: number
  minStock: number
  status: "in_stock" | "low_stock" | "out_of_stock"
  location: string
  lastUpdated: string
}

export const inventoryListColumns: ColumnDef<InventoryItem>[] = [
  {
    accessorKey: "sku",
    header: "SKU",
    cell: ({ row }) => <div className="font-mono text-xs">{row.getValue("sku")}</div>,
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="-ml-4 h-8 data-[state=open]:bg-accent"
        >
          Product Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
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
            status === "in_stock" ? "success" : 
            status === "low_stock" ? "warning" : 
            "destructive"
          }
          className="capitalize"
        >
          {status.replace("_", " ")}
        </Badge>
      )
    },
  },
  {
    accessorKey: "stock",
    header: () => <div className="text-right">Stock Level</div>,
    cell: ({ row }) => {
      const stock = parseFloat(row.getValue("stock"))
      const minStock = row.original.minStock
      
      return (
        <div className="flex justify-end items-center gap-2">
          {stock <= minStock && (
            <AlertTriangle className="h-4 w-4 text-amber-500" />
          )}
          <span className={`font-medium ${stock === 0 ? "text-destructive" : ""}`}>
            {stock}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: "location",
    header: "Location",
    cell: ({ row }) => <div className="text-muted-foreground">{row.getValue("location")}</div>,
  },
  {
    accessorKey: "lastUpdated",
    header: "Last Updated",
    cell: ({ row }) => <div className="text-xs text-muted-foreground">{row.getValue("lastUpdated")}</div>,
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
