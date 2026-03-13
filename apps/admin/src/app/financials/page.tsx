import { DataTable, Button, Typography } from '@arfcodes/ui';
import { Download, Plus } from 'lucide-react';
import { financialListColumns, Transaction } from '@/components/molecules/Financial/FinancialListColumns';

const data: Transaction[] = [
  {
    id: "tx-001",
    date: "2024-03-12",
    description: "Order #ORD-2024-001 Payment",
    type: "income",
    category: "Sales",
    amount: 1500000,
    status: "completed",
    reference: "PAY-001",
  },
  {
    id: "tx-002",
    date: "2024-03-11",
    description: "Supplier Payment - Global Tech",
    type: "expense",
    category: "Inventory",
    amount: 4500000,
    status: "completed",
    reference: "INV-882",
  },
  {
    id: "tx-003",
    date: "2024-03-10",
    description: "Office Rent - March",
    type: "expense",
    category: "Rent",
    amount: 12000000,
    status: "pending",
    reference: "RENT-MAR",
  },
  {
    id: "tx-004",
    date: "2024-03-09",
    description: "Order #ORD-2024-002 Payment",
    type: "income",
    category: "Sales",
    amount: 850000,
    status: "completed",
    reference: "PAY-004",
  },
  {
    id: "tx-005",
    date: "2024-03-08",
    description: "Marketing Campaign FB Ads",
    type: "expense",
    category: "Marketing",
    amount: 2500000,
    status: "completed",
    reference: "MKT-FB-01",
  },
];

export default function FinancialsPage() {
  return (
    <div className="flex flex-col gap-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground">Financials</h2>
          <p className="text-muted-foreground mt-1 text-sm">Track revenue, expenses, and profitability.</p>
        </div>
        <div className="flex gap-2">
            <Button variant="outline" className="gap-2">
                <Download className="h-4 w-4" />
                Export
            </Button>
            <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Add Transaction
            </Button>
        </div>
      </div>

      <div className="rounded-md border border-border/60 bg-card/50 backdrop-blur-sm">
        <DataTable columns={financialListColumns} data={data} filterColumn="description" filterPlaceholder="Search transactions..." />
      </div>
    </div>
  );
}
