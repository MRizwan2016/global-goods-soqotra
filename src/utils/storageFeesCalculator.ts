/**
 * Warehouse Storage Fee Calculator
 * 
 * Vehicles: 14-day free grace period. QAR 100/day from Day 15.
 * Personal Effects: QAR 200/CBM/month (daily accrual = 200/30 per CBM per day).
 */

export interface StorageFeeResult {
  daysInStorage: number;
  gracePeriodDays: number;
  chargeableDays: number;
  dailyRate: number;
  totalFee: number;
  status: 'free' | 'amber' | 'red'; // free = within grace, amber = 15-30 days, red = 30+ days
}

export const VEHICLE_DAILY_RATE = 100; // QAR per day
export const PERSONAL_EFFECTS_MONTHLY_RATE = 200; // QAR per CBM per month
export const VEHICLE_GRACE_PERIOD = 14; // days

export function calculateDaysInStorage(receivedDate: string | Date): number {
  const received = new Date(receivedDate);
  const today = new Date();
  received.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);
  return Math.max(0, Math.floor((today.getTime() - received.getTime()) / (1000 * 60 * 60 * 24)));
}

export function calculateVehicleStorageFee(receivedDate: string | Date): StorageFeeResult {
  const daysInStorage = calculateDaysInStorage(receivedDate);
  const chargeableDays = Math.max(0, daysInStorage - VEHICLE_GRACE_PERIOD);
  const totalFee = chargeableDays * VEHICLE_DAILY_RATE;

  let status: StorageFeeResult['status'] = 'free';
  if (daysInStorage > 30) status = 'red';
  else if (daysInStorage > VEHICLE_GRACE_PERIOD) status = 'amber';

  return {
    daysInStorage,
    gracePeriodDays: VEHICLE_GRACE_PERIOD,
    chargeableDays,
    dailyRate: VEHICLE_DAILY_RATE,
    totalFee,
    status,
  };
}

export function calculatePersonalEffectsStorageFee(
  receivedDate: string | Date,
  totalCbm: number
): StorageFeeResult {
  const daysInStorage = calculateDaysInStorage(receivedDate);
  const dailyRate = (PERSONAL_EFFECTS_MONTHLY_RATE / 30) * totalCbm;
  const totalFee = Math.round(dailyRate * daysInStorage * 100) / 100;

  let status: StorageFeeResult['status'] = 'free';
  if (daysInStorage > 30) status = 'red';
  else if (daysInStorage > VEHICLE_GRACE_PERIOD) status = 'amber';

  return {
    daysInStorage,
    gracePeriodDays: 0,
    chargeableDays: daysInStorage,
    dailyRate: Math.round(dailyRate * 100) / 100,
    totalFee,
    status,
  };
}

export function calculateStorageFee(
  cargoType: 'vehicle' | 'personal_effects',
  receivedDate: string | Date,
  totalCbm: number = 0
): StorageFeeResult {
  if (cargoType === 'vehicle') {
    return calculateVehicleStorageFee(receivedDate);
  }
  return calculatePersonalEffectsStorageFee(receivedDate, totalCbm);
}

export function getStorageRowClass(status: StorageFeeResult['status']): string {
  switch (status) {
    case 'red': return 'bg-red-50 border-l-4 border-l-red-500';
    case 'amber': return 'bg-amber-50 border-l-4 border-l-amber-500';
    default: return '';
  }
}
