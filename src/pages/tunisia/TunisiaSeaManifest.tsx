import React from 'react';
import CountryManifestPage from '@/components/shared/CountryManifestPage';

const TunisiaSeaManifest = () => (
  <CountryManifestPage
    countryName="Tunisia"
    countrySlug="tunisia"
    manifestStorageKey="tunisiaShippingManifests"
    manifestType="sea"
    defaultDestination="TUNIS"
  />
);

export default TunisiaSeaManifest;
