
import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CountryConfig, VesselData } from "./types";

interface AddVesselFormProps {
  config: CountryConfig;
  form: Partial<VesselData>;
  setForm: React.Dispatch<React.SetStateAction<Partial<VesselData>>>;
  onSave: () => void;
  onCancel: () => void;
}

const AddVesselForm: React.FC<AddVesselFormProps> = ({ config, form, setForm, onSave, onCancel }) => {
  const update = (field: string, value: string) => setForm(prev => ({ ...prev, [field]: value }));

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="bg-green-50 border-b border-green-200 px-4 py-3">
        <h3 className="text-lg font-bold text-green-800">Add Vessel</h3>
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
              <td className="py-2 px-3 font-semibold text-sm bg-gray-50">SHIPPING LINE:</td>
              <td className="py-2 px-3">
                <Select value={form.shippingLine || ""} onValueChange={(v) => update("shippingLine", v)}>
                  <SelectTrigger className="w-96 bg-blue-500 text-white hover:bg-blue-600">
                    <SelectValue placeholder="Select Shipping Line" />
                  </SelectTrigger>
                  <SelectContent>
                    {config.shippingLines.map(sl => (
                      <SelectItem key={sl.code} value={sl.label}>{sl.label} : {sl.code}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </td>
            </tr>
            <tr className="border-b">
              <td className="py-2 px-3 font-semibold text-sm bg-gray-50">VESSEL NAME:</td>
              <td className="py-2 px-3">
                <Input value={form.vesselName || ""} onChange={e => update("vesselName", e.target.value)} className="w-96" />
              </td>
            </tr>
            <tr className="border-b">
              <td className="py-2 px-3 font-semibold text-sm bg-gray-50">MASTER BILL OF LADING:</td>
              <td className="py-2 px-3">
                <Input value={form.masterBL || ""} onChange={e => update("masterBL", e.target.value)} className="w-80" />
              </td>
            </tr>
            <tr className="border-b">
              <td className="py-2 px-3 font-semibold text-sm bg-gray-50">VOYAGE:</td>
              <td className="py-2 px-3">
                <Input value={form.voyage || ""} onChange={e => update("voyage", e.target.value)} className="w-72" />
              </td>
            </tr>
            <tr className="border-b">
              <td className="py-2 px-3 font-semibold text-sm bg-gray-50">PORT OF LOADING:</td>
              <td className="py-2 px-3">
                <Select value={form.portOfLoading || ""} onValueChange={(v) => update("portOfLoading", v)}>
                  <SelectTrigger className="w-80">
                    <SelectValue placeholder="Select Port" />
                  </SelectTrigger>
                  <SelectContent>
                    {config.portsOfLoading.map(p => (
                      <SelectItem key={p} value={p}>{p}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </td>
            </tr>
            <tr className="border-b">
              <td className="py-2 px-3 font-semibold text-sm bg-gray-50">PORT OF DISCHARGE:</td>
              <td className="py-2 px-3">
                <Select value={form.portOfDischarge || ""} onValueChange={(v) => update("portOfDischarge", v)}>
                  <SelectTrigger className="w-80">
                    <SelectValue placeholder="Select Port" />
                  </SelectTrigger>
                  <SelectContent>
                    {config.portsOfDischarge.map(p => (
                      <SelectItem key={p} value={p}>{p}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </td>
            </tr>
            <tr className="border-b">
              <td className="py-2 px-3 font-semibold text-sm bg-gray-50">DIRECT/ MIX:</td>
              <td className="py-2 px-3">
                <Select value={form.direction || "MIX"} onValueChange={(v) => update("direction", v)}>
                  <SelectTrigger className="w-40 bg-blue-500 text-white hover:bg-blue-600">
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

export default AddVesselForm;
