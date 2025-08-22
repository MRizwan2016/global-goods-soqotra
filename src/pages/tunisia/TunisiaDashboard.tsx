
import React, { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CountryBackButton from "@/components/ui/country-back-button";
import LanguageSwitcher from "@/components/ui/language-switcher";
import { useLanguage } from "@/contexts/LanguageContext";
import { TunisiaContainer, TunisiaVehicle, PersonalEffects } from "./types/tunisiaTypes";
import { TunisiaInvoice } from "./types/tunisiaInvoiceTypes";
import ContainerSelection from "./components/ContainerSelection";
import ContainerLoadingView from "./components/ContainerLoadingView";
import SealedContainersView from "./components/SealedContainersView";
import ContainerDetailsView from "./components/ContainerDetailsView";
import TunisiaInvoiceForm from "./components/TunisiaInvoiceForm";
import LoadingRecordsView from "./components/LoadingRecordsView";
import TunisiaPaymentReceiptGenerator from "./components/TunisiaPaymentReceiptGenerator";
import TunisiaHBLGenerator from "./components/TunisiaHBLGenerator";
import { Button } from "@/components/ui/button";
import { TunisiaStorageService } from "./services/TunisiaStorageService";
import { toast } from "sonner";

const TunisiaDashboard: React.FC = () => {
  const { language } = useLanguage();
  const [containers, setContainers] = useState<TunisiaContainer[]>([]);
  const [selectedContainer, setSelectedContainer] = useState<TunisiaContainer | null>(null);
  const [invoices, setInvoices] = useState<TunisiaInvoice[]>([]);
  const [view, setView] = useState<'dashboard' | 'container-select' | 'container-loading' | 'sealed-containers' | 'container-details' | 'invoice-form' | 'invoice-management' | 'loading-records' | 'payment-receipt' | 'hbl-generator'>('dashboard');
  const [selectedInvoice, setSelectedInvoice] = useState<TunisiaInvoice | null>(null);

  // Load data on component mount
  useEffect(() => {
    const loadedInvoices = TunisiaStorageService.loadInvoices();
    const loadedContainers = TunisiaStorageService.loadContainers();
    
    setInvoices(loadedInvoices);
    setContainers(loadedContainers);
    
    console.log('Loaded Tunisia data:', { 
      invoices: loadedInvoices.length, 
      containers: loadedContainers.length 
    });
  }, []);

  const handleContainerCreate = (containerData: Omit<TunisiaContainer, 'id'>) => {
    const newContainer: TunisiaContainer = {
      ...containerData,
      id: Date.now().toString()
    };
    
    // Save to storage
    TunisiaStorageService.addContainer(newContainer);
    setContainers(prev => [...prev, newContainer]);
    
    toast.success("Container created successfully!");
  };

  const handleContainerSelect = (container: TunisiaContainer) => {
    setSelectedContainer(container);
    setView('container-loading');
  };

  const handleVehicleAdd = (vehicleData: Omit<TunisiaVehicle, 'id'>) => {
    if (!selectedContainer) return;

    const newVehicle: TunisiaVehicle = {
      ...vehicleData,
      id: Date.now().toString()
    };

    const updatedContainer: TunisiaContainer = {
      ...selectedContainer,
      loadedVehicles: [...selectedContainer.loadedVehicles, newVehicle],
      status: selectedContainer.loadedVehicles.length === 0 ? 'LOADING' : selectedContainer.status,
      totalFreightCharge: selectedContainer.totalFreightCharge + newVehicle.freightCharge,
      totalCharge: selectedContainer.totalFreightCharge + newVehicle.freightCharge + selectedContainer.totalPersonalEffectsCharge
    };

    // Save to storage
    TunisiaStorageService.updateContainer(updatedContainer);
    
    // Update container in state
    setContainers(prev => prev.map(c => c.id === selectedContainer.id ? updatedContainer : c));
    setSelectedContainer(updatedContainer);
    
    toast.success(`Vehicle loaded successfully! (${updatedContainer.loadedVehicles.length}/${updatedContainer.maxVehicles})`);
  };

  const handlePersonalEffectsAdd = (effectsData: Omit<PersonalEffects, 'id'>) => {
    if (!selectedContainer) return;

    const newEffects: PersonalEffects = {
      ...effectsData,
      id: Date.now().toString()
    };

    const updatedContainer: TunisiaContainer = {
      ...selectedContainer,
      personalEffects: [...selectedContainer.personalEffects, newEffects],
      totalPersonalEffectsCharge: selectedContainer.totalPersonalEffectsCharge + newEffects.charges,
      totalCharge: selectedContainer.totalFreightCharge + selectedContainer.totalPersonalEffectsCharge + newEffects.charges
    };

    // Save to storage
    TunisiaStorageService.updateContainer(updatedContainer);
    
    // Update container in state
    setContainers(prev => prev.map(c => c.id === selectedContainer.id ? updatedContainer : c));
    setSelectedContainer(updatedContainer);
    
    toast.success("Personal effects added successfully!");
  };

  const handleContainerSeal = () => {
    if (!selectedContainer) return;

    const updatedContainer: TunisiaContainer = {
      ...selectedContainer,
      status: 'SEALED'
    };

    // Save to storage
    TunisiaStorageService.updateContainer(updatedContainer);
    
    setContainers(prev => prev.map(c => c.id === selectedContainer.id ? updatedContainer : c));
    setSelectedContainer(updatedContainer);
    
    toast.success("Container sealed successfully!");
    
    // Auto-navigate to sealed containers view after sealing
    setView('sealed-containers');
  };

  const handleContainerView = (container: TunisiaContainer) => {
    setSelectedContainer(container);
    setView('container-details');
  };

  const handleInvoiceSave = (invoice: TunisiaInvoice) => {
    // Save to storage first
    TunisiaStorageService.addInvoice(invoice);
    
    if (invoices.find(inv => inv.id === invoice.id)) {
      setInvoices(prev => prev.map(inv => inv.id === invoice.id ? invoice : inv));
      // Update any container vehicles that match the updated invoice
      syncInvoiceToContainers(invoice);
      toast.success("Invoice updated successfully!");
    } else {
      setInvoices(prev => [...prev, invoice]);
      toast.success("Invoice created successfully!");
    }
    setView('invoice-management');
  };

  // Sync invoice updates to loaded vehicles in containers
  const syncInvoiceToContainers = (updatedInvoice: TunisiaInvoice) => {
    // Use storage service for proper sync
    TunisiaStorageService.syncInvoiceToContainers(updatedInvoice);
    
    // Also update local state
    setContainers(prev => prev.map(container => ({
      ...container,
      loadedVehicles: container.loadedVehicles.map(vehicle => {
        // Match by export plate or chassis number
        if (vehicle.exportPlate === updatedInvoice.vehicle.exportPlate ||
            vehicle.chassisNumber === updatedInvoice.vehicle.chassisNumber) {
          return {
            ...vehicle,
            make: updatedInvoice.vehicle.make,
            model: updatedInvoice.vehicle.model,
            year: updatedInvoice.vehicle.year,
            color: updatedInvoice.vehicle.color,
            chassisNumber: updatedInvoice.vehicle.chassisNumber,
            plateNumber: updatedInvoice.vehicle.plateNumber,
            engineNumber: updatedInvoice.vehicle.engineNumber,
            country: updatedInvoice.vehicle.country,
            hsCode: updatedInvoice.vehicle.hsCode,
            exportPlate: updatedInvoice.vehicle.exportPlate,
            type: updatedInvoice.vehicle.type,
            freightCharge: updatedInvoice.vehicle.freightCharge,
            photos: updatedInvoice.vehicle.photos,
            customerInfo: updatedInvoice.customer
          };
        }
        return vehicle;
      })
    })));
  };

  if (view === 'container-select') {
    return (
      <Layout title="Tunisia Container Management">
        <div className="mb-8">
          <div className="flex justify-between mb-4">
            <CountryBackButton />
            <LanguageSwitcher />
          </div>
          <h1 className={`text-3xl font-bold text-gray-800 mb-2 ${language === 'ar' ? 'font-arabic' : ''}`}>
            Container Management
          </h1>
          <p className="text-gray-600">Select or create a container for vehicle and personal effects loading</p>
        </div>

        <ContainerSelection
          containers={containers}
          onContainerSelect={handleContainerSelect}
          onContainerCreate={handleContainerCreate}
        />
      </Layout>
    );
  }

  if (view === 'container-loading' && selectedContainer) {
    return (
      <Layout title="Tunisia Container Loading">
        <ContainerLoadingView
          container={selectedContainer}
          onBack={() => setView('container-select')}
          onVehicleAdd={handleVehicleAdd}
          onPersonalEffectsAdd={handlePersonalEffectsAdd}
          onContainerSeal={handleContainerSeal}
          invoices={invoices}
        />
      </Layout>
    );
  }

  if (view === 'sealed-containers') {
    return (
      <Layout title="Tunisia Sealed Containers">
        <div className="mb-8">
          <div className="flex justify-between mb-4">
            <CountryBackButton />
            <LanguageSwitcher />
          </div>
        </div>
        <SealedContainersView
          containers={containers}
          onBack={() => setView('dashboard')}
          onContainerView={handleContainerView}
        />
      </Layout>
    );
  }

  if (view === 'container-details' && selectedContainer) {
    return (
      <Layout title="Tunisia Container Details">
        <div className="mb-8">
          <div className="flex justify-between mb-4">
            <CountryBackButton />
            <LanguageSwitcher />
          </div>
        </div>
        <ContainerDetailsView
          container={selectedContainer}
          onBack={() => setView('sealed-containers')}
        />
      </Layout>
    );
  }

  if (view === 'invoice-form') {
    return (
      <Layout title="Tunisia Invoice Management">
        <div className="mb-8">
          <div className="flex justify-between mb-4">
            <CountryBackButton />
            <LanguageSwitcher />
          </div>
        </div>
        <TunisiaInvoiceForm
          onBack={() => setView('invoice-management')}
          onInvoiceSave={handleInvoiceSave}
        />
      </Layout>
    );
  }

  if (view === 'loading-records') {
    return (
      <Layout title="Tunisia Loading Records">
        <div className="mb-8">
          <div className="flex justify-between mb-4">
            <CountryBackButton />
            <LanguageSwitcher />
          </div>
        </div>
        <LoadingRecordsView
          containers={containers}
          onBack={() => setView('dashboard')}
        />
      </Layout>
    );
  }

  if (view === 'invoice-management') {
    return (
      <Layout title="Tunisia Invoice Management">
        <div className="mb-8">
          <div className="flex justify-between mb-4">
            <CountryBackButton />
            <LanguageSwitcher />
          </div>
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Invoice Management</h1>
              <p className="text-gray-600">Manage customer invoices for vehicle and personal effects shipping</p>
            </div>
            <Button onClick={() => setView('invoice-form')}>
              Create New Invoice
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          {invoices.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <p className="text-muted-foreground mb-4">No invoices created yet.</p>
                <Button onClick={() => setView('invoice-form')}>
                  Create Your First Invoice
                </Button>
              </CardContent>
            </Card>
          ) : (
            invoices.map((invoice) => (
              <Card key={invoice.id} className="cursor-pointer hover:shadow-md transition-shadow">
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

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="font-medium">{invoice.customer.prefix} {invoice.customer.name}</p>
                      <p className="text-sm text-muted-foreground">{invoice.customer.mobile}</p>
                      {invoice.customer.metrashMobile && (
                        <p className="text-xs text-purple-600 font-medium">Metrash: {invoice.customer.metrashMobile}</p>
                      )}
                      {invoice.hblNumber && (
                        <p className="text-xs text-blue-600 font-medium">HBL: {invoice.hblNumber}</p>
                      )}
                    </div>
                    <div>
                      <p className="font-medium">{invoice.vehicle.make} {invoice.vehicle.model}</p>
                      <p className="text-sm text-muted-foreground">{invoice.vehicle.year} • {invoice.vehicle.color}</p>
                      {invoice.vehicle.exportPlate && (
                        <p className="text-xs text-green-600 font-medium">Export: {invoice.vehicle.exportPlate}</p>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedInvoice(invoice);
                        setView('payment-receipt');
                      }}
                    >
                      Payment Receipt
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={(e) => {
                        e.stopPropagation();
                        // Edit invoice functionality can be added here
                        console.log('Edit invoice:', invoice.id);
                      }}
                    >
                      Edit
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </Layout>
    );
  }

  if (view === 'payment-receipt' && selectedInvoice) {
    return (
      <Layout title="Tunisia Payment Receipt">
        <div className="mb-8">
          <div className="flex justify-between mb-4">
            <CountryBackButton />
            <LanguageSwitcher />
          </div>
        </div>
        <TunisiaPaymentReceiptGenerator
          invoice={selectedInvoice}
          onBack={() => {
            setView('invoice-management');
            setSelectedInvoice(null);
          }}
        />
      </Layout>
    );
  }

  if (view === 'hbl-generator') {
    return (
      <Layout title="Tunisia HBL Generator">
        <div className="mb-8">
          <div className="flex justify-between mb-4">
            <CountryBackButton />
            <LanguageSwitcher />
          </div>
        </div>
        <TunisiaHBLGenerator
          invoices={invoices}
          onBack={() => setView('dashboard')}
        />
      </Layout>
    );
  }

  return (
    <Layout title="Tunisia Operations">
      <div className="mb-8">
        <div className="flex justify-between mb-4">
          <CountryBackButton />
          <LanguageSwitcher />
        </div>
        <h1 className={`text-3xl font-bold text-gray-800 mb-2 ${language === 'ar' ? 'font-arabic' : ''}`}>
          Tunisia Vehicle & Personal Effects Loading
        </h1>
        <p className="text-gray-600">
          Specialized container loading system for vehicles and personal effects with photo documentation
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card 
          className="cursor-pointer hover:shadow-lg transition-shadow border-2 border-primary/20 hover:border-primary/40"
          onClick={() => setView('container-select')}
        >
          <CardHeader>
            <CardTitle className="text-primary">Container Loading</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Load vehicles and personal effects into containers with photo documentation.
            </p>
            <div className="space-y-2 text-xs">
              <div>• Vehicle Types: Sedan, SUV, Hilux, Double Pickup, Station Wagon, Super Saloon, Saloon</div>
              <div>• Container Types: 40' HC, 45'</div>
              <div>• Photo Upload for Documentation</div>
              <div>• Personal Effects: QAR 600/CBM</div>
              <div>• Auto-fill from Invoices</div>
            </div>
          </CardContent>
        </Card>

        <Card 
          className="cursor-pointer hover:shadow-lg transition-shadow border-2 border-blue-200 hover:border-blue-400"
          onClick={() => setView('sealed-containers')}
        >
          <CardHeader>
            <CardTitle className="text-blue-600">Sealed Container Management</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              View and manage sealed containers with complete loading manifests.
            </p>
            <div className="space-y-2 text-xs">
              <div>• View Sealed Container Details</div>
              <div>• Loading Manifests</div>
              <div>• Vehicle & Personal Effects Documentation</div>
              <div>• House Bill of Lading Generation</div>
            </div>
          </CardContent>
        </Card>

        <Card 
          className="cursor-pointer hover:shadow-lg transition-shadow border-2 border-green-200 hover:border-green-400"
          onClick={() => setView('invoice-management')}
        >
          <CardHeader>
            <CardTitle className="text-green-600">Invoice Management</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Create and manage customer invoices for vehicle shipping and personal effects.
            </p>
            <div className="space-y-2 text-xs">
              <div>• Customer & Vehicle Details</div>
              <div>• House B/L Number Management</div>
              <div>• Personal Effects Documentation</div>
              <div>• Photo Upload & Management</div>
              <div>• Auto-fill Loading Details</div>
              <div>• Payment Receipt Generation</div>
            </div>
          </CardContent>
        </Card>

        <Card 
          className="cursor-pointer hover:shadow-lg transition-shadow border-2 border-purple-200 hover:border-purple-400"
          onClick={() => setView('loading-records')}
        >
          <CardHeader>
            <CardTitle className="text-purple-600">Loading Records</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              View comprehensive loading records and container utilization reports.
            </p>
            <div className="space-y-2 text-xs">
              <div>• Container Loading History</div>
              <div>• Vehicle Loading Timeline</div>
              <div>• Personal Effects Summary</div>
              <div>• Photo Documentation Archive</div>
              <div>• Financial Summary Reports</div>
            </div>
          </CardContent>
        </Card>

        <Card 
          className="cursor-pointer hover:shadow-lg transition-shadow border-2 border-orange-200 hover:border-orange-400"
          onClick={() => setView('hbl-generator')}
        >
          <CardHeader>
            <CardTitle className="text-orange-600">House Bill of Lading</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Generate House Bill of Lading documents for customer invoices.
            </p>
            <div className="space-y-2 text-xs">
              <div>• Auto-fill from Invoice Details</div>
              <div>• One HBL per Customer Invoice</div>
              <div>• Professional Documentation</div>
              <div>• Print & Preview Options</div>
              <div>• Customer Consignee Details</div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Pricing Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <div><strong>Sedan Cars:</strong> QAR 5,000 - 6,000</div>
              <div><strong>SUV & Hilux:</strong> QAR 6,000</div>
              <div><strong>Double Pickup:</strong> QAR 6,500 - 7,000</div>
              <div><strong>Station Wagon & Super Saloon:</strong> QAR 5,500 - 6,000</div>
              <div><strong>Saloon:</strong> QAR 5,000 - 5,500</div>
              <div><strong>Personal Effects:</strong> QAR 600/CBM</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>System Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <div><strong>Invoices:</strong> {invoices.length}</div>
              <div><strong>Containers:</strong> {containers.length}</div>
              <div>Empty: {containers.filter(c => c.status === 'EMPTY').length}</div>
              <div>Loading: {containers.filter(c => c.status === 'LOADING').length}</div>
              <div>Loaded: {containers.filter(c => c.status === 'LOADED').length}</div>
              <div>Sealed: {containers.filter(c => c.status === 'SEALED').length}</div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default TunisiaDashboard;
