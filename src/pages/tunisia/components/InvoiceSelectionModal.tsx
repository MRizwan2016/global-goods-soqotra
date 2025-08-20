import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Search, User, Car, Package } from "lucide-react";
import { TunisiaInvoice } from "../types/tunisiaInvoiceTypes";

interface InvoiceSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  invoices: TunisiaInvoice[];
  onInvoiceSelect: (invoice: TunisiaInvoice) => void;
}

const InvoiceSelectionModal: React.FC<InvoiceSelectionModalProps> = ({
  isOpen,
  onClose,
  invoices,
  onInvoiceSelect
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredInvoices = invoices.filter(invoice =>
    invoice.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    invoice.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    invoice.vehicle.chassisNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    `${invoice.vehicle.make} ${invoice.vehicle.model}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleInvoiceSelect = (invoice: TunisiaInvoice) => {
    onInvoiceSelect(invoice);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Select Invoice for Loading</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search by invoice number, customer name, chassis number, or vehicle..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Invoice List */}
          <div className="space-y-3">
            {filteredInvoices.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                {invoices.length === 0 
                  ? "No invoices available. Create an invoice first."
                  : "No invoices match your search criteria."
                }
              </div>
            ) : (
              filteredInvoices.map((invoice) => (
                <Card 
                  key={invoice.id} 
                  className="cursor-pointer hover:shadow-md transition-shadow border-l-4 border-l-primary"
                  onClick={() => handleInvoiceSelect(invoice)}
                >
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-semibold text-lg">{invoice.invoiceNumber}</h3>
                        <p className="text-sm text-muted-foreground">
                          Date: {new Date(invoice.date).toLocaleDateString()}
                        </p>
                        <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                          invoice.status === 'DRAFT' ? 'bg-yellow-100 text-yellow-800' :
                          invoice.status === 'CONFIRMED' ? 'bg-blue-100 text-blue-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {invoice.status}
                        </span>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold">QAR {invoice.totalAmount.toLocaleString()}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {/* Customer Info */}
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium">Customer</span>
                        </div>
                        <div className="text-sm">
                          <p className="font-medium">{invoice.customer.name}</p>
                          <p className="text-muted-foreground">{invoice.customer.mobile}</p>
                          <p className="text-muted-foreground text-xs line-clamp-2">{invoice.customer.address}</p>
                        </div>
                      </div>

                      {/* Vehicle Info */}
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Car className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium">Vehicle</span>
                        </div>
                        <div className="text-sm">
                          <p className="font-medium">{invoice.vehicle.make} {invoice.vehicle.model}</p>
                          <p className="text-muted-foreground">{invoice.vehicle.year} • {invoice.vehicle.color}</p>
                          <p className="text-muted-foreground font-mono text-xs">{invoice.vehicle.chassisNumber}</p>
                          <p className="text-green-600 font-medium">QAR {invoice.vehicle.freightCharge.toLocaleString()}</p>
                        </div>
                      </div>

                      {/* Personal Effects */}
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Package className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium">Personal Effects</span>
                        </div>
                        <div className="text-sm">
                          {invoice.personalEffects && invoice.personalEffects.length > 0 ? (
                            <>
                              <p>{invoice.personalEffects.length} item(s)</p>
                              <p className="text-muted-foreground">
                                {invoice.personalEffects.reduce((sum, effect) => sum + effect.volume, 0)} CBM
                              </p>
                              <p className="text-green-600 font-medium">
                                QAR {invoice.personalEffects.reduce((sum, effect) => sum + effect.charges, 0).toLocaleString()}
                              </p>
                            </>
                          ) : (
                            <p className="text-muted-foreground">No personal effects</p>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Vehicle Photos Preview */}
                    {invoice.vehicle.photos.length > 0 && (
                      <div className="mt-3 pt-3 border-t">
                        <p className="text-sm font-medium mb-2">Vehicle Photos ({invoice.vehicle.photos.length})</p>
                        <div className="flex gap-2 overflow-x-auto">
                          {invoice.vehicle.photos.slice(0, 4).map((photo, index) => (
                            <img
                              key={index}
                              src={photo}
                              alt={`Vehicle ${index + 1}`}
                              className="w-16 h-16 object-cover rounded border flex-shrink-0"
                            />
                          ))}
                          {invoice.vehicle.photos.length > 4 && (
                            <div className="w-16 h-16 bg-muted rounded border flex items-center justify-center text-xs font-medium">
                              +{invoice.vehicle.photos.length - 4}
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))
            )}
          </div>

          <div className="flex justify-end gap-2 pt-4 border-t">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default InvoiceSelectionModal;