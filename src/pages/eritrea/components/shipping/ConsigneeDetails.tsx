import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { UserCheck, MapPin, Phone, Globe } from "lucide-react";
import { namePrefixes, qatarCities, destinationCountries, eritreaCities, saudiCities } from "../../data/eritreaData";
import { EritreaFormData } from "../../hooks/useEritreaInvoice";

interface ConsigneeDetailsProps {
  formData: EritreaFormData;
  handleFormChange: (field: keyof EritreaFormData, value: any) => void;
}

const ConsigneeDetails: React.FC<ConsigneeDetailsProps> = ({ 
  formData, 
  handleFormChange 
}) => {
  return (
    <Card>
      <CardHeader className="bg-green-600 text-white">
        <CardTitle className="flex items-center gap-2">
          <UserCheck className="h-5 w-5" />
          CONSIGNEE INFORMATION
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 pt-6">
        {/* Name with Prefix */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">PREFIX:</label>
            <Select 
              value={formData.consigneePrefix} 
              onValueChange={(value) => handleFormChange('consigneePrefix', value)}
            >
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
          
          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-medium text-gray-700">CONSIGNEE NAME:</label>
            <Input
              value={(formData.consigneeName || "").toUpperCase()}
              onChange={(e) => handleFormChange('consigneeName', e.target.value.toUpperCase())}
              placeholder="ENTER CONSIGNEE NAME"
              className="uppercase"
            />
          </div>
        </div>

        {/* Destination Country and City */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
              <Globe className="h-4 w-4" />
              DESTINATION COUNTRY:
            </label>
            <Select 
              value={formData.consigneeCountry} 
              onValueChange={(value) => handleFormChange('consigneeCountry', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select destination" />
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
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              CITY:
            </label>
            {formData.consigneeCountry === "QATAR" ? (
              <Select 
                value={formData.consigneeCity} 
                onValueChange={(value) => handleFormChange('consigneeCity', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select city" />
                </SelectTrigger>
                <SelectContent className="max-h-[300px]">
                  {qatarCities.map(city => (
                    <SelectItem key={city} value={city}>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-3 w-3" />
                        {city}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : formData.consigneeCountry === "ERITREA" ? (
              <Select 
                value={formData.consigneeCity} 
                onValueChange={(value) => handleFormChange('consigneeCity', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Eritrea city" />
                </SelectTrigger>
                <SelectContent className="max-h-[300px]">
                  {eritreaCities.map(city => (
                    <SelectItem key={city} value={city}>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-3 w-3" />
                        {city}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : formData.consigneeCountry === "SAUDI ARABIA" ? (
              <Select 
                value={formData.consigneeCity} 
                onValueChange={(value) => handleFormChange('consigneeCity', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Saudi Arabia city" />
                </SelectTrigger>
                <SelectContent className="max-h-[300px]">
                  {saudiCities.map(city => (
                    <SelectItem key={city} value={city}>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-3 w-3" />
                        {city}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : (
              <Input
                value={(formData.consigneeCity || "").toUpperCase()}
                onChange={(e) => handleFormChange('consigneeCity', e.target.value.toUpperCase())}
                placeholder="ENTER CITY NAME"
                className="uppercase"
              />
            )}
          </div>
        </div>

        {/* Address */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">DESTINATION ADDRESS:</label>
          <Textarea
            value={(formData.consigneeAddress || "").toUpperCase()}
            onChange={(e) => handleFormChange('consigneeAddress', e.target.value.toUpperCase())}
            placeholder="ENTER COMPLETE DESTINATION ADDRESS"
            rows={3}
            className="uppercase"
          />
        </div>

        {/* Mobile and Email */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
              <Phone className="h-4 w-4" />
              MOBILE NUMBER:
            </label>
            <Input
              value={formData.consigneeMobile}
              onChange={(e) => handleFormChange('consigneeMobile', e.target.value)}
              placeholder="Country code will auto-update"
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">EMAIL:</label>
            <Input
              type="email"
              value={(formData.consigneeEmail || "").toLowerCase()}
              onChange={(e) => handleFormChange('consigneeEmail', e.target.value.toLowerCase())}
              placeholder="enter email address"
            />
          </div>
        </div>

        {/* ID Number */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">ID NUMBER (PASSPORT/NATIONAL ID):</label>
          <Input
            value={(formData.consigneeIdNumber || "").toUpperCase()}
            onChange={(e) => handleFormChange('consigneeIdNumber', e.target.value.toUpperCase())}
            placeholder="ENTER ID NUMBER"
            className="uppercase"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default ConsigneeDetails;