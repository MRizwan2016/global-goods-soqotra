import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { namePrefixes, qatarCities, destinationCountries, saudiCities } from "../../data/saudiArabiaData";
import { SaudiArabiaFormData } from "../../hooks/useSaudiArabiaInvoice";

interface ShipperDetailsProps {
  formData: SaudiArabiaFormData;
  handleFormChange: (field: keyof SaudiArabiaFormData, value: any) => void;
}

const ShipperDetails: React.FC<ShipperDetailsProps> = ({ formData, handleFormChange }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>SHIPPER INFORMATION</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Shipper Name Prefix */}
          <div className="space-y-2">
            <label className="text-sm font-medium">PREFIX:</label>
            <Select value={formData.shipperPrefix} onValueChange={(value) => handleFormChange('shipperPrefix', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select prefix" />
              </SelectTrigger>
              <SelectContent>
                {namePrefixes.map(prefix => (
                  <SelectItem key={prefix.value} value={prefix.value}>
                    {prefix.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Shipper Name */}
          <div className="space-y-2">
            <label className="text-sm font-medium">NAME:</label>
            <Input
              value={formData.shipperName}
              onChange={(e) => handleFormChange('shipperName', e.target.value.toUpperCase())}
              placeholder="Enter shipper name"
            />
          </div>

          {/* Shipper Country */}
          <div className="space-y-2">
            <label className="text-sm font-medium">COUNTRY:</label>
            <Select value={formData.shipperCountry} onValueChange={(value) => handleFormChange('shipperCountry', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select country" />
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

          {/* Shipper City - conditional based on country */}
          {formData.shipperCountry && (
            <div className="space-y-2">
              <label className="text-sm font-medium">CITY:</label>
              {formData.shipperCountry === "QATAR" ? (
                <Select value={formData.shipperCity} onValueChange={(value) => handleFormChange('shipperCity', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Qatar city" />
                  </SelectTrigger>
                  <SelectContent>
                    {qatarCities.map(city => (
                      <SelectItem key={city} value={city}>
                        {city}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : formData.shipperCountry === "SAUDI ARABIA" ? (
                <Select value={formData.shipperCity} onValueChange={(value) => handleFormChange('shipperCity', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Saudi Arabia city" />
                  </SelectTrigger>
                  <SelectContent>
                    {saudiCities.map(city => (
                      <SelectItem key={city} value={city}>
                        {city}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : (
                <Input
                  value={formData.shipperCity}
                  onChange={(e) => handleFormChange('shipperCity', e.target.value.toUpperCase())}
                  placeholder="Enter city"
                />
              )}
            </div>
          )}

          {/* Shipper Address */}
          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-medium">ADDRESS:</label>
            <Textarea
              value={formData.shipperAddress}
              onChange={(e) => handleFormChange('shipperAddress', e.target.value.toUpperCase())}
              placeholder="Enter shipper address"
              rows={3}
            />
          </div>

          {/* Shipper Mobile */}
          <div className="space-y-2">
            <label className="text-sm font-medium">MOBILE NUMBER:</label>
            <Input
              value={formData.shipperMobile}
              onChange={(e) => handleFormChange('shipperMobile', e.target.value)}
              placeholder="Enter mobile number"
            />
          </div>

          {/* Shipper Email */}
          <div className="space-y-2">
            <label className="text-sm font-medium">EMAIL:</label>
            <Input
              type="email"
              value={formData.shipperEmail}
              onChange={(e) => handleFormChange('shipperEmail', e.target.value.toLowerCase())}
              placeholder="Enter email address"
            />
          </div>

          {/* Shipper ID Number */}
          <div className="space-y-2">
            <label className="text-sm font-medium">ID NUMBER:</label>
            <Input
              value={formData.shipperIdNumber}
              onChange={(e) => handleFormChange('shipperIdNumber', e.target.value.toUpperCase())}
              placeholder="Enter ID number"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ShipperDetails;