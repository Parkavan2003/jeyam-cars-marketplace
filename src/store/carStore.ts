
import { create } from 'zustand';
import { toast } from '@/components/ui/sonner';

export interface Car {
  id: string;
  title: string;
  year: number;
  price: number;
  kilometers: number;
  transmission: 'Manual' | 'Automatic';
  fuel: 'Petrol' | 'Diesel' | 'Electric' | 'Hybrid' | 'CNG';
  description: string;
  status: 'Available' | 'Sold Out';
  images: string[];
  createdAt: string;
  features?: string[];
}

export type CarFilters = {
  priceRange: [number, number];
  fuel: string[];
  transmission: string[];
  status: string[];
  search: string;
}

interface CarStore {
  cars: Car[];
  filteredCars: Car[];
  featuredCars: Car[];
  selectedCar: Car | null;
  loading: boolean;
  filters: CarFilters;
  
  // Actions
  setFilters: (filters: Partial<CarFilters>) => void;
  resetFilters: () => void;
  filterCars: () => void;
  selectCar: (id: string | null) => void;
  addCar: (car: Omit<Car, 'id' | 'createdAt'>) => void;
  updateCar: (id: string, updates: Partial<Car>) => void;
  deleteCar: (id: string) => void;
  toggleStatus: (id: string) => void;
}

// Mock data
const mockCars: Car[] = [
  {
    id: '1',
    title: 'Maruti Swift VXI 2018',
    year: 2018,
    price: 550000,
    kilometers: 45000,
    transmission: 'Manual',
    fuel: 'Petrol',
    description: 'Well maintained Maruti Swift with single owner. All service records available. Power windows, power steering, AC in excellent condition.',
    status: 'Available',
    images: ['/placeholder.svg', '/placeholder.svg', '/placeholder.svg'],
    createdAt: '2023-01-15',
    features: ['Power Windows', 'Power Steering', 'Air Conditioning', 'Airbags']
  },
  {
    id: '2',
    title: 'Honda City SV 2019',
    year: 2019,
    price: 850000,
    kilometers: 32000,
    transmission: 'Automatic',
    fuel: 'Petrol',
    description: 'Premium condition Honda City with automatic transmission. Includes enhanced audio system, reverse camera, and all original accessories.',
    status: 'Available',
    images: ['/placeholder.svg', '/placeholder.svg'],
    createdAt: '2023-02-10',
    features: ['Reverse Camera', 'Premium Audio', 'Alloy Wheels', 'Cruise Control']
  },
  {
    id: '3',
    title: 'Hyundai Creta SX 2020',
    year: 2020,
    price: 1250000,
    kilometers: 28000,
    transmission: 'Automatic',
    fuel: 'Diesel',
    description: 'Top model Creta with panoramic sunroof, leather seats, and navigation system. Excellent fuel efficiency and performance.',
    status: 'Sold Out',
    images: ['/placeholder.svg', '/placeholder.svg', '/placeholder.svg', '/placeholder.svg'],
    createdAt: '2023-03-05',
    features: ['Panoramic Sunroof', 'Leather Seats', 'Navigation', 'Push Button Start']
  },
  {
    id: '4',
    title: 'Tata Nexon XZ 2021',
    year: 2021,
    price: 950000,
    kilometers: 18000,
    transmission: 'Manual',
    fuel: 'Petrol',
    description: 'Safe and reliable Tata Nexon with 5-star safety rating. Features include touchscreen infotainment, sunroof, and automatic climate control.',
    status: 'Available',
    images: ['/placeholder.svg', '/placeholder.svg'],
    createdAt: '2023-04-20',
    features: ['5-Star Safety', 'Touchscreen Infotainment', 'Sunroof', 'Climate Control']
  },
  {
    id: '5',
    title: 'Toyota Innova Crysta 2017',
    year: 2017,
    price: 1450000,
    kilometers: 65000,
    transmission: 'Manual',
    fuel: 'Diesel',
    description: 'Spacious 7-seater family vehicle with excellent maintenance history. Perfect for large families or tour operators.',
    status: 'Available',
    images: ['/placeholder.svg'],
    createdAt: '2023-01-30',
    features: ['7-Seater', 'Captain Seats', 'Roof AC', 'Spacious Boot']
  },
  {
    id: '6',
    title: 'Mahindra XUV500 W10 2018',
    year: 2018,
    price: 1050000,
    kilometers: 57000,
    transmission: 'Manual',
    fuel: 'Diesel',
    description: 'Powerful SUV with 7 seating capacity. Features include leather seats, touchscreen navigation, and reverse camera.',
    status: 'Sold Out',
    images: ['/placeholder.svg', '/placeholder.svg'],
    createdAt: '2023-02-28',
    features: ['7-Seater', 'Leather Interior', 'Navigation', 'Reverse Camera']
  }
];

