import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { ImageUpload } from "@/components/ImageUpload";
import { useAuth } from "@/hooks/useAuth";
import { useUserProducts } from "@/hooks/useUserProducts";
import { useProductManagement, ProductFormData } from "@/hooks/useProductManagement";
import { Plus, Edit, Trash2, DollarSign, Package, TrendingUp, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { user, loading: authLoading } = useAuth();
  const { products, loading: productsLoading, refetch } = useUserProducts();
  const { addProduct, deleteProduct, loading: managementLoading } = useProductManagement();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<ProductFormData>({
    'product-name': '',
    description: '',
    price: 0,
    quantity: 0,
    image_url: ''
  });

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/login');
    }
  }, [user, authLoading, navigate]);

  if (authLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect to login
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData['product-name'] || !formData.price) {
      return;
    }

    const success = await addProduct(formData);
    if (success) {
      // Reset form
      setFormData({
        'product-name': '',
        description: '',
        price: 0,
        quantity: 0,
        image_url: ''
      });
      // Refetch products
      refetch();
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      const success = await deleteProduct(id);
      if (success) {
        refetch();
      }
    }
  };

  const handleInputChange = (field: keyof ProductFormData, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };
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
            Welcome back, {user.email}
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Products</p>
                <p className="text-2xl font-bold text-foreground">{products.length}</p>
              </div>
              <Package className="h-8 w-8 text-primary" />
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Sales</p>
                <p className="text-2xl font-bold text-foreground">Coming Soon</p>
              </div>
              <DollarSign className="h-8 w-8 text-success" />
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">This Week</p>
                <p className="text-2xl font-bold text-foreground">Coming Soon</p>
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
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="productName">Product Name</Label>
                  <Input 
                    id="productName" 
                    placeholder="e.g., Organic Tomatoes"
                    value={formData['product-name']}
                    onChange={(e) => handleInputChange('product-name', e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="price">Price per Unit</Label>
                  <Input 
                    id="price" 
                    type="number" 
                    step="0.01" 
                    placeholder="4.99"
                    value={formData.price || ''}
                    onChange={(e) => handleInputChange('price', parseFloat(e.target.value) || 0)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="quantity">Quantity Available</Label>
                  <Input 
                    id="quantity" 
                    type="number" 
                    placeholder="25"
                    value={formData.quantity || ''}
                    onChange={(e) => handleInputChange('quantity', parseInt(e.target.value) || 0)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea 
                    id="description" 
                    placeholder="Fresh, vine-ripened organic tomatoes..."
                    className="h-20"
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                  />
                </div>

                <ImageUpload
                  onImageUpload={(url) => handleInputChange('image_url', url)}
                  currentImage={formData.image_url}
                  onImageRemove={() => handleInputChange('image_url', '')}
                />

                <Button type="submit" className="w-full" disabled={managementLoading}>
                  {managementLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Adding Product...
                    </>
                  ) : (
                    <>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Product
                    </>
                  )}
                </Button>
              </form>
            </Card>
          </div>

          {/* Products List */}
          <div className="lg:col-span-2">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-foreground">Your Products</h2>
                <Badge variant="outline">{products.length} products</Badge>
              </div>

              {productsLoading ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="h-8 w-8 animate-spin" />
                </div>
              ) : (
                <>
                  <div className="space-y-4">
                    {products.map((product) => (
                      <div 
                        key={product.id}
                        className="flex items-center justify-between p-4 border border-border rounded-lg hover:shadow-soft transition-shadow"
                      >
                        <div className="flex items-center gap-4">
                          <img 
                            src={product.image_url || "https://images.unsplash.com/photo-1564707329-7a3f0c5e3c28?w=150&h=150&fit=crop"}
                            alt={product["product-name"]}
                            className="w-16 h-16 rounded-lg object-cover"
                          />
                          <div>
                            <h3 className="font-medium text-foreground">{product["product-name"]}</h3>
                            <p className="text-sm text-muted-foreground">${product.price} each</p>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge 
                                variant={(product.quantity || 0) > 0 ? 'default' : 'destructive'}
                              >
                                {(product.quantity || 0) > 0 ? 'In Stock' : 'Out of Stock'}
                              </Badge>
                              <span className="text-sm text-muted-foreground">
                                Qty: {product.quantity || 0}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleDelete(product.id)}
                            disabled={managementLoading}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {products.length === 0 && (
                    <div className="text-center py-12">
                      <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-foreground mb-2">No products yet</h3>
                      <p className="text-muted-foreground">
                        Add your first product to get started selling on AzeezFarmlink
                      </p>
                    </div>
                  )}
                </>
              )}
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;