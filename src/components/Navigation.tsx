import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Sprout, ShoppingCart, User } from "lucide-react";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-background/95 backdrop-blur-sm border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <Sprout className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold text-foreground">AzeezFarmlink</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/marketplace" className="text-foreground hover:text-primary transition-colors">
              Marketplace
            </Link>
            <Link to="/about" className="text-foreground hover:text-primary transition-colors">
              About
            </Link>
            <Link to="/contact" className="text-foreground hover:text-primary transition-colors">
              Contact
            </Link>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" size="sm" asChild>
              <Link to="/cart">
                <ShoppingCart className="h-4 w-4 mr-2" />
                Cart
              </Link>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <Link to="/login">Login</Link>
            </Button>
            <Button size="sm" asChild>
              <Link to="/signup">Get Started</Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-background border-t border-border">
              <Link
                to="/marketplace"
                className="block px-3 py-2 text-foreground hover:text-primary transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Marketplace
              </Link>
              <Link
                to="/about"
                className="block px-3 py-2 text-foreground hover:text-primary transition-colors"
                onClick={() => setIsOpen(false)}
              >
                About
              </Link>
              <Link
                to="/contact"
                className="block px-3 py-2 text-foreground hover:text-primary transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Contact
              </Link>
              <div className="pt-4 border-t border-border mt-4">
                <div className="flex flex-col space-y-2">
                  <Button variant="ghost" size="sm" asChild>
                    <Link to="/cart" onClick={() => setIsOpen(false)}>
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Cart
                    </Link>
                  </Button>
                  <Button variant="outline" size="sm" asChild>
                    <Link to="/login" onClick={() => setIsOpen(false)}>Login</Link>
                  </Button>
                  <Button size="sm" asChild>
                    <Link to="/signup" onClick={() => setIsOpen(false)}>Get Started</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;