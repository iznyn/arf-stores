import { Button } from "@arfcodes/ui";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/users">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Users
          </Button>
        </Link>
      </div>
      <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20">
        <p className="text-sm text-red-400">User not found</p>
      </div>
    </div>
  );
}
