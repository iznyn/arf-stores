import { Typography } from '@arfcodes/ui';

export default function OrdersPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <Typography variant="h2">Orders</Typography>
          <Typography variant="muted">Manage customer orders and shipping.</Typography>
        </div>
      </div>
    </div>
  );
}
