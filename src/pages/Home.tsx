import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MessageSquare, Shield, Zap, CheckCircle } from "lucide-react";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative bg-gradient-hero text-primary-foreground overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE2YzAtNS41MjMgNC40NzctMTAgMTAtMTBzMTAgNC40NzcgMTAgMTAtNC40NzcgMTAtMTAgMTAtMTAtNC40NzctMTAtMTB6bS0zNiAwYzAtNS41MjMgNC40NzctMTAgMTAtMTBzMTAgNC40NzcgMTAgMTAtNC40NzcgMTAtMTAgMTAtMTAtNC40NzctMTAtMTB6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-20"></div>
        
        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="max-w-3xl mx-auto text-center animate-fade-in">
            <div className="inline-flex items-center gap-2 bg-primary-foreground/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <Shield className="w-4 h-4" />
              <span className="text-sm font-medium">Trusted by millions</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Get Your Personal Loan
              <br />
              <span className="text-primary-foreground/90">in Minutes</span>
            </h1>
            
            <p className="text-lg md:text-xl mb-8 text-primary-foreground/80 max-w-2xl mx-auto">
              Experience the future of lending with our AI-powered loan assistant.
              Quick, secure, and hassle-free personal loans at competitive rates.
            </p>
            
            <Button
              size="lg"
              onClick={() => navigate("/chat")}
              className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 text-lg px-8 py-6 h-auto shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <MessageSquare className="mr-2 h-5 w-5" />
              Start Your Application
            </Button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="text-center p-6 rounded-xl bg-card shadow-card hover:shadow-lg transition-shadow duration-300 animate-slide-up" style={{ animationDelay: "100ms" }}>
            <div className="w-16 h-16 bg-primary-light rounded-full flex items-center justify-center mx-auto mb-4">
              <Zap className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-foreground">Instant Approval</h3>
            <p className="text-muted-foreground">
              Get loan approval in minutes with our AI-powered assessment
            </p>
          </div>

          <div className="text-center p-6 rounded-xl bg-card shadow-card hover:shadow-lg transition-shadow duration-300 animate-slide-up" style={{ animationDelay: "200ms" }}>
            <div className="w-16 h-16 bg-primary-light rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-foreground">Secure & Safe</h3>
            <p className="text-muted-foreground">
              Your data is protected with bank-grade security protocols
            </p>
          </div>

          <div className="text-center p-6 rounded-xl bg-card shadow-card hover:shadow-lg transition-shadow duration-300 animate-slide-up" style={{ animationDelay: "300ms" }}>
            <div className="w-16 h-16 bg-primary-light rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-foreground">Flexible Terms</h3>
            <p className="text-muted-foreground">
              Customize your loan tenure and amount as per your needs
            </p>
          </div>
        </div>
      </div>

      {/* Why Choose Section */}
      <div className="bg-muted py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-foreground">
              Why Choose Tata Capital?
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              {[
                "Competitive interest rates starting from 10.5%",
                "Loan amounts up to ₹25 lakhs",
                "Flexible tenure from 12 to 60 months",
                "No hidden charges or processing fees",
                "24/7 customer support",
                "Quick disbursal within 48 hours",
              ].map((feature, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-4 bg-card rounded-lg shadow-sm animate-fade-in"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                  <span className="text-foreground">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground">
            Made by Team TechVenture - Techathon 6.0
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            © 2025 Tata Capital. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