// Define price ranges for filtering
const minPrice = Math.min(...mockCars.map(car => car.price));
const maxPrice = Math.max(...mockCars.map(car => car.price));

export const useCarStore = create<CarStore>((set, get) => ({
  cars: mockCars,
  filteredCars: mockCars,
  featuredCars: mockCars.filter((_, index) => index < 3), // First 3 cars as featured
  selectedCar: null,
  loading: false,
  filters: {
    priceRange: [minPrice, maxPrice],
    fuel: [],
    transmission: [],
    status: [],
    search: ''
  },

  setFilters: (newFilters: Partial<CarFilters>) => {
    set(state => ({
      filters: { ...state.filters, ...newFilters }
    }));
    get().filterCars();
  },

  resetFilters: () => {
    set(state => ({
      filters: {
        priceRange: [minPrice, maxPrice],
        fuel: [],
        transmission: [],
        status: [],
        search: ''
      }
    }));
    get().filterCars();
  },

  filterCars: () => {
    const { cars, filters } = get();
    const filtered = cars.filter(car => {
      // Price filter
      if (car.price < filters.priceRange[0] || car.price > filters.priceRange[1]) {
        return false;
      }

      // Fuel type filter
      if (filters.fuel.length > 0 && !filters.fuel.includes(car.fuel)) {
        return false;
      }

      // Transmission filter
      if (filters.transmission.length > 0 && !filters.transmission.includes(car.transmission)) {
        return false;
      }

      // Status filter
      if (filters.status.length > 0 && !filters.status.includes(car.status)) {
        return false;
      }

      // Search filter
      if (filters.search && !car.title.toLowerCase().includes(filters.search.toLowerCase())) {
        return false;
      }

      return true;
    });

    set({ filteredCars: filtered });
  },

  selectCar: (id: string | null) => {
    if (!id) {
      set({ selectedCar: null });
      return;
    }

    const car = get().cars.find(c => c.id === id) || null;
    set({ selectedCar: car });
  },

  addCar: (car) => {
    const newCar: Car = {
      ...car,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };

    set(state => ({
      cars: [...state.cars, newCar],
      filteredCars: [...state.cars, newCar]
    }));
    toast.success('Car added successfully');
  },

  updateCar: (id, updates) => {
    set(state => {
      const updatedCars = state.cars.map(car => 
        car.id === id ? { ...car, ...updates } : car
      );
      
      return {
        cars: updatedCars,
        filteredCars: updatedCars,
        selectedCar: state.selectedCar?.id === id 
          ? { ...state.selectedCar, ...updates } 
          : state.selectedCar
      };
    });
    toast.success('Car updated successfully');
  },

  deleteCar: (id) => {
    set(state => ({
      cars: state.cars.filter(car => car.id !== id),
      filteredCars: state.filteredCars.filter(car => car.id !== id),
      selectedCar: state.selectedCar?.id === id ? null : state.selectedCar
    }));
    toast.success('Car deleted successfully');
  },

  toggleStatus: (id) => {
    set(state => {
      const updatedCars = state.cars.map(car => {
        if (car.id === id) {
          const newStatus = car.status === 'Available' ? 'Sold Out' : 'Available';
          return { ...car, status: newStatus };
        }
        return car;
      });
      
      return {
        cars: updatedCars,
        filteredCars: updatedCars,
        selectedCar: state.selectedCar?.id === id 
          ? { ...state.selectedCar, status: state.selectedCar.status === 'Available' ? 'Sold Out' : 'Available' } 
          : state.selectedCar
      };
    });
    toast.success('Car status updated');
  }
}));
