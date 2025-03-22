
export interface QatarContainer {
  id: string;
  runningNumber: string;
  containerNumber: string;
  sealNumber: string;
  containerType: 'GP20' | 'GP40' | 'HC40' | 'RF20' | 'RF40' | 'FL20' | 'FL40' | 'OT20' | 'OT40';
  direction: 'DIRECT' | 'MIX';
  sector: string;
  etd: string;
  eta: string;
  loadDate: string;
  weight: number;
  status: 'NEW' | 'LOADING' | 'LOADED' | 'SEALED' | 'SHIPPED' | 'COMPLETED';
  shippingLine?: string;
}
