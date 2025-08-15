import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { namePrefixes, qatarCities, countryCodes } from "../../data/sudanData";

interface ShipperDetailsProps {
  formData: any;
  handleFormChange: (field: string, value: any) => void;
  onMobileNumberChange: (mobile: string) => void;
}

const ShipperDetails: React.FC<ShipperDetailsProps> = ({
  formData,
  handleFormChange,
  onMobileNumberChange
}) => {
  return (
    <Card>
      <CardHeader className="bg-blue-500 text-white">
        <CardTitle>SHIPPER DETAILS</CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Mobile Number - Auto-fill trigger */}
          <div className="space-y-2">
            <Label htmlFor="shipperMobile">MOBILE NUMBER *</Label>
            <Input
              id="shipperMobile"
              type="tel"
              value={formData.shipperMobile || ""}
              onChange={(e) => {
                handleFormChange('shipperMobile', e.target.value);
                onMobileNumberChange(e.target.value);
              }}
              placeholder="Mobile number"
              className="text-blue-600 font-medium"
            />
          </div>

          {/* Name Prefix */}
          <div className="space-y-2">
            <Label htmlFor="shipperPrefix">PREFIX</Label>
            <Select 
              value={formData.shipperPrefix || "MR."} 
              onValueChange={(value) => handleFormChange('shipperPrefix', value)}
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

          {/* Shipper Name 1 */}
          <div className="space-y-2">
            <Label htmlFor="shipperName1">SHIPPER NAME 1 *</Label>
            <Input
              id="shipperName1"
              value={formData.shipperName1 || ""}
              onChange={(e) => {
                const value = e.target.value.toUpperCase();
                handleFormChange('shipperName1', value);
                // Auto-duplicate to consignee if not already filled
                if (!formData.consigneeName1) {
                  handleFormChange('consigneeName1', value);
                }
              }}
              placeholder="Shipper name 1"
              className="uppercase"
            />
          </div>

          {/* Shipper Name 2 */}
          <div className="space-y-2">
            <Label htmlFor="shipperName2">SHIPPER NAME 2</Label>
            <Input
              id="shipperName2"
              value={formData.shipperName2 || ""}
              onChange={(e) => {
                const value = e.target.value.toUpperCase();
                handleFormChange('shipperName2', value);
                // Auto-duplicate to consignee if not already filled
                if (!formData.consigneeName2) {
                  handleFormChange('consigneeName2', value);
                }
              }}
              placeholder="Shipper name 2"
              className="uppercase"
            />
          </div>

          {/* Country */}
          <div className="space-y-2">
            <Label htmlFor="shipperCountry">COUNTRY</Label>
            <Select 
              value={formData.shipperCountry || "QATAR"} 
              onValueChange={(value) => handleFormChange('shipperCountry', value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {countryCodes.map(country => (
                  <SelectItem key={country.value} value={country.value}>
                    {country.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* City */}
          <div className="space-y-2">
            <Label htmlFor="shipperCity">CITY</Label>
            <Select 
              value={formData.shipperCity || ""} 
              onValueChange={(value) => handleFormChange('shipperCity', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select city" />
              </SelectTrigger>
              <SelectContent>
                {qatarCities.map(city => (
                  <SelectItem key={city} value={city}>
                    {city}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Address */}
          <div className="space-y-2">
            <Label htmlFor="shipperAddress">ADDRESS</Label>
            <Input
              id="shipperAddress"
              value={formData.shipperAddress || ""}
              onChange={(e) => handleFormChange('shipperAddress', e.target.value.toUpperCase())}
              placeholder="Address"
              className="uppercase"
            />
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="shipperEmail">EMAIL</Label>
            <Input
              id="shipperEmail"
              type="email"
              value={formData.shipperEmail || ""}
              onChange={(e) => handleFormChange('shipperEmail', e.target.value)}
              placeholder="Email address"
            />
          </div>

          {/* ID Number */}
          <div className="space-y-2">
            <Label htmlFor="shipperIdNumber">ID NUMBER</Label>
            <Input
              id="shipperIdNumber"
              value={formData.shipperIdNumber || ""}
              onChange={(e) => handleFormChange('shipperIdNumber', e.target.value)}
              placeholder="ID number"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ShipperDetails;