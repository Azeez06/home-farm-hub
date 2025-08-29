import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import { Sprout } from "lucide-react";

const Signup = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // This will require Supabase integration
    console.log("Signup form submitted");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="flex items-center justify-center px-4 py-12">
        <Card className="w-full max-w-md p-8 shadow-medium">
          <div className="text-center mb-8">
            <Sprout className="h-12 w-12 text-primary mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-foreground">Join AzeezFarmlink</h1>
            <p className="text-muted-foreground">Create your account to get started</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="user-type">I am a:</Label>
              <Select required>
                <SelectTrigger>
                  <SelectValue placeholder="Select account type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="consumer">Consumer</SelectItem>
                  <SelectItem value="farmer">Farmer</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input 
                  id="firstName" 
                  type="text" 
                  placeholder="John"
                  required 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input 
                  id="lastName" 
                  type="text" 
                  placeholder="Smith"
                  required 
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="farmer@example.com"
                required 
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input 
                id="phone" 
                type="tel" 
                placeholder="(555) 123-4567"
                required 
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input 
                id="password" 
                type="password" 
                placeholder="Create a strong password"
                required 
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input 
                id="confirmPassword" 
                type="password" 
                placeholder="Confirm your password"
                required 
              />
            </div>

            <div className="flex items-start space-x-2">
              <input 
                type="checkbox" 
                id="terms" 
                className="mt-1 rounded border-border"
                required 
              />
              <label htmlFor="terms" className="text-sm text-muted-foreground">
                I agree to the{" "}
                <Link to="/terms" className="text-primary hover:underline">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link to="/privacy" className="text-primary hover:underline">
                  Privacy Policy
                </Link>
              </label>
            </div>

            <Button type="submit" className="w-full">
              Create Account
            </Button>
          </form>

          <div className="mt-6">
            <Separator className="my-4" />
            <p className="text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link to="/login" className="text-primary hover:underline">
                Sign in here
              </Link>
            </p>
          </div>

          <div className="mt-6 p-4 bg-muted/50 rounded-lg">
            <p className="text-sm text-center text-muted-foreground">
              <strong>Note:</strong> Authentication requires Supabase integration. 
              Click the green Supabase button to set up user accounts.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Signup;