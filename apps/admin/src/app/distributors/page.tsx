import { DataTable, Button, Typography } from '@arfcodes/ui';
import { Download, Plus } from 'lucide-react';
import { distributorListColumns, Distributor } from '@/components/molecules/Distributor/DistributorListColumns';

const data: Distributor[] = [
  {
    id: "dist-001",
    name: "Global Tech Supplies",
    contactPerson: "Sarah Connor",
    email: "sarah@globaltech.com",
    phone: "+62 812-9876-5432",
    status: "active",
    rating: 4.8,
    totalSupplied: 150000000,
  },
  {
    id: "dist-002",
    name: "Furniture World Inc.",
    contactPerson: "John Doe",
    email: "john@furnitureworld.com",
    phone: "+62 813-8765-4321",
    status: "active",
    rating: 4.5,
    totalSupplied: 85000000,
  },
  {
    id: "dist-003",
    name: "Audio Solutions Ltd.",
    contactPerson: "Mike Ross",
    email: "mike@audiosolutions.com",
    phone: "+62 811-7654-3210",
    status: "active",
    rating: 4.9,
    totalSupplied: 45000000,
  },
  {
    id: "dist-004",
    name: "Fast Shipping Co.",
    contactPerson: "Rachel Green",
    email: "rachel@fastshipping.com",
    phone: "+62 815-6543-2109",
    status: "pending",
    rating: 0,
    totalSupplied: 0,
  },
  {
    id: "dist-005",
    name: "Old Tech Distributors",
    contactPerson: "Harvey Specter",
    email: "harvey@oldtech.com",
    phone: "+62 819-5432-1098",
    status: "inactive",
    rating: 3.2,
    totalSupplied: 12000000,
  },
];

export default function DistributorsPage() {
  return (
    <div className="flex flex-col gap-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground">Distributors</h2>
          <p className="text-muted-foreground mt-1 text-sm">Manage supplier information and purchase history.</p>
        </div>
        <div className="flex gap-2">
            <Button variant="outline" className="gap-2">
                <Download className="h-4 w-4" />
                Export
            </Button>
            <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Add Distributor
            </Button>
        </div>
      </div>

      <div className="rounded-md border border-border/60 bg-card/50 backdrop-blur-sm">
        <DataTable columns={distributorListColumns} data={data} filterColumn="name" filterPlaceholder="Search distributors..." />
      </div>
    </div>
  );
}
