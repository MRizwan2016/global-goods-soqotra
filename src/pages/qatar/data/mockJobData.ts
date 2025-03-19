
// This file serves as a central export point for all mock data
// It aggregates and re-exports data from individual files for backward compatibility

import { mockJobs } from './mockJobs';
import { mockCities, mockSectors, mockBranches } from './mockLocations';
import { mockVehicles, mockDrivers } from './mockVehicles';
import { mockSalesReps } from './mockSalesReps';

export {
  mockJobs,
  mockCities,
  mockSectors,
  mockBranches,
  mockVehicles,
  mockDrivers,
  mockSalesReps
};
