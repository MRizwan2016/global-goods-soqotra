
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface AdvanceAmountProps {
  advanceAmount: string | number;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const AdvanceAmount = ({ advanceAmount, handleInputChange }: AdvanceAmountProps) => {
  return (
    <div>
      <Label htmlFor="advanceAmount">ADVANCE AMOUNT:</Label>
      <Input 
        id="advanceAmount"
        name="advanceAmount"
        type="number"
        value={advanceAmount}
        onChange={handleInputChange}
        placeholder="0"
      />
    </div>
  );
};

export default AdvanceAmount;
