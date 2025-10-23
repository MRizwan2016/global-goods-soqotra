import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { namePrefixes, qatarCities, destinationCountries, saudiCities } from "../../data/saudiArabiaData";
import { SaudiArabiaFormData } from "../../hooks/useSaudiArabiaInvoice";

interface ConsigneeDetailsProps {
  formData: SaudiArabiaFormData;
  handleFormChange: (field: keyof SaudiArabiaFormData, value: any) => void;
}

const ConsigneeDetails: React.FC<ConsigneeDetailsProps> = ({ formData, handleFormChange }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>CONSIGNEE INFORMATION</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Consignee Name Prefix */}
          <div className="space-y-2">
            <label className="text-sm font-medium">PREFIX:</label>
            <Select value={formData.consigneePrefix} onValueChange={(value) => handleFormChange('consigneePrefix', value)}>
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

          {/* Consignee Name */}
          <div className="space-y-2">
            <label className="text-sm font-medium">NAME:</label>
            <Input
              value={formData.consigneeName}
              onChange={(e) => handleFormChange('consigneeName', e.target.value.toUpperCase())}
              placeholder="Enter consignee name"
            />
          </div>

          {/* Consignee Country */}
          <div className="space-y-2">
            <label className="text-sm font-medium">DESTINATION COUNTRY:</label>
            <Select value={formData.consigneeCountry} onValueChange={(value) => handleFormChange('consigneeCountry', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select destination country" />
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

          {/* Consignee City - conditional based on country */}
          {formData.consigneeCountry && (
            <div className="space-y-2">
              <label className="text-sm font-medium">CITY:</label>
              {formData.consigneeCountry === "QATAR" ? (
                <Select value={formData.consigneeCity} onValueChange={(value) => handleFormChange('consigneeCity', value)}>
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
              ) : formData.consigneeCountry === "SAUDI ARABIA" ? (
                <Select value={formData.consigneeCity} onValueChange={(value) => handleFormChange('consigneeCity', value)}>
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
                  value={formData.consigneeCity}
                  onChange={(e) => handleFormChange('consigneeCity', e.target.value.toUpperCase())}
                  placeholder="Enter city"
                />
              )}
            </div>
          )}

          {/* Consignee Address */}
          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-medium">ADDRESS:</label>
            <Textarea
              value={formData.consigneeAddress}
              onChange={(e) => handleFormChange('consigneeAddress', e.target.value.toUpperCase())}
              placeholder="Enter consignee address"
              rows={3}
            />
          </div>

          {/* Consignee Mobile */}
          <div className="space-y-2">
            <label className="text-sm font-medium">MOBILE NUMBER:</label>
            <Input
              value={formData.consigneeMobile}
              onChange={(e) => handleFormChange('consigneeMobile', e.target.value)}
              placeholder="Enter mobile number"
            />
          </div>

          {/* Consignee Email */}
          <div className="space-y-2">
            <label className="text-sm font-medium">EMAIL:</label>
            <Input
              type="email"
              value={formData.consigneeEmail}
              onChange={(e) => handleFormChange('consigneeEmail', e.target.value.toLowerCase())}
              placeholder="Enter email address"
            />
          </div>

          {/* Consignee ID Number */}
          <div className="space-y-2">
            <label className="text-sm font-medium">ID NUMBER:</label>
            <Input
              value={formData.consigneeIdNumber}
              onChange={(e) => handleFormChange('consigneeIdNumber', e.target.value.toUpperCase())}
              placeholder="Enter ID number"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ConsigneeDetails;