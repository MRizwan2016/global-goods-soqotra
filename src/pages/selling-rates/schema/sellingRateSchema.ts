
import { z } from "zod";

export const sellingRateSchema = z.object({
  tariffNumber: z.string().min(1, "Tariff number is required"),
  freightType: z.enum(["S", "A", "L"], {
    invalid_type_error: "Please select a valid freight type"
  }),
  sector: z.string().min(1, "Sector is required"),
  effectiveFrom: z.string().min(1, "Effective date is required"),
  country: z.string().min(1, "Country is required"),
});

export type SellingRateFormValues = z.infer<typeof sellingRateSchema>;

export const districtRateSchema = z.record(
  z.string(),
  z.record(z.string(), z.string().refine(val => {
    // Allow empty string or valid numbers
    if (val === "") return true;
    const num = Number(val);
    return !isNaN(num) && num >= 0;
  }, "Rate must be a positive number"))
);

export type DistrictRateValues = z.infer<typeof districtRateSchema>;
