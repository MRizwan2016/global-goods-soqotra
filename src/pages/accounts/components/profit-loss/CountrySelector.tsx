
import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";

interface CountrySelectorProps {
  selectedCountry: string;
  setSelectedCountry: (country: string) => void;
}

export const CountrySelector: React.FC<CountrySelectorProps> = ({
  selectedCountry,
  setSelectedCountry,
}) => {
  // Sample countries - replace with actual data as needed
  const countries = [
    { id: "all", name: "All Countries" },
    { id: "qa", name: "Qatar" },
    { id: "ph", name: "Philippines" },
    { id: "ke", name: "Kenya" },
    { id: "lk", name: "Sri Lanka" },
  ];

  return (
    <Card>
      <CardContent className="p-4">
        <div className="space-y-2">
          <label htmlFor="country-select" className="text-sm font-medium text-gray-700">
            Select Country
          </label>
          <Select 
            value={selectedCountry} 
            onValueChange={setSelectedCountry}
          >
            <SelectTrigger id="country-select" className="w-full">
              <SelectValue placeholder="Select a country" />
            </SelectTrigger>
            <SelectContent>
              {countries.map((country) => (
                <SelectItem key={country.id} value={country.id}>
                  {country.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
};
