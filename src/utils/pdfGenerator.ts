import jsPDF from "jspdf";
import { LoanSummary } from "@/types/loan";

export const generateSanctionLetter = (summary: LoanSummary) => {
  const doc = new jsPDF();
  
  // Header
  doc.setFillColor(0, 102, 204);
  doc.rect(0, 0, 210, 40, "F");
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(24);
  doc.setFont("helvetica", "bold");
  doc.text("TATA CAPITAL", 105, 20, { align: "center" });
  
  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");
  doc.text("Personal Loan Sanction Letter", 105, 30, { align: "center" });
  
  // Body
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(11);
  
  const startY = 55;
  const lineHeight = 8;
  
  doc.text(`Date: ${new Date().toLocaleDateString("en-IN")}`, 20, startY);
  
  doc.setFont("helvetica", "bold");
  doc.text(`Dear ${summary.name},`, 20, startY + lineHeight * 2);
  
  doc.setFont("helvetica", "normal");
  doc.text(
    "We are pleased to inform you that your personal loan application has been",
    20,
    startY + lineHeight * 3.5
  );
  doc.text("approved subject to the terms and conditions mentioned below:", 20, startY + lineHeight * 4.5);
  
  // Loan Details Box
  doc.setDrawColor(0, 102, 204);
  doc.setLineWidth(0.5);
  doc.rect(20, startY + lineHeight * 6, 170, 50);
  
  doc.setFont("helvetica", "bold");
  doc.text("LOAN DETAILS", 25, startY + lineHeight * 7);
  
  doc.setFont("helvetica", "normal");
  const detailsY = startY + lineHeight * 8.5;
  doc.text(`Loan Amount:`, 25, detailsY);
  doc.text(`₹${summary.loanAmount.toLocaleString("en-IN")}`, 120, detailsY);
  
  doc.text(`Interest Rate:`, 25, detailsY + lineHeight);
  doc.text(`${summary.interestRate}% p.a.`, 120, detailsY + lineHeight);
  
  doc.text(`Loan Tenure:`, 25, detailsY + lineHeight * 2);
  doc.text(`${summary.tenure} months`, 120, detailsY + lineHeight * 2);
  
  doc.text(`Monthly EMI:`, 25, detailsY + lineHeight * 3);
  doc.text(`₹${summary.emi.toLocaleString("en-IN")}`, 120, detailsY + lineHeight * 3);
  
  doc.text(`Loan Purpose:`, 25, detailsY + lineHeight * 4);
  doc.text(summary.loanPurpose, 120, detailsY + lineHeight * 4);
  
  // Terms
  const termsY = startY + lineHeight * 16;
  doc.setFont("helvetica", "bold");
  doc.text("Terms & Conditions:", 20, termsY);
  
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.text("• The loan is subject to processing fees and other charges as applicable.", 20, termsY + lineHeight * 0.8);
  doc.text("• Pre-payment charges may apply as per policy.", 20, termsY + lineHeight * 1.6);
  doc.text("• Final disbursement is subject to document verification.", 20, termsY + lineHeight * 2.4);
  
  // Footer
  doc.setFontSize(11);
  doc.text(
    "This is a system-generated letter and does not require a signature.",
    105,
    270,
    { align: "center" }
  );
  
  doc.setFont("helvetica", "bold");
  doc.text("Thank you for choosing Tata Capital!", 105, 280, { align: "center" });
  
  // Save
  doc.save(`Sanction_Letter_${summary.name.replace(/\s+/g, "_")}.pdf`);
};
