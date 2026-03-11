import { Typography } from '@arfcodes/ui';

export default function DistributorsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <Typography variant="h2">Distributors</Typography>
          <Typography variant="muted">Manage supplier information and purchase history.</Typography>
        </div>
      </div>
    </div>
  );
}
