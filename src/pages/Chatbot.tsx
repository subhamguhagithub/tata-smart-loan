import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ChatBubble from "@/components/ChatBubble";
import TypingIndicator from "@/components/TypingIndicator";
import { LoanData } from "@/types/loan";
import { Send, ArrowLeft } from "lucide-react";

interface Message {
  text: string;
  isUser: boolean;
}

type QuestionStep = "welcome" | "name" | "amount" | "salary" | "credit" | "purpose" | "done";

const Chatbot = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentStep, setCurrentStep] = useState<QuestionStep>("welcome");
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [loanData, setLoanData] = useState<Partial<LoanData>>({});
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    // Initial greeting
    setTimeout(() => {
      addBotMessage("Hello! Welcome to Tata Capital's AI Loan Assistant. 👋");
      setTimeout(() => {
        addBotMessage("I'm here to help you apply for a personal loan quickly and easily.");
        setTimeout(() => {
          addBotMessage("Let's get started! What is your full name?");
          setCurrentStep("name");
        }, 1500);
      }, 1500);
    }, 500);
  }, []);

  const addBotMessage = (text: string) => {
    setIsTyping(true);
    setTimeout(() => {
      setMessages((prev) => [...prev, { text, isUser: false }]);
      setIsTyping(false);
    }, 1000);
  };

  const addUserMessage = (text: string) => {
    setMessages((prev) => [...prev, { text, isUser: true }]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    addUserMessage(inputValue);
    processInput(inputValue);
    setInputValue("");
  };

  const processInput = (input: string) => {
    switch (currentStep) {
      case "name":
        setLoanData((prev) => ({ ...prev, name: input }));
        setTimeout(() => {
          addBotMessage(`Nice to meet you, ${input}! 😊`);
          setTimeout(() => {
            addBotMessage("How much loan amount are you looking for? (in ₹)");
            setCurrentStep("amount");
          }, 1000);
        }, 500);
        break;

      case "amount":
        const amount = parseInt(input.replace(/[^0-9]/g, ""));
        if (isNaN(amount) || amount < 10000) {
          setTimeout(() => {
            addBotMessage("Please enter a valid amount (minimum ₹10,000)");
          }, 500);
          return;
        }
        setLoanData((prev) => ({ ...prev, loanAmount: amount }));
        setTimeout(() => {
          addBotMessage(`Great! You're looking for ₹${amount.toLocaleString("en-IN")}.`);
          setTimeout(() => {
            addBotMessage("What is your monthly salary? (in ₹)");
            setCurrentStep("salary");
          }, 1000);
        }, 500);
        break;

      case "salary":
        const salary = parseInt(input.replace(/[^0-9]/g, ""));
        if (isNaN(salary) || salary < 10000) {
          setTimeout(() => {
            addBotMessage("Please enter a valid monthly salary (minimum ₹10,000)");
          }, 500);
          return;
        }
        setLoanData((prev) => ({ ...prev, salary }));
        setTimeout(() => {
          addBotMessage("Thank you for sharing that information.");
          setTimeout(() => {
            addBotMessage("What is your credit score? (300-900)");
            setCurrentStep("credit");
          }, 1000);
        }, 500);
        break;

      case "credit":
        const score = parseInt(input);
        if (isNaN(score) || score < 300 || score > 900) {
          setTimeout(() => {
            addBotMessage("Please enter a valid credit score between 300 and 900");
          }, 500);
          return;
        }
        setLoanData((prev) => ({ ...prev, creditScore: score }));
        setTimeout(() => {
          addBotMessage("Perfect! Almost done.");
          setTimeout(() => {
            addBotMessage("What is the purpose of this loan? (e.g., Home Renovation, Education, Medical)");
            setCurrentStep("purpose");
          }, 1000);
        }, 500);
        break;

      case "purpose":
        setLoanData((prev) => ({ ...prev, loanPurpose: input }));
        setTimeout(() => {
          addBotMessage("Excellent! I have all the information I need. 🎉");
          setTimeout(() => {
            addBotMessage("Let me analyze your application and prepare your loan eligibility report...");
            setTimeout(() => {
              setCurrentStep("done");
              const completeData = { ...loanData, loanPurpose: input } as LoanData;
              navigate("/summary", { state: { loanData: completeData } });
            }, 2000);
          }, 1000);
        }, 500);
        break;
    }
  };

  const getPlaceholder = () => {
    switch (currentStep) {
      case "name":
        return "Enter your full name...";
      case "amount":
        return "Enter amount (e.g., 500000)...";
      case "salary":
        return "Enter monthly salary...";
      case "credit":
        return "Enter credit score (300-900)...";
      case "purpose":
        return "Enter loan purpose...";
      default:
        return "Type your message...";
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="bg-gradient-hero text-primary-foreground shadow-lg">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/")}
            className="text-primary-foreground hover:bg-primary-foreground/10"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex-1">
            <h1 className="text-xl font-bold">AI Loan Assistant</h1>
            <p className="text-sm text-primary-foreground/80">Powered by Tata Capital</p>
          </div>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto">
        <div className="container mx-auto px-4 py-6 max-w-3xl">
          {messages.map((message, index) => (
            <ChatBubble
              key={index}
              message={message.text}
              isUser={message.isUser}
              delay={0}
            />
          ))}
          {isTyping && <TypingIndicator />}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      {currentStep !== "done" && (
        <div className="border-t border-border bg-card shadow-lg">
          <div className="container mx-auto px-4 py-4 max-w-3xl">
            <form onSubmit={handleSubmit} className="flex gap-2">
              <Input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={getPlaceholder()}
                className="flex-1 bg-background"
                disabled={isTyping}
              />
              <Button
                type="submit"
                size="icon"
                disabled={!inputValue.trim() || isTyping}
                className="bg-primary hover:bg-primary-dark"
              >
                <Send className="h-5 w-5" />
              </Button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
