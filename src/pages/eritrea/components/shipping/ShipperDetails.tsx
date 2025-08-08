import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { User, MapPin, Phone, Globe } from "lucide-react";
import { namePrefixes, qatarCities, destinationCountries, eritreaCities, saudiCities } from "../../data/eritreaData";
import { EritreaFormData } from "../../hooks/useEritreaInvoice";

interface ShipperDetailsProps {
  formData: EritreaFormData;
  handleFormChange: (field: keyof EritreaFormData, value: any) => void;
}

const ShipperDetails: React.FC<ShipperDetailsProps> = ({ 
  formData, 
  handleFormChange 
}) => {
  return (
    <Card>
      <CardHeader className="bg-blue-600 text-white">
        <CardTitle className="flex items-center gap-2">
          <User className="h-5 w-5" />
          SHIPPER INFORMATION
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 pt-6">
        {/* Name with Prefix */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">PREFIX:</label>
            <Select 
              value={formData.shipperPrefix} 
              onValueChange={(value) => handleFormChange('shipperPrefix', value)}
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
            <label className="text-sm font-medium text-gray-700">SHIPPER NAME:</label>
            <Input
              value={formData.shipperName || ""}
              onChange={(e) => handleFormChange('shipperName', e.target.value)}
              placeholder="Enter shipper name"
            />
          </div>
        </div>

        {/* Second Name */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">SECOND SHIPPER NAME (Optional):</label>
          <Input
            value={formData.shipperName2 || ""}
            onChange={(e) => handleFormChange('shipperName2', e.target.value)}
            placeholder="Enter second shipper name"
          />
        </div>

        {/* Country and City */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
              <Globe className="h-4 w-4" />
              COUNTRY:
            </label>
            <Select 
              value={formData.shipperCountry} 
              onValueChange={(value) => handleFormChange('shipperCountry', value)}
            >
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
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              CITY:
            </label>
            {formData.shipperCountry === "QATAR" ? (
              <Select 
                value={formData.shipperCity} 
                onValueChange={(value) => handleFormChange('shipperCity', value)}
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
            ) : formData.shipperCountry === "ERITREA" ? (
              <Select 
                value={formData.shipperCity} 
                onValueChange={(value) => handleFormChange('shipperCity', value)}
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
            ) : formData.shipperCountry === "SAUDI ARABIA" ? (
              <Select 
                value={formData.shipperCity} 
                onValueChange={(value) => handleFormChange('shipperCity', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Saudi city" />
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
                value={(formData.shipperCity || "").toUpperCase()}
                onChange={(e) => handleFormChange('shipperCity', e.target.value.toUpperCase())}
                placeholder="ENTER CITY NAME"
                className="uppercase"
              />
            )}
          </div>
        </div>

        {/* Address */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">ADDRESS:</label>
          <Textarea
            value={(formData.shipperAddress || "").toUpperCase()}
            onChange={(e) => handleFormChange('shipperAddress', e.target.value.toUpperCase())}
            placeholder="ENTER COMPLETE ADDRESS"
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
              value={formData.shipperMobile}
              onChange={(e) => handleFormChange('shipperMobile', e.target.value)}
              placeholder="+974 XXXX XXXX"
              className="border-blue-200 focus:border-blue-400"
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">EMAIL:</label>
            <Input
              type="email"
              value={(formData.shipperEmail || "").toLowerCase()}
              onChange={(e) => handleFormChange('shipperEmail', e.target.value.toLowerCase())}
              placeholder="enter email address"
            />
          </div>
        </div>

        {/* ID Number */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">ID NUMBER (PASSPORT/QID):</label>
          <Input
            value={(formData.shipperIdNumber || "").toUpperCase()}
            onChange={(e) => handleFormChange('shipperIdNumber', e.target.value.toUpperCase())}
            placeholder="ENTER ID NUMBER"
            className="uppercase"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default ShipperDetails;