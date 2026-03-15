import React from 'react';
import CountryManifestPage from '@/components/shared/CountryManifestPage';

const PhilippinesAirManifest = () => (
  <CountryManifestPage
    countryName="Philippines"
    countrySlug="philippines"
    manifestType="air"
    defaultDestination="MANILA"
  />
);

export default PhilippinesAirManifest;
