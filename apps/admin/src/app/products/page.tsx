import { DataTable, Button, Typography } from '@arfcodes/ui';
import { Plus } from 'lucide-react';
import { columns, Product } from './columns';

const data: Product[] = [
  {
    id: "728ed52f",
    name: "Wireless Headphones",
    sku: "AUDIO-001",
    price: 1250000,
    stock: 45,
    status: "active",
    category: "Electronics",
    lastUpdated: "2024-03-10",
  },
  {
    id: "489e1d42",
    name: "Ergonomic Office Chair",
    sku: "FURN-002",
    price: 3500000,
    stock: 12,
    status: "active",
    category: "Furniture",
    lastUpdated: "2024-03-09",
  },
  {
    id: "624b3c1a",
    name: "Mechanical Keyboard",
    sku: "TECH-003",
    price: 850000,
    stock: 8,
    status: "active",
    category: "Electronics",
    lastUpdated: "2024-03-08",
  },
  {
    id: "932f1a5c",
    name: "USB-C Hub",
    sku: "TECH-004",
    price: 450000,
    stock: 0,
    status: "archived",
    category: "Accessories",
    lastUpdated: "2024-02-28",
  },
  {
    id: "123e4567",
    name: "Gaming Mouse",
    sku: "TECH-005",
    price: 650000,
    stock: 25,
    status: "draft",
    category: "Electronics",
    lastUpdated: "2024-03-11",
  },
];

export default function ProductsPage() {
  return (
    <div className="flex flex-col gap-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground">Products</h2>
          <p className="text-muted-foreground mt-1 text-sm">Manage your product catalog and variants.</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Add Product
        </Button>
      </div>
      
      <div className="rounded-md border border-border/60 bg-card/50 backdrop-blur-sm">
        <DataTable columns={columns} data={data} filterColumn="name" />
      </div>
    </div>
  );
}
