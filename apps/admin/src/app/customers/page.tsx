import { DataTable, Button, Typography } from '@arfcodes/ui';
import { Download, Plus } from 'lucide-react';
import { customerListColumns, Customer } from '@/components/molecules/Customer/CustomerListColumns';

const data: Customer[] = [
  {
    id: "cust-001",
    name: "Alice Johnson",
    email: "alice@example.com",
    phone: "+62 812-3456-7890",
    totalOrders: 15,
    totalSpent: 12500000,
    status: "active",
    lastOrder: "2024-03-12",
  },
  {
    id: "cust-002",
    name: "Bob Smith",
    email: "bob@example.com",
    phone: "+62 813-4567-8901",
    totalOrders: 8,
    totalSpent: 5600000,
    status: "active",
    lastOrder: "2024-03-10",
  },
  {
    id: "cust-003",
    name: "Charlie Brown",
    email: "charlie@example.com",
    phone: "+62 811-2345-6789",
    totalOrders: 3,
    totalSpent: 1200000,
    status: "inactive",
    lastOrder: "2024-01-15",
  },
  {
    id: "cust-004",
    name: "Diana Prince",
    email: "diana@example.com",
    phone: "+62 815-6789-0123",
    totalOrders: 25,
    totalSpent: 45000000,
    status: "active",
    lastOrder: "2024-03-11",
  },
  {
    id: "cust-005",
    name: "Evan Wright",
    email: "evan@example.com",
    phone: "+62 819-0123-4567",
    totalOrders: 1,
    totalSpent: 450000,
    status: "blocked",
    lastOrder: "2023-12-05",
  },
];

export default function CustomersPage() {
  return (
    <div className="flex flex-col gap-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground">Customers</h2>
          <p className="text-muted-foreground mt-1 text-sm">Manage customer database and credit limits.</p>
        </div>
        <div className="flex gap-2">
            <Button variant="outline" className="gap-2">
                <Download className="h-4 w-4" />
                Export
            </Button>
            <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Add Customer
            </Button>
        </div>
      </div>

      <div className="rounded-md border border-border/60 bg-card/50 backdrop-blur-sm">
        <DataTable columns={customerListColumns} data={data} filterColumn="name" filterPlaceholder="Search customers..." />
      </div>
    </div>
  );
}
