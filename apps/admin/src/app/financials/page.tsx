import { Typography } from '@arfcodes/ui';

export default function FinancialsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <Typography variant="h2">Financials</Typography>
          <Typography variant="muted">Track revenue, expenses, and profitability.</Typography>
        </div>
      </div>
    </div>
  );
}
