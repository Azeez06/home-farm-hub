import Navigation from "@/components/Navigation";
import HeroSection from "@/components/ui/hero-section";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Truck, Shield, Clock, Star } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <HeroSection />
      
      {/* How It Works Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
              How AzeezFarmlink Works
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Connecting local farmers with their community has never been easier
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <Card className="p-6 text-center card-gradient shadow-soft">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Browse Products</h3>
              <p className="text-muted-foreground">
                Discover fresh, local produce from farmers in your area
              </p>
            </Card>

            <Card className="p-6 text-center card-gradient shadow-soft">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Add to Cart</h3>
              <p className="text-muted-foreground">
                Select your favorite items and quantities with ease
              </p>
            </Card>

            <Card className="p-6 text-center card-gradient shadow-soft">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Secure Checkout</h3>
              <p className="text-muted-foreground">
                Safe and simple payment process with instant confirmation
              </p>
            </Card>

            <Card className="p-6 text-center card-gradient shadow-soft">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">4</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Fresh Delivery</h3>
              <p className="text-muted-foreground">
                Receive your fresh produce directly from the farm
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
              Why Choose AzeezFarmlink?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <Truck className="h-16 w-16 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Fast Delivery</h3>
              <p className="text-muted-foreground">
                Quick delivery straight from farm to your doorstep
              </p>
            </div>

            <div className="text-center">
              <Shield className="h-16 w-16 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Quality Guaranteed</h3>
              <p className="text-muted-foreground">
                Fresh, organic produce with quality assurance
              </p>
            </div>

            <div className="text-center">
              <Clock className="h-16 w-16 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Always Fresh</h3>
              <p className="text-muted-foreground">
                Harvest-fresh products picked at peak ripeness
              </p>
            </div>

            <div className="text-center">
              <Star className="h-16 w-16 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Trusted Farmers</h3>
              <p className="text-muted-foreground">
                Verified local farmers with excellent track records
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 hero-gradient">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            Ready to Support Local Farmers?
          </h2>
          <p className="text-xl mb-8 text-white/90">
            Join thousands of customers who choose fresh, local produce
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-white text-primary hover:bg-white/90 text-lg px-8 py-6"
              asChild
            >
              <Link to="/marketplace">Start Shopping</Link>
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-white text-white hover:bg-white/10 text-lg px-8 py-6"
              asChild
            >
              <Link to="/signup">Become a Farmer</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-4 text-foreground">AzeezFarmlink</h3>
              <p className="text-muted-foreground">
                Connecting local farmers with their community for fresh, sustainable produce.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-foreground">For Customers</h4>
              <div className="space-y-2 text-muted-foreground">
                <div><Link to="/marketplace" className="hover:text-primary transition-colors">Browse Products</Link></div>
                <div><Link to="/about" className="hover:text-primary transition-colors">How It Works</Link></div>
                <div><Link to="/contact" className="hover:text-primary transition-colors">Contact Us</Link></div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-foreground">For Farmers</h4>
              <div className="space-y-2 text-muted-foreground">
                <div><Link to="/signup" className="hover:text-primary transition-colors">Join AzeezFarmlink</Link></div>
                <div><Link to="/dashboard" className="hover:text-primary transition-colors">Farmer Dashboard</Link></div>
                <div><Link to="/contact" className="hover:text-primary transition-colors">Support</Link></div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-foreground">Company</h4>
              <div className="space-y-2 text-muted-foreground">
                <div><Link to="/about" className="hover:text-primary transition-colors">About Us</Link></div>
                <div><a href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</a></div>
                <div><a href="/terms" className="hover:text-primary transition-colors">Terms of Service</a></div>
              </div>
            </div>
          </div>
          <div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground">
            <p>&copy; 2024 AzeezFarmlink. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
