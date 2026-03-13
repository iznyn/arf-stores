import { DataTable } from '@arfcodes/ui';
import { productListColumns } from '@/components/molecules/Product/ProductListColumns';
import { AddProductDialog } from '@/components/molecules/Product/AddProductDialog';
import { getProducts } from '@/lib/actions/products/getProducts';
import { Product } from '@/lib/types/actions/product.types';

export default async function ProductsPage() {
  const data: Product[] = await getProducts();

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
        <DataTable columns={productListColumns} data={data} filterColumn="name" />
      </div>
    </div>
  );
}
