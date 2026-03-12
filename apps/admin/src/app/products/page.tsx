import { DataTable } from '@arfcodes/ui';
import { columns } from './columns';
import { AddProductDialog } from './components/AddProductDialog';
import { getProducts } from '../../lib/actions/products';

export default async function ProductsPage() {
  const data = await getProducts();

  return (
    <div className="flex flex-col gap-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground">Products</h2>
          <p className="text-muted-foreground mt-1 text-sm">Manage your product catalog and variants.</p>
        </div>
        <AddProductDialog />
      </div>
      
      <div className="rounded-md border border-border/60 bg-card/50 backdrop-blur-sm">
        <DataTable columns={columns} data={data} filterColumn="name" />
      </div>
    </div>
  );
}
