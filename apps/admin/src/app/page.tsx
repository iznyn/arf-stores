import { Card, CardContent, CardDescription, CardHeader, CardTitle, Badge, Button } from '@arfcodes/ui';
import { Package, ShoppingCart, Users, DollarSign, Activity, CreditCard, TrendingUp, AlertTriangle, ArrowUpRight } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex-1 space-y-6 animate-fade-in">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground">Dashboard</h2>
          <p className="text-muted-foreground mt-1 text-sm">Welcome back to your store administration.</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button>Download Report</Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="relative overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">Rp 45.231.000</div>
            <div className="flex items-center text-xs text-emerald-500 mt-1">
              <TrendingUp className="h-3 w-3 mr-1" />
              <span>+20.1%</span>
              <span className="text-muted-foreground ml-1">from last month</span>
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-linear-to-r from-blue-500/0 via-blue-500/20 to-blue-500/0 opacity-0 group-hover:opacity-100 transition-opacity" />
          </CardContent>
        </Card>
        
        <Card className="relative overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Sales</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">+235</div>
            <div className="flex items-center text-xs text-emerald-500 mt-1">
              <TrendingUp className="h-3 w-3 mr-1" />
              <span>+180.1%</span>
              <span className="text-muted-foreground ml-1">from last month</span>
            </div>
          </CardContent>
        </Card>
        
        <Card className="relative overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active Products</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">1,203</div>
            <div className="flex items-center text-xs text-muted-foreground mt-1">
              <span>+19 new this week</span>
            </div>
          </CardContent>
        </Card>
        
        <Card className="relative overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active Customers</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">+573</div>
            <div className="flex items-center text-xs text-muted-foreground mt-1">
              <span>+201 since last week</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4 border-border/60">
          <CardHeader>
            <CardTitle>Overview</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <div className="h-[350px] w-full flex items-center justify-center border border-dashed border-border/50 rounded-md bg-secondary/5 relative overflow-hidden">
              {/* Subtle Grid Pattern for the chart area */}
              <div className="absolute inset-0" style={{ 
                backgroundImage: 'radial-gradient(circle, #334155 1px, transparent 1px)', 
                backgroundSize: '20px 20px', 
                opacity: 0.2 
              }}></div>
              <p className="text-sm text-muted-foreground relative z-10">Chart Visualization Area</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="col-span-3 border-border/60">
          <CardHeader className="flex flex-row items-start justify-between pb-4">
            <div>
              <CardTitle>Low Stock Alerts</CardTitle>
              <CardDescription className="mt-1">Items that need to be restocked soon.</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex items-center justify-between group">
                  <div className="flex items-center gap-4">
                    <div className="flex h-9 w-9 items-center justify-center rounded-md border border-border/50 bg-secondary/20 transition-colors group-hover:bg-secondary/40 group-hover:border-border">
                      <Package className="h-4 w-4 text-muted-foreground transition-colors group-hover:text-foreground" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none text-foreground group-hover:text-primary transition-colors">Product Item {i}</p>
                      <p className="text-xs text-muted-foreground">SKU: PROD-00{i}</p>
                    </div>
                  </div>
                  <div className="font-medium">
                    <Badge variant="destructive" className="h-6">
                      {i * 2} left
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6">
              <Button variant="outline" className="w-full gap-2 bg-secondary/20 border-border/50 hover:bg-secondary/40">
                View All Inventory
                <ArrowUpRight className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
