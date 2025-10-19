import React, { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CountryBackButton from "@/components/ui/country-back-button";
import LanguageSwitcher from "@/components/ui/language-switcher";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Ship, Package, FileText, MapPin, Truck } from "lucide-react";
import { AlgeriaContainer } from "./types/algeriaTypes";
import { AlgeriaInvoice } from "./types/algeriaInvoiceTypes";
import ContainerSelection from "./components/ContainerSelection";
import AlgeriaInvoiceForm from "./components/AlgeriaInvoiceForm";
import { AlgeriaStorageService } from "./services/AlgeriaStorageService";
import { AlgeriaInvoiceBookService } from "./services/AlgeriaInvoiceBookService";
import { toast } from "sonner";

const AlgeriaDashboard: React.FC = () => {
  const { language } = useLanguage();
  const [containers, setContainers] = useState<AlgeriaContainer[]>([]);
  const [invoices, setInvoices] = useState<AlgeriaInvoice[]>([]);
  const [view, setView] = useState<'dashboard' | 'container-select' | 'invoice-management' | 'invoice-form'>('dashboard');
  const [selectedInvoice, setSelectedInvoice] = useState<AlgeriaInvoice | null>(null);

  // Initialize invoice books on mount
  useEffect(() => {
    AlgeriaInvoiceBookService.initializeDefaultBooks();
  }, []);

  // Load data on component mount
  useEffect(() => {
    const loadData = async () => {
      try {
        const loadedInvoices = await AlgeriaStorageService.loadInvoices();
        const loadedContainers = await AlgeriaStorageService.loadContainers();
        
        setInvoices(loadedInvoices);
        setContainers(loadedContainers);
      } catch (error) {
        console.error("Error loading data:", error);
        toast.error("Failed to load data. Please refresh the page.");
      }
    };
    
    loadData();
  }, []);

  const handleContainerCreate = async (containerData: Omit<AlgeriaContainer, 'id'>) => {
    const existingContainer = containers.find(c => c.containerNumber === containerData.containerNumber);
    if (existingContainer) {
      toast.error("Container number already exists!");
      return;
    }

    const containerId = crypto.randomUUID ? crypto.randomUUID() : `container_${Date.now()}_${Math.random()}`;
    
    const newContainer: AlgeriaContainer = {
      ...containerData,
      id: containerId
    };
    
    try {
      await AlgeriaStorageService.addContainer(newContainer);
      setContainers(prev => [...prev, newContainer]);
      toast.success("Container created successfully!");
    } catch (error) {
      console.error("Error creating container:", error);
      toast.error("Failed to create container. Please try again.");
    }
  };

  const handleContainerSelect = (container: AlgeriaContainer) => {
    toast.info(`Container ${container.containerNumber} selected`);
    // TODO: Navigate to container loading view
  };

  const handleInvoiceSave = async (invoice: AlgeriaInvoice) => {
    try {
      // Save invoice (handles both add and update)
      await AlgeriaStorageService.addInvoice(invoice);
      
      // Reload all invoices from storage to ensure UI is in sync
      const updatedInvoices = await AlgeriaStorageService.loadInvoices();
      setInvoices(updatedInvoices);
      
      setView('invoice-management');
      setSelectedInvoice(null);
      toast.success(`Invoice ${selectedInvoice ? 'updated' : 'created'} successfully!`);
    } catch (error) {
      console.error("Error saving invoice:", error);
      toast.error("Failed to save invoice. Please try again.");
    }
  };

  if (view === 'container-select') {
    return (
      <Layout title="Algeria Container Management">
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

  if (view === 'invoice-form') {
    return (
      <Layout title="Algeria Invoice Management">
        <div className="mb-8">
          <div className="flex justify-between mb-4">
            <CountryBackButton />
            <LanguageSwitcher />
          </div>
        </div>
        <AlgeriaInvoiceForm
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

  if (view === 'invoice-management') {
    return (
      <Layout title="Algeria Invoice Management">
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
            <Button onClick={() => {
              setSelectedInvoice(null);
              setView('invoice-form');
            }}>
              Create New Invoice
            </Button>
          </div>
        </div>

        <Card>
          <CardContent className="p-8 text-center">
            <p className="text-muted-foreground mb-4">
              {invoices.length === 0 ? "No invoices created yet." : `${invoices.length} invoice(s) found`}
            </p>
            <Button onClick={() => setView('dashboard')}>
              Back to Dashboard
            </Button>
          </CardContent>
        </Card>
      </Layout>
    );
  }

  const loadingContainers = containers.filter(c => c.status === 'LOADING');
  const sealedContainers = containers.filter(c => c.status === 'SEALED');

  return (
    <Layout title="Algeria Logistics">
      <div className="mb-8">
        <div className="flex justify-between mb-4">
          <CountryBackButton />
          <LanguageSwitcher />
        </div>
        <h1 className={`text-3xl font-bold text-gray-800 mb-2 ${language === 'ar' ? 'font-arabic' : ''}`}>
          Algeria Logistics Operations
        </h1>
        <p className="text-gray-600">Vehicle & Personal Effects Shipping to Algeria (Algiers & Skikda Ports)</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Containers Loading</CardTitle>
            <Ship className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{loadingContainers.length}</div>
            <p className="text-xs text-muted-foreground">Active containers</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Sealed Containers</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{sealedContainers.length}</div>
            <p className="text-xs text-muted-foreground">Ready for shipping</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Invoices</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{invoices.length}</div>
            <p className="text-xs text-muted-foreground">Total invoices</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Ports</CardTitle>
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">Algiers & Skikda</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full justify-start" variant="outline" onClick={() => setView('container-select')}>
              <Truck className="mr-2 h-4 w-4" />
              Container Management
            </Button>
            <Button className="w-full justify-start" variant="outline" onClick={() => setView('invoice-management')}>
              <FileText className="mr-2 h-4 w-4" />
              Invoice Management
            </Button>
            <Button className="w-full justify-start" variant="outline" disabled>
              <Package className="mr-2 h-4 w-4" />
              Loading Records
            </Button>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Algeria Ports Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border-l-4 border-blue-500 pl-4">
                <h3 className="font-semibold text-lg">Port of Algiers</h3>
                <p className="text-sm text-gray-600">Main international port of Algeria</p>
                <p className="text-sm text-gray-500 mt-1">Location: Algiers, Algeria</p>
                <p className="text-xs text-blue-600 mt-2">Handling containers for Algiers region</p>
              </div>
              <div className="border-l-4 border-green-500 pl-4">
                <h3 className="font-semibold text-lg">Port of Skikda</h3>
                <p className="text-sm text-gray-600">Major Mediterranean port</p>
                <p className="text-sm text-gray-500 mt-1">Location: Skikda, Algeria</p>
                <p className="text-xs text-green-600 mt-2">Handling containers for Eastern Algeria</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default AlgeriaDashboard;
