import { LoanData, LoanSummary } from "@/types/loan";

export const calculateLoanEligibility = (data: LoanData): LoanSummary => {
  const { name, loanAmount, salary, creditScore, loanPurpose } = data;
  
  // Eligibility logic
  const eligible = creditScore >= 650 && salary >= 25000 && loanAmount <= salary * 60;
  
  // Interest rate based on credit score
  let interestRate: number;
  if (creditScore >= 750) {
    interestRate = 10.5;
  } else if (creditScore >= 700) {
    interestRate = 11.5;
  } else if (creditScore >= 650) {
    interestRate = 13.0;
  } else {
    interestRate = 15.0;
  }
  
  // Default tenure of 5 years (60 months)
  const tenure = 60;
  
  // EMI calculation using formula: [P x R x (1+R)^N]/[(1+R)^N-1]
  const principal = loanAmount;
  const monthlyRate = interestRate / 12 / 100;
  const emi = eligible
    ? (principal * monthlyRate * Math.pow(1 + monthlyRate, tenure)) /
      (Math.pow(1 + monthlyRate, tenure) - 1)
    : 0;
  
  return {
    name,
    loanAmount,
    salary,
    creditScore,
    loanPurpose,
    eligible,
    interestRate,
    emi: Math.round(emi),
    tenure,
  };
};
