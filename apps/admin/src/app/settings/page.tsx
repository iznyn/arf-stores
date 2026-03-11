import { Typography } from '@arfcodes/ui';

export default function SettingsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <Typography variant="h2">Settings</Typography>
          <Typography variant="muted">Manage store configuration and application settings.</Typography>
        </div>
      </div>
    </div>
  );
}
