import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Minus, Plus, Trash2, ShoppingBag, CreditCard } from "lucide-react";
import { useCart } from "@/contexts/CartContext";

const Cart = () => {
  const { items: cartItems, updateQuantity, removeFromCart, getTotalPrice } = useCart();
  
  // Get product image or fallback
  const getProductImage = (product: any) => {
    if (product.image_url) {
      return product.image_url;
    }
    return "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=150&h=150&fit=crop";
  };

  const subtotal = getTotalPrice();
  const deliveryFee = 4.99;
  const total = subtotal + deliveryFee;

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2 text-foreground">
            Your Cart
          </h1>
          <p className="text-lg text-muted-foreground">
            {cartItems.length} items ready for checkout
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-6 text-foreground">Cart Items</h2>
              
              <div className="space-y-6">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center gap-4 pb-6 border-b border-border last:border-b-0 last:pb-0">
                    <img 
                      src={getProductImage(item.product)}
                      alt={item.product["product-name"]}
                      className="w-20 h-20 rounded-lg object-cover"
                    />
                    
                    <div className="flex-1">
                      <h3 className="font-medium text-foreground">{item.product["product-name"]}</h3>
                      <p className="text-sm text-muted-foreground">Local Farm</p>
                      <p className="text-lg font-semibold text-primary mt-1">${item.product.price}</p>
                    </div>

                    <div className="flex items-center gap-3">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="w-12 text-center font-medium">{item.quantity}</span>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="text-right">
                      <p className="font-semibold text-foreground">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </p>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="mt-2 text-destructive hover:text-destructive"
                        onClick={() => removeFromCart(item.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              {cartItems.length === 0 && (
                <div className="text-center py-12">
                  <ShoppingBag className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-foreground mb-2">Your cart is empty</h3>
                  <p className="text-muted-foreground mb-4">
                    Add some fresh products from local farmers
                  </p>
                  <Button asChild>
                    <a href="/marketplace">Start Shopping</a>
                  </Button>
                </div>
              )}
            </Card>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-24">
              <h2 className="text-xl font-semibold mb-6 text-foreground">Order Summary</h2>
              
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-medium">${subtotal.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Delivery Fee</span>
                  <span className="font-medium">${deliveryFee.toFixed(2)}</span>
                </div>
                
                <Separator />
                
                <div className="flex justify-between text-lg font-semibold">
                  <span>Total</span>
                  <span className="text-primary">${total.toFixed(2)}</span>
                </div>
              </div>

              <div className="mt-6 space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Promo Code</label>
                  <div className="flex gap-2">
                    <Input placeholder="Enter code" />
                    <Button variant="outline">Apply</Button>
                  </div>
                </div>

                <Button className="w-full" size="lg" disabled={cartItems.length === 0}>
                  <CreditCard className="h-4 w-4 mr-2" />
                  Proceed to Checkout
                </Button>
              </div>

              <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                <p className="text-sm text-center text-muted-foreground">
                  <strong>Note:</strong> Secure checkout and payment processing 
                  requires Supabase integration with Stripe.
                </p>
              </div>

              {/* Delivery Info */}
              <div className="mt-6 p-4 bg-success/10 rounded-lg">
                <h3 className="font-medium text-success mb-2">Free Delivery</h3>
                <p className="text-sm text-muted-foreground">
                  On orders over $50 within 10 miles of participating farms
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;