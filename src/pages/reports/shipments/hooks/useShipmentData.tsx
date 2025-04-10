
import { useState, useEffect } from 'react';

interface Shipment {
  id: string;
  invoiceNumber: string;
  destination: string;
  consignee1: string;
  date: string;
  packages: string;
  weight: string;
  volume: string;
  status: 'In Transit' | 'Delivered' | 'Pending';
}

export const useShipmentData = () => {
  const [shipments, setShipments] = useState<Shipment[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [countryFilter, setCountryFilter] = useState('all');
  const [countries, setCountries] = useState<string[]>([]);
  
  useEffect(() => {
    // Load invoice data and convert to shipments
    const invoices = JSON.parse(localStorage.getItem('invoices') || '[]');
    
    // Extract unique countries and ensure they are strings
    const uniqueCountries = Array.from(
      new Set(
        invoices.map((invoice: any) => invoice.destination || 'Unknown')
      )
    ).map(country => String(country));
    
    setCountries(uniqueCountries);
    
    // Generate random statuses for demo
    const statuses = ['In Transit', 'Delivered', 'Pending'];
    
    // Convert invoices to shipments
    const shipmentsData = invoices.map((invoice: any) => ({
      id: invoice.id || `ship-${Math.random().toString(36).substring(2, 9)}`,
      invoiceNumber: invoice.invoiceNumber || 'Unknown',
      destination: invoice.destination || 'Unknown',
      consignee1: invoice.consignee1 || 'Unknown',
      date: invoice.date || new Date().toISOString().split('T')[0],
      packages: invoice.packages || '0',
      weight: invoice.weight || '0',
      volume: invoice.volume || '0',
      status: statuses[Math.floor(Math.random() * statuses.length)] as 'In Transit' | 'Delivered' | 'Pending'
    }));
    
    setShipments(shipmentsData);
  }, []);
  
  // Filter shipments based on search term and filters
  const filteredShipments = shipments.filter(shipment => {
    const matchesSearch = 
      shipment.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      shipment.consignee1.toLowerCase().includes(searchTerm.toLowerCase()) ||
      shipment.destination.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesStatus = statusFilter === 'all' || shipment.status === statusFilter;
    const matchesCountry = countryFilter === 'all' || shipment.destination === countryFilter;
    
    return matchesSearch && matchesStatus && matchesCountry;
  });
  
  const getStatusColor = (status: string) => {
    switch(status) {
      case 'In Transit': return 'bg-amber-100 text-amber-800';
      case 'Delivered': return 'bg-green-100 text-green-800';
      case 'Pending': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };
  
  return {
    shipments,
    filteredShipments,
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    countryFilter,
    setCountryFilter,
    countries,
    getStatusColor
  };
};
