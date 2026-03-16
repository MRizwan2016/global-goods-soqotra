import React from 'react';
import CountryManifestPage from '@/components/shared/CountryManifestPage';

const KenyaAirManifest = () => (
  <CountryManifestPage
    countryName="Kenya"
    countrySlug="kenya"
    manifestType="air"
    defaultDestination="NAIROBI"
  />
);

export default KenyaAirManifest;
