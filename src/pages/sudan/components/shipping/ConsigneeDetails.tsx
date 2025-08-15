import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { namePrefixes, sudanCities, destinationCountries } from "../../data/sudanData";

interface ConsigneeDetailsProps {
  formData: any;
  handleFormChange: (field: string, value: any) => void;
}

const ConsigneeDetails: React.FC<ConsigneeDetailsProps> = ({
  formData,
  handleFormChange
}) => {
  return (
    <Card>
      <CardHeader className="bg-red-500 text-white">
        <CardTitle>CONSIGNEE DETAILS</CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Name Prefix */}
          <div className="space-y-2">
            <Label htmlFor="consigneePrefix">PREFIX</Label>
            <Select 
              value={formData.consigneePrefix || "MR."} 
              onValueChange={(value) => handleFormChange('consigneePrefix', value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {namePrefixes.map(prefix => (
                  <SelectItem key={prefix} value={prefix}>
                    {prefix}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Consignee Name */}
          <div className="space-y-2">
            <Label htmlFor="consigneeName">CONSIGNEE NAME *</Label>
            <Input
              id="consigneeName"
              value={formData.consigneeName || ""}
              onChange={(e) => handleFormChange('consigneeName', e.target.value.toUpperCase())}
              placeholder="Consignee name"
              className="uppercase"
            />
          </div>

          {/* Mobile Number */}
          <div className="space-y-2">
            <Label htmlFor="consigneeMobile">MOBILE NUMBER</Label>
            <Input
              id="consigneeMobile"
              type="tel"
              value={formData.consigneeMobile || ""}
              onChange={(e) => handleFormChange('consigneeMobile', e.target.value)}
              placeholder="Mobile number"
            />
          </div>

          {/* Country */}
          <div className="space-y-2">
            <Label htmlFor="consigneeCountry">COUNTRY</Label>
            <Select 
              value={formData.consigneeCountry || "SUDAN"} 
              onValueChange={(value) => handleFormChange('consigneeCountry', value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {destinationCountries.map(country => (
                  <SelectItem key={country} value={country}>
                    {country}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* City */}
          <div className="space-y-2">
            <Label htmlFor="consigneeCity">CITY</Label>
            <Select 
              value={formData.consigneeCity || ""} 
              onValueChange={(value) => handleFormChange('consigneeCity', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select city" />
              </SelectTrigger>
              <SelectContent>
                {sudanCities.map(city => (
                  <SelectItem key={city} value={city}>
                    {city}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Address */}
          <div className="space-y-2">
            <Label htmlFor="consigneeAddress">ADDRESS</Label>
            <Input
              id="consigneeAddress"
              value={formData.consigneeAddress || ""}
              onChange={(e) => handleFormChange('consigneeAddress', e.target.value.toUpperCase())}
              placeholder="Address"
              className="uppercase"
            />
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="consigneeEmail">EMAIL</Label>
            <Input
              id="consigneeEmail"
              type="email"
              value={formData.consigneeEmail || ""}
              onChange={(e) => handleFormChange('consigneeEmail', e.target.value)}
              placeholder="Email address"
            />
          </div>

          {/* ID Number */}
          <div className="space-y-2">
            <Label htmlFor="consigneeIdNumber">ID NUMBER</Label>
            <Input
              id="consigneeIdNumber"
              value={formData.consigneeIdNumber || ""}
              onChange={(e) => handleFormChange('consigneeIdNumber', e.target.value)}
              placeholder="ID number"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ConsigneeDetails;