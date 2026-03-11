import { Typography } from '@arfcodes/ui';

export default function InventoryPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <Typography variant="h2">Inventory</Typography>
          <Typography variant="muted">Track stock levels and manage purchase orders.</Typography>
        </div>
      </div>
    </div>
  );
}
