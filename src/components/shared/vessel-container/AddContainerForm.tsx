
import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CountryConfig, ContainerData } from "./types";

interface AddContainerFormProps {
  config: CountryConfig;
  form: Partial<ContainerData>;
  setForm: React.Dispatch<React.SetStateAction<Partial<ContainerData>>>;
  onSave: () => void;
  onCancel: () => void;
}

const AddContainerForm: React.FC<AddContainerFormProps> = ({ config, form, setForm, onSave, onCancel }) => {
  const update = (field: string, value: string | number) => setForm(prev => ({ ...prev, [field]: value }));

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="bg-green-50 border-b border-green-200 px-4 py-3">
        <h3 className="text-lg font-bold text-green-800">Add Container</h3>
      </div>
      <div className="p-4">
        <table className="w-full border-collapse">
          <tbody>
            <tr className="border-b">
              <td className="py-2 px-3 font-semibold text-sm w-40 bg-gray-50">SECTOR:</td>
              <td className="py-2 px-3">
                <Select value={form.sector || ""} onValueChange={(v) => update("sector", v)}>
                  <SelectTrigger className="w-64 bg-blue-500 text-white hover:bg-blue-600">
                    <SelectValue placeholder="Select Sector" />
                  </SelectTrigger>
                  <SelectContent>
                    {config.sectors.map(s => (
                      <SelectItem key={s.code} value={s.label}>{s.label} : {s.code}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </td>
            </tr>
            <tr className="border-b">
              <td className="py-2 px-3 font-semibold text-sm bg-gray-50">RUNNING NUMBER:</td>
              <td className="py-2 px-3 font-medium">{form.runningNumber || ""}</td>
            </tr>
            <tr className="border-b">
              <td className="py-2 px-3 font-semibold text-sm bg-gray-50">CONTAINER NUMBER:</td>
              <td className="py-2 px-3">
                <Input value={form.containerNumber || ""} onChange={e => update("containerNumber", e.target.value)} className="w-72" />
              </td>
            </tr>
            <tr className="border-b">
              <td className="py-2 px-3 font-semibold text-sm bg-gray-50">SEAL NUMBER:</td>
              <td className="py-2 px-3">
                <Input value={form.sealNumber || ""} onChange={e => update("sealNumber", e.target.value)} className="w-80" />
              </td>
            </tr>
            <tr className="border-b">
              <td className="py-2 px-3 font-semibold text-sm bg-gray-50">CONTAINER TYPE:</td>
              <td className="py-2 px-3">
                <Select value={form.containerType || config.containerTypes[0]} onValueChange={(v) => update("containerType", v)}>
                  <SelectTrigger className="w-48 bg-blue-500 text-white hover:bg-blue-600">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {config.containerTypes.map(ct => (
                      <SelectItem key={ct} value={ct}>{ct}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </td>
            </tr>
            <tr className="border-b">
              <td className="py-2 px-3 font-semibold text-sm bg-gray-50">DIRECT/MIX:</td>
              <td className="py-2 px-3">
                <Select value={form.direction || config.directions[0] || ""} onValueChange={(v) => update("direction", v)}>
                  <SelectTrigger className="w-48 bg-blue-500 text-white hover:bg-blue-600">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {config.directions.map(d => (
                      <SelectItem key={d} value={d}>{d}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </td>
            </tr>
            {config.useNumberPlate && (
              <tr className="border-b">
                <td className="py-2 px-3 font-semibold text-sm bg-gray-50">NUMBER PLATE:</td>
                <td className="py-2 px-3">
                  <Input 
                    value={form.numberPlate || ""} 
                    onChange={e => update("numberPlate", e.target.value)} 
                    className="w-72"
                    placeholder="Enter vehicle number plate" 
                  />
                </td>
              </tr>
            )}
            <tr className="border-b">
              <td className="py-2 px-3 font-semibold text-sm bg-gray-50">WEIGHT:</td>
              <td className="py-2 px-3">
                <Input 
                  type="number" 
                  value={form.weight ?? 0} 
                  onChange={e => update("weight", parseFloat(e.target.value) || 0)} 
                  className="w-40" 
                />
              </td>
            </tr>
            <tr className="border-b">
              <td className="py-2 px-3 font-semibold text-sm bg-gray-50">E.T.D:</td>
              <td className="py-2 px-3">
                <Input type="date" value={form.etd || ""} onChange={e => update("etd", e.target.value)} className="w-56" />
              </td>
            </tr>
            <tr>
              <td className="py-2 px-3 font-semibold text-sm bg-gray-50">E.T.A:</td>
              <td className="py-2 px-3">
                <Input type="date" value={form.eta || ""} onChange={e => update("eta", e.target.value)} className="w-56" />
              </td>
            </tr>
          </tbody>
        </table>

        <div className="flex gap-3 mt-6">
          <Button onClick={onSave} className="bg-blue-600 hover:bg-blue-700 text-white px-6">
            Save
          </Button>
          <Button onClick={onCancel} className="bg-blue-500 hover:bg-blue-600 text-white px-6">
            Go Back
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddContainerForm;
