import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, ShoppingCart, MapPin, Star, Loader2 } from "lucide-react";
import { useProducts } from "@/hooks/useProducts";
import { useCart } from "@/contexts/CartContext";
import { useState } from "react";

const Marketplace = () => {
  const { products, loading, error } = useProducts();
  const { addToCart } = useCart();
  const [searchTerm, setSearchTerm] = useState("");

  // Get product image or fallback to placeholder
  const getProductImage = (product: any) => {
    if (product.image_url) {
      return product.image_url;
    }
    return "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=300&h=300&fit=crop";
  };

  // Filter products based on search term
  const filteredProducts = products.filter(product =>
    product["product-name"].toLowerCase().includes(searchTerm.toLowerCase()) ||
    (product.description && product.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-center h-64">
            <Loader2 className="h-8 w-8 animate-spin" />
            <span className="ml-2">Loading products...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-red-500">
            <p>Error loading products: {error}</p>
            <Button onClick={() => window.location.reload()} className="mt-4">
              Try Again
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2 text-foreground">
            Local Marketplace
          </h1>
          <p className="text-lg text-muted-foreground">
            Fresh produce from farmers in your area
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input 
                placeholder="Search for products..." 
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex gap-2">
              <Select>
                <SelectTrigger className="w-48">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Products</SelectItem>
                  <SelectItem value="vegetables">Vegetables</SelectItem>
                  <SelectItem value="fruits">Fruits</SelectItem>
                  <SelectItem value="dairy">Dairy & Eggs</SelectItem>
                  <SelectItem value="herbs">Herbs</SelectItem>
                </SelectContent>
              </Select>

              <Select>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="newest">Newest First</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">
              {products.length === 0 
                ? "No products available yet. Check back later!"
                : "No products match your search."
              }
            </p>
            {searchTerm && (
              <Button variant="outline" onClick={() => setSearchTerm("")}>
                Clear Search
              </Button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <Card key={product.id} className="overflow-hidden hover:shadow-medium transition-all duration-300 group">
                <div className="relative overflow-hidden">
                  <img 
                    src={getProductImage(product)} 
                    alt={product["product-name"]}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 text-sm font-medium">
                    ${product.price}
                  </div>
                </div>
                
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-2 text-foreground">
                    {product["product-name"]}
                  </h3>
                  
                  <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                    {product.description || "Fresh farm product"}
                  </p>
                  
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      Local Farm • Available now
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">New</span>
                    </div>
                    <span className="text-lg font-bold text-primary">
                      ${product.price}
                    </span>
                  </div>
                  
                  {product.quantity && product.quantity > 0 ? (
                    <Button className="w-full" onClick={() => addToCart(product)}>
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Add to Cart ({product.quantity} available)
                    </Button>
                  ) : (
                    <Button className="w-full" disabled>
                      Out of Stock
                    </Button>
                  )}
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Success Note */}
        <div className="mt-12 p-6 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-center text-green-800">
            <strong>✅ Connected to Supabase!</strong> This marketplace now displays real products from your database.
            {products.length > 0 ? ` Showing ${products.length} product(s).` : " Add some products to see them here!"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Marketplace;