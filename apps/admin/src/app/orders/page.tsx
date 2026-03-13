import { DataTable, Button } from '@arfcodes/ui';
import { Download } from 'lucide-react';
import { orderListColumns } from '@/components/molecules/Order/OrderListColumns';
import { getOrders } from '@/lib/actions/orders/getOrders';

export default async function OrdersPage() {
  const data = await getOrders();

  return (
    <div className="flex flex-col gap-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground">Orders</h2>
          <p className="text-muted-foreground mt-1 text-sm">Manage customer orders and shipping.</p>
        </div>
        <Button variant="outline" className="gap-2">
          <Download className="h-4 w-4" />
          Export Orders
        </Button>
      </div>

      <div className="rounded-md border border-border/60 bg-card/50 backdrop-blur-sm">
        <DataTable columns={orderListColumns} data={data} filterColumn="customer" filterPlaceholder="Filter customers..." />
      </div>
    </div>
  );
}
