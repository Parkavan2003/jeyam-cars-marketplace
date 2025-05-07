
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-IN', { 
    style: 'currency', 
    currency: 'INR',
    maximumFractionDigits: 0 
  }).format(amount);
}

// Schema for structured data
export function generateCarSchema(car: any) {
  return {
    "@context": "https://schema.org",
    "@type": "Vehicle",
    "name": car.title,
    "description": car.description,
    "vehicleModelDate": car.year,
    "vehicleTransmission": car.transmission,
    "fuelType": car.fuel,
    "mileageFromOdometer": {
      "@type": "QuantitativeValue",
      "value": car.kilometers,
      "unitCode": "KMT"
    },
    "offers": {
      "@type": "Offer",
      "price": car.price,
      "priceCurrency": "INR",
      "availability": car.status === "Available" 
        ? "https://schema.org/InStock" 
        : "https://schema.org/SoldOut"
    }
  };
}

// For SEO meta tags
export function generateMetaTags(title: string, description: string, imageUrl?: string) {
  return {
    title: `${title} | Jeyam Cars - Second Hand Cars in Trichy`,
    description: description || "Find quality second-hand cars in Trichy at Jeyam Cars. Wide selection of pre-owned vehicles at competitive prices.",
    keywords: "second hand cars in Trichy, used cars, pre-owned vehicles, car dealership Trichy, Jeyam Cars",
    imageUrl: imageUrl || "/placeholder.svg"
  };
}
