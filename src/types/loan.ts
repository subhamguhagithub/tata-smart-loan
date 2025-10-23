export interface LoanData {
  name: string;
  loanAmount: number;
  salary: number;
  creditScore: number;
  loanPurpose: string;
}

export interface LoanSummary extends LoanData {
  eligible: boolean;
  interestRate: number;
  emi: number;
  tenure: number;
}
