
import React, { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CountryBackButton from "@/components/ui/country-back-button";
import LanguageSwitcher from "@/components/ui/language-switcher";
import { useLanguage } from "@/contexts/LanguageContext";
import { TunisiaContainer, TunisiaVehicle, PersonalEffects } from "./types/tunisiaTypes";
import ContainerSelection from "./components/ContainerSelection";
import ContainerLoadingView from "./components/ContainerLoadingView";
import SealedContainersView from "./components/SealedContainersView";
import ContainerDetailsView from "./components/ContainerDetailsView";

const TunisiaDashboard: React.FC = () => {
  const { language } = useLanguage();
  const [containers, setContainers] = useState<TunisiaContainer[]>([]);
  const [selectedContainer, setSelectedContainer] = useState<TunisiaContainer | null>(null);
  const [view, setView] = useState<'dashboard' | 'container-select' | 'container-loading' | 'sealed-containers' | 'container-details'>('dashboard');

  const handleContainerCreate = (containerData: Omit<TunisiaContainer, 'id'>) => {
    const newContainer: TunisiaContainer = {
      ...containerData,
      id: Date.now().toString()
    };
    setContainers(prev => [...prev, newContainer]);
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

    // Update container in state
    setContainers(prev => prev.map(c => c.id === selectedContainer.id ? updatedContainer : c));
    setSelectedContainer(updatedContainer);
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

    // Update container in state
    setContainers(prev => prev.map(c => c.id === selectedContainer.id ? updatedContainer : c));
    setSelectedContainer(updatedContainer);
  };

  const handleContainerSeal = () => {
    if (!selectedContainer) return;

    const updatedContainer: TunisiaContainer = {
      ...selectedContainer,
      status: 'SEALED'
    };

    setContainers(prev => prev.map(c => c.id === selectedContainer.id ? updatedContainer : c));
    setSelectedContainer(updatedContainer);
    // Auto-navigate to sealed containers view after sealing
    setView('sealed-containers');
  };

  const handleContainerView = (container: TunisiaContainer) => {
    setSelectedContainer(container);
    setView('container-details');
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
              <div>• Vehicle Types: Sedan, SUV, Hilux, Double Pickup</div>
              <div>• Container Types: 40' HC, 45'</div>
              <div>• Photo Upload for Documentation</div>
              <div>• Personal Effects: QAR 600/CBM</div>
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
              <div>• Photo Gallery</div>
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
              <div><strong>Personal Effects:</strong> QAR 600/CBM</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Container Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <div>Total Containers: {containers.length}</div>
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
