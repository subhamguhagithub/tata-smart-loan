import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LoanData, LoanSummary } from "@/types/loan";
import { calculateLoanEligibility } from "@/utils/loanCalculator";
import { generateSanctionLetter } from "@/utils/pdfGenerator";
import { CheckCircle, XCircle, Download, Home, FileText } from "lucide-react";
import { toast } from "sonner";

const Summary = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [summary, setSummary] = useState<LoanSummary | null>(null);

  useEffect(() => {
    const loanData = location.state?.loanData as LoanData;
    
    if (!loanData) {
      navigate("/");
      return;
    }

    const calculatedSummary = calculateLoanEligibility(loanData);
    setSummary(calculatedSummary);
  }, [location, navigate]);

  const handleDownload = () => {
    if (summary && summary.eligible) {
      generateSanctionLetter(summary);
      toast.success("Sanction letter downloaded successfully!");
    }
  };

  if (!summary) return null;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-hero text-primary-foreground shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-2xl md:text-3xl font-bold text-center">Loan Application Summary</h1>
          <p className="text-center text-primary-foreground/80 mt-2">
            {summary.eligible ? "Congratulations! 🎉" : "Application Review"}
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Eligibility Status */}
        <Card className="mb-6 border-2 animate-slide-up" style={{
          borderColor: summary.eligible ? "hsl(var(--success))" : "hsl(var(--destructive))"
        }}>
          <CardContent className="pt-6">
            <div className="flex items-center justify-center gap-3 mb-4">
              {summary.eligible ? (
                <CheckCircle className="w-12 h-12 text-success" />
              ) : (
                <XCircle className="w-12 h-12 text-destructive" />
              )}
              <div>
                <h2 className="text-2xl font-bold text-foreground">
                  {summary.eligible ? "Loan Approved!" : "Loan Not Eligible"}
                </h2>
                <p className="text-muted-foreground">
                  {summary.eligible
                    ? "Your loan application has been pre-approved"
                    : "Unfortunately, you don't meet the eligibility criteria"}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Personal Details */}
          <Card className="animate-fade-in" style={{ animationDelay: "100ms" }}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-primary" />
                Personal Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Name:</span>
                <span className="font-semibold text-foreground">{summary.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Loan Amount:</span>
                <span className="font-semibold text-foreground">
                  ₹{summary.loanAmount.toLocaleString("en-IN")}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Monthly Salary:</span>
                <span className="font-semibold text-foreground">
                  ₹{summary.salary.toLocaleString("en-IN")}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Credit Score:</span>
                <span className="font-semibold text-foreground">{summary.creditScore}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Purpose:</span>
                <span className="font-semibold text-foreground">{summary.loanPurpose}</span>
              </div>
            </CardContent>
          </Card>

          {/* Loan Terms */}
          <Card className="animate-fade-in" style={{ animationDelay: "200ms" }}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-primary" />
                Loan Terms
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Interest Rate:</span>
                <span className="font-semibold text-foreground">{summary.interestRate}% p.a.</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Tenure:</span>
                <span className="font-semibold text-foreground">{summary.tenure} months</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Monthly EMI:</span>
                <span className="font-semibold text-foreground">
                  {summary.eligible
                    ? `₹${summary.emi.toLocaleString("en-IN")}`
                    : "N/A"}
                </span>
              </div>
              <div className="flex justify-between pt-3 border-t border-border">
                <span className="text-muted-foreground">Total Payable:</span>
                <span className="font-bold text-lg text-foreground">
                  {summary.eligible
                    ? `₹${(summary.emi * summary.tenure).toLocaleString("en-IN")}`
                    : "N/A"}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: "300ms" }}>
          {summary.eligible && (
            <Button
              size="lg"
              onClick={handleDownload}
              className="bg-success hover:bg-success/90 text-success-foreground"
            >
              <Download className="mr-2 h-5 w-5" />
              Download Sanction Letter
            </Button>
          )}
          <Button
            size="lg"
            variant="outline"
            onClick={() => navigate("/")}
          >
            <Home className="mr-2 h-5 w-5" />
            Back to Home
          </Button>
        </div>

        {/* Additional Info */}
        {!summary.eligible && (
          <Card className="mt-6 bg-muted animate-fade-in" style={{ animationDelay: "400ms" }}>
            <CardContent className="pt-6">
              <h3 className="font-semibold mb-2 text-foreground">Why was my application not approved?</h3>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                {summary.creditScore < 650 && (
                  <li>Credit score below minimum requirement (650+)</li>
                )}
                {summary.salary < 25000 && (
                  <li>Monthly salary below minimum requirement (₹25,000+)</li>
                )}
                {summary.loanAmount > summary.salary * 60 && (
                  <li>Loan amount exceeds eligibility limit based on salary</li>
                )}
              </ul>
              <p className="mt-4 text-sm text-muted-foreground">
                You can reapply after improving your credit score or adjusting the loan amount.
              </p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-8 mt-12">
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

export default Summary;
