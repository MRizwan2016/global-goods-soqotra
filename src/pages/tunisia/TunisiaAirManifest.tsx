import React from 'react';
import CountryManifestPage from '@/components/shared/CountryManifestPage';

const TunisiaAirManifest = () => (
  <CountryManifestPage
    countryName="Tunisia"
    countrySlug="tunisia"
    manifestStorageKey="tunisiaShippingManifests"
    manifestType="air"
    defaultDestination="TUNIS"
  />
);

export default TunisiaAirManifest;
