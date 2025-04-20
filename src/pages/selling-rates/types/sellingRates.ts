
export type BoxType = {
  id: string;
  name: string;
};

export type CurrencyOption = {
  code: string;
  name: string;
  symbol: string;
};

export type RateWithPromo = {
  baseRate: string;
  promoRate?: string;
  promoStartDate?: string;
  promoEndDate?: string;
};

export type DistrictRates = {
  [key: string]: {
    [key: string]: RateWithPromo;
  };
};
