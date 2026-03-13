import { Button } from "@arfcodes/ui";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

interface PageHeaderProps {
  title: string;
  description: string;
  backLink?: string;
  backLabel?: string;
}

export function PageHeader({ title, description, backLink, backLabel = "Back" }: PageHeaderProps) {
  return (
    <div className="space-y-4">
      {backLink && (
        <Link href={backLink}>
          <Button variant="ghost" size="sm">
            <ArrowLeft className="w-4 h-4 mr-2" />
            {backLabel}
          </Button>
        </Link>
      )}
      <div>
        <h1 className="text-3xl font-semibold text-white">{title}</h1>
        <p className="text-sm text-zinc-400 mt-1">{description}</p>
      </div>
    </div>
  );
}
