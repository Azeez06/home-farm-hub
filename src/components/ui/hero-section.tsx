import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Leaf, Users, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-azeezfarmlink.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 hero-gradient opacity-80" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 animate-fade-in text-balance">
            Connecting Farms
            <br />
            <span className="text-farm-gold">to Your Table</span>
          </h1>
          
          <p className="text-lg md:text-xl lg:text-2xl mb-8 text-white/90 max-w-2xl mx-auto leading-relaxed">
            Fresh, local produce delivered directly from farmers to your door. 
            Support your community while enjoying the best nature has to offer.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button size="lg" className="text-lg px-8 py-6 bg-white text-primary hover:bg-white/90" asChild>
              <Link to="/marketplace">
                Shop Now <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="text-lg px-8 py-6 border-white text-white hover:bg-white/10"
              asChild
            >
              <Link to="/signup">Join as Farmer</Link>
            </Button>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
            <Card className="p-6 bg-white/10 backdrop-blur-sm border-white/20 text-center">
              <Leaf className="h-12 w-12 text-farm-gold mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-white">Fresh & Local</h3>
              <p className="text-white/80">
                Harvest-fresh produce from local farms in your area
              </p>
            </Card>
            
            <Card className="p-6 bg-white/10 backdrop-blur-sm border-white/20 text-center">
              <Users className="h-12 w-12 text-farm-gold mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-white">Community Driven</h3>
              <p className="text-white/80">
                Support local farmers and strengthen community bonds
              </p>
            </Card>
            
            <Card className="p-6 bg-white/10 backdrop-blur-sm border-white/20 text-center">
              <ShoppingBag className="h-12 w-12 text-farm-gold mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-white">Easy Shopping</h3>
              <p className="text-white/80">
                Simple marketplace with secure checkout and delivery
              </p>
            </Card>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;