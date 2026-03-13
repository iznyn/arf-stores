import { DataTable, Button, Typography } from '@arfcodes/ui';
import { Download, Plus } from 'lucide-react';
import { inventoryListColumns, InventoryItem } from '@/components/molecules/Inventory/InventoryListColumns';

const data: InventoryItem[] = [
  {
    id: "inv-001",
    sku: "AUDIO-001",
    name: "Wireless Headphones",
    stock: 45,
    minStock: 10,
    status: "in_stock",
    location: "Warehouse A - Shelf 3",
    lastUpdated: "2024-03-12",
  },
  {
    id: "inv-002",
    sku: "FURN-002",
    name: "Ergonomic Office Chair",
    stock: 12,
    minStock: 5,
    status: "in_stock",
    location: "Warehouse B - Aisle 1",
    lastUpdated: "2024-03-11",
  },
  {
    id: "inv-003",
    sku: "TECH-003",
    name: "Mechanical Keyboard",
    stock: 8,
    minStock: 15,
    status: "low_stock",
    location: "Warehouse A - Shelf 5",
    lastUpdated: "2024-03-10",
  },
  {
    id: "inv-004",
    sku: "TECH-004",
    name: "USB-C Hub",
    stock: 0,
    minStock: 20,
    status: "out_of_stock",
    location: "Warehouse A - Shelf 2",
    lastUpdated: "2024-03-09",
  },
  {
    id: "inv-005",
    sku: "TECH-005",
    name: "Gaming Mouse",
    stock: 25,
    minStock: 10,
    status: "in_stock",
    location: "Warehouse A - Shelf 4",
    lastUpdated: "2024-03-08",
  },
];

export default function InventoryPage() {
  return (
    <div className="flex flex-col gap-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground">Inventory</h2>
          <p className="text-muted-foreground mt-1 text-sm">Track stock levels and manage purchase orders.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Stock In
          </Button>
        </div>
      </div>

      <div className="rounded-md border border-border/60 bg-card/50 backdrop-blur-sm">
        <DataTable columns={inventoryListColumns} data={data} filterColumn="name" filterPlaceholder="Filter items..." />
      </div>
    </div>
  );
}
