import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, ShoppingCart, MapPin, Star } from "lucide-react";

// Mock product data
const mockProducts = [
  {
    id: 1,
    name: "Organic Tomatoes",
    price: 4.99,
    unit: "lb",
    farmer: "Green Valley Farm",
    location: "5 miles away",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=300&h=300&fit=crop",
    description: "Fresh, vine-ripened organic tomatoes"
  },
  {
    id: 2,
    name: "Fresh Carrots",
    price: 2.99,
    unit: "bunch",
    farmer: "Sunrise Organics",
    location: "3 miles away", 
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1445282768818-728615cc910a?w=300&h=300&fit=crop",
    description: "Sweet, crunchy carrots straight from the ground"
  },
  {
    id: 3,
    name: "Farm Fresh Eggs",
    price: 6.99,
    unit: "dozen",
    farmer: "Happy Hen Farm",
    location: "2 miles away",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1506976785307-8732e854ad03?w=300&h=300&fit=crop",
    description: "Free-range chicken eggs from happy hens"
  },
  {
    id: 4,
    name: "Organic Spinach",
    price: 3.49,
    unit: "bunch",
    farmer: "Garden Grove",
    location: "4 miles away",
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=300&h=300&fit=crop",
    description: "Tender, nutrient-rich organic spinach"
  },
  {
    id: 5,
    name: "Sweet Corn",
    price: 1.99,
    unit: "ear",
    farmer: "Corn Field Farm",
    location: "6 miles away",
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=300&h=300&fit=crop",
    description: "Sweet, juicy corn picked fresh this morning"
  },
  {
    id: 6,
    name: "Red Bell Peppers",
    price: 5.99,
    unit: "lb",
    farmer: "Pepper Paradise",
    location: "3 miles away",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=300&h=300&fit=crop",
    description: "Crisp, sweet red bell peppers"
  }
];

const Marketplace = () => {
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
                placeholder="Search for products, farmers, or locations..." 
                className="pl-10"
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
                  <SelectItem value="distance">Distance</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Rating</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {mockProducts.map((product) => (
            <Card key={product.id} className="overflow-hidden hover:shadow-medium transition-all duration-300 group">
              <div className="relative overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 text-sm font-medium">
                  ${product.price}/${product.unit}
                </div>
              </div>
              
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-2 text-foreground">
                  {product.name}
                </h3>
                
                <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                  {product.description}
                </p>
                
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    {product.farmer} • {product.location}
                  </span>
                </div>
                
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{product.rating}</span>
                  </div>
                  <span className="text-lg font-bold text-primary">
                    ${product.price}
                  </span>
                </div>
                
                <Button className="w-full">
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Add to Cart
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <Button variant="outline" size="lg">
            Load More Products
          </Button>
        </div>

        {/* Info Note */}
        <div className="mt-12 p-6 bg-muted/50 rounded-lg">
          <p className="text-center text-muted-foreground">
            <strong>Note:</strong> This marketplace displays sample data. 
            Connect to Supabase to enable real product listings, shopping cart, and checkout functionality.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Marketplace;