
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { X, Divide, Minus, Plus, Equal, Delete, Calculator as CalcIcon } from "lucide-react";
import { motion } from "framer-motion";

interface CalculatorProps {
  onResultChange?: (value: number) => void;
}

const DigitalCalculator: React.FC<CalculatorProps> = ({ onResultChange }) => {
  const [display, setDisplay] = useState<string>("0");
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState<boolean>(false);
  const [showCalculator, setShowCalculator] = useState<boolean>(false);

  const clearAll = () => {
    setDisplay("0");
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(false);
  };

  const handleDigitInput = (digit: string) => {
    if (waitingForOperand) {
      setDisplay(digit);
      setWaitingForOperand(false);
    } else {
      setDisplay(display === "0" ? digit : display + digit);
    }
  };

  const handleOperatorInput = (nextOperation: string) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operation) {
      const result = performCalculation(previousValue, inputValue, operation);
      setPreviousValue(result);
      setDisplay(String(result));
      
      if (onResultChange) {
        onResultChange(result);
      }
    }

    setWaitingForOperand(true);
    setOperation(nextOperation);
  };

  const performCalculation = (first: number, second: number, op: string): number => {
    switch (op) {
      case "+":
        return first + second;
      case "-":
        return first - second;
      case "×":
        return first * second;
      case "÷":
        return first / second;
      default:
        return second;
    }
  };

  const handleEquals = () => {
    if (!operation || previousValue === null) return;

    const inputValue = parseFloat(display);
    const result = performCalculation(previousValue, inputValue, operation);
    
    setDisplay(String(result));
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(true);
    
    if (onResultChange) {
      onResultChange(result);
    }
  };

  const handleDecimalPoint = () => {
    if (waitingForOperand) {
      setDisplay("0.");
      setWaitingForOperand(false);
    } else if (display.indexOf(".") === -1) {
      setDisplay(display + ".");
    }
  };

  const handleDelete = () => {
    if (display !== "0" && display.length > 1) {
      setDisplay(display.substring(0, display.length - 1));
    } else {
      setDisplay("0");
    }
  };

  const toggleCalculator = () => {
    setShowCalculator(!showCalculator);
  };

  return (
    <div className="relative">
      <Button 
        variant="outline" 
        size="sm" 
        onClick={toggleCalculator}
        className="fixed bottom-4 right-4 z-50 shadow-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white border-none hover:from-blue-700 hover:to-purple-700"
      >
        <CalcIcon className="h-5 w-5 mr-1" />
        Calculator
      </Button>

      {showCalculator && (
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="fixed bottom-16 right-4 z-50"
        >
          <Card className="w-[280px] shadow-xl border-t-4 border-t-blue-500">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 py-3 px-4">
              <div className="flex justify-between items-center">
                <CardTitle className="text-blue-700 text-base flex items-center">
                  <CalcIcon className="h-4 w-4 mr-2" />
                  Payment Calculator
                </CardTitle>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-6 w-6 p-0 text-gray-500 hover:text-gray-700 hover:bg-gray-100" 
                  onClick={toggleCalculator}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <div className="bg-gray-100 text-right p-3 rounded-md mb-3 font-mono text-2xl h-12 flex items-center justify-end overflow-hidden">
                {display}
              </div>
              <div className="grid grid-cols-4 gap-2">
                <Button 
                  variant="outline" 
                  className="bg-red-100 text-red-700 hover:bg-red-200"
                  onClick={clearAll}
                >
                  C
                </Button>
                <Button 
                  variant="outline"
                  className="bg-gray-100 text-gray-700 hover:bg-gray-200"
                  onClick={handleDelete}
                >
                  <Delete className="h-4 w-4" />
                </Button>
                <Button 
                  variant="outline"
                  className="bg-blue-100 text-blue-700 hover:bg-blue-200"
                  onClick={() => handleOperatorInput("÷")}
                >
                  <Divide className="h-4 w-4" />
                </Button>
                <Button 
                  variant="outline"
                  className="bg-blue-100 text-blue-700 hover:bg-blue-200"
                  onClick={() => handleOperatorInput("×")}
                >
                  <X className="h-4 w-4" />
                </Button>
                
                {[7, 8, 9].map(digit => (
                  <Button 
                    key={digit}
                    variant="outline"
                    className="bg-white hover:bg-gray-100"
                    onClick={() => handleDigitInput(digit.toString())}
                  >
                    {digit}
                  </Button>
                ))}
                <Button 
                  variant="outline"
                  className="bg-blue-100 text-blue-700 hover:bg-blue-200"
                  onClick={() => handleOperatorInput("-")}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                
                {[4, 5, 6].map(digit => (
                  <Button 
                    key={digit}
                    variant="outline"
                    className="bg-white hover:bg-gray-100"
                    onClick={() => handleDigitInput(digit.toString())}
                  >
                    {digit}
                  </Button>
                ))}
                <Button 
                  variant="outline"
                  className="bg-blue-100 text-blue-700 hover:bg-blue-200"
                  onClick={() => handleOperatorInput("+")}
                >
                  <Plus className="h-4 w-4" />
                </Button>
                
                {[1, 2, 3].map(digit => (
                  <Button 
                    key={digit}
                    variant="outline"
                    className="bg-white hover:bg-gray-100"
                    onClick={() => handleDigitInput(digit.toString())}
                  >
                    {digit}
                  </Button>
                ))}
                <Button 
                  variant="outline"
                  className="bg-purple-600 text-white hover:bg-purple-700"
                  onClick={handleEquals}
                >
                  <Equal className="h-4 w-4" />
                </Button>
                
                <Button 
                  variant="outline"
                  className="bg-white hover:bg-gray-100 col-span-2"
                  onClick={() => handleDigitInput("0")}
                >
                  0
                </Button>
                <Button 
                  variant="outline"
                  className="bg-white hover:bg-gray-100"
                  onClick={handleDecimalPoint}
                >
                  .
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  );
};

export default DigitalCalculator;
