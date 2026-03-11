import { Typography } from '@arfcodes/ui';

export default function CustomersPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <Typography variant="h2">Customers</Typography>
          <Typography variant="muted">Manage customer database and credit limits.</Typography>
        </div>
      </div>
    </div>
  );
}
