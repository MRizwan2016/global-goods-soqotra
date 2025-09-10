
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
import TunisiaDocumentViewer from "./components/TunisiaDocumentViewer";
import TunisiaPaymentTracker from "./components/TunisiaPaymentTracker";
import TunisiaInvoiceBookManager from "./components/TunisiaInvoiceBookManager";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, CreditCard, BookOpen, Ship, Trash2 } from "lucide-react";
import { TunisiaStorageService } from "./services/TunisiaStorageService";
import { TunisiaInvoiceBookService } from "./services/TunisiaInvoiceBookService";
import { toast } from "sonner";

const TunisiaDashboard: React.FC = () => {
  const { language } = useLanguage();
  const [containers, setContainers] = useState<TunisiaContainer[]>([]);
  const [selectedContainer, setSelectedContainer] = useState<TunisiaContainer | null>(null);
  const [invoices, setInvoices] = useState<TunisiaInvoice[]>([]);
  const [view, setView] = useState<'dashboard' | 'container-select' | 'container-loading' | 'sealed-containers' | 'container-details' | 'invoice-form' | 'invoice-management' | 'loading-records' | 'payment-receipt' | 'hbl-generator' | 'document-viewer' | 'payment-tracker' | 'book-manager'>('dashboard');
  const [selectedInvoice, setSelectedInvoice] = useState<TunisiaInvoice | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Initialize invoice books on mount
  useEffect(() => {
    TunisiaInvoiceBookService.initializeDefaultBooks();
  }, []);

  // Load data on component mount
  useEffect(() => {
    const loadData = async () => {
      const loadedInvoices = await TunisiaStorageService.loadInvoices();
      const loadedContainers = await TunisiaStorageService.loadContainers();
      
      console.log('Raw localStorage data:', {
        invoicesData: localStorage.getItem('tunisia-invoices'),
        containersData: localStorage.getItem('tunisia-containers')
      });
      
      setInvoices(loadedInvoices);
      setContainers(loadedContainers);
      
      console.log('Loaded Tunisia data:', { 
        invoices: loadedInvoices.length, 
        containers: loadedContainers.length,
        invoiceDetails: loadedInvoices,
        containerDetails: loadedContainers
      });
    };
    
    loadData();
  }, []);

  const handleContainerCreate = async (containerData: Omit<TunisiaContainer, 'id'>) => {
    const newContainer: TunisiaContainer = {
      ...containerData,
      id: Date.now().toString()
    };
    
    // Save to storage
    await TunisiaStorageService.addContainer(newContainer);
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

  const handleVehicleRemove = (vehicleId: string) => {
    if (!selectedContainer) return;

    const vehicleToRemove = selectedContainer.loadedVehicles.find(v => v.id === vehicleId);
    if (!vehicleToRemove) return;

    const updatedContainer: TunisiaContainer = {
      ...selectedContainer,
      loadedVehicles: selectedContainer.loadedVehicles.filter(v => v.id !== vehicleId),
      totalFreightCharge: selectedContainer.totalFreightCharge - vehicleToRemove.freightCharge,
      totalCharge: (selectedContainer.totalFreightCharge - vehicleToRemove.freightCharge) + selectedContainer.totalPersonalEffectsCharge
    };

    // Save to storage
    TunisiaStorageService.updateContainer(updatedContainer);
    
    // Update container in state
    setContainers(prev => prev.map(c => c.id === selectedContainer.id ? updatedContainer : c));
    setSelectedContainer(updatedContainer);
    
    toast.success("Vehicle removed successfully!");
  };

  const handlePersonalEffectsRemove = (effectsId: string) => {
    if (!selectedContainer) return;

    const effectsToRemove = selectedContainer.personalEffects.find(e => e.id === effectsId);
    if (!effectsToRemove) return;

    const updatedContainer: TunisiaContainer = {
      ...selectedContainer,
      personalEffects: selectedContainer.personalEffects.filter(e => e.id !== effectsId),
      totalPersonalEffectsCharge: selectedContainer.totalPersonalEffectsCharge - effectsToRemove.charges,
      totalCharge: selectedContainer.totalFreightCharge + (selectedContainer.totalPersonalEffectsCharge - effectsToRemove.charges)
    };

    // Save to storage
    TunisiaStorageService.updateContainer(updatedContainer);
    
    // Update container in state
    setContainers(prev => prev.map(c => c.id === selectedContainer.id ? updatedContainer : c));
    setSelectedContainer(updatedContainer);
    
    toast.success("Personal effects removed successfully!");
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

  const handleContainerReopen = (containerId: string) => {
    const container = containers.find(c => c.id === containerId);
    if (!container) return;

    const updatedContainer: TunisiaContainer = {
      ...container,
      status: 'LOADING'
    };

    // Save to storage
    TunisiaStorageService.updateContainer(updatedContainer);
    
    setContainers(prev => prev.map(c => c.id === containerId ? updatedContainer : c));
    setSelectedContainer(updatedContainer);
    
    toast.success("Container reopened for additional loading!");
    
    // Navigate to container loading view for editing
    setView('container-loading');
  };

  const handleContainerView = (container: TunisiaContainer) => {
    setSelectedContainer(container);
    setView('container-details');
  };

  const handleContainerEdit = (containerId: string, updatedData: Partial<TunisiaContainer>) => {
    const container = containers.find(c => c.id === containerId);
    if (!container) return;

    const updatedContainer: TunisiaContainer = {
      ...container,
      ...updatedData
    };

    // Save to storage
    TunisiaStorageService.updateContainer(updatedContainer);
    
    setContainers(prev => prev.map(c => c.id === containerId ? updatedContainer : c));
    
    toast.success("Container updated successfully!");
  };

  const handleContainerDelete = (containerId: string) => {
    // Save to storage
    TunisiaStorageService.deleteContainer(containerId);
    
    setContainers(prev => prev.filter(c => c.id !== containerId));
    
    toast.success("Container deleted successfully!");
  };

  const handleInvoiceSave = async (invoice: TunisiaInvoice) => {
    try {
      // Save to storage first
      await TunisiaStorageService.addInvoice(invoice);
      
      if (invoices.find(inv => inv.id === invoice.id)) {
        setInvoices(prev => prev.map(inv => inv.id === invoice.id ? invoice : inv));
        // Update any container vehicles that match the updated invoice
        await syncInvoiceToContainers(invoice);
        toast.success("Invoice updated successfully!");
      } else {
        setInvoices(prev => [...prev, invoice]);
        toast.success("Invoice created successfully!");
      }
      setView('invoice-management');
    } catch (error) {
      console.error('Error saving invoice:', error);
      toast.error("Failed to save invoice. Please try again.");
    }
  };

  // Sync invoice updates to loaded vehicles in containers
  const handleDeleteInvoice = async (invoiceId: string, invoiceNumber: string) => {
    if (window.confirm(`Are you sure you want to delete invoice ${invoiceNumber}? This action cannot be undone.`)) {
      try {
        await TunisiaStorageService.deleteInvoice(invoiceId);
        
        // Reload invoices after deletion
        const updatedInvoices = await TunisiaStorageService.loadInvoices();
        setInvoices(updatedInvoices);
        
        toast.success(`Invoice ${invoiceNumber} deleted successfully`);
      } catch (error) {
        console.error('Error deleting invoice:', error);
        toast.error('Failed to delete invoice. Please try again.');
      }
    }
  };

  const syncInvoiceToContainers = async (updatedInvoice: TunisiaInvoice) => {
    // Use storage service for proper sync
    await TunisiaStorageService.syncInvoiceToContainers(updatedInvoice);
    
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
          onContainerEdit={handleContainerEdit}
          onContainerDelete={handleContainerDelete}
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
          onVehicleRemove={handleVehicleRemove}
          onPersonalEffectsRemove={handlePersonalEffectsRemove}
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
          containers={containers.filter(c => c.status === 'SEALED')}
          onBack={() => setView('dashboard')}
          onContainerView={handleContainerView}
          onContainerReopen={handleContainerReopen}
          onContainerEdit={handleContainerEdit}
          onContainerDelete={handleContainerDelete}
          isAdmin={true}
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
          onBack={() => {
            setView('invoice-management');
            setSelectedInvoice(null);
          }}
          onInvoiceSave={handleInvoiceSave}
          existingInvoice={selectedInvoice || undefined}
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
          invoices={invoices}
          onBack={() => setView('dashboard')}
          onContainerEdit={(containerId) => {
            const container = containers.find(c => c.id === containerId);
            if (container) {
              setSelectedContainer(container);
              setView('container-loading');
            }
          }}
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

                  <div className="flex gap-2 flex-wrap">
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
                    {invoice.supportingDocuments && invoice.supportingDocuments.length > 0 && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedInvoice(invoice);
                          setView('document-viewer');
                        }}
                      >
                        View Documents ({invoice.supportingDocuments.length})
                      </Button>
                    )}
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedInvoice(invoice);
                        setView('invoice-form');
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteInvoice(invoice.id, invoice.invoiceNumber);
                      }}
                    >
                      <Trash2 className="h-3 w-3 mr-1" />
                      Delete
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
          onBack={() => setView('dashboard')}
          invoices={invoices}
        />
      </Layout>
    );
  }

  if (view === 'document-viewer' && selectedInvoice) {
    return (
      <Layout title="Tunisia Document Viewer">
        <div className="mb-8">
          <div className="flex justify-between mb-4">
            <CountryBackButton />
            <LanguageSwitcher />
          </div>
        </div>
        <TunisiaDocumentViewer
          documents={selectedInvoice.supportingDocuments || []}
          title={`${selectedInvoice.invoiceNumber} - ${selectedInvoice.customer.name}`}
          onBack={() => {
            setView('invoice-management');
            setSelectedInvoice(null);
          }}
        />
      </Layout>
    );
  }

  if (view === 'payment-tracker') {
    return (
      <Layout title="Tunisia Payment Tracker">
        <div className="mb-8">
          <div className="flex justify-between mb-4">
            <CountryBackButton />
            <LanguageSwitcher />
          </div>
        </div>
        <TunisiaPaymentTracker />
      </Layout>
    );
  }

  if (view === 'book-manager') {
    return (
      <Layout title="Tunisia Invoice Book Manager">
        <div className="mb-8">
          <div className="flex justify-between mb-4">
            <CountryBackButton />
            <LanguageSwitcher />
          </div>
        </div>
        <TunisiaInvoiceBookManager />
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
      
      {/* Search functionality */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search invoices by number, customer, or vehicle plate..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        {searchQuery && (
          <div className="mt-2 text-sm text-muted-foreground">
            {invoices.filter(inv => 
              inv.invoiceNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
              inv.customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
              inv.vehicle.exportPlate.toLowerCase().includes(searchQuery.toLowerCase())
            ).length} invoice(s) found matching "{searchQuery}"
          </div>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card 
          className="cursor-pointer hover:shadow-lg transition-shadow border-2 border-red-200 hover:border-red-400"
          onClick={() => setView('payment-tracker')}
        >
          <CardHeader>
            <CardTitle className="text-red-600 flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              Payment Tracker
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Track customer payments for vehicles and personal effects with receipt generation.
            </p>
            <div className="space-y-2 text-xs">
              <div>• Paid/Unpaid Invoice Tracking</div>
              <div>• Payment Receipt Generation</div>
              <div>• Payment Method Recording</div>
              <div>• Invoice Search & Filtering</div>
              <div>• Payment Status Updates</div>
            </div>
          </CardContent>
        </Card>

        <Card 
          className="cursor-pointer hover:shadow-lg transition-shadow border-2 border-indigo-200 hover:border-indigo-400"
          onClick={() => setView('book-manager')}
        >
          <CardHeader>
            <CardTitle className="text-indigo-600 flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              Invoice Book Manager
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Manage Tunisia invoice books and assign invoice numbers to users.
            </p>
            <div className="space-y-2 text-xs">
              <div>• Book No. 1: 013100-013150 (50 pages)</div>
              <div>• User Assignment System</div>
              <div>• Available Page Tracking</div>
              <div>• Dropdown Invoice Selection</div>
              <div>• Book Status Management</div>
            </div>
          </CardContent>
        </Card>

        <Card 
          className="cursor-pointer hover:shadow-lg transition-shadow border-2 border-teal-200 hover:border-teal-400"
          onClick={() => setView('hbl-generator')}
        >
          <CardHeader>
            <CardTitle className="text-teal-600 flex items-center gap-2">
              <Ship className="h-5 w-5" />
              House Bill of Lading
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Generate professional HBL documents with legal terms for shipping.
            </p>
            <div className="space-y-2 text-xs">
              <div>• Front & Back Legal Terms</div>
              <div>• Auto-fill from Invoice Data</div>
              <div>• Professional Layout Design</div>
              <div>• Print-Ready Format</div>
              <div>• Carrier Information</div>
            </div>
          </CardContent>
        </Card>

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
