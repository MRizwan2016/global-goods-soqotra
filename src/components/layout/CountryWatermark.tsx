import React from 'react';
import { useLocation } from 'react-router-dom';

const FLAG_MAP: Record<string, string> = {
  tunisia: '/lovable-uploads/tunisia-flag.svg',
  'saudi-arabia': '/lovable-uploads/4ae13822-259b-4267-bc9f-c39bdd23960d.png',
  'sri-lanka': '/lovable-uploads/cf6ea931-595f-4abe-9309-082e42ecc739.png',
  kenya: '/lovable-uploads/369cd06a-781a-4245-b14f-be0f89da811c.png',
  sudan: '/lovable-uploads/9706daa3-2a76-4ae1-a665-99c70f32e1b2.png',
};

const getCountryFromPath = (pathname: string): string | null => {
  const segments = pathname.split('/').filter(Boolean);
  if (segments.length === 0) return null;
  const first = segments[0].toLowerCase();
  if (FLAG_MAP[first]) return first;
  return null;
};

const CountryWatermark: React.FC = () => {
  const { pathname } = useLocation();
  const country = getCountryFromPath(pathname);

  // For Tunisia, use an inline SVG data URI since we don't have a flag image file
  const getTunisiaFlag = () =>
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 800'%3E%3Crect fill='%23E70013' width='1200' height='800'/%3E%3Ccircle cx='600' cy='400' r='200' fill='white'/%3E%3Ccircle cx='640' cy='400' r='160' fill='%23E70013'/%3E%3Cpolygon points='560,400 620,370 620,340 560,380 500,340 500,370' fill='%23E70013' transform='rotate(-20,560,400)'/%3E%3C/svg%3E";

  let bgImage: string;

  if (country === 'tunisia') {
    bgImage = getTunisiaFlag();
  } else if (country && FLAG_MAP[country]) {
    bgImage = FLAG_MAP[country];
  } else if (pathname === '/' || pathname.startsWith('/dashboard') || pathname.startsWith('/accounts')) {
    // Global pages: use company logo
    bgImage = '/lovable-uploads/SOQO_NEW_LOGO.jpeg';
  } else {
    return null;
  }

  return (
    <div
      className="pointer-events-none absolute inset-0 z-0"
      aria-hidden="true"
      style={{
        backgroundImage: `url("${bgImage}")`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center center',
        backgroundSize: country ? '60%' : '40%',
        opacity: 0.06,
        mixBlendMode: 'soft-light',
      }}
    />
  );
};

export default CountryWatermark;
