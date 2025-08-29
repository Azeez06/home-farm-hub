import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2, DollarSign, Package, TrendingUp } from "lucide-react";

// Mock farmer data
const farmerData = {
  name: "Green Valley Farm",
  email: "farmer@greenvalley.com",
  totalProducts: 12,
  totalSales: 2450.50,
  thisWeekSales: 340.25
};

// Mock products data
const farmerProducts = [
  {
    id: 1,
    name: "Organic Tomatoes",
    price: 4.99,
    quantity: 25,
    status: "active",
    image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=150&h=150&fit=crop"
  },
  {
    id: 2,
    name: "Fresh Carrots",
    price: 2.99,
    quantity: 0,
    status: "out_of_stock",
    image: "https://images.unsplash.com/photo-1445282768818-728615cc910a?w=150&h=150&fit=crop"
  },
  {
    id: 3,
    name: "Farm Fresh Eggs",
    price: 6.99,
    quantity: 18,
    status: "active",
    image: "https://images.unsplash.com/photo-1506976785307-8732e854ad03?w=150&h=150&fit=crop"
  }
];

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2 text-foreground">
            Farmer Dashboard
          </h1>
          <p className="text-lg text-muted-foreground">
            Welcome back, {farmerData.name}
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Products</p>
                <p className="text-2xl font-bold text-foreground">{farmerData.totalProducts}</p>
              </div>
              <Package className="h-8 w-8 text-primary" />
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Sales</p>
                <p className="text-2xl font-bold text-foreground">${farmerData.totalSales}</p>
              </div>
              <DollarSign className="h-8 w-8 text-success" />
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">This Week</p>
                <p className="text-2xl font-bold text-foreground">${farmerData.thisWeekSales}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-farm-gold" />
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Add New Product Form */}
          <div className="lg:col-span-1">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4 text-foreground">Add New Product</h2>
              <form className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="productName">Product Name</Label>
                  <Input id="productName" placeholder="e.g., Organic Tomatoes" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="price">Price per Unit</Label>
                  <Input id="price" type="number" step="0.01" placeholder="4.99" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="quantity">Quantity Available</Label>
                  <Input id="quantity" type="number" placeholder="25" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea 
                    id="description" 
                    placeholder="Fresh, vine-ripened organic tomatoes..."
                    className="h-20"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="photo">Product Photo</Label>
                  <Input id="photo" type="file" accept="image/*" />
                </div>

                <Button type="submit" className="w-full">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Product
                </Button>
              </form>

              <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                <p className="text-sm text-center text-muted-foreground">
                  <strong>Note:</strong> Product management requires Supabase integration 
                  for database storage and file uploads.
                </p>
              </div>
            </Card>
          </div>

          {/* Products List */}
          <div className="lg:col-span-2">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-foreground">Your Products</h2>
                <Badge variant="outline">{farmerProducts.length} products</Badge>
              </div>

              <div className="space-y-4">
                {farmerProducts.map((product) => (
                  <div 
                    key={product.id}
                    className="flex items-center justify-between p-4 border border-border rounded-lg hover:shadow-soft transition-shadow"
                  >
                    <div className="flex items-center gap-4">
                      <img 
                        src={product.image}
                        alt={product.name}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                      <div>
                        <h3 className="font-medium text-foreground">{product.name}</h3>
                        <p className="text-sm text-muted-foreground">${product.price} each</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge 
                            variant={product.status === 'active' ? 'default' : 'destructive'}
                          >
                            {product.status === 'active' ? 'Active' : 'Out of Stock'}
                          </Badge>
                          <span className="text-sm text-muted-foreground">
                            Qty: {product.quantity}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              {farmerProducts.length === 0 && (
                <div className="text-center py-12">
                  <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-foreground mb-2">No products yet</h3>
                  <p className="text-muted-foreground">
                    Add your first product to get started selling on FarmLink
                  </p>
                </div>
              )}
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;