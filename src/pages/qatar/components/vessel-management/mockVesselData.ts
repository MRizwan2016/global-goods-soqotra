
import { v4 as uuidv4 } from 'uuid';

export interface QatarVessel {
  id: string;
  runningNumber: string;
  vesselName: string;
  voyage: string;
  portOfLoading: string;
  portOfDischarge: string;
  shippingLine: string;
  direction: 'DIRECT' | 'MIX';
  masterBL: string;
  sector: string;
  etd: string;
  eta: string;
  loadDate?: string;
  containers?: string[];
  status?: 'NEW' | 'LOADING' | 'LOADED' | 'SAILED' | 'COMPLETED';
}

export const mockVesselData: QatarVessel[] = [
  {
    id: uuidv4(),
    runningNumber: '384',
    vesselName: 'HOPE ISLAND',
    voyage: '512N',
    portOfLoading: 'HAMAD SEA PORT',
    portOfDischarge: 'COLOMBO',
    shippingLine: 'ABUDHABI SHIPPING',
    direction: 'MIX',
    masterBL: 'ABMBL384/2025',
    sector: 'COLOMBO',
    etd: '2025-03-23',
    eta: '2025-04-05',
    loadDate: '2025-03-24',
    containers: ['715', '716'],
    status: 'LOADED'
  },
  {
    id: uuidv4(),
    runningNumber: '383',
    vesselName: 'SOURCE BLESSING',
    voyage: '511N',
    portOfLoading: 'HAMAD SEA PORT',
    portOfDischarge: 'COLOMBO',
    shippingLine: 'ABUDHABI SHIPPING',
    direction: 'MIX',
    masterBL: 'ABMBL383/2025',
    sector: 'COLOMBO',
    etd: '2025-03-16',
    eta: '2025-03-26',
    loadDate: '2025-03-16',
    containers: ['712', '713', '714'],
    status: 'SAILED'
  },
  {
    id: uuidv4(),
    runningNumber: '382',
    vesselName: 'HOPE ISLAND',
    voyage: '510N',
    portOfLoading: 'HAMAD SEA PORT',
    portOfDischarge: 'COLOMBO',
    shippingLine: 'ABUDHABI SHIPPING',
    direction: 'MIX',
    masterBL: 'ABMBL382/2025',
    sector: 'COLOMBO',
    etd: '2025-03-09',
    eta: '2025-03-26',
    loadDate: '2025-03-09',
    containers: ['710', '711'],
    status: 'SAILED'
  },
  {
    id: uuidv4(),
    runningNumber: '381',
    vesselName: 'HOPE ISLAND',
    voyage: '510N',
    portOfLoading: 'HAMAD SEA PORT',
    portOfDischarge: 'COLOMBO',
    shippingLine: 'ABUDHABI SHIPPING',
    direction: 'MIX',
    masterBL: 'ABMBL381/2025',
    sector: 'COLOMBO',
    etd: '2025-03-09',
    eta: '2025-03-22',
    loadDate: '2025-03-04',
    containers: ['708', '709'],
    status: 'SAILED'
  },
  {
    id: uuidv4(),
    runningNumber: '380',
    vesselName: 'SOURCE BLESSING',
    voyage: '509N',
    portOfLoading: 'HAMAD SEA PORT',
    portOfDischarge: 'COLOMBO',
    shippingLine: 'ABUDHABI SHIPPING',
    direction: 'MIX',
    masterBL: 'ABMBL380/2025',
    sector: 'COLOMBO',
    etd: '2025-02-02',
    eta: '2025-03-12',
    loadDate: '2025-03-04',
    containers: ['707'],
    status: 'COMPLETED'
  },
  {
    id: uuidv4(),
    runningNumber: '385',
    vesselName: '',
    voyage: '',
    portOfLoading: '',
    portOfDischarge: 'COLOMBO',
    shippingLine: 'ABUDHABI SHIPPING',
    direction: 'MIX',
    masterBL: '',
    sector: 'COLOMBO',
    etd: '',
    eta: '',
    status: 'NEW'
  }
];
