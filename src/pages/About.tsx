import Navigation from "@/components/Navigation";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            About Us
          </h1>
          <div className="max-w-3xl mx-auto">
            <p className="text-lg text-muted-foreground leading-relaxed">
              This platform connects local farmers directly with consumers. We believe in reducing middlemen exploitation, supporting small farmers, and ensuring affordable food for communities. Our mission is to strengthen food security while helping local farmers earn fairly from their hard work.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 mt-16">
          <div>
            <h2 className="text-2xl font-semibold text-foreground mb-4">Our Vision</h2>
            <p className="text-muted-foreground">
              To create a sustainable agricultural ecosystem where farmers prosper and communities have access to fresh, affordable produce.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-foreground mb-4">Our Impact</h2>
            <p className="text-muted-foreground">
              By connecting farmers directly with consumers, we eliminate unnecessary middlemen, ensuring fair prices for both producers and buyers.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default About;